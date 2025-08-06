import React, { useState, useEffect } from "react";

const GoldApp: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const [showSchemesModal, setShowSchemesModal] = useState(false);

  const showTab = (tabName: string) => {
    const pageMap: { [key: string]: string } = {
      'home': '/goldapp-index.html',
      'invest': '/goldapp-invest.html',
      'chits': '/goldapp-chits.html',
      'goals': '/goldapp-invest.html',
      'portfolio': '/goldapp-portfolio.html',
      'rewards': '/goldapp-invest.html',
      'more': '/goldapp-more.html',
      'transactions': '/goldapp-transactions.html',
      'schemes': '/goldapp-invest.html',
      'savings': '/goldapp-invest.html',
      'profile': '/goldapp-more.html'
    };

    if (pageMap[tabName]) {
      window.location.href = pageMap[tabName];
    }
  };

  const openSchemesModal = () => {
    setShowSchemesModal(true);
  };

  const closeSchemesModal = () => {
    setShowSchemesModal(false);
  };

  const joinScheme = () => {
    alert("Scheme registration functionality will be implemented");
    closeSchemesModal();
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      sessionStorage.clear();
      alert("Logged out successfully!");
      window.location.reload();
    }
  };

  useEffect(() => {
    // Auto-sync animation
    const interval = setInterval(() => {
      const syncIcon = document.querySelector(".sync-icon") as HTMLElement;
      if (syncIcon) {
        syncIcon.style.animation = "none";
        setTimeout(() => {
          syncIcon.style.animation = "spin 1s linear";
        }, 10);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        :root {
          --primary-gold: #ffd700;
          --dark-gold: #b8860b;
          --orange: #ff8c00;
          --orange-light: #ffa500;
          --red: #dc143c;
          --background: #f5f5f5;
          --white: #ffffff;
          --text-dark: #2c2c2c;
          --text-gray: #666666;
          --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Inter", sans-serif;
          background: var(--background);
          color: var(--text-dark);
          line-height: 1.6;
          overflow-x: hidden;
        }

        .goldapp-container {
          min-height: 100vh;
          background: var(--background);
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .goldapp-header {
          background: var(--white);
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: var(--shadow);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .menu-icon {
          width: 30px;
          height: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
        }

        .menu-line {
          width: 100%;
          height: 3px;
          background: var(--orange);
          border-radius: 2px;
        }

        .menu-line:nth-child(2) {
          width: 70%;
        }

        .menu-line:nth-child(3) {
          width: 50%;
        }

        .logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .crown-icon {
          width: 50px;
          height: 40px;
          background: var(--primary-gold);
          border-radius: 50% 50% 0 0;
          position: relative;
          margin-bottom: 5px;
        }

        .crown-icon::before {
          content: "♛";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
          color: var(--dark-gold);
        }

        .logo-text {
          background: var(--red);
          color: var(--white);
          padding: 8px 20px;
          border-radius: 15px;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          line-height: 1.2;
        }

        .logo-subtitle {
          font-size: 11px;
          margin-top: 2px;
        }

        .header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
        }

        .notification-container {
          position: relative;
        }

        .notification-icon {
          background: var(--orange);
          color: var(--white);
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          position: relative;
          cursor: pointer;
        }

        .app-version {
          color: var(--orange);
          font-size: 14px;
          font-weight: 600;
        }

        /* Main Content */
        .goldapp-main-content {
          padding: 0;
          flex: 1;
          overflow-y: auto;
          margin-top: 80px;
          margin-bottom: 100px;
        }

        /* Rates Card */
        .rates-card {
          background: var(--white);
          margin: 20px;
          border-radius: 20px;
          padding: 25px;
          color: var(--text-dark);
          box-shadow: var(--shadow-lg);
          position: relative;
          overflow: hidden;
          border: 1px solid #e5e5e5;
        }

        .last-updated {
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 20px;
          color: #8b4513;
        }

        .metals-container {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .metal-item {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .metal-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          color: var(--white);
          box-shadow: var(--shadow);
        }

        .metal-icon.gold {
          background: #daa520;
        }

        .metal-icon.silver {
          background: #c0c0c0;
          color: var(--text-dark);
        }

        .metal-info h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 2px;
        }

        .metal-price {
          font-size: 24px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 5px;
        }

        .price-arrow {
          color: #22c55e;
          font-size: 18px;
        }

        .metal-subtitle {
          font-size: 12px;
          color: #8b4513;
          font-weight: 500;
          text-align: center;
          margin-top: 15px;
        }

        /* Promotional Banner */
        .promo-banner {
          margin: 20px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          position: relative;
          height: 180px;
          background: linear-gradient(135deg, #f5deb3 0%, #deb887 100%);
        }

        .promo-content {
          display: flex;
          height: 100%;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
        }

        .promo-woman {
          flex: 1;
          height: 140px;
          background: url("https://cdn.builder.io/api/v1/image/assets%2Fb570605fd20a438db2e49eaee45edefa%2F18a6b91fdc5d4b6faba4f8a5a6b18fab?format=webp&width=800")
            center/cover;
          border-radius: 15px;
          margin-right: 20px;
        }

        .promo-circle {
          width: 120px;
          height: 120px;
          background: var(--red);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--white);
          box-shadow: var(--shadow-lg);
        }

        .promo-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--primary-gold);
          text-align: center;
          line-height: 1.2;
        }

        .promo-subtitle {
          font-size: 14px;
          font-weight: 600;
          margin-top: 5px;
        }

        .promo-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin: 15px 0;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d3d3d3;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: var(--orange);
          transform: scale(1.3);
        }

        /* Schemes Section */
        .schemes-section {
          margin: 30px 20px 20px;
        }

        .schemes-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .schemes-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-dark);
        }

        .sync-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-size: 12px;
          color: var(--text-gray);
        }

        .sync-icon {
          color: var(--orange);
          margin-left: 5px;
        }

        .schemes-card {
          background: linear-gradient(
            135deg,
            var(--orange) 0%,
            var(--orange-light) 100%
          );
          border-radius: 20px;
          padding: 30px;
          color: var(--white);
          text-align: center;
          box-shadow: var(--shadow-lg);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .schemes-card::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 70%
          );
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .schemes-message {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }

        .schemes-subtitle {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 25px;
          position: relative;
          z-index: 1;
        }

        .schemes-arrow {
          width: 50px;
          height: 50px;
          border: 2px solid var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .schemes-arrow:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.2);
        }

        .schemes-arrow i {
          font-size: 20px;
        }

        /* Bottom Navigation */
        .goldapp-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #000000;
          border-radius: 25px 25px 0 0;
          padding: 20px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.1);
          z-index: 100;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--white);
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          background: none;
          border: none;
          padding: 10px;
          border-radius: 15px;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .nav-item i {
          font-size: 24px;
          margin-bottom: 5px;
        }

        .nav-item span {
          font-size: 12px;
          font-weight: 500;
        }

        .nav-item.home {
          /* Remove special styling for home */
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-content {
          background: var(--white);
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          width: 100%;
          max-width: 400px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          padding: 25px 25px 0;
          text-align: center;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 10px;
        }

        .modal-subtitle {
          font-size: 14px;
          color: var(--text-gray);
          margin-bottom: 20px;
        }

        .modal-body {
          padding: 20px 25px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 15px;
          border: 2px solid #e5e5e5;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--orange);
          box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.1);
        }

        .modal-footer {
          padding: 0 25px 25px;
          display: flex;
          gap: 15px;
        }

        .btn {
          flex: 1;
          padding: 15px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: var(--orange);
          color: var(--white);
        }

        .btn-primary:hover {
          background: var(--orange-light);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: #f5f5f5;
          color: var(--text-dark);
        }

        .btn-secondary:hover {
          background: #e5e5e5;
        }

        .hidden {
          display: none !important;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .metals-container {
            flex-direction: column;
            gap: 15px;
          }

          .metal-item {
            justify-content: center;
          }

          .promo-content {
            flex-direction: column;
            padding: 15px;
          }

          .promo-woman {
            width: 100%;
            height: 100px;
            margin: 0 0 15px 0;
          }

          .schemes-section {
            margin: 20px 15px 15px;
          }

          .rates-card {
            margin: 15px;
            padding: 20px;
          }

          .promo-banner {
            margin: 15px;
            height: 160px;
          }
        }

        @media (max-width: 480px) {
          .goldapp-header {
            padding: 10px 15px;
          }

          .logo-text {
            font-size: 12px;
            padding: 6px 15px;
          }

          .crown-icon {
            width: 40px;
            height: 32px;
          }

          .metal-price {
            font-size: 20px;
          }

          .schemes-title {
            font-size: 18px;
          }

          .goldapp-bottom-nav {
            padding: 15px;
          }
        }
      `}</style>

      <div className="goldapp-container">
        {/* Header */}
        <div className="goldapp-header">
          <div className="header-left">
            <div className="menu-icon">
              <div className="menu-line"></div>
              <div className="menu-line"></div>
              <div className="menu-line"></div>
            </div>
            <div className="logo-container">
              <div className="crown-icon"></div>
              <div className="logo-text">
                SRI KUMARAN
                <div className="logo-subtitle">JEWELLERS</div>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="notification-container">
              <div className="notification-icon" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i>
              </div>
            </div>
            <div className="app-version">AV:5.0.0</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="goldapp-main-content">
          {/* Rates Card */}
          <div className="rates-card">
            <div className="last-updated">
              Last Updated On : 2025-08-02 10:19:35.103
            </div>

            <div className="metals-container">
              <div className="metal-item">
                <div className="metal-icon gold">AU</div>
                <div className="metal-info">
                  <h3>Gold</h3>
                  <div className="metal-price">
                    ₹ 9290.0
                    <span className="price-arrow">↗</span>
                  </div>
                </div>
              </div>
              <div className="metal-item">
                <div className="metal-icon silver">AG</div>
                <div className="metal-info">
                  <h3>Silver</h3>
                  <div className="metal-price">
                    ₹ 123.0
                    <span className="price-arrow">↗</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="metal-subtitle">22 KT Per Gram</div>
          </div>

          {/* Promotional Banner */}
          <div className="promo-banner">
            <div className="promo-content">
              <div className="promo-woman"></div>
              <div className="promo-circle">
                <div className="promo-title">Aadi</div>
                <div className="promo-title">Special</div>
                <div className="promo-subtitle">Sale</div>
              </div>
            </div>
          </div>

          {/* Promo Dots */}
          <div className="promo-dots">
            <div className="dot"></div>
            <div className="dot active"></div>
            <div className="dot"></div>
          </div>

          {/* Schemes Section */}
          <div className="schemes-section">
            <div className="schemes-header">
              <h2 className="schemes-title">Your Schemes</h2>
              <div className="sync-info">
                <div>Last Sync</div>
                <div>
                  03-Aug-2025 1:55 PM{" "}
                  <i className="fas fa-sync-alt sync-icon"></i>
                </div>
              </div>
            </div>

            <div className="schemes-card" onClick={openSchemesModal}>
              <div className="schemes-message">
                No Digital Savings Plan found.
              </div>
              <div className="schemes-subtitle">Join new plans</div>
              <div className="schemes-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="goldapp-bottom-nav">
          <button className="nav-item" onClick={() => showTab("transactions")}>
            <i className="fas fa-file-alt"></i>
            <span>History</span>
          </button>
          <button className="nav-item" onClick={() => showTab("schemes")}>
            <i className="fas fa-chart-bar"></i>
            <span>Schemes</span>
          </button>
          <button className="nav-item home" onClick={() => showTab("home")}>
            <i className="fas fa-home"></i>
            <span>Home</span>
          </button>
          <button className="nav-item" onClick={() => showTab("savings")}>
            <i className="fas fa-piggy-bank"></i>
            <span>Savings</span>
          </button>
          <button className="nav-item" onClick={() => showTab("profile")}>
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </button>
        </div>
      </div>

      {/* Schemes Modal */}
      {showSchemesModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeSchemesModal();
            }
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Join Digital Savings Plan</h3>
              <p className="modal-subtitle">
                Start your journey towards financial growth
              </p>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Investment Amount</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter amount (min ₹500)"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeSchemesModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={joinScheme}>
                Join Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GoldApp;
