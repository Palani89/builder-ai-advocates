import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function More() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  useEffect(() => {
    // Add any initialization logic here
  }, []);

  const openSideMenu = () => setSideMenuOpen(true);
  const closeSideMenu = () => setSideMenuOpen(false);

  const logoutFromApp = () => {
    console.log("Logout clicked");
  };

  const handleFeatureClick = (featureTitle: string) => {
    console.log("Feature clicked:", featureTitle);

    switch (featureTitle) {
      case "Settings":
        // Navigate to settings page
        break;
      case "Legal Research":
        // Open legal research tool
        break;
      case "Add Article":
        // Navigate to articles page
        break;
      default:
        alert(`Opening ${featureTitle}...`);
    }
  };

  return (
    <div>
      {/* Side Menu Overlay */}
      <div
        className={`side-menu-overlay ${sideMenuOpen ? "show" : ""}`}
        onClick={closeSideMenu}
      ></div>

      {/* Side Menu */}
      <div className={`side-menu ${sideMenuOpen ? "open" : ""}`}>
        <div className="side-menu-header">
          <div className="side-menu-logo">
            <div className="logo-icon">
              <i className="fas fa-balance-scale"></i>
            </div>
            <div>
              <span className="logo-text">AI Advocates</span>
              <div className="side-menu-subtitle">
                Legal Practice Management
              </div>
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
          <Link to="/team" className="side-menu-item">
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
          <Link to="/more" className="side-menu-item active">
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
              <h1>More Features</h1>

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
                  <i className="fas fa-th"></i>
                  More
                </span>
              </nav>

              <p className="page-subtitle">
                Access all AI Advocates features and settings
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="feature-section">
            <h2 className="section-title">Quick Actions</h2>
            <div className="feature-grid">
              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Add Article")}
              >
                <div className="feature-icon primary">
                  <i className="fas fa-file-alt"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Add Article</div>
                  <div className="feature-description">
                    Create new legal articles
                  </div>
                </div>
              </div>

              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Add Hearing")}
              >
                <div className="feature-icon success">
                  <i className="fas fa-calendar-plus"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Add Hearing</div>
                  <div className="feature-description">
                    Schedule court hearings
                  </div>
                </div>
              </div>

              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Create Invoice")}
              >
                <div className="feature-icon warning">
                  <i className="fas fa-file-invoice"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Create Invoice</div>
                  <div className="feature-description">
                    Generate client invoices
                  </div>
                </div>
              </div>

              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Ask AI")}
              >
                <div className="feature-icon blue">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Ask AI</div>
                  <div className="feature-description">
                    Get AI-powered legal assistance
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tools & Resources */}
          <div className="feature-section">
            <h2 className="section-title">Tools & Resources</h2>
            <div className="tools-grid">
              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Legal Research")}
              >
                <div className="feature-icon error">
                  <i className="fas fa-search"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Legal Research</div>
                  <div className="feature-description">
                    Case laws & statutes
                  </div>
                </div>
              </div>

              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Legal Templates")}
              >
                <div className="feature-icon purple">
                  <i className="fas fa-file-contract"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Legal Templates</div>
                  <div className="feature-description">Drafts & formats</div>
                </div>
              </div>

              <div
                className="feature-card"
                onClick={() => handleFeatureClick("File Upload")}
              >
                <div className="feature-icon indigo">
                  <i className="fas fa-upload"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">File Upload</div>
                  <div className="feature-description">Import documents</div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings & Support */}
          <div className="feature-section">
            <h2 className="section-title">Settings & Support</h2>
            <div className="tools-grid">
              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Settings")}
              >
                <div className="feature-icon primary">
                  <i className="fas fa-cog"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Settings</div>
                  <div className="feature-description">App preferences</div>
                </div>
              </div>

              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Notifications")}
              >
                <div className="feature-icon warning">
                  <i className="fas fa-bell"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Notifications</div>
                  <div className="feature-description">Alerts & reminders</div>
                </div>
              </div>

              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Privacy & Security")}
              >
                <div className="feature-icon pink">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Privacy & Security</div>
                  <div className="feature-description">Data protection</div>
                </div>
              </div>

              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Help & Support")}
              >
                <div className="feature-icon green">
                  <i className="fas fa-question-circle"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Help & Support</div>
                  <div className="feature-description">Get assistance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial & Analytics */}
          <div className="feature-section">
            <h2 className="section-title">Financial & Analytics</h2>
            <div className="feature-grid">
              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Billing & Payments")}
              >
                <div className="feature-icon pink">
                  <i className="fas fa-credit-card"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Billing & Payments</div>
                  <div className="feature-description">
                    Invoice & fee tracking
                  </div>
                </div>
              </div>

              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Analytics")}
              >
                <div className="feature-icon blue">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Analytics</div>
                  <div className="feature-description">
                    Performance insights
                  </div>
                </div>
              </div>

              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Team Analytics")}
              >
                <div className="feature-icon purple">
                  <i className="fas fa-users"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Team Analytics</div>
                  <div className="feature-description">
                    Team performance metrics
                  </div>
                </div>
              </div>

              <div
                className="feature-card"
                onClick={() => handleFeatureClick("Time Tracking")}
              >
                <div className="feature-icon orange">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="feature-info">
                  <div className="feature-title">Time Tracking</div>
                  <div className="feature-description">
                    Track billable hours
                  </div>
                </div>
              </div>
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
            <Link to="/team" className="nav-item">
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
            <Link to="/more" className="nav-item active">
              <i className="fas fa-th"></i>
              More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
