
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const url = "https://threedweb-backend.onrender.com/api/get/created/products";
const url = 'https://threedweb-backend.onrender.com/api/created/products';
const deleteUrl = 'https://threedweb-backend.onrender.com/api/delete/product'

function ProductsList() {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (_id) => {
    setDeletingId(_id);
    try {
      const res = await axios.post(`${deleteUrl}?_id=${_id}`);
      if (res.data && res.data.error) {
        toast.error(res.data.error);
      } else {
        setProducts(products.filter(p => p._id !== _id));
        toast.success("Product deleted successfully");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete product");
    }
    setDeletingId(null);
  };
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(res => {
        console.log(" products result -> ", res.data.payload );
        setProducts(res.data.payload);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <h3>Products</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map(product => (
          <div key={product._id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, width: 250, background: "#fafafa", position: "relative" }}>
            <img src={`https://threedweb-backend.onrender.com/${product.image}`} alt={product.name} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 4 }} onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/250x150?text=No+Image"; }} />
            <h4>{product.name}</h4>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ₹ {product.price}</p>
            <p>{product.description}</p>
            <a rel="noopener noreferrer">View 3D Model</a>
            <button onClick={() => handleDelete(product._id)} style={{ marginTop: 10, background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, padding: '12px 20px', cursor: 'pointer', opacity: deletingId === product._id ? 0.7 : 1, position: 'relative', overflow: 'hidden' }} disabled={deletingId === product._id}>
              {deletingId === product._id ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="fancy-spinner" style={{ width: 22, height: 22, marginRight: 8, display: 'inline-block', position: 'relative' }}>
                    <span style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: 'conic-gradient(#fff 10%, #e74c3c 40%, #fff 100%)',
                      animation: 'fancy-spin 0.8s linear infinite',
                    }} />
                    <span style={{
                      position: 'absolute',
                      top: 4,
                      left: 4,
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: '#e74c3c',
                    }} />
                  </span>
                  <span>Deleting...</span>
                </span>
              ) : 'Delete'}
            </button>
            <style>{`
              @keyframes fancy-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;