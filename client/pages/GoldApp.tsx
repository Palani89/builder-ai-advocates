import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BuyGoldModal from "../components/goldapp/BuyGoldModal";

export default function GoldApp() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [totalGoldHolding] = useState(12.45); // grams
  const [currentGoldRate] = useState(6250); // per gram
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [totalValue] = useState(77812.5);
  const [todaySavings] = useState(45.50);
  const [monthlyTarget] = useState(5000);
  const [currentProgress] = useState(3240);
  const [buyModalOpen, setBuyModalOpen] = useState(false);

  const openSideMenu = () => setSideMenuOpen(true);
  const closeSideMenu = () => setSideMenuOpen(false);

  const logoutFromApp = () => {
    console.log("Logout clicked");
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="gold-main-section">
            {/* Portfolio Overview */}
            <div className="portfolio-overview">
              <div className="portfolio-card main-card">
                <div className="portfolio-header">
                  <div className="portfolio-icon">
                    <i className="fas fa-coins"></i>
                  </div>
                  <div className="portfolio-info">
                    <h3>Total Portfolio Value</h3>
                    <div className="portfolio-value">₹{totalValue.toLocaleString()}</div>
                    <div className="portfolio-details">
                      <span>{totalGoldHolding}g Gold • ₹{currentGoldRate}/g</span>
                      <span className="profit-indicator positive">+₹1,240 (1.6%)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="quick-stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-piggy-bank"></i>
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">₹{todaySavings}</div>
                    <div className="stat-label">Today's Savings</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{Math.round((currentProgress / monthlyTarget) * 100)}%</div>
                    <div className="stat-label">Monthly Target</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-repeat"></i>
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">3</div>
                    <div className="stat-label">Active SIPs</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Rates */}
            <div className="live-rates-section">
              <div className="section-header">
                <h4>Live Metal Rates</h4>
                <span className="refresh-time">Updated 2 mins ago</span>
              </div>
              <div className="rates-grid">
                <div className="rate-card gold">
                  <div className="rate-metal">
                    <i className="fas fa-coins"></i>
                    <span>Gold</span>
                  </div>
                  <div className="rate-price">₹{currentGoldRate}/g</div>
                  <div className="rate-change positive">+₹25 (0.4%)</div>
                </div>
                <div className="rate-card silver">
                  <div className="rate-metal">
                    <i className="fas fa-circle"></i>
                    <span>Silver</span>
                  </div>
                  <div className="rate-price">₹75.50/g</div>
                  <div className="rate-change negative">-₹1.20 (-1.6%)</div>
                </div>
                <div className="rate-card platinum">
                  <div className="rate-metal">
                    <i className="fas fa-gem"></i>
                    <span>Platinum</span>
                  </div>
                  <div className="rate-price">₹2,845/g</div>
                  <div className="rate-change positive">+₹15 (0.5%)</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
              <div className="section-header">
                <h4>Quick Actions</h4>
              </div>
              <div className="actions-grid">
                <button className="action-card buy" onClick={() => setBuyModalOpen(true)}>
                  <div className="action-icon">
                    <i className="fas fa-plus"></i>
                  </div>
                  <div className="action-info">
                    <div className="action-title">Buy Gold</div>
                    <div className="action-subtitle">One-time purchase</div>
                  </div>
                </button>
                <button className="action-card sip">
                  <div className="action-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="action-info">
                    <div className="action-title">Start SIP</div>
                    <div className="action-subtitle">Recurring investment</div>
                  </div>
                </button>
                <button className="action-card redeem">
                  <div className="action-icon">
                    <i className="fas fa-arrow-down"></i>
                  </div>
                  <div className="action-info">
                    <div className="action-title">Redeem</div>
                    <div className="action-subtitle">Sell your gold</div>
                  </div>
                </button>
                <button className="action-card chit">
                  <div className="action-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="action-info">
                    <div className="action-title">Gold Chits</div>
                    <div className="action-subtitle">Group savings</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Auto Save Status */}
            <div className="auto-save-section">
              <div className="auto-save-card">
                <div className="auto-save-header">
                  <div className="auto-save-info">
                    <h4>Smart Auto-Save</h4>
                    <p>Round-off spare change to ₹10</p>
                  </div>
                  <div className="toggle-container">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={autoSaveEnabled}
                        onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                <div className="auto-save-stats">
                  <div className="save-stat">
                    <span className="save-label">This Week</span>
                    <span className="save-value">₹285</span>
                  </div>
                  <div className="save-stat">
                    <span className="save-label">This Month</span>
                    <span className="save-value">₹1,240</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="recent-transactions-section">
              <div className="section-header">
                <h4>Recent Activity</h4>
                <Link to="#" className="view-all-link">View All</Link>
              </div>
              <div className="transactions-list">
                <div className="transaction-item">
                  <div className="transaction-icon buy">
                    <i className="fas fa-plus"></i>
                  </div>
                  <div className="transaction-info">
                    <div className="transaction-title">Gold Purchase</div>
                    <div className="transaction-subtitle">Auto-save • 0.25g</div>
                  </div>
                  <div className="transaction-amount">₹1,562.50</div>
                </div>
                <div className="transaction-item">
                  <div className="transaction-icon sip">
                    <i className="fas fa-calendar"></i>
                  </div>
                  <div className="transaction-info">
                    <div className="transaction-title">SIP Investment</div>
                    <div className="transaction-subtitle">Monthly SIP • 0.80g</div>
                  </div>
                  <div className="transaction-amount">₹5,000.00</div>
                </div>
                <div className="transaction-item">
                  <div className="transaction-icon referral">
                    <i className="fas fa-gift"></i>
                  </div>
                  <div className="transaction-info">
                    <div className="transaction-title">Referral Bonus</div>
                    <div className="transaction-subtitle">Friend joined • 0.02g</div>
                  </div>
                  <div className="transaction-amount">₹125.00</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "portfolio":
        return (
          <div className="portfolio-section">
            <div className="portfolio-header-section">
              <h2>My Portfolio</h2>
              <div className="portfolio-summary">
                <div className="summary-card total">
                  <div className="summary-label">Total Value</div>
                  <div className="summary-value">₹{totalValue.toLocaleString()}</div>
                  <div className="summary-change positive">+₹1,240 (1.6%)</div>
                </div>
              </div>
            </div>

            <div className="holdings-section">
              <h3>Holdings Breakdown</h3>
              <div className="holdings-list">
                <div className="holding-item">
                  <div className="holding-metal">
                    <div className="holding-icon gold">
                      <i className="fas fa-coins"></i>
                    </div>
                    <div className="holding-info">
                      <div className="holding-name">Gold</div>
                      <div className="holding-quantity">{totalGoldHolding}g</div>
                    </div>
                  </div>
                  <div className="holding-value">
                    <div className="holding-amount">₹{(totalGoldHolding * currentGoldRate).toLocaleString()}</div>
                    <div className="holding-percentage">98.5%</div>
                  </div>
                </div>
                <div className="holding-item">
                  <div className="holding-metal">
                    <div className="holding-icon silver">
                      <i className="fas fa-circle"></i>
                    </div>
                    <div className="holding-info">
                      <div className="holding-name">Silver</div>
                      <div className="holding-quantity">15.2g</div>
                    </div>
                  </div>
                  <div className="holding-value">
                    <div className="holding-amount">₹1,148</div>
                    <div className="holding-percentage">1.5%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="investments-section">
              <h3>Active Investments</h3>
              <div className="investments-list">
                <div className="investment-item">
                  <div className="investment-header">
                    <div className="investment-type">
                      <i className="fas fa-calendar-alt"></i>
                      <span>Monthly SIP</span>
                    </div>
                    <div className="investment-status active">Active</div>
                  </div>
                  <div className="investment-details">
                    <div className="investment-amount">₹5,000/month</div>
                    <div className="investment-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "45%" }}></div>
                      </div>
                      <div className="progress-text">9 of 20 months</div>
                    </div>
                  </div>
                </div>
                <div className="investment-item">
                  <div className="investment-header">
                    <div className="investment-type">
                      <i className="fas fa-users"></i>
                      <span>Gold Chit #1245</span>
                    </div>
                    <div className="investment-status active">Active</div>
                  </div>
                  <div className="investment-details">
                    <div className="investment-amount">₹2,000/month</div>
                    <div className="investment-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "25%" }}></div>
                      </div>
                      <div className="progress-text">3 of 12 months</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="goals-section">
              <h3>Savings Goals</h3>
              <div className="goals-list">
                <div className="goal-item">
                  <div className="goal-header">
                    <div className="goal-icon">💍</div>
                    <div className="goal-info">
                      <div className="goal-name">Wedding Ring</div>
                      <div className="goal-target">Target: 10g Gold</div>
                    </div>
                  </div>
                  <div className="goal-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: "70%" }}></div>
                    </div>
                    <div className="progress-text">7g / 10g (70%)</div>
                  </div>
                </div>
                <div className="goal-item">
                  <div className="goal-header">
                    <div className="goal-icon">🏠</div>
                    <div className="goal-info">
                      <div className="goal-name">Home Down Payment</div>
                      <div className="goal-target">Target: 50g Gold</div>
                    </div>
                  </div>
                  <div className="goal-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: "25%" }}></div>
                    </div>
                    <div className="progress-text">12.5g / 50g (25%)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "transactions":
        return (
          <div className="transactions-section">
            <div className="transactions-header">
              <h2>Transaction History</h2>
              <div className="filter-tabs">
                <button className="filter-tab active">All</button>
                <button className="filter-tab">Buy</button>
                <button className="filter-tab">Sell</button>
                <button className="filter-tab">SIP</button>
              </div>
            </div>

            <div className="transactions-list-full">
              <div className="transaction-item-full">
                <div className="transaction-date">Today</div>
                <div className="transaction-details">
                  <div className="transaction-icon buy">
                    <i className="fas fa-plus"></i>
                  </div>
                  <div className="transaction-info">
                    <div className="transaction-title">Gold Purchase</div>
                    <div className="transaction-subtitle">Auto-save • UPI Payment</div>
                  </div>
                  <div className="transaction-amount-details">
                    <div className="transaction-amount">₹1,562.50</div>
                    <div className="transaction-quantity">0.25g</div>
                  </div>
                </div>
              </div>

              <div className="transaction-item-full">
                <div className="transaction-date">Yesterday</div>
                <div className="transaction-details">
                  <div className="transaction-icon sip">
                    <i className="fas fa-calendar"></i>
                  </div>
                  <div className="transaction-info">
                    <div className="transaction-title">SIP Investment</div>
                    <div className="transaction-subtitle">Monthly Gold SIP</div>
                  </div>
                  <div className="transaction-amount-details">
                    <div className="transaction-amount">₹5,000.00</div>
                    <div className="transaction-quantity">0.80g</div>
                  </div>
                </div>
              </div>

              <div className="transaction-item-full">
                <div className="transaction-date">2 days ago</div>
                <div className="transaction-details">
                  <div className="transaction-icon buy">
                    <i className="fas fa-plus"></i>
                  </div>
                  <div className="transaction-info">
                    <div className="transaction-title">One-time Purchase</div>
                    <div className="transaction-subtitle">Debit Card Payment</div>
                  </div>
                  <div className="transaction-amount-details">
                    <div className="transaction-amount">₹10,000.00</div>
                    <div className="transaction-quantity">1.60g</div>
                  </div>
                </div>
              </div>

              <div className="transaction-item-full">
                <div className="transaction-date">5 days ago</div>
                <div className="transaction-details">
                  <div className="transaction-icon sell">
                    <i className="fas fa-minus"></i>
                  </div>
                  <div className="transaction-info">
                    <div className="transaction-title">Gold Redemption</div>
                    <div className="transaction-subtitle">Bank Transfer</div>
                  </div>
                  <div className="transaction-amount-details">
                    <div className="transaction-amount">₹3,125.00</div>
                    <div className="transaction-quantity">0.50g</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "more":
        return (
          <div className="more-section">
            <div className="more-categories">
              <div className="category-section">
                <h3>Investments</h3>
                <div className="more-options">
                  <div className="more-option">
                    <div className="option-icon">
                      <i className="fas fa-bullseye"></i>
                    </div>
                    <div className="option-info">
                      <div className="option-title">Savings Goals</div>
                      <div className="option-subtitle">Create targeted savings</div>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                  <div className="more-option">
                    <div className="option-icon">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="option-info">
                      <div className="option-title">Gold Chits</div>
                      <div className="option-subtitle">Join group savings</div>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                  <div className="more-option">
                    <div className="option-icon">
                      <i className="fas fa-shopping-bag"></i>
                    </div>
                    <div className="option-info">
                      <div className="option-title">Gold Shop</div>
                      <div className="option-subtitle">Buy jewelry & coins</div>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
              </div>

              <div className="category-section">
                <h3>Account</h3>
                <div className="more-options">
                  <div className="more-option">
                    <div className="option-icon">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="option-info">
                      <div className="option-title">Profile</div>
                      <div className="option-subtitle">Manage your profile</div>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                  <div className="more-option">
                    <div className="option-icon">
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <div className="option-info">
                      <div className="option-title">KYC Documents</div>
                      <div className="option-subtitle">Verify your identity</div>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                  <div className="more-option">
                    <div className="option-icon">
                      <i className="fas fa-university"></i>
                    </div>
                    <div className="option-info">
                      <div className="option-title">Bank Details</div>
                      <div className="option-subtitle">Manage linked accounts</div>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
              </div>

              <div className="category-section">
                <h3>Tools</h3>
                <div className="more-options">
                  <div className="more-option">
                    <div className="option-icon">
                      <i className="fas fa-share-alt"></i>
                    </div>
                    <div className="option-info">
                      <div className="option-title">Refer & Earn</div>
                      <div className="option-subtitle">Invite friends & get gold</div>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                  <div className="more-option">
                    <div className="option-icon">
                      <i className="fas fa-calculator"></i>
                    </div>
                    <div className="option-info">
                      <div className="option-title">SIP Calculator</div>
                      <div className="option-subtitle">Plan your investments</div>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                  <div className="more-option">
                    <div className="option-icon">
                      <i className="fas fa-certificate"></i>
                    </div>
                    <div className="option-info">
                      <div className="option-title">Certificates</div>
                      <div className="option-subtitle">Download purchase certificates</div>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
              </div>

              <div className="category-section">
                <h3>Support</h3>
                <div className="more-options">
                  <div className="more-option">
                    <div className="option-icon">
                      <i className="fas fa-headset"></i>
                    </div>
                    <div className="option-info">
                      <div className="option-title">Help & Support</div>
                      <div className="option-subtitle">Get help & contact us</div>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                  <div className="more-option">
                    <div className="option-icon">
                      <i className="fas fa-question-circle"></i>
                    </div>
                    <div className="option-info">
                      <div className="option-title">FAQs</div>
                      <div className="option-subtitle">Common questions</div>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                  <div className="more-option">
                    <div className="option-icon">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <div className="option-info">
                      <div className="option-title">Security</div>
                      <div className="option-subtitle">Privacy & security settings</div>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
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
            <div className="logo-icon" style={{ background: "#FFD700" }}>
              <i className="fas fa-coins"></i>
            </div>
            <div>
              <span className="logo-text">GoldApp</span>
              <div className="side-menu-subtitle">
                Digital Gold Investment
              </div>
            </div>
          </div>
          <button className="side-menu-close" onClick={closeSideMenu}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <nav className="side-menu-nav">
          <button 
            className={`side-menu-item ${activeTab === "home" ? "active" : ""}`}
            onClick={() => {setActiveTab("home"); closeSideMenu();}}
          >
            <i className="fas fa-home side-menu-icon"></i>
            Home
          </button>
          <button 
            className={`side-menu-item ${activeTab === "portfolio" ? "active" : ""}`}
            onClick={() => {setActiveTab("portfolio"); closeSideMenu();}}
          >
            <i className="fas fa-chart-pie side-menu-icon"></i>
            Portfolio
          </button>
          <button 
            className={`side-menu-item ${activeTab === "transactions" ? "active" : ""}`}
            onClick={() => {setActiveTab("transactions"); closeSideMenu();}}
          >
            <i className="fas fa-exchange-alt side-menu-icon"></i>
            Transactions
          </button>
          <button 
            className={`side-menu-item ${activeTab === "more" ? "active" : ""}`}
            onClick={() => {setActiveTab("more"); closeSideMenu();}}
          >
            <i className="fas fa-th side-menu-icon"></i>
            More
          </button>
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
              <div className="logo-icon" style={{ background: "#FFD700" }}>
                <i className="fas fa-coins"></i>
              </div>
              <span className="logo-text">GoldApp</span>
            </div>
          </div>
          <div className="header-right">
            <button className="notification-icon">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">2</span>
            </button>
            <div className="user-avatar">G</div>
            <button className="notification-icon" onClick={logoutFromApp}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content gold-app-content">
          {renderMainContent()}
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <div className="nav-items">
            <button 
              className={`nav-item ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              <i className="fas fa-home"></i>
              Home
            </button>
            <button 
              className={`nav-item ${activeTab === "portfolio" ? "active" : ""}`}
              onClick={() => setActiveTab("portfolio")}
            >
              <i className="fas fa-chart-pie"></i>
              Portfolio
            </button>
            <button 
              className={`nav-item ${activeTab === "transactions" ? "active" : ""}`}
              onClick={() => setActiveTab("transactions")}
            >
              <i className="fas fa-exchange-alt"></i>
              Transactions
            </button>
            <button 
              className={`nav-item ${activeTab === "more" ? "active" : ""}`}
              onClick={() => setActiveTab("more")}
            >
              <i className="fas fa-th"></i>
              More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
