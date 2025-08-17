import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setLoggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('isLoggedIn');
    if (typeof setLoggedIn === 'function') setLoggedIn(false);
    navigate('/login');
  }, [navigate, setLoggedIn]);

  return (
    <div style={{ textAlign: 'center', marginTop: 60 }}>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
