import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateCase() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [petitionerCount, setPetitionerCount] = useState(1);
  const [respondentCount, setRespondentCount] = useState(1);
  const [juniorAdvocateCount, setJuniorAdvocateCount] = useState(1);
  const [referenceArticleCount, setReferenceArticleCount] = useState(1);
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateInput = document.getElementById('filing_date') as HTMLInputElement;
    if (dateInput) {
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }
  }, []);

  const openSideMenu = () => setSideMenuOpen(true);
  const closeSideMenu = () => setSideMenuOpen(false);

  const logoutFromApp = () => {
    console.log("Logout clicked");
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadedDocuments(Array.from(files));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const addPetitioner = () => {
    setPetitionerCount(prev => prev + 1);
  };

  const addRespondent = () => {
    setRespondentCount(prev => prev + 1);
  };

  const addJuniorAdvocate = () => {
    setJuniorAdvocateCount(prev => prev + 1);
  };

  const addReferenceArticle = () => {
    setReferenceArticleCount(prev => prev + 1);
  };

  const removeListItem = (itemType: string, index: number) => {
    if (itemType === 'petitioner' && petitionerCount > 1) {
      setPetitionerCount(prev => prev - 1);
    } else if (itemType === 'respondent' && respondentCount > 1) {
      setRespondentCount(prev => prev - 1);
    } else if (itemType === 'junior' && juniorAdvocateCount > 1) {
      setJuniorAdvocateCount(prev => prev - 1);
    } else if (itemType === 'article' && referenceArticleCount > 1) {
      setReferenceArticleCount(prev => prev - 1);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(e.target as HTMLFormElement);
    const caseData: any = {};

    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
      if (caseData[key]) {
        if (Array.isArray(caseData[key])) {
          caseData[key].push(value);
        } else {
          caseData[key] = [caseData[key], value];
        }
      } else {
        caseData[key] = value;
      }
    }

    // Add metadata
    caseData.created_by = "current_advocate_id";
    caseData.created_on = new Date().toISOString();
    caseData.case_id = generateCaseId();

    console.log("Case Data:", caseData);
    alert("Case created successfully!");
    navigate('/cases');
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? All entered data will be lost.")) {
      navigate('/cases');
    }
  };

  const generateCaseId = () => {
    return "CASE_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5).toUpperCase();
  };

  // Sample articles database
  const articlesDatabase = [
    {
      id: 1,
      title: "Supreme Court Judgment on Bail Rights in Criminal Cases",
      type: "Case Law",
      author: "Supreme Court of India",
      date: "2024-01-15",
      summary: "A landmark judgment establishing new precedents for bail applications in criminal cases.",
    },
    {
      id: 2,
      title: "New Amendments to Civil Procedure Code 2024",
      type: "Legal Article",
      author: "Bar & Bench",
      date: "2024-02-01",
      summary: "Comprehensive analysis of the latest amendments to the Civil Procedure Code.",
    },
  ];

  const renderPetitioners = () => {
    const petitioners = [];
    for (let i = 0; i < petitionerCount; i++) {
      petitioners.push(
        <div key={i} className="list-item">
          <div className="list-item-header">
            <span className="list-item-title">
              <i className="fas fa-user"></i>
              Petitioner {i + 1}
            </span>
            {i > 0 && (
              <button 
                type="button" 
                className="remove-item-btn" 
                onClick={() => removeListItem('petitioner', i)}
              >
                <i className="fas fa-times"></i>
                Remove
              </button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Name <span className="required">*</span></label>
              <input type="text" className="form-input" name={`petitioners[${i}][name]`} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="tel" className="form-input" name={`petitioners[${i}][phone]`} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" name={`petitioners[${i}][email]`} />
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-select" name={`petitioners[${i}][type]`}>
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
                <option value="Organization">Organization</option>
                <option value="Government">Government</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Address</label>
              <textarea 
                className="form-textarea" 
                name={`petitioners[${i}][address]`} 
                placeholder="Complete address"
              ></textarea>
            </div>
          </div>
        </div>
      );
    }
    return petitioners;
  };

  const renderRespondents = () => {
    const respondents = [];
    for (let i = 0; i < respondentCount; i++) {
      respondents.push(
        <div key={i} className="list-item">
          <div className="list-item-header">
            <span className="list-item-title">
              <i className="fas fa-user-tie"></i>
              Respondent {i + 1}
            </span>
            {i > 0 && (
              <button 
                type="button" 
                className="remove-item-btn" 
                onClick={() => removeListItem('respondent', i)}
              >
                <i className="fas fa-times"></i>
                Remove
              </button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Name <span className="required">*</span></label>
              <input type="text" className="form-input" name={`respondents[${i}][name]`} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="tel" className="form-input" name={`respondents[${i}][phone]`} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" name={`respondents[${i}][email]`} />
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-select" name={`respondents[${i}][type]`}>
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
                <option value="Organization">Organization</option>
                <option value="Government">Government</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Address</label>
              <textarea 
                className="form-textarea" 
                name={`respondents[${i}][address]`} 
                placeholder="Complete address"
              ></textarea>
            </div>
          </div>
        </div>
      );
    }
    return respondents;
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
              <h1>
                <i className="fas fa-plus-circle"></i>
                Create New Case
              </h1>

              {/* Breadcrumb */}
              <nav className="breadcrumb">
                <Link to="/" className="breadcrumb-item">
                  <i className="fas fa-home"></i>
                  Home
                </Link>
                <span className="breadcrumb-separator">
                  <i className="fas fa-chevron-right"></i>
                </span>
                <Link to="/cases" className="breadcrumb-item">
                  <i className="fas fa-file-alt"></i>
                  Cases
                </Link>
                <span className="breadcrumb-separator">
                  <i className="fas fa-chevron-right"></i>
                </span>
                <span className="breadcrumb-item active">
                  <i className="fas fa-plus"></i>
                  Create Case
                </span>
              </nav>

              <p className="page-subtitle">
                Create a new legal case with comprehensive details
              </p>
            </div>
          </div>

          {/* Case Creation Form */}
          <div className="form-container">
            <form onSubmit={handleFormSubmit}>
              {/* Section 1: Case Basics */}
              <div className="form-section">
                <div className="section-header">
                  <i className="fas fa-folder section-icon"></i>
                  <span className="section-title">Case Basics</span>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Case Title <span className="required">*</span></label>
                    <input
                      type="text"
                      className="form-input"
                      name="case_title"
                      placeholder="e.g., State vs. Ramesh Sharma"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Case Type <span className="required">*</span></label>
                    <select className="form-select" name="case_type" required>
                      <option value="">Select Case Type</option>
                      <option value="Criminal">Criminal</option>
                      <option value="Civil">Civil</option>
                      <option value="Matrimonial">Matrimonial</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Property">Property</option>
                      <option value="Labor">Labor</option>
                      <option value="Tax">Tax</option>
                      <option value="Family">Family</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Court Name <span className="required">*</span></label>
                    <input
                      type="text"
                      className="form-input"
                      name="court_name"
                      placeholder="e.g., Delhi District Court"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Judge Name</label>
                    <input
                      type="text"
                      className="form-input"
                      name="judge_name"
                      placeholder="Hon'ble Justice Name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Case Number</label>
                    <input
                      type="text"
                      className="form-input"
                      name="case_number"
                      placeholder="e.g., CC/1234/2024"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Filing Date <span className="required">*</span></label>
                    <input
                      type="date"
                      className="form-input"
                      name="filing_date"
                      id="filing_date"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Parties Involved */}
              <div className="form-section">
                <div className="section-header">
                  <i className="fas fa-users section-icon"></i>
                  <span className="section-title">Parties Involved</span>
                </div>

                {/* Petitioners */}
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    <i className="fas fa-user"></i> Petitioners
                  </h4>
                  <div className="dynamic-list">
                    {renderPetitioners()}
                  </div>
                  <button type="button" className="add-item-btn" onClick={addPetitioner}>
                    <i className="fas fa-plus"></i>
                    Add Another Petitioner
                  </button>
                </div>

                {/* Respondents */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    <i className="fas fa-user-tie"></i> Respondents
                  </h4>
                  <div className="dynamic-list">
                    {renderRespondents()}
                  </div>
                  <button type="button" className="add-item-btn" onClick={addRespondent}>
                    <i className="fas fa-plus"></i>
                    Add Another Respondent
                  </button>
                </div>
              </div>

              {/* Section 3: Client Details */}
              <div className="form-section">
                <div className="section-header">
                  <i className="fas fa-user section-icon"></i>
                  <span className="section-title">Client Details</span>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Client Name</label>
                    <input type="text" className="form-input" name="client_name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Client Type</label>
                    <select className="form-select" name="client_type">
                      <option value="">Select Type</option>
                      <option value="Individual">Individual</option>
                      <option value="Company">Company</option>
                      <option value="Organization">Organization</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Client Phone</label>
                    <input type="tel" className="form-input" name="client_phone" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Client Email</label>
                    <input type="email" className="form-input" name="client_email" />
                  </div>
                </div>
              </div>

              {/* Section 4: Legal Sections & Acts */}
              <div className="form-section">
                <div className="section-header">
                  <i className="fas fa-gavel section-icon"></i>
                  <span className="section-title">Legal Sections & Acts</span>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">IPC Sections</label>
                    <input
                      type="text"
                      className="form-input"
                      name="ipc_sections"
                      placeholder="e.g., IPC 420, IPC 406"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Acts Involved</label>
                    <input
                      type="text"
                      className="form-input"
                      name="acts"
                      placeholder="e.g., CrPC, CPC, Indian Evidence Act"
                    />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Custom Tags</label>
                    <input
                      type="text"
                      className="form-input"
                      name="custom_tags"
                      placeholder="e.g., Bail, Interim Order, Notice Served"
                    />
                  </div>
                </div>
              </div>

              {/* Section 5: Documents */}
              <div className="form-section">
                <div className="section-header">
                  <i className="fas fa-file section-icon"></i>
                  <span className="section-title">Documents</span>
                </div>

                <div className="form-grid">
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Upload Documents</label>
                    <div className="file-upload">
                      <input
                        type="file"
                        name="documents"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
                        onChange={handleDocumentUpload}
                      />
                      <div className="file-upload-btn">
                        <i className="fas fa-upload"></i>
                        Choose Files (PDF, DOC, DOCX, JPG, PNG)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Uploaded Documents List */}
                {uploadedDocuments.length > 0 && (
                  <div style={{ marginTop: '1.5rem' }}>
                    {uploadedDocuments.map((file, index) => (
                      <div key={index} className="document-item">
                        <div className="document-info">
                          <i className="fas fa-file"></i>
                          <span style={{ fontWeight: '500' }}>{file.name}</span>
                          <small style={{ color: 'var(--text-muted)' }}>({formatFileSize(file.size)})</small>
                          <select className="document-type-select" name={`document_types[${index}]`} required>
                            <option value="">Select Type</option>
                            <option value="FIR">FIR</option>
                            <option value="Petition">Petition</option>
                            <option value="Evidence">Evidence</option>
                            <option value="Notice">Notice</option>
                            <option value="Order">Order/Judgment</option>
                            <option value="Affidavit">Affidavit</option>
                            <option value="Contract">Contract</option>
                            <option value="Identity">Identity Proof</option>
                            <option value="Financial">Financial Document</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 6: Team Assignment */}
              <div className="form-section">
                <div className="section-header">
                  <i className="fas fa-user-friends section-icon"></i>
                  <span className="section-title">Team Assignment</span>
                </div>

                {/* Senior Advocate */}
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    <i className="fas fa-user-graduate"></i> Senior Advocate (Lead)
                  </h4>
                  <div className="list-item">
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Senior Advocate <span className="required">*</span></label>
                        <select className="form-select" name="senior_advocate" required>
                          <option value="">Select Senior Advocate</option>
                          <option value="priya_sharma">Priya Sharma - Senior Advocate (Criminal Law)</option>
                          <option value="rajesh_kumar">Rajesh Kumar - Senior Advocate (Corporate Law)</option>
                          <option value="anil_verma">Anil Verma - Senior Advocate (Civil Law)</option>
                          <option value="kavita_singh">Kavita Singh - Senior Advocate (Family Law)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 7: Notes & Instructions */}
              <div className="form-section">
                <div className="section-header">
                  <i className="fas fa-sticky-note section-icon"></i>
                  <span className="section-title">Notes & Instructions</span>
                </div>
                <div className="form-grid">
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Internal Notes</label>
                    <textarea
                      className="form-textarea"
                      name="internal_notes"
                      placeholder="Notes for advocate's eyes only"
                      style={{ minHeight: '120px' }}
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Client Instructions</label>
                    <textarea
                      className="form-textarea"
                      name="client_instructions"
                      placeholder="Instructions from client about how to proceed"
                      style={{ minHeight: '120px' }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>

            {/* Form Actions */}
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                <i className="fas fa-times"></i>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" form="caseForm">
                <i className="fas fa-save"></i>
                Create Case
              </button>
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
