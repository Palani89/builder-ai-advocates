import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function CaseDetails() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const caseId = searchParams.get("id") || "1";

  // Sample hearings data
  const [hearingsData, setHearingsData] = useState([
    {
      id: 1,
      date: "2024-01-15T10:30:00",
      courtName: "District Court, Delhi",
      courtRoom: "Court Room 7",
      judgeName: "Hon'ble Justice A.K. Sharma",
      hearingType: "Bail",
      caseStage: "Pre-trial",
      status: "scheduled",
      appearedBy: "Priya Sharma",
      notes: "Bail application to be presented",
      documentsDiscussed: "Bail application, Surety documents",
      aiSummary: "",
      nextHearingDate: ""
    },
    {
      id: 2,
      date: "2024-01-18T14:00:00",
      courtName: "District Court, Delhi",
      courtRoom: "Court Room 5",
      judgeName: "Hon'ble Justice B.K. Patel",
      hearingType: "Evidence",
      caseStage: "Trial",
      status: "scheduled",
      appearedBy: "Amit Jain",
      notes: "Witness examination scheduled",
      documentsDiscussed: "Evidence files, Witness statements",
      aiSummary: "",
      nextHearingDate: ""
    },
    {
      id: 3,
      date: "2023-12-20T11:00:00",
      courtName: "District Court, Delhi",
      courtRoom: "Court Room 7",
      judgeName: "Hon'ble Justice A.K. Sharma",
      hearingType: "Status",
      caseStage: "Pre-trial",
      status: "completed",
      appearedBy: "Priya Sharma",
      notes: "Initial hearing completed. Case registered successfully. Next hearing for bail application scheduled.",
      documentsDiscussed: "FIR copy, Complaint application, Legal notice",
      aiSummary: "First hearing conducted successfully. Court registered the case and scheduled next hearing for bail application.",
      nextHearingDate: "2024-01-15T10:30:00"
    }
  ]);

  const [chatMessages, setChatMessages] = useState([
    {
      type: "ai",
      text: "Hello! I'm your AI assistant for this case. I can help you with legal research, draft arguments, suggest case strategies, and analyze documents. What would you like to discuss about \"State vs. John Doe\"?",
      time: "Just now"
    }
  ]);

  const [chatInput, setChatInput] = useState("");
  const [showAddHearingModal, setShowAddHearingModal] = useState(false);

  useEffect(() => {
    loadCaseDetails();
    loadHearings();
    loadDocuments();
    loadTimeline();
  }, [caseId]);

  const loadCaseDetails = () => {
    // Load case details based on caseId
    console.log(`Loading case details for case ${caseId}`);
  };

  const loadHearings = () => {
    // Filter hearings and populate UI
    const now = new Date();
    const upcoming = hearingsData.filter(hearing => new Date(hearing.date) > now);
    const past = hearingsData.filter(hearing => new Date(hearing.date) <= now);
    
    console.log("Upcoming hearings:", upcoming.length);
    console.log("Past hearings:", past.length);
  };

  const loadDocuments = () => {
    // Load documents for this case
    console.log("Loading documents");
  };

  const loadTimeline = () => {
    // Load case timeline
    console.log("Loading timeline");
  };

  const switchTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  const createHearingCard = (hearing: any) => {
    const hearingDate = new Date(hearing.date);
    const formattedDate = hearingDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = hearingDate.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <div key={hearing.id} className="hearing-item">
        <div className="hearing-header">
          <div>
            <div className="hearing-date">{formattedDate}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{formattedTime}</div>
          </div>
          <span className={`hearing-status ${hearing.status}`}>{hearing.status}</span>
        </div>
        
        <div className="hearing-info">
          <div className="hearing-detail">
            <div className="hearing-label">Court</div>
            <div className="hearing-value">{hearing.courtName}</div>
          </div>
          <div className="hearing-detail">
            <div className="hearing-label">Room</div>
            <div className="hearing-value">{hearing.courtRoom || 'N/A'}</div>
          </div>
          <div className="hearing-detail">
            <div className="hearing-label">Judge</div>
            <div className="hearing-value">{hearing.judgeName || 'N/A'}</div>
          </div>
          <div className="hearing-detail">
            <div className="hearing-label">Type</div>
            <div className="hearing-value">{hearing.hearingType || 'N/A'}</div>
          </div>
        </div>
        
        {hearing.notes && <div className="hearing-notes">{hearing.notes}</div>}
        
        <div className="hearing-actions">
          <button className="action-btn edit" onClick={() => editHearing(hearing.id)}>
            <i className="fas fa-edit"></i> Edit
          </button>
          <button className="action-btn view" onClick={() => viewHearingDetails(hearing.id)}>
            <i className="fas fa-eye"></i> View Details
          </button>
        </div>
      </div>
    );
  };

  const editHearing = (hearingId: number) => {
    console.log(`Edit hearing ${hearingId}`);
  };

  const viewHearingDetails = (hearingId: number) => {
    const hearing = hearingsData.find(h => h.id === hearingId);
    if (hearing) {
      alert(`Viewing details for hearing ${hearingId}`);
    }
  };

  const openAddHearingModal = () => {
    setShowAddHearingModal(true);
  };

  const closeAddHearingModal = () => {
    setShowAddHearingModal(false);
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      // Add user message
      const userMessage = {
        type: "user",
        text: chatInput,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, userMessage]);
      setChatInput("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = generateAIResponse(chatInput);
        const aiMessage = {
          type: "ai",
          text: aiResponse,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const sendQuickMessage = (action: string) => {
    setChatInput(action);
    sendMessage();
  };

  const generateAIResponse = (userInput: string) => {
    if (userInput.toLowerCase().includes('bail')) {
      return 'Regarding bail prospects: Based on the Section 420 charges, courts typically consider factors like flight risk, criminal history, and community ties. Given the clean record and cooperation shown, I\'d recommend preparing strong surety documentation and character references.';
    } else if (userInput.toLowerCase().includes('evidence')) {
      return 'For evidence analysis: The case appears to rely heavily on documentary evidence and witness testimony. I\'ve reviewed the FIR and related documents. The prosecution\'s case has some gaps we can exploit.';
    } else {
      return `I understand you're asking about "${userInput}". Based on the case details for State vs. John Doe, I can provide specific analysis and recommendations. Could you be more specific about what aspect you'd like me to focus on?`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Filter hearings for display
  const now = new Date();
  const upcomingHearings = hearingsData.filter(hearing => new Date(hearing.date) > now);
  const pastHearings = hearingsData.filter(hearing => new Date(hearing.date) <= now);

  return (
    <div className="app-container">
      <div className="app-content">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-info">
            <nav className="breadcrumb">
              <span className="breadcrumb-item">Dashboard</span>
              <span className="breadcrumb-item">Cases</span>
              <span className="breadcrumb-item">
                <i className="fas fa-eye"></i>
                Case Details
              </span>
            </nav>

            <p className="page-subtitle">
              Complete case information and proceedings
            </p>
          </div>

          <div className="page-actions">
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/cases')}
            >
              <i className="fas fa-arrow-left"></i>
              Back to Cases
            </button>
            <button className="btn btn-warning">
              <i className="fas fa-edit"></i>
              Edit Case
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-plus"></i>
              Add Update
            </button>
          </div>
        </div>

        {/* Case Header Card */}
        <div className="case-header-card">
          <div className="case-title-section">
            <h2 className="case-title">State vs. John Doe</h2>
            <p className="case-subtitle">
              Client: John Doe | Opponent: State of Delhi
            </p>

            <div className="case-status-row">
              <span className="status-badge active">Active</span>
              <span className="status-badge criminal">Criminal</span>
              <div className="tags-container">
                <span className="tag">Bail Application</span>
                <span className="tag">Section 420</span>
                <span className="tag">Economic Offense</span>
              </div>
            </div>
          </div>

          <div className="case-quick-info">
            <div className="quick-info-item">
              <span className="info-label">Case Number</span>
              <span className="info-value">CC/1234/2024</span>
            </div>
            <div className="quick-info-item">
              <span className="info-label">Court</span>
              <span className="info-value">District Court, Delhi</span>
            </div>
            <div className="quick-info-item">
              <span className="info-label">Judge</span>
              <span className="info-value">Hon'ble Justice A.K. Sharma</span>
            </div>
            <div className="quick-info-item">
              <span className="info-label">Next Hearing</span>
              <span className="info-value">January 15, 2024</span>
            </div>
            <div className="quick-info-item">
              <span className="info-label">Filed Date</span>
              <span className="info-value">December 20, 2023</span>
            </div>
            <div className="quick-info-item">
              <span className="info-label">Senior Advocate</span>
              <span className="info-value">Priya Sharma</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <div className="tab-buttons">
            {["overview", "hearings", "documents", "timeline", "ai-assistant"].map((tab) => (
              <button 
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`} 
                onClick={() => switchTab(tab)}
              >
                {tab === "ai-assistant" ? "AI Assistant" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="tab-pane active">
              <div className="content-container">
                {/* Main Details Column */}
                <div className="main-details">
                  {/* Case Information */}
                  <div className="detail-section">
                    <div className="section-header">
                      <i className="fas fa-info-circle section-icon"></i>
                      <h3 className="section-title">Case Information</h3>
                    </div>
                    <div className="section-content">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Case Type</span>
                          <span className="detail-value">Criminal</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Jurisdiction</span>
                          <span className="detail-value">Delhi East</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Police Station</span>
                          <span className="detail-value">Laxmi Nagar PS</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">FIR Number</span>
                          <span className="detail-value">FIR/456/2023</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">IPC Sections</span>
                          <span className="detail-value">420, 406, 34</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Stage</span>
                          <span className="detail-value">Trial Stage</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Case Summary */}
                  <div className="detail-section">
                    <div className="section-header">
                      <i className="fas fa-file-text section-icon"></i>
                      <h3 className="section-title">Case Summary</h3>
                    </div>
                    <div className="section-content">
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        The case involves allegations of cheating and criminal breach
                        of trust against the accused John Doe. The complainant alleges
                        that the accused fraudulently obtained Rs. 5,00,000 by
                        promising to deliver construction materials for a residential
                        project but failed to deliver as per the agreement.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="sidebar">
                  {/* Team Assignment */}
                  <div className="detail-section">
                    <div className="section-header">
                      <i className="fas fa-user-friends section-icon"></i>
                      <h3 className="section-title">Team Assignment</h3>
                    </div>
                    <div className="section-content">
                      <div className="detail-item" style={{ marginBottom: '1rem' }}>
                        <span className="detail-label">Senior Advocate</span>
                        <span className="detail-value">Priya Sharma</span>
                      </div>
                      <div className="detail-item" style={{ marginBottom: '1rem' }}>
                        <span className="detail-label">Junior Advocates</span>
                        <span className="detail-value">Amit Jain, Neha Gupta</span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Information */}
                  <div className="detail-section">
                    <div className="section-header">
                      <i className="fas fa-rupee-sign section-icon"></i>
                      <h3 className="section-title">Financial Details</h3>
                    </div>
                    <div className="section-content">
                      <div className="detail-item" style={{ marginBottom: '1rem' }}>
                        <span className="detail-label">Total Fee</span>
                        <span className="detail-value">₹2,50,000</span>
                      </div>
                      <div className="detail-item" style={{ marginBottom: '1rem' }}>
                        <span className="detail-label">Amount Paid</span>
                        <span className="detail-value">₹1,50,000</span>
                      </div>
                      <div className="detail-item" style={{ marginBottom: '1rem' }}>
                        <span className="detail-label">Balance Due</span>
                        <span className="detail-value" style={{ color: 'var(--error)' }}>₹1,00,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hearings Tab */}
          {activeTab === "hearings" && (
            <div className="tab-pane active">
              <div className="hearings-container">
                <div className="hearings-header">
                  <h2>Case Hearings</h2>
                  <button className="btn btn-primary" onClick={openAddHearingModal}>
                    <i className="fas fa-plus"></i>
                    Add Hearing
                  </button>
                </div>

                <div className="hearings-grid">
                  {/* Upcoming Hearings */}
                  <div className="hearings-section">
                    <h3 className="section-title">
                      <i className="fas fa-calendar-plus"></i>
                      Upcoming Hearings
                    </h3>
                    <div className="hearings-list">
                      {upcomingHearings.length === 0 ? (
                        <div className="empty-state">
                          <i className="fas fa-calendar-alt"></i>
                          <p>No upcoming hearings scheduled</p>
                        </div>
                      ) : (
                        upcomingHearings.map(hearing => createHearingCard(hearing))
                      )}
                    </div>
                  </div>

                  {/* Past Hearings */}
                  <div className="hearings-section">
                    <h3 className="section-title">
                      <i className="fas fa-history"></i>
                      Past Hearings
                    </h3>
                    <div className="hearings-list">
                      {pastHearings.length === 0 ? (
                        <div className="empty-state">
                          <i className="fas fa-history"></i>
                          <p>No past hearings recorded</p>
                        </div>
                      ) : (
                        pastHearings.map(hearing => createHearingCard(hearing))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="tab-pane active">
              <div className="documents-container">
                <div className="section-header">
                  <i className="fas fa-folder section-icon"></i>
                  <h3 className="section-title">All Documents</h3>
                  <button className="btn btn-primary" style={{ marginLeft: 'auto' }}>
                    <i className="fas fa-plus"></i>
                    Add Document
                  </button>
                </div>
                <div className="section-content">
                  <div className="document-list">
                    {[
                      { name: "FIR Copy", type: "PDF", size: "2.3 MB", date: "2023-12-20", icon: "fas fa-file-pdf" },
                      { name: "Bail Application", type: "DOC", size: "1.8 MB", date: "2023-12-22", icon: "fas fa-file-word" },
                      { name: "Evidence Photos", type: "JPG", size: "5.2 MB", date: "2023-12-25", icon: "fas fa-file-image" },
                    ].map((doc, index) => (
                      <div key={index} className="document-item">
                        <div className="document-info">
                          <div className="document-icon">
                            <i className={doc.icon}></i>
                          </div>
                          <div className="document-details">
                            <div className="document-name">{doc.name}</div>
                            <div className="document-meta">{doc.type} • {doc.size} • Uploaded {doc.date}</div>
                          </div>
                        </div>
                        <div className="document-actions">
                          <button className="doc-action-btn" title="Download">
                            <i className="fas fa-download"></i>
                          </button>
                          <button className="doc-action-btn" title="View">
                            <i className="fas fa-eye"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div className="tab-pane active">
              <div className="timeline-container">
                <div className="section-header">
                  <i className="fas fa-history section-icon"></i>
                  <h3 className="section-title">Complete Case Timeline</h3>
                </div>
                <div className="section-content">
                  <div className="timeline">
                    {[
                      { title: "Bail Application Filed", date: "Dec 22, 2023", description: "Bail application submitted to the court for the accused." },
                      { title: "FIR Received", date: "Dec 20, 2023", description: "Copy of FIR obtained from the police station." },
                      { title: "Case Filed", date: "Dec 18, 2023", description: "Initial case registration and client consultation completed." },
                    ].map((event, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <span className="timeline-title">{event.title}</span>
                            <span className="timeline-date">{event.date}</span>
                          </div>
                          <div className="timeline-description">{event.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Assistant Tab */}
          {activeTab === "ai-assistant" && (
            <div className="tab-pane active">
              <div className="ai-assistant-container">
                {/* AI Case Summary */}
                <div className="ai-summary-section">
                  <div className="section-header">
                    <i className="fas fa-robot section-icon"></i>
                    <h3 className="section-title">AI Case Summary</h3>
                    <span className="ai-badge">AI-generated analysis and recommendations</span>
                  </div>

                  <div className="ai-summary-content">
                    <div className="case-summary-card">
                      <h4>AI Case Summary</h4>
                      <p className="summary-text">Criminal case involving economic offense under Section 420 IPC. Client seeking anticipatory bail.</p>
                    </div>

                    <div className="risk-assessment">
                      <h4>Risk Score</h4>
                      <div className="risk-score-bar">
                        <div className="risk-progress" style={{ width: '65%' }}></div>
                      </div>
                      <span className="risk-value">65/100</span>
                    </div>

                    <div className="ai-suggestions">
                      <div className="suggestion-column">
                        <h4>Suggested Arguments</h4>
                        <ul className="suggestion-list">
                          <li><span className="priority-high">●●●</span> Previous bail precedents in economic offense cases</li>
                          <li><span className="priority-medium">●●</span> Clear criminal record of the accused</li>
                          <li><span className="priority-low">●</span> Cooperation with investigation</li>
                        </ul>
                      </div>
                      <div className="suggestion-column">
                        <h4>Suggested Documents</h4>
                        <ul className="suggestion-list">
                          <li>• Character witness affidavits</li>
                          <li>• Property documents for surety</li>
                          <li>• Employment verification letter</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Chat */}
                <div className="ai-chat-section">
                  <div className="section-header">
                    <i className="fas fa-comments section-icon"></i>
                    <h3 className="section-title">AI Assistant Chat</h3>
                    <span className="ai-badge">Chat with AI for case-specific guidance and analysis</span>
                  </div>

                  <div className="chat-container">
                    <div className="chat-messages">
                      {chatMessages.map((message, index) => (
                        <div key={index} className={`message ${message.type}-message`}>
                          <div className="message-avatar">
                            <i className={message.type === 'ai' ? 'fas fa-robot' : 'fas fa-user'}></i>
                          </div>
                          <div className="message-content">
                            <div className="message-text">{message.text}</div>
                            <div className="message-time">{message.type === 'ai' ? 'AI Assistant' : 'You'} • {message.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="chat-input-area">
                      <div className="quick-actions">
                        <button className="quick-action-btn" onClick={() => sendQuickMessage('Analyze Documents')}>
                          <i className="fas fa-file-alt"></i> Analyze Documents
                        </button>
                        <button className="quick-action-btn" onClick={() => sendQuickMessage('Suggest Arguments')}>
                          <i className="fas fa-balance-scale"></i> Suggest Arguments
                        </button>
                        <button className="quick-action-btn" onClick={() => sendQuickMessage('Draft Motion')}>
                          <i className="fas fa-edit"></i> Draft Motion
                        </button>
                        <button className="quick-action-btn" onClick={() => sendQuickMessage('Risk Assessment')}>
                          <i className="fas fa-chart-line"></i> Risk Assessment
                        </button>
                      </div>

                      <div className="chat-input-container">
                        <input 
                          type="text" 
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask AI about case strategy, legal precedents, document review..." 
                        />
                        <button className="send-btn" onClick={sendMessage}>
                          <i className="fas fa-paper-plane"></i>
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Hearing Modal */}
      {showAddHearingModal && (
        <div className="modal-overlay">
          <div className="modal-content add-hearing-modal">
            <div className="modal-header">
              <h3>Add New Hearing</h3>
              <button className="modal-close" onClick={closeAddHearingModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Add hearing form would go here...</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeAddHearingModal}>Cancel</button>
              <button type="button" className="btn btn-primary">Save Hearing</button>
            </div>
          </div>
        </div>
      )}

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
  );
}
