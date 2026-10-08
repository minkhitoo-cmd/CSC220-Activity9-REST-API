import { useEffect, useState } from "react";
import {
  getStudents,
  loginUser,
  createStudent,
  deleteStudent
} from "./api";

import LoginForm from "./components/LoginForm";
import AddStudentForm from "./components/AddStudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    async function loadStudents() {
      try {
        setLoading(true);
        setError("");

        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);

  async function handleLogin(email, password) {
    try {
      setLoginError("");

      const data = await loginUser(email, password);
      setToken(data.token);
    } catch (err) {
      setToken("");
      setLoginError(err.message);
    }
  }

  async function handleAdd(student) {
    try {
      setActionError("");

      const created = await createStudent(student, token);

      setStudents((currentStudents) => [
        created,
        ...currentStudents
      ]);
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      setActionError("");

      await deleteStudent(id, token);

      setStudents((currentStudents) =>
        currentStudents.filter(
          (student) => student._id !== id
        )
      );
    } catch (err) {
      setActionError(err.message);
    }
  }

  return (
    <div className="page">
      <header>
        <h1>CSC220 Student Manager</h1>
        <p>React + Express + MongoDB</p>
      </header>

      <LoginForm
        onLogin={handleLogin}
        loginError={loginError}
      />

      {token ? (
        <p className="success">
          Logged in. Protected actions are enabled.
        </p>
      ) : (
        <p className="note">
          GET is public. Login is required for Add and Delete.
        </p>
      )}

      <AddStudentForm
        onAdd={handleAdd}
        disabled={!token}
      />

      {actionError && (
        <p className="error">{actionError}</p>
      )}

      <h2>Students ({students.length})</h2>

      <StudentList
        students={students}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        canDelete={Boolean(token)}
      />
    </div>
  );
}

export default App;
