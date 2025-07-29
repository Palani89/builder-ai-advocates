import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Team() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const openSideMenu = () => setSideMenuOpen(true);
  const closeSideMenu = () => setSideMenuOpen(false);

  const logoutFromApp = () => {
    console.log("Logout clicked");
  };

  return (
    <div>
      {/* Side Menu Overlay */}
      <div 
        className={`side-menu-overlay ${sideMenuOpen ? 'show' : ''}`} 
        onClick={closeSideMenu}
      ></div>

      {/* Side Menu */}
      <div className={`side-menu ${sideMenuOpen ? 'open' : ''}`}>
        <div className="side-menu-header">
          <div className="side-menu-logo">
            <div className="logo-icon">
              <i className="fas fa-balance-scale"></i>
            </div>
            <div>
              <span className="logo-text">AI Advocates</span>
              <div className="side-menu-subtitle">Legal Practice Management</div>
            </div>
          </div>
          <button className="side-menu-close" onClick={closeSideMenu}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <nav className="side-menu-nav">
          <Link to="/" className="side-menu-item">
            <i className="fas fa-home side-menu-icon"></i>
            Home
          </Link>
          <Link to="/team" className="side-menu-item active">
            <i className="fas fa-users side-menu-icon"></i>
            My Team
          </Link>
          <Link to="/cases" className="side-menu-item">
            <i className="fas fa-file-alt side-menu-icon"></i>
            Cases
          </Link>
          <Link to="/calendar" className="side-menu-item">
            <i className="fas fa-calendar side-menu-icon"></i>
            Calendar
          </Link>
          <Link to="/more" className="side-menu-item">
            <i className="fas fa-th side-menu-icon"></i>
            More
          </Link>
          <button className="side-menu-item logout" onClick={logoutFromApp}>
            <i className="fas fa-sign-out-alt side-menu-icon"></i>
            Log Out
          </button>
        </nav>
      </div>

      <div className="app-container">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={openSideMenu}>
              <i className="fas fa-bars"></i>
            </button>
            <div className="logo-container">
              <div className="logo-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <span className="logo-text">AI Advocates</span>
            </div>
          </div>
          <div className="header-right">
            <button className="notification-icon">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </button>
            <div className="user-avatar">A</div>
            <button className="notification-icon" onClick={logoutFromApp}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Page Header */}
          <div className="page-header">
            <div className="page-title-section">
              <h1>My Team</h1>

              {/* Breadcrumb */}
              <nav className="breadcrumb">
                <Link to="/" className="breadcrumb-item">
                  <i className="fas fa-home"></i>
                  Home
                </Link>
                <span className="breadcrumb-separator">
                  <i className="fas fa-chevron-right"></i>
                </span>
                <span className="breadcrumb-item active">
                  <i className="fas fa-users"></i>
                  My Team
                </span>
              </nav>

              <p className="page-subtitle">
                Manage your legal team members and collaborators
              </p>
            </div>
          </div>

          {/* Coming Soon Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            textAlign: 'center',
            padding: '3rem'
          }}>
            <div style={{
              fontSize: '4rem',
              color: 'var(--primary)',
              marginBottom: '1.5rem'
            }}>
              <i className="fas fa-users"></i>
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Team Management Coming Soon
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              maxWidth: '500px',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              We're working on bringing you comprehensive team management features including 
              team member profiles, role assignments, case collaborations, and performance tracking.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <Link 
                to="/cases" 
                className="btn btn-primary"
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <i className="fas fa-file-alt"></i>
                View Cases
              </Link>
              <Link 
                to="/more" 
                className="btn btn-secondary"
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <i className="fas fa-th"></i>
                Explore Features
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <div className="nav-items">
            <Link to="/" className="nav-item">
              <i className="fas fa-home"></i>
              Home
            </Link>
            <Link to="/team" className="nav-item active">
              <i className="fas fa-users"></i>
              My Team
            </Link>
            <Link to="/cases" className="nav-item">
              <i className="fas fa-file-alt"></i>
              Cases
            </Link>
            <Link to="/calendar" className="nav-item">
              <i className="fas fa-calendar"></i>
              Calendar
            </Link>
            <Link to="/more" className="nav-item">
              <i className="fas fa-th"></i>
              More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
