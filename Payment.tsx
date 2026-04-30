import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./styles/Payment.css";

function Payment() {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [provider] = useState("SWIFT");
  const [payeeAccountNumber, setPayeeAccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");

  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      const data = {
        paymentAmount,
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
          <label>Payment Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
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

          <label>Payee Account Number</label>
          <input
            type="text"
            placeholder="Enter payee account number"
            value={payeeAccountNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPayeeAccountNumber(e.target.value)
            }
            required
          />

          <label>SWIFT Code</label>
          <input
            type="text"
            placeholder="Example: FIRNZAJJ"
            value={swiftCode}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSwiftCode(e.target.value.toUpperCase())
            }
            required
          />

          <button type="submit">Pay Now</button>
        </form>
      </div>
    </div>
  );
}

export default Payment;