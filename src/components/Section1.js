// import React, { useEffect } from "react";

// const COSMOS_COUNT = 6;
// const ITEMS_PER_COSMOS = 10;

// function Section1() {
//   useEffect(() => {
//     const cosmos = document.querySelectorAll(".cosmos");
//     cosmos.forEach((element, index) => {
//       const angle = (360 / COSMOS_COUNT) * index;
//       element.style.transform = `rotate(${angle}deg) translate(60vh)`;

//       const cosmosItems = element.querySelectorAll(".cosmos-item");
//       cosmosItems.forEach((item, j) => {
//         item.style.animationDelay = `${j * 0.8}s`;
//       });
//     });
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#0c0c0c] overflow-hidden relative">
//       <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white uppercase text-center z-10">
//         Ai Club
//       </h1>

//       <div className="absolute top-0 h-screen w-screen flex justify-center items-center">
//         {[...Array(COSMOS_COUNT)].map((_, index) => (
//           <div key={index} className="cosmos absolute w-28 h-[200px]">
//             {[...Array(ITEMS_PER_COSMOS)].map((_, itemIndex) => (
//               <div
//                 key={itemIndex}
//                 className="cosmos-item absolute top-0 left-0 w-full h-full origin-bottom scale-0 animate-[fall-and-disappear_6s_ease-in-out_infinite]"
//               >
//                 <img
//                   src="https://placehold.co/600x300/white/white"
//                   alt="Placeholder"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Section1;

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "../components/styles.css";

const data = [
  { url: "./photos/1.webp", id: 1 },
  { url: "./photos/2.webp", id: 2 },
  { url: "./photos/3.webp", id: 3 },
  { url: "./photos/4.webp", id: 4 },
  { url: "./photos/5.webp", id: 5 },
  { url: "./photos/6.webp", id: 6 },
  { url: "./photos/7.webp", id: 7 },
  { url: "./photos/8.webp", id: 8 },
  { url: "./photos/9.webp", id: 9 },
  { url: "./photos/10.webp", id: 10 },
  { url: "./photos/11.webp", id: 11 },
  { url: "./photos/12.webp", id: 12 },
  { url: "./photos/13.webp", id: 13 },
  { url: "./photos/14.webp", id: 14 },
  { url: "./photos/15.webp", id: 15 },
  { url: "./photos/16.webp", id: 16 },
  { url: "./photos/17.webp", id: 17 },
  { url: "./photos/18.webp", id: 18 },
  { url: "./photos/19.webp", id: 19 },
  { url: "./photos/20.webp", id: 20 },
  { url: "./photos/21.webp", id: 21 },
  { url: "./photos/22.webp", id: 22 },
];

