function StudentCard({ student, onDelete, canDelete }) {
  return (
    <article className="card">
      <h3>{student.name}</h3>
      <p>Major: {student.major}</p>
      <p>
        Score: {student.score} -{" "}
        {student.score >= 60 ? "Passed" : "Failed"}
      </p>

      <button
        onClick={() => onDelete(student._id)}
        disabled={!canDelete}
      >
        Delete
      </button>
    </article>
  );
}

export default StudentCard;
