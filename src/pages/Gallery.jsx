import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const url = 'http://localhost:5000';

export default function Gallery() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetch(url + '/api/products')
      .then(r => r.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = [...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
      })
      .catch(e => console.error(e));
  }, []);

  // Filter products based on category and price
  useEffect(() => {
    let temp = [...products];

    if (selectedCategory !== '') {
      temp = temp.filter(p => p.category === selectedCategory);
    }

    if (minPrice !== '') {
      temp = temp.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      temp = temp.filter(p => p.price <= parseFloat(maxPrice));
    }

    setFilteredProducts(temp);
  }, [selectedCategory, minPrice, maxPrice, products]);

  return (
    <div>
      <h3>Product Gallery</h3>

      {/* Filters */}
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" style={{ marginRight: 8, fontWeight: 600 }}>Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9',
              transition: 'all 0.2s ease'
            }}
          >
            <option value="">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label style={{ marginRight: 4, fontWeight: 600 }}>Price:</label>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            style={{
              padding: '6px 8px',
              width: 80,
              borderRadius: 8,
              border: '1px solid #ccc',
              outline: 'none'
            }}
          />
          <span style={{ margin: '0 4px' }}>-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            style={{
              padding: '6px 8px',
              width: 80,
              borderRadius: 8,
              border: '1px solid #ccc',
              outline: 'none'
            }}
          />
        </div>

      </div>

      {/* Product Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
        {filteredProducts.map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
            <div style={{ height: 140, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={p.image} alt={p.name} style={{ maxHeight: 120 }} />
            </div>
            <h4 style={{ margin: '8px 0' }}>{p.name}</h4>
            <div>{p.category}</div>
            <div style={{ fontWeight: 700 }}>₹ {p.price}</div>
            <Link to={'/product/' + p.id} style={{ marginTop: 8, display: 'inline-block' }}>Open 3D Viewer</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
