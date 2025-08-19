import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Viewer() {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Load model
    const loader = new GLTFLoader();
    const modelUrl = "/models/Armor.glb"; // 👈 place your file inside /public/models/

    loader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;

        // Center and scale
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());

        root.position.sub(center); // center model
        const scale = 2.0 / size;
        root.scale.setScalar(scale);

        scene.add(root);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.error("Model load error:", err);
        setLoading(false);
      }
    );

    // Handle resize
    const handleResize = () => {
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100vh", background: "#ddd" }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            padding: "5px 10px",
            background: "#000",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          Loading model...
        </div>
      )}
    </div>
  );
}