const Section1 = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const imagesRef = useRef([]);
  const headerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const imageGridRef = useRef([]);
  const lookAtTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  const params = {
    rows: 7,
    columns: 7,
    curvature: 5,
    spacing: 10,
    imageWidth: 7,
    imageHeight: 4.5,
    depth: 7.5,
    elevation: 0,
    lookAtRange: 20,
    verticalCurvature: 0.2,
    // Add animation parameters
    mouseLerpFactor: 0.025, // Reduced from 0.05 for smoother mouse following
    parallaxStrength: 1.5, // Reduced from 3 for less extreme movement
    oscillationSpeed: 0.3, // Reduced from 1 for slower oscillation
    oscillationStrength: 0.05, // Reduced from 0.1 for gentler movement
    rotationStrength: 0.1, // Added to control rotation intensity
  };
  const getUniqueImage = (row, col) => {
    // Get IDs of adjacent images (up, down, left, right)
    const usedIds = new Set();

    // Check left
    if (col > 0 && imageGridRef.current[row]?.[col - 1]) {
      usedIds.add(imageGridRef.current[row][col - 1]);
    }
    // Check right
    if (col < params.columns - 1 && imageGridRef.current[row]?.[col + 1]) {
      usedIds.add(imageGridRef.current[row][col + 1]);
    }
    // Check up
    if (row > 0 && imageGridRef.current[row - 1]?.[col]) {
      usedIds.add(imageGridRef.current[row - 1][col]);
    }
    // Check down
    if (row < params.rows - 1 && imageGridRef.current[row + 1]?.[col]) {
      usedIds.add(imageGridRef.current[row + 1][col]);
    }

    // Filter available images
    const availableImages = data.filter((img) => !usedIds.has(img.id));

    // If no unique images available, use any image that's not the same as left and up
    if (availableImages.length === 0) {
      const leftId = col > 0 ? imageGridRef.current[row]?.[col - 1] : null;
      const upId = row > 0 ? imageGridRef.current[row - 1]?.[col] : null;
      return (
        data.find((img) => img.id !== leftId && img.id !== upId) || data[0]
      );
    }

    return availableImages[Math.floor(Math.random() * availableImages.length)];
  };

  const calculateRotations = (x, y) => {
    const a = 1 / (params.depth * params.curvature);
    const slopeY = -2 * a * x;
    const rotationY = Math.atan(slopeY);

    const verticalFactor = params.verticalCurvature;
    const maxYDistance = (params.rows * params.spacing) / 2;
    const normalizedY = y / maxYDistance;
    const rotationX = normalizedY * verticalFactor;

    return { rotationX, rotationY };
  };

  const calculatePosition = (row, col) => {
    let x = (col - params.columns / 2) * params.spacing;
    let y = (row - params.rows / 2) * params.spacing;
    let z = (x * x) / (params.depth * params.curvature);

    const normalizedY = y / ((params.rows * params.spacing) / 2);
    z += Math.abs(normalizedY) * normalizedY * params.verticalCurvature * 5;
    y += params.elevation;
    const { rotationX, rotationY } = calculateRotations(x, y);
    return { x, y, z, rotationX, rotationY };
  };

  const createImagePlane = (row, col) => {
    // Initialize the row in the grid if it doesn't exist
    if (!imageGridRef.current[row]) {
      imageGridRef.current[row] = [];
    }

    // Get a unique image for this position
    const imageData = getUniqueImage(row, col);
    // Store the image ID in our grid
    imageGridRef.current[row][col] = imageData.id;

    const geometry = new THREE.PlaneGeometry(
      params.imageWidth,
      params.imageHeight
    );

    // Create texture loader
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageData.url);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh(geometry, material);
    const { x, y, z, rotationX, rotationY } = calculatePosition(row, col);

    plane.position.set(x, y, z);
    plane.rotation.x = rotationX;
    plane.rotation.y = rotationY;

    plane.userData.basePosition = { x, y, z };
    plane.userData.baseRotation = { x: rotationX, y: rotationY, z: 0 };
    plane.userData.parallaxFactor = Math.random() * 0.5 + 0.5;
    plane.userData.randomOffset = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random() * 2 - 1,
    };
    plane.userData.rotationModifier = {
      x: Math.random() * 0.15 - 0.075,
      y: Math.random() * 0.15 - 0.075,
      z: Math.random() * 0.2 - 0.1,
    };
    plane.userData.phaseOffset = Math.random() * Math.PI * 2;

    return plane;
  };

  const updateGallery = () => {
    // Reset the image grid
    imageGridRef.current = [];

    imagesRef.current.forEach((plane) => {
      if (plane.material.map) {
        plane.material.map.dispose();
      }
      plane.material.dispose();
      plane.geometry.dispose();
      sceneRef.current.remove(plane);
    });
    imagesRef.current = [];

    for (let row = 0; row < params.rows; row++) {
      for (let col = 0; col < params.columns; col++) {
        const plane = createImagePlane(row, col);
        imagesRef.current.push(plane);
        sceneRef.current.add(plane);
      }
    }
  };

  const animate = () => {
    const targetX = targetRef.current.x;
    const targetY = targetRef.current.y;

    if (headerRef.current) {
      const headerRotationX = -mouseRef.current.y * 25;
      const headerRotationY = mouseRef.current.x * 25;
      const headerTranslateZ =
        Math.abs(mouseRef.current.x * mouseRef.current.y) * 25;

      const targetTransform = `
        translate(-50%, -50%)
        perspective(1000px)
        rotateX(${headerRotationX}deg)
        rotateY(${headerRotationY}deg)
        translateZ(${headerTranslateZ}px)
      `;

      headerRef.current.style.transform = targetTransform;
      headerRef.current.style.transition =
        "transform .3s cubic-bezier(0.215, 0.61, 0.355, 1)";
    }
    // Smooth mouse movement
    targetRef.current.x +=
      (mouseRef.current.x - targetRef.current.x) * params.mouseLerpFactor;
    targetRef.current.y +=
      (mouseRef.current.y - targetRef.current.y) * params.mouseLerpFactor;

    lookAtTargetRef.current.x = targetRef.current.x * params.lookAtRange;
    lookAtTargetRef.current.y = -targetRef.current.y * params.lookAtRange;
    lookAtTargetRef.current.z =
      (lookAtTargetRef.current.x * lookAtTargetRef.current.y) /
      (params.depth * params.curvature);

    const time = performance.now() * 0.001 * params.oscillationSpeed;

    imagesRef.current.forEach((plane) => {
      const {
        basePosition,
        baseRotation,
        parallaxFactor,
        randomOffset,
        rotationModifier,
        phaseOffset,
      } = plane.userData;

      const mouseDistance = Math.sqrt(targetX * targetX + targetY * targetY);
      // Smoother parallax movement
      const parallaxX =
        targetX * parallaxFactor * params.parallaxStrength * randomOffset.x;
      const parallaxY =
        targetY * parallaxFactor * params.parallaxStrength * randomOffset.y;
      const oscillation =
        Math.sin(time + phaseOffset) *
        mouseDistance *
        params.oscillationStrength;

      // Smooth position interpolation
      plane.position.x +=
        (basePosition.x +
          parallaxX +
          oscillation * randomOffset.x -
          plane.position.x) *
        0.1;
      plane.position.y +=
        (basePosition.y +
          parallaxY +
          oscillation * randomOffset.y -
          plane.position.y) *
        0.1;
      plane.position.z +=
        (basePosition.z +
          oscillation * randomOffset.z * parallaxFactor -
          plane.position.z) *
        0.1;

      // Smooth rotation interpolation
      const targetRotationX =
        baseRotation.x +
        targetY * rotationModifier.x * mouseDistance * params.rotationStrength +
        oscillation * rotationModifier.x * 0.1;
      const targetRotationY =
        baseRotation.y +
        targetX * rotationModifier.y * mouseDistance * params.rotationStrength +
        oscillation * rotationModifier.y * 0.1;
      const targetRotationZ =
        baseRotation.z +
        targetX * targetY * rotationModifier.z * params.rotationStrength +
        oscillation * rotationModifier.z * 0.15;

      plane.rotation.x += (targetRotationX - plane.rotation.x) * 0.1;
      plane.rotation.y += (targetRotationY - plane.rotation.y) * 0.1;
      plane.rotation.z += (targetRotationZ - plane.rotation.z) * 0.1;
    });

    // Smooth camera movement
    cameraRef.current.lookAt(lookAtTargetRef.current);
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Initialize Three.js scene
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current.position.set(0, 0, 40);

    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setClearColor(0x121212);

    containerRef.current.appendChild(rendererRef.current.domElement);

    // Initialize gallery
    updateGallery();
    animate();

    // Event listeners
    const handleMouseMove = (event) => {
      mouseRef.current.x =
        (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseRef.current.y =
        (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    const handleResize = () => {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      imagesRef.current.forEach((plane) => {
        if (plane.material.map) {
          plane.material.map.dispose();
        }
        plane.material.dispose();
        plane.geometry.dispose();
      });

      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center relative">
      {/* <nav className="fixed top-0 left-0 w-full p-8 flex justify-center z-50">
        <p className="uppercase text-white font-inter font-medium text-sm p-1 bg-black/30 backdrop-blur-lg rounded-full px-6 py-3 border-[2px] border-[#a4a4a4]">
          Menu
        </p>
      </nav> */}
      <div
        ref={headerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center perspective-1000 will-change-transform z-20"
      >
        <h1 className=" font-poppins drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-[13vw] font-bold md:text-[7.5vw] tracking-tight leading-none transform-gpu backface-hidden select-none text-white">
          &gt;&gt;aiclub&lt;&lt;
        </h1>
      </div>
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
};

export default Section1;
