import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Gallery from './pages/Gallery';
import Viewer from './pages/Viewer';
import ProductForm from './pages/ProductsForm';
import Home from './pages/Home';
import About from './pages/About';
import ProductsList from './pages/ProductsList';

import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';



const btnStyle = {
  padding: '8px 16px',
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.2s ease',
};

const btnHoverStyle = {
  backgroundColor: '#0056b3',
};

export default function App() {
  const [hovered, setHovered] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const navButtons = loggedIn
    ? [
        { label: 'Home', to: '/' },
        { label: 'Products', to: '/products' },
        { label: 'createProducts', to: '/create/product' },
        { label: 'Gallery', to: '/gallery' },
        { label: 'About', to: '/about' },
        { label: 'Logout', to: '/logout' },
      ]
    : [
        { label: 'Login', to: '/login' },
        { label: 'Register', to: '/register' },
      ];

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <h2 style={{ margin: 0 }}>Mini 3D Shop</h2>

        <nav style={{ display: 'flex', gap: 10 }}>
          {navButtons.map((btn, i) => (
            <Link key={i} to={btn.to} style={{ textDecoration: 'none' }}>
              <button
                style={{
                  ...btnStyle,
                  ...(hovered === i ? btnHoverStyle : {}),
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {btn.label}
              </button>
            </Link>
          ))}
        </nav>
      </header>

      <Routes>
        {!loggedIn && <>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register />} />
        </>}
        {loggedIn && <>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/product/:id" element={<Viewer />} />
          <Route path="/create/product" element={<ProductForm />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About/>} />
          <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />
        </>}
      </Routes>
    </div>
  );
}
