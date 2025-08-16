import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    model_path: "",
    description: "",
    viewer_link: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/create/products", formData);
      toast.success("Product added successfully!", { position: "top-right" });

      setFormData({
        name: "",
        category: "",
        price: "",
        image: "",
        model_path: "",
        description: "",
        viewer_link: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(" Failed to add product.", { position: "top-right" });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="model_path"
          placeholder="3D Model Path"
          value={formData.model_path}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <input
          type="text"
          name="viewer_link"
          placeholder="Viewer Link"
          value={formData.viewer_link}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Product
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer />

      <style>
        {`
          @keyframes gradientBG {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
          input, textarea {
            transition: all 0.3s ease;
          }
          input:focus, textarea:focus {
            outline: none;
            border: 2px solid #00b4d8;
            background-color: #e0f7ff;
            box-shadow: 0 0 10px rgba(0,180,216,0.4);
          }
          button:hover {
            background: #007bff;
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "12px",
    background: "linear-gradient(-45deg, #007bff, #00b4d8, #ff6f91, #ffca3a)",
    backgroundSize: "400% 400%",
    animation: "gradientBG 15s ease infinite",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    color: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    textShadow: "1px 1px 5px rgba(0,0,0,0.2)",
  },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#333",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    minHeight: "60px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    background: "#00b4d8",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default ProductForm;
