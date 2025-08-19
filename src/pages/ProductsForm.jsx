import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // preview
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("description", formData.description);

      if (imageFile) {
        data.append("image", imageFile); // must match multer field name
      }

      const res = await axios.post("https://threedweb-backend.onrender.com/api/create/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Product added successfully!", { position: "top-right" });

      // reset form
      setFormData({ name: "", category: "", price: "", description: "" });
      setImageFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product.", { position: "top-right" });
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

        {/* File Input */}
        <label style={styles.fileLabel}>
          {imageFile ? imageFile.name : "Choose Image"}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.hiddenFileInput}
          />
        </label>

        {/* Preview */}
        {previewUrl && (
          <img src={previewUrl} alt="Preview" style={styles.previewImage} />
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Add Product
        </button>
      </form>

      <ToastContainer />
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
  fileLabel: {
    display: "inline-block",
    padding: "10px 15px",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "8px",
    backgroundColor: "#00b4d8",
    color: "#fff",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.3s ease",
    boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
  },
  hiddenFileInput: {
    display: "none",
  },
  previewImage: {
    marginTop: "10px",
    maxWidth: "100%",
    borderRadius: "8px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
  },
};

export default ProductForm;
