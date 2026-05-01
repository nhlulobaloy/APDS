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
  const navigate = useNavigate();

  const pageBack = () => {
    navigate(-1);
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

    // Client-side validation with helpful messages
    const amountNum = parseFloat(paymentAmount);
    if (isNaN(amountNum) || amountNum <= 10) {
      alert("Payment amount must be greater than 10");
      return;
    }

    if (!/^[0-9]{6,20}$/.test(payeeAccountNumber)) {
      alert("Account number must be 6-20 digits only");
      return;
    }

    if (!/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(swiftCode)) {
      alert("SWIFT code must be 8 or 11 characters (letters and numbers)");
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

          <label>SWIFT Code (8 or 11 characters)</label>
          <input
            type="text"
            placeholder="Example: FIRNZAJJ or FIRNZAJJXXX"
            value={swiftCode}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSwiftCode(e.target.value.toUpperCase())
            }
            required
          />
          <button type="submit">Pay Now</button>
          <button onClick={pageBack}>Back</button>
        </form>
        
      </div>
      
    </div>
  );
}

export default Payment;