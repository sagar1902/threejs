import React, { useEffect } from "react";
import * as THREE from "three";
// import 'three/examples/js/lines/LineMaterial.js';
// import 'three/examples/js/lines/LineSegments2.js';

const RotatingCube = () => {
  const colorBlack = new THREE.Color(0xffffff);
  const colorWhite = new THREE.Color(0x000000);
  useEffect(() => {
    // Set up Three.js components
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create LineMaterial for wireframe appearance
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0f00ff,
      linewidth: 1, // Change this value for thicker or thinner lines
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    });
    const material = new THREE.LineBasicMaterial({
      color: colorBlack,
    });
    const geometry = new THREE.BoxGeometry();
    const wireframe = new THREE.WireframeGeometry(geometry);
    // const line = new THREE.LineSegments({geometry: wireframe, material});
    const line = new THREE.LineSegments(wireframe, lineMaterial);
    scene.add(line);

    // Create cube geometry
    const cubeSize = 2;
    const cubeGeometry = new THREE.SphereGeometry();


    // Create LineSegments object using cube geometry and LineMaterial
    const cubeWireframe = new THREE.LineSegments(cubeGeometry, lineMaterial);
    scene.add(cubeWireframe);
    scene.background = colorWhite;

    // Position camera
    camera.position.z = 5;

    // Handle window resize to adjust aspect ratio
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      line.rotation.x += 0.01;
      cubeWireframe.rotation.z += 0.01;
      line.rotation.y += 0.1;
    //   camera.rotation.z -= 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return null;
};

export default RotatingCube;
