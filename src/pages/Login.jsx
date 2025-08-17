import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginUrl = "https://threedweb-backend.onrender.com/api/auth/login";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // Accept setLoggedIn as prop
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(loginUrl, { email, password });
      if (res.data && res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Login successful!");
        localStorage.setItem('isLoggedIn', 'true');
        if (typeof window.setLoggedIn === 'function') window.setLoggedIn(true);
        if (typeof setLoggedIn === 'function') setLoggedIn(true);
        setTimeout(() => navigate('/home'), 1); // redirect to home after toast
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 32, border: "1px solid #ccc", borderRadius: 8, background: "#fafafa" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: 12, borderRadius: 4, border: "1px solid #bbb" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: 12, borderRadius: 4, border: "1px solid #bbb" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "12px 0", background: "#3498db", color: "#fff", border: "none", borderRadius: 4, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: 20, height: 20, border: '3px solid #fff', borderTop: '3px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: 8 }} />
              Logging in...
            </span>
          ) : "Login"}
        </button>
      </form>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Login;
