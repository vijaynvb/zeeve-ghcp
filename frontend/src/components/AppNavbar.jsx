// Zeeve Path-inspired header bar for navigation and account controls.
import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './AppNavbar.css';

const AppNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const userInitials = useMemo(() => {
    if (!user?.fullName) return 'TU';
    return user.fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((segment) => segment[0]?.toUpperCase())
      .join('');
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = isAuthenticated
    ? [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/user-details', label: 'User details' }
      ]
    : [];

  return (
    <header className="path-header" role="banner">
      <div className="path-header__inner">
        <div className="path-header__brand">
          {navLinks.length > 0 && (
            <button
              type="button"
              className="path-header__menu-btn"
              aria-label="Toggle primary navigation"
              aria-controls="primary-nav"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          )}
          <Link className="path-header__logo" to="/" aria-label="Zeeve TODO Manager home">
            <span className="path-header__logo-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" focusable="false" role="presentation">
                <circle cx="16" cy="16" r="15" />
                <path d="M11 17.5l3.5 3.5 6.5-8" />
              </svg>
            </span>
            <span className="path-header__product">
              <span className="path-header__org">Zeeve</span>
              <span className="path-header__product-name">TODO Manager</span>
            </span>
          </Link>
          <span className="path-header__badge" aria-label="Environment">
            sandbox
          </span>
        </div>

        <nav
          id="primary-nav"
          aria-label="Primary navigation"
          className={`path-header__nav${isMenuOpen ? ' is-open' : ''}`}
        >
          <ul>
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `path-header__link${isActive ? ' is-active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="path-header__actions">
          {isAuthenticated ? (
            <>
              <div className="path-header__user" aria-label="Current user">
                <div className="path-header__avatar" aria-hidden="true">
                  {userInitials}
                </div>
                <div className="path-header__user-meta">
                  <span className="path-header__user-name">
                    {user?.fullName ?? 'Authenticated user'}
                  </span>
                  <span className="path-header__user-status">Signed in</span>
                </div>
              </div>
              <button
                type="button"
                className="path-btn path-btn--ghost"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <Link className="path-btn path-btn--accent" to="/login">
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
