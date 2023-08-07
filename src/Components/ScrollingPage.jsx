import React, { useEffect } from 'react';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import './ScrollingPage.css';

const ScrollAnimatedCube = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf);
    scene.add(gridHelper);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0.5, -10);
    scene.add(cube);

    function lerp(x, y, a) {
      return (1 - a) * x + a * y;
    }

    function scalePercent(start, end) {
      return (scrollPercent - start) / (end - start);
    }

    const animationScripts = [];

    animationScripts.push({
      start: 0,
      end: 101,
      func: () => {
        let g = material.color.g;
        g -= 0.05;
        if (g <= 0) {
          g = 1.0;
        }
        material.color.g = g;
      },
    });

    animationScripts.push({
      start: 0,
      end: 40,
      func: () => {
        camera.lookAt(cube.position);
        camera.position.set(0, 1, 2);
        cube.position.z = lerp(-10, 0, scalePercent(0, 40));
      },
    });

    animationScripts.push({
      start: 40,
      end: 60,
      func: () => {
        camera.lookAt(cube.position);
        camera.position.set(0, 1, 2);
        cube.rotation.z = lerp(0, Math.PI, scalePercent(40, 60));
      },
    });

    animationScripts.push({
      start: 60,
      end: 80,
      func: () => {
        camera.position.x = lerp(0, 5, scalePercent(60, 80));
        camera.position.y = lerp(1, 5, scalePercent(60, 80));
        camera.lookAt(cube.position);
      },
    });

    animationScripts.push({
      start: 80,
      end: 101,
      func: () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      },
    });

    function playScrollAnimations() {
      animationScripts.forEach((a) => {
        if (scrollPercent >= a.start && scrollPercent < a.end) {
          a.func();
        }
      });
    }

    let scrollPercent = 0;

    document.body.onscroll = () => {
        console.log('sdfsd')
      scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
          ((document.documentElement.scrollHeight ||
            document.body.scrollHeight) -
            document.documentElement.clientHeight)) *
        100;
    };

    const stats = new Stats();
    document.body.appendChild(stats.dom);

    function animate() {
      requestAnimationFrame(animate);
      playScrollAnimations();
      renderer.render(scene, camera);
      stats.update();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    animate();

    return () => {
      // Clean up on component unmount
      document.body.removeChild(renderer.domElement);
      stats.dom.remove();
      window.removeEventListener('resize', onWindowResize);
      document.body.onscroll = null;
    };
  }, []);

  return (
    <>
      <span id="scrollProgress"></span>
      <main>
            <h1>Animate on Scroll</h1>
            <section>
                <h2>Begin scrolling to see things change</h2>
            </section>
            <section>
                <h2>Changing Objects Position</h2>
                <p>The cubes position is now changing</p>
            </section>

            <section>
                <h2>Changing Objects Rotation</h2>
                <p>The cubes rotation is now changing</p>
            </section>

            <section>
                <h2>Changing Camera Position</h2>
                <p>The camera position is now changing</p>
            </section>

            <section>
                <h2>You are at the bottom</h2>
                <p>The cube will now be auto rotating</p>
                <p>
                    Now you can scroll back to the top to reverse the animation
                </p>
            </section>
        </main>
    </>
  );
};

export default ScrollAnimatedCube;
