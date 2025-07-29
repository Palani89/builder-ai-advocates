import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cases() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Today's");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Add any initialization logic here
  }, []);

  const openSideMenu = () => setSideMenuOpen(true);
  const closeSideMenu = () => setSideMenuOpen(false);

  const logoutFromApp = () => {
    console.log("Logout clicked");
  };

  const viewCaseDetails = (caseId: string) => {
    navigate(`/case-details?id=${caseId}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
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
          <Link to="/cases" className="side-menu-item active">
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
              <h1>Cases</h1>

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
                  <i className="fas fa-file-alt"></i>
                  Cases
                </span>
              </nav>

              <p className="page-subtitle">
                Manage your legal cases and proceedings
              </p>
            </div>

            {/* Action Button */}
            <button
              className="add-case-btn"
              onClick={() => navigate("/create-case")}
            >
              <i className="fas fa-plus"></i>
              Add New Case
            </button>
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              {["Today's", "Upcoming", "Disposed"].map((tab) => (
                <div
                  key={tab}
                  className={`tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="search-container">
            <div className="search-box">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                className="search-input"
                placeholder="Enter Case Number"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Cases List */}
          <div className="cases-list">
            {/* Case 1 */}
            <div className="case-card">
              <div className="case-header">
                <div>
                  <div className="case-title">State vs. John Doe</div>
                  <div className="case-subtitle">
                    Client: John Doe | Opponent: State of Delhi
                  </div>
                </div>
                <div className="case-status">
                  <span className="status-badge active">Active</span>
                  <span className="status-badge criminal">Criminal</span>
                </div>
              </div>

              <div className="case-details">
                <div className="case-detail">
                  <span className="detail-label">Court</span>
                  <span className="detail-value">District Court, Delhi</span>
                </div>
                <div className="case-detail">
                  <span className="detail-label">Judge</span>
                  <span className="detail-value">
                    Hon'ble Justice A.K. Sharma
                  </span>
                </div>
                <div className="case-detail">
                  <span className="detail-label">Next Hearing</span>
                  <span className="detail-value">2024-01-15</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", margin: "1rem 0" }}>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--background)",
                    color: "var(--text-secondary)",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                  }}
                >
                  Bail
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--background)",
                    color: "var(--text-secondary)",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                  }}
                >
                  Section 420
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--background)",
                    color: "var(--text-secondary)",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                  }}
                >
                  Economic Offense
                </span>
              </div>

              <div className="case-actions">
                <button
                  className="action-btn view-btn"
                  onClick={() => viewCaseDetails("1")}
                >
                  View Details
                </button>
                <button className="action-btn update-btn">Update Case</button>
              </div>

              <div className="case-meta">Last updated: 2024-01-10</div>
            </div>

            {/* Case 2 */}
            <div className="case-card">
              <div className="case-header">
                <div>
                  <div className="case-title">Smith Property Dispute</div>
                  <div className="case-subtitle">
                    Client: Mr. Smith | Opponent: ABC Developers
                  </div>
                </div>
                <div className="case-status">
                  <span className="status-badge pending">Pending</span>
                  <span className="status-badge civil">Civil</span>
                </div>
              </div>

              <div className="case-details">
                <div className="case-detail">
                  <span className="detail-label">Court</span>
                  <span className="detail-value">High Court, Delhi</span>
                </div>
                <div className="case-detail">
                  <span className="detail-label">Judge</span>
                  <span className="detail-value">
                    Hon'ble Justice B.K. Patel
                  </span>
                </div>
                <div className="case-detail">
                  <span className="detail-label">Next Hearing</span>
                  <span className="detail-value">2024-01-18</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", margin: "1rem 0" }}>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--background)",
                    color: "var(--text-secondary)",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                  }}
                >
                  Property
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--background)",
                    color: "var(--text-secondary)",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                  }}
                >
                  Civil Suit
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "var(--background)",
                    color: "var(--text-secondary)",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                  }}
                >
                  Injunction
                </span>
              </div>

              <div className="case-actions">
                <button
                  className="action-btn view-btn"
                  onClick={() => viewCaseDetails("2")}
                >
                  View Details
                </button>
                <button className="action-btn update-btn">Update Case</button>
              </div>

              <div className="case-meta">Last updated: 2024-01-08</div>
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
            <Link to="/cases" className="nav-item active">
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
