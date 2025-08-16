import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import axios from "axios";
import { DEFAULT_MODEL, DEFAULT_NAME, DEFAULT_CATEGORY, DEFAULT_PRICE, DEFAULT_DESCRIPTION, DEFAULT_IMAGE } from "../constants";
import "./Loader.css";

export default function Viewer() {
  const { id } = useParams();
  const mountRef = useRef();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        const data = res || {};
        setProduct({
          name: data.name || DEFAULT_NAME,
          category: data.category || DEFAULT_CATEGORY,
          price: data.price || DEFAULT_PRICE,
          image: data.image || DEFAULT_IMAGE,
          model_path: data.model_path || DEFAULT_MODEL,
          description: data.description || DEFAULT_DESCRIPTION
        });
      })
      .catch(err => {
        console.error(err);
        setProduct({
          name: DEFAULT_NAME,
          category: DEFAULT_CATEGORY,
          price: DEFAULT_PRICE,
          image: DEFAULT_IMAGE,
          model_path: DEFAULT_MODEL,
          description: DEFAULT_DESCRIPTION
        });
      });
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(hemiLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const loader = new GLTFLoader();
    const modelUrl = product.model_path || DEFAULT_MODEL;

    loader.load(
      `http://localhost:5000${modelUrl}`,
      gltf => {
        const root = gltf.scene;
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());
        root.position.x += root.position.x - center.x;
        root.position.y += root.position.y - center.y;
        root.position.z += root.position.z - center.z;
        const scale = 2.0 / size;
        root.scale.setScalar(scale);
        scene.add(root);

        setLoading(false); // stop loader when model is loaded
      },
      undefined,
      err => {
        console.error(err);
        setLoading(false); // stop loader on error
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [product]);

  if (!product) return <div>Loading product...</div>;
 console.log('product ->', product )
  return (
    <div style={{ position: "relative", display: 'flex', gap: 20 }}>
      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div ref={mountRef} style={{ width: 640, height: 480, background: '#eee' }} />
      <div>
        <h3>{product.name}</h3>
        <img src={product.image} alt={product.name} />
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> ₹ {product.price}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
