// Renders TODO items with quick status controls and delete buttons.
const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
];

const TodoList = ({ todos = [], onStatusChange = () => {}, onDelete = () => {} } = {}) => {
  if (!todos.length) {
    return <p className="text-muted">You have not created any TODOs yet.</p>;
  }

  return (
    <div className="list-group">
      {todos.map((todo) => (
        <div key={todo.id} className="list-group-item">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h6>{todo.title}</h6>
              {todo.category && (
                <div className="mb-2">
                  <span className="badge text-bg-secondary">{todo.category}</span>
                </div>
              )}
              <p className="mb-2 text-muted">{todo.description || 'No description provided.'}</p>
              {todo.tags?.length > 0 && (
                <div className="mb-2">
                  {todo.tags.map((tag) => (
                    <span key={tag} className="badge text-bg-secondary me-2">{tag}</span>
                  ))}
                </div>
              )}
              <small className="text-muted">Last updated: {new Date(todo.updatedAt).toLocaleString()}</small>
            </div>
            <div className="d-flex flex-column gap-2 align-items-end">
              <select
                className="form-select form-select-sm"
                value={todo.status}
                onChange={(event) => onStatusChange(todo.id, event.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
