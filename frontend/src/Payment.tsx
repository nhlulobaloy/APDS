import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Payment.css";

function Payment() {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [provider] = useState("SWIFT");
  const [payeeAccountNumber, setPayeeAccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [swiftError, setSwiftError] = useState("");
  const navigate = useNavigate();

  const pageBack = () => {
    navigate(-1);
  };

  // Real-time SWIFT validation - MATCHES BACKEND: 9-11 characters
  const validateSwiftCodeRealTime = (code: string) => {
    if (!code) {
      setSwiftError("");
      return false;
    }
    
    // Check length range (9-11 chars)
    if (code.length < 9) {
      setSwiftError(`❌ Too short: ${code.length} chars. SWIFT code needs 9-11 characters total`);
      return false;
    }
    
    if (code.length > 11) {
      setSwiftError(`❌ Too long: ${code.length} chars. SWIFT code needs 9-11 characters total`);
      return false;
    }
    
    // Check first 6 characters are letters
    const firstSix = code.substring(0, 6);
    if (!/^[A-Z]{6}$/.test(firstSix)) {
      setSwiftError("❌ First 6 characters must be letters A-Z only (bank + country code)");
      return false;
    }
    
    // Check last 3-5 characters are alphanumeric
    const lastPart = code.substring(6);
    if (!/^[A-Z0-9]{3,5}$/.test(lastPart)) {
      setSwiftError(`❌ Last part must be 3-5 letters or numbers (currently ${lastPart.length} chars)`);
      return false;
    }
    
    setSwiftError("✅ Valid SWIFT code format");
    return true;
  };

  const handleSwiftCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSwiftCode(value);
    validateSwiftCodeRealTime(value);
  };

  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      localStorage.clear();
      navigate('/login');
      return;
    }

    // Payment amount validation
    const amountNum = parseFloat(paymentAmount);
    if (isNaN(amountNum) || amountNum <= 10) {
      alert("❌ Payment amount must be greater than 10");
      return;
    }

    // Account number validation
    if (!/^[0-9]{6,20}$/.test(payeeAccountNumber)) {
      alert("❌ Account number must be 6-20 digits only (no letters or special characters)");
      return;
    }

    // SWIFT validation - MATCHING BACKEND EXACTLY
    if (!swiftCode) {
      alert("❌ SWIFT code is required");
      return;
    }
    
    // Check length (9-11 characters)
    if (swiftCode.length < 9 || swiftCode.length > 11) {
      alert(`❌ SWIFT code must be 9-11 characters long.\n\nYour code has ${swiftCode.length} characters.\n\nFormat: PPPPCCXXX (4 bank letters + 2 country letters + 3-5 branch letters/numbers)`);
      return;
    }
    
    // Check first 6 characters are letters
    if (!/^[A-Z]{6}$/.test(swiftCode.substring(0, 6))) {
      alert("❌ First 6 characters of SWIFT code must be letters A-Z only\n\nExample: 'FIRNZA' (bank + country code)");
      return;
    }
    
    // Check last 3-5 characters are alphanumeric
    const lastPart = swiftCode.substring(6);
    if (!/^[A-Z0-9]{3,5}$/.test(lastPart)) {
      alert(`❌ Last ${lastPart.length} characters must be 3-5 letters or numbers\n\nExample: 'JJX' (3 chars) or 'JJXXX' (5 chars)`);
      return;
    }

    try {
      const data = {
        paymentAmount: amountNum,
        currency,
        provider,
        payeeAccountNumber,
        swiftCode,
      };
      
      const res = await axios.post("http://localhost:5000/payment", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);

      setPaymentAmount("");
      setCurrency("USD");
      setPayeeAccountNumber("");
      setSwiftCode("");
      setSwiftError("");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-card">
        <h1>International Payment</h1>
        <p className="payment-subtitle">
          Send a secure international payment using SWIFT.
        </p>

        <form onSubmit={handlePayment} className="payment-form">
          <label>Payment Amount (must be greater than 10)</label>
          <input
            type="number"
            placeholder="Enter amount (min: 11)"
            value={paymentAmount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPaymentAmount(e.target.value)
            }
            required
          />

          <label>Currency</label>
          <select
            value={currency}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setCurrency(e.target.value)
            }
          >
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>

          <label>Provider</label>
          <input type="text" value={provider} readOnly />

          <label>Payee Account Number (6-20 digits only)</label>
          <input
            type="text"
            placeholder="Enter 6-20 digit account number"
            value={payeeAccountNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPayeeAccountNumber(e.target.value.replace(/[^0-9]/g, ''))
            }
            required
          />

          <label>SWIFT/BIC Code (9-11 characters)</label>
          <input
            type="text"
            placeholder="Example: FIRNZAJJX (9 chars) or FIRNZAJJXXX (11 chars)"
            value={swiftCode}
            onChange={handleSwiftCodeChange}
            required
          />
          {swiftError && (
            <div className="error-message" style={{color: swiftError.includes("✅") ? "green" : "red", fontSize: "12px", marginTop: "-10px", marginBottom: "10px"}}>
              {swiftError}
            </div>
          )}
          
          <button type="submit">Pay Now</button>
          <button type="button" onClick={pageBack}>Back</button>
        </form>
        
      </div>
      
    </div>
  );
}

export default Payment;