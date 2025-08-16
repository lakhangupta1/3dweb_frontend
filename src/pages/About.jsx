import React from "react";

export default function Home() {
  const sectionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "40px 0",
    borderBottom: "1px solid #ddd",
    flexWrap: "wrap",
  };

  const textStyle = {
    flex: 1,
    fontSize: "16px",
    lineHeight: "1.5",
    minWidth: "280px",
  };

  const imgStyle = {
    flex: "0 0 300px",
    width: "300px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  // Inline CSS for animated background
  const animatedBg = {
    position: "relative",
    padding: "60px 20px",
    borderRadius: "8px",
    marginTop: "40px",
    overflow: "hidden",
    color: "#fff",
    textAlign: "center",
    background: "linear-gradient(270deg, #007bff, #00b4d8, #ff6f91, #ffca3a)",
    backgroundSize: "800% 800%",
    animation: "gradientAnimation 20s ease infinite",
  };

  const overlayStyle = {
    background: "rgba(0,0,0,0.6)",
    padding: "30px",
    borderRadius: "8px",
    maxWidth: "800px",
    margin: "0 auto",
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Hero Banner */}
      <section
        style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "linear-gradient(135deg, #007bff, #00b4d8)",
          color: "white",
          borderRadius: "8px",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          Welcome to Mini 3D Shop
        </h1>
        <p style={{ fontSize: "18px" }}>
          Explore our 3D models and visualize furniture like never before.
        </p>
      </section>

      {/* Section 1 */}
      <section style={sectionStyle}>
        <div style={textStyle}>
          <h2>Interactive 3D Models</h2>
          <p>
            View our products in immersive 3D. Rotate, zoom, and explore every
            detail before you buy.
          </p>
        </div>
        <img
          src="https://plus.unsplash.com/premium_photo-1676325102355-85b6e6f88e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
          alt="3D Model"
          style={imgStyle}
        />
      </section>

      {/* Section 2 */}
      <section style={sectionStyle}>
        <img
          src="https://images.unsplash.com/photo-1588854337221-4cfec2fba70f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
          alt="Wide Product Range"
          style={imgStyle}
        />
        <div style={textStyle}>
          <h2>Wide Product Range</h2>
          <p>
            Choose from chairs, tables, wardrobes, and lighting. Our 3D shop
            brings all these products to life in stunning visual detail.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section style={sectionStyle}>
        <div style={textStyle}>
          <h2>Modern Design</h2>
          <p>
            Our products are carefully curated to bring style and elegance to
            your home.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
          alt="Modern Design"
          style={imgStyle}
        />
      </section>

      {/* About Us Section with Animated Background */}
      <section style={animatedBg}>
        <div style={overlayStyle}>
          <h2>About Us</h2>
          <p style={{ lineHeight: "1.6" }}>
            Mini 3D Shop is a modern e-commerce platform blending interactive 3D
            visualization with high-quality furniture designs. Our goal is to
            make online furniture shopping immersive, engaging, and transparent.
            <br /><br />
            Founded by <strong>Lakhan Gupta</strong>, our company is committed to
            innovation, style, and customer satisfaction. Lakhan’s vision is to
            transform the way people buy furniture online — making it as realistic
            and personal as shopping in a physical store.
          </p>
        </div>
      </section>

      {/* Add keyframes for gradient animation */}
      <style>
        {`
          @keyframes gradientAnimation {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>
    </div>
  );
}
