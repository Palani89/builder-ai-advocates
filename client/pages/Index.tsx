import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [currentMonth, setCurrentMonth] = useState("January 2024");
  const [selectedDate, setSelectedDate] = useState("January 15, 2024");
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("hearings");

  useEffect(() => {
    // Add event listeners when component mounts
    const handleMenuClick = () => setSideMenuOpen(true);
    const handleOverlayClick = () => setSideMenuOpen(false);
    
    return () => {
      // Cleanup event listeners
    };
  }, []);

  const openSideMenu = () => setSideMenuOpen(true);
  const closeSideMenu = () => setSideMenuOpen(false);

  const handleDayClick = (day: number) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const currentMonthName = currentMonth.split(" ")[0];
    const currentYear = currentMonth.split(" ")[1];
    setSelectedDate(`${currentMonthName} ${day}, ${currentYear}`);
  };

  const previousMonth = () => {
    // Add previous month logic
    console.log("Previous month");
  };

  const nextMonth = () => {
    // Add next month logic
    console.log("Next month");
  };

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
          <Link to="/team" className="side-menu-item">
            <i className="fas fa-users side-menu-icon"></i>
            My Team
          </Link>
          <Link to="/cases" className="side-menu-item">
            <i className="fas fa-file-alt side-menu-icon"></i>
            Cases
          </Link>
          <Link to="/calendar" className="side-menu-item active">
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
          {/* Calendar Section */}
          <div className="calendar-section">
            <div className="page-header">
              <div className="page-title-section">
                <h1>Calendar</h1>

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
                  <i className="fas fa-calendar"></i>
                  Calendar
                </span>
              </nav>

                <p className="page-subtitle">Hearings & Appointments</p>
              </div>
            </div>

            {/* Calendar Navigation */}
            <div className="calendar-nav">
              <div className="month-nav">
                <button className="nav-btn" onClick={previousMonth}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="month-year">{currentMonth}</div>
                <button className="nav-btn" onClick={nextMonth}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              <div className="calendar-actions">
                <button className="action-btn create-appointment-btn">
                  Create Appointment
                </button>
                <button className="action-btn create-hearing-btn">
                  Create Hearings
                </button>
              </div>
            </div>

            {/* Calendar Note */}
            <div
              className="calendar-note"
              style={{
                textAlign: 'center',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}
            >
              Click on any date to view or add hearings
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
              {/* Calendar Headers */}
              <div className="calendar-header">Sun</div>
              <div className="calendar-header">Mon</div>
              <div className="calendar-header">Tue</div>
              <div className="calendar-header">Wed</div>
              <div className="calendar-header">Thu</div>
              <div className="calendar-header">Fri</div>
              <div className="calendar-header">Sat</div>

              {/* Calendar Days */}
              <div className="calendar-day other-month">
                <div className="day-number">31</div>
              </div>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(day => (
                <div key={day} className="calendar-day" onClick={() => handleDayClick(day)}>
                  <div className="day-number">{day}</div>
                </div>
              ))}
              <div className="calendar-day selected" onClick={() => handleDayClick(15)}>
                <div className="day-number">15</div>
                <div className="day-events">
                  <div className="event-dot hearing"></div>
                </div>
              </div>
              <div className="calendar-day" onClick={() => handleDayClick(16)}>
                <div className="day-number">16</div>
                <div className="day-events">
                  <div className="event-dot"></div>
                  <div className="event-dot appointment"></div>
                </div>
              </div>
              <div className="calendar-day" onClick={() => handleDayClick(17)}>
                <div className="day-number">17</div>
                <div className="day-events">
                  <div className="event-dot"></div>
                </div>
              </div>
              {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(day => (
                <div key={day} className="calendar-day" onClick={() => handleDayClick(day)}>
                  <div className="day-number">{day}</div>
                  {day === 19 && (
                    <div className="day-events">
                      <div className="event-dot"></div>
                    </div>
                  )}
                </div>
              ))}
              <div className="calendar-day other-month">
                <div className="day-number">1</div>
              </div>
              <div className="calendar-day other-month">
                <div className="day-number">2</div>
              </div>
              <div className="calendar-day other-month">
                <div className="day-number">3</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Today's Events */}
            <div className="sidebar-section">
              <div className="sidebar-header">
                <div className="sidebar-title">Hearings</div>
                <div className="date-info">{selectedDate}</div>
              </div>

              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'hearings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('hearings')}
                >
                  Hearings
                </button>
                <button 
                  className={`tab ${activeTab === 'appointments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('appointments')}
                >
                  Appointments
                </button>
              </div>

              <div className="event-list">
                {/* Event 1 */}
                <div className="event-item confirmed">
                  <div className="event-header">
                    <div className="event-title">State vs. John Doe</div>
                    <span className="event-status confirmed">Confirmed</span>
                  </div>
                  <div className="event-time">
                    <i className="fas fa-clock"></i>
                    10:30 AM
                  </div>
                  <div className="event-location">
                    <i className="fas fa-map-marker-alt"></i>
                    District Court Room 3
                  </div>
                  <div className="event-judge">Hon'ble Justice A.K. Sharma</div>
                  <span className="event-type">Criminal</span>
                  <div className="event-actions">
                    <button className="details-btn">Details</button>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="event-item tentative">
                  <div className="event-header">
                    <div className="event-title">Smith Property Dispute</div>
                    <span className="event-status tentative">Tentative</span>
                  </div>
                  <div className="event-time">
                    <i className="fas fa-clock"></i>
                    2:00 PM
                  </div>
                  <div className="event-location">
                    <i className="fas fa-map-marker-alt"></i>
                    High Court Room 12
                  </div>
                  <div className="event-judge">Hon'ble Justice B.K. Patel</div>
                  <span className="event-type">Civil</span>
                  <div className="event-actions">
                    <button className="details-btn">Details</button>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="event-item confirmed">
                  <div className="event-header">
                    <div className="event-title">ABC Corp Merger</div>
                    <span className="event-status confirmed">Confirmed</span>
                  </div>
                  <div className="event-time">
                    <i className="fas fa-clock"></i>
                    11:00 AM
                  </div>
                  <div className="event-location">
                    <i className="fas fa-map-marker-alt"></i>
                    NCLT Chamber 2
                  </div>
                  <div className="event-judge">Hon'ble Justice C.R. Singh</div>
                  <span className="event-type">Corporate</span>
                  <div className="event-actions">
                    <button className="details-btn">Details</button>
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
            <Link to="/calendar" className="nav-item active">
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
