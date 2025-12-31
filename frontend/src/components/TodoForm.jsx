// Form for creating new TODO entries in a couple of inputs.
import { useState } from 'react';

const defaultForm = {
  title: '',
  category: '',
  description: '',
  tags: ''
};

const TodoForm = ({ onSubmit, isSaving }) => {
  const [form, setForm] = useState(defaultForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSaving) {
      return;
    }
    onSubmit({
      title: form.title,
      category: form.category?.trim() ? form.category.trim() : undefined,
      description: form.description,
      tags: form.tags ? form.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : []
    });
    setForm(defaultForm);
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-4">
      <h5 className="card-title">Add a new TODO</h5>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input name="title" className="form-control" value={form.title} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <input name="category" className="form-control" value={form.category} onChange={handleChange} placeholder="e.g. Work" />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea name="description" className="form-control" value={form.description} onChange={handleChange} rows={2} />
      </div>
      <div className="mb-3">
        <label className="form-label">Tags (comma separated)</label>
        <input name="tags" className="form-control" value={form.tags} onChange={handleChange} />
      </div>
      <button className="btn btn-primary" disabled={isSaving} type="submit">
        {isSaving ? 'Saving…' : 'Create TODO'}
      </button>
    </form>
  );
};

export default TodoForm;
