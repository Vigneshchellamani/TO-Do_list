export default function TodoItem({
  task,
  editingId,
  editTitle,
  setEditTitle,
  onToggle,
  onDelete,
  onEdit,
  onSave,
}) {
  const isEditing = editingId === task._id;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px 0",
      }}
    >
      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ flex: 1, marginRight: "10px" }}
          />
          <button onClick={() => onSave(task._id)}>💾</button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
              flex: 1,
              textAlign: "left",
            }}
            onClick={() => onToggle(task._id, task.completed)}
          >
            {task.title}
          </span>
          <div style={{ display: "flex", gap: "5px" }}>
            <button onClick={() => onEdit(task)}>✏️</button>
            <button onClick={() => onDelete(task._id)}>❌</button>
          </div>
        </>
      )}
    </div>
  );
}
