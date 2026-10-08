import StudentCard from "./StudentCard";

function StudentList({
  students,
  loading,
  error,
  onDelete,
  canDelete
}) {
  if (loading) {
    return <p>Loading students...</p>;
  }

  if (error) {
    return <p className="error">Could not load: {error}</p>;
  }

  if (students.length === 0) {
    return <p>No students yet.</p>;
  }

  return (
    <section className="student-grid">
      {students.map((student) => (
        <StudentCard
          key={student._id}
          student={student}
          onDelete={onDelete}
          canDelete={canDelete}
        />
      ))}
    </section>
  );
}

export default StudentList;
