import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Gallery from './pages/Gallery';
import Viewer from './pages/Viewer';
import ProductForm from './pages/ProductsForm';
import Home from './pages/Home';
import About from './pages/About'

// function Home() {
//   return (
//     <div>
//       <h3>Welcome to Mini 3D Shop</h3>
//       <p>Browse our gallery, view products in 3D, or learn more about us.</p>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div>
//       <h3>About Us</h3>
//       <p>This is a small demo 3D shop built with React and Three.js.</p>
//     </div>
//   );
// }

function ProductsList() {
  return (
    <div>
      <h3>Products</h3>
      <p>List of products will be displayed here.</p>
    </div>
  );
}

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

  const navButtons = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'createProducts', to: '/create/product' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'About', to: '/about' },
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between', // pushes title left, buttons right
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
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/product/:id" element={<Viewer />} />
        <Route path="/create/product" element={<ProductForm />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </div>
  );
}
