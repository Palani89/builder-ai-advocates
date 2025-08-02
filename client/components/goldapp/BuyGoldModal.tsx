import { useState } from "react";

interface BuyGoldModalProps {
  isOpen: boolean;
  onClose: () => void;
  goldRate: number;
}

export default function BuyGoldModal({ isOpen, onClose, goldRate }: BuyGoldModalProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [grams, setGrams] = useState(0);

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const numValue = parseFloat(value) || 0;
    setGrams(numValue / goldRate);
  };

  const handleGramsChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setGrams(numValue);
    setAmount((numValue * goldRate).toString());
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>
            <i className="fas fa-plus"></i>
            Buy Gold
          </h3>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-section">
            <div className="section-header">
              <i className="fas fa-coins section-icon"></i>
              <h4 className="section-title">Investment Details</h4>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Amount (₹) <span className="required">*</span></label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Gold Quantity (g)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter grams"
                  value={grams.toFixed(4)}
                  onChange={(e) => handleGramsChange(e.target.value)}
                />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Current Gold Rate</label>
                <div className="rate-display">
                  <i className="fas fa-coins"></i>
                  ₹{goldRate}/gram
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <i className="fas fa-credit-card section-icon"></i>
              <h4 className="section-title">Payment Method</h4>
            </div>
            <div className="form-grid">
              <div className="form-group full-width">
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <i className="fas fa-mobile-alt"></i>
                    UPI
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <i className="fas fa-credit-card"></i>
                    Debit Card
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={paymentMethod === "netbanking"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <i className="fas fa-university"></i>
                    Net Banking
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="investment-summary">
            <div className="summary-header">
              <h4>Investment Summary</h4>
            </div>
            <div className="summary-details">
              <div className="summary-row">
                <span>Investment Amount:</span>
                <span>₹{amount || "0"}</span>
              </div>
              <div className="summary-row">
                <span>Gold Quantity:</span>
                <span>{grams.toFixed(4)}g</span>
              </div>
              <div className="summary-row">
                <span>Rate per gram:</span>
                <span>₹{goldRate}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>₹{amount || "0"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary">
            <i className="fas fa-shopping-cart"></i>
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
}
