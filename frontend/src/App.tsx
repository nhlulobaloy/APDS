import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import { Dashboard } from "./Dashboard";
import Payment from "./Payment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}

export default App;