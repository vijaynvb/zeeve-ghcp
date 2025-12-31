import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserDetail, listUserDetails } from '../services/api';
import './UserDetailsPage.css';

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  department: '',
  role: '',
  notes: ''
};

const UserDetailsPage = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [entries, setEntries] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState({ kind: 'idle', message: '' });

  const hasEntries = useMemo(() => entries.length > 0, [entries]);

  const loadEntries = async () => {
    try {
      setIsLoading(true);
      const response = await listUserDetails();
      setEntries(response.data);
    } catch (error) {
      setStatus({
        kind: 'error',
        message: error?.response?.data?.message || 'Unable to load saved entries right now.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus({ kind: 'info', message: 'Saving entry…' });
    try {
      await createUserDetail(formData);
      setFormData(emptyForm);
      setStatus({ kind: 'success', message: 'User detail saved successfully.' });
      await loadEntries();
    } catch (error) {
      setStatus({
        kind: 'error',
        message: error?.response?.data?.message || 'Unable to save the entry. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="user-details-page container">
      <section className="path-page-hero">
        <div>
          <p className="eyebrow">Profile enrichment</p>
          <h1>Capture the context you need</h1>
          <p className="subtitle">
            Maintain a curated list of stakeholders, advisors, or peers tied to your account. These entries stay private to you
            and help personalize your productivity rituals inside the dashboard.
          </p>
        </div>
        <div className="hero-actions">
          <Link to="/dashboard" className="path-btn path-btn--ghost">
            Back to dashboard
          </Link>
        </div>
      </section>

      <div className="row g-4">
        <div className="col-lg-5">
          <section className="path-card">
            <div className="path-card__header">
              <div>
                <p className="eyebrow">New entry</p>
                <h2>Add user details</h2>
              </div>
              <span className="path-pill">Secure</span>
            </div>
            <p className="path-card__subtitle">
              Required fields are marked with an asterisk (*). We align field styles, spacing, and feedback behaviors with the Zeeve Path design language.
            </p>
            {status.message && (
              <div className={`path-alert path-alert--${status.kind}`} role="status">
                {status.message}
              </div>
            )}
            <form className="path-form" onSubmit={handleSubmit}>
              <label className="path-field">
                <span>Full name *</span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="path-field">
                <span>Primary email *</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="path-field">
                <span>Phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </label>
              <label className="path-field">
                <span>Department</span>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enrollment services"
                />
              </label>
              <label className="path-field">
                <span>Role</span>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Advisor, coordinator, student…"
                />
              </label>
              <label className="path-field">
                <span>Notes</span>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="How does this person support your work?"
                />
              </label>
              <button className="path-btn path-btn--accent" type="submit" disabled={isSaving}>
                {isSaving ? 'Saving…' : 'Save entry'}
              </button>
            </form>
          </section>
        </div>
        <div className="col-lg-7">
          <section className="path-card">
            <div className="path-card__header">
              <div>
                <p className="eyebrow">Your archive</p>
                <h2>Stored contacts</h2>
              </div>
            </div>
            {isLoading ? (
              <p className="path-muted">Loading saved entries…</p>
            ) : hasEntries ? (
              <ul className="path-list">
                {entries.map((entry) => (
                  <li key={entry.id} className="path-list__item">
                    <div className="path-list__meta">
                      <h3>{entry.fullName}</h3>
                      <p>{entry.role || 'Role not provided'}</p>
                    </div>
                    <dl>
                      <div>
                        <dt>Email</dt>
                        <dd>{entry.email}</dd>
                      </div>
                      {entry.phone && (
                        <div>
                          <dt>Phone</dt>
                          <dd>{entry.phone}</dd>
                        </div>
                      )}
                      {entry.department && (
                        <div>
                          <dt>Department</dt>
                          <dd>{entry.department}</dd>
                        </div>
                      )}
                      {entry.notes && (
                        <div className="path-notes">
                          <dt>Notes</dt>
                          <dd>{entry.notes}</dd>
                        </div>
                      )}
                    </dl>
                    <span className="path-timestamp">Added on {new Date(entry.createdAt).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="path-empty">
                <p>No saved entries yet.</p>
                <p className="path-muted">Use the form to create your first contact.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
