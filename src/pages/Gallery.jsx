
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
const url = 'http://localhost:5000';
export default function Gallery(){
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    fetch(url + '/api/products')
      .then(r=>r.json())
      .then(setProducts).catch(e=>console.error(e));
  },[]);
  console.log(" products -> ", products );
  return (
    <div>
      <h3>Product Gallery</h3>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16}}>
        {products.map(p => (
          <div key={p.id} style={{border:'1px solid #ddd', padding:12, borderRadius:8}}>
            <div style={{height:140, background:'#f5f5f5', display:'flex', alignItems:'center', justifyContent:'center'}}>
              {/* <img src={p.image || '/models/thumbs/placeholder.png'} alt={p.name} style={{maxHeight:120}} /> */}
              <img src={ p.image } alt={p.name} style={{maxHeight:120}} />

            </div>
            <h4 style={{margin:'8px 0'}}>{p.name}</h4>
            <div>{p.category}</div>
            <div style={{fontWeight:700}}>₹ {p.price}</div>
            <Link to={'/product/' + p.id} style={{marginTop:8, display:'inline-block'}}>Open 3D Viewer</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
