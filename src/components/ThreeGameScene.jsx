import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { soundFX } from '../utils/audio.js';

// Generate high-resolution canvas texture for the 3D cartridge front
function createGameTexture(game) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Deep frosted obsidian gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 512, 512);
    bgGrad.addColorStop(0, '#111111');
    bgGrad.addColorStop(0.5, '#080808');
    bgGrad.addColorStop(1, '#020202');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 512, 512);

    // Glowing cyber neon border
    ctx.lineWidth = 14;
    ctx.strokeStyle = game.color || '#00ffcc';
    ctx.strokeRect(10, 10, 492, 492);

    // Inner thin border
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.strokeRect(26, 26, 460, 460);

    // Header badge (Category)
    ctx.fillStyle = game.color || '#00ffcc';
    ctx.beginPath();
    ctx.roundRect(36, 42, 160, 36, 6);
    ctx.fill();

    ctx.fillStyle = '#05070c';
    ctx.font = 'bold 20px "Chakra Petch", sans-serif';
    ctx.fillText(game.category.toUpperCase(), 50, 67);

    // Star rating badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.roundRect(330, 42, 146, 36, 6);
    ctx.fill();

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(`★ ${game.rating}`, 348, 67);

    // Decorative cyber grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let y = 100; y < 360; y += 30) {
      ctx.beginPath();
      ctx.moveTo(36, y);
      ctx.lineTo(476, y);
      ctx.stroke();
    }

    // Glowing game icon / emblem circle
    const centerGrad = ctx.createRadialGradient(256, 210, 10, 256, 210, 90);
    centerGrad.addColorStop(0, (game.color || '#00ffcc') + '66');
    centerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = centerGrad;
    ctx.beginPath();
    ctx.arc(256, 210, 90, 0, Math.PI * 2);
    ctx.fill();

    // Stylized emblem in center
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px "Chakra Petch", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const initials = game.title
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('');
    ctx.fillText(initials || '▶', 256, 210);

    // Game Title text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Chakra Petch", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    // Handle title wrapping
    const words = game.title.split(' ');
    if (words.length > 2) {
      ctx.fillText(words.slice(0, 2).join(' '), 256, 340);
      ctx.font = 'bold 28px "Chakra Petch", sans-serif';
      ctx.fillText(words.slice(2).join(' '), 256, 375);
    } else {
      ctx.fillText(game.title, 256, 350);
    }

    // "CLICK TO PLAY" Cyber pill button
    const btnGrad = ctx.createLinearGradient(120, 420, 392, 470);
    btnGrad.addColorStop(0, game.color || '#00ffcc');
    btnGrad.addColorStop(1, game.accent || '#3b82f6');
    ctx.fillStyle = btnGrad;
    ctx.beginPath();
    ctx.roundRect(106, 420, 300, 52, 10);
    ctx.fill();

    ctx.fillStyle = '#05070c';
    ctx.font = 'bold 22px "Chakra Petch", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ PLAY GAME', 256, 453);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const ThreeGameScene = ({
  games,
  activeCategory,
  searchQuery,
  layoutMode,
  autoRotate,
  onSelectGame,
  onHoverGame,
}) => {
  const mountRef = useRef(null);
  const hoveredGameRef = useRef(null);
  const [sceneReady, setSceneReady] = useState(false);

  // Stable callback refs to avoid recreating the entire Three.js canvas on App state updates
  const onHoverGameRef = useRef(onHoverGame);
  onHoverGameRef.current = onHoverGame;

  const onSelectGameRef = useRef(onSelectGame);
  onSelectGameRef.current = onSelectGame;

  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  // Keep references to Three.js objects for smooth manipulation
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const gameMeshesRef = useRef([]);

  // Drag / Orbit state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraAngleRef = useRef({ theta: 0, phi: 0.25, radius: 24 });
  const targetCameraAngleRef = useRef({ theta: 0, phi: 0.25, radius: 24 });
  const mouseScreenRef = useRef(new THREE.Vector2(-9999, -9999));
  const raycasterRef = useRef(new THREE.Raycaster());

  // Setup Three.js scene ONCE on mount
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.018);
    sceneRef.current = scene;
    setSceneReady(true);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 7, 24);
    cameraRef.current = camera;

    // 3. Renderer with transparency for background frosted glow
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050505, 0.7);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Frosted Glass Cyber Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00ffcc, 1.4);
    dirLight1.position.set(15, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7000ff, 1.1);
    dirLight2.position.set(-15, 10, -10);
    scene.add(dirLight2);

    const centerPointLight = new THREE.PointLight(0x00ffcc, 2.2, 45);
    centerPointLight.position.set(0, 3, 0);
    scene.add(centerPointLight);

    // 5. Starfield / Frosted Cyber Particles
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const c = new THREE.Color(
        i % 3 === 0 ? 0x00ffcc : i % 3 === 1 ? 0x7000ff : 0xffffff
      );
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Holographic Ground Grid
    const gridHelper = new THREE.GridHelper(60, 40, 0x00ffcc, 0x27272a);
    gridHelper.position.y = -4.5;
    scene.add(gridHelper);

    // Glowing center pedestal ring
    const ringGeo = new THREE.RingGeometry(8, 8.4, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00ffcc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const floorRing = new THREE.Mesh(ringGeo, ringMat);
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.y = -4.48;
    scene.add(floorRing);

    // 7. Mouse and Resize event listeners
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Drag interaction handlers
    const handlePointerDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseScreenRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseScreenRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;

        targetCameraAngleRef.current.theta -= deltaX * 0.006;
        targetCameraAngleRef.current.phi = Math.max(
          -0.2,
          Math.min(0.85, targetCameraAngleRef.current.phi + deltaY * 0.005)
        );

        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      targetCameraAngleRef.current.radius = Math.max(
        12,
        Math.min(38, targetCameraAngleRef.current.radius + e.deltaY * 0.02)
      );
    };

    // Click handler for 3D game cartridges
    const handleClick = (e) => {
      // Ignore click if it was a drag
      if (
        Math.abs(e.clientX - previousMousePositionRef.current.x) > 5 ||
        Math.abs(e.clientY - previousMousePositionRef.current.y) > 5
      ) {
        return;
      }

      if (cameraRef.current && sceneRef.current) {
        const rect = container.getBoundingClientRect();
        const clickMouse = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        raycasterRef.current.setFromCamera(clickMouse, cameraRef.current);

        const clickableMeshes = gameMeshesRef.current.map((item) => item.cartridge);
        const intersects = raycasterRef.current.intersectObjects(clickableMeshes);

        if (intersects.length > 0) {
          const hitCartridge = intersects[0].object;
          const found = gameMeshesRef.current.find(
            (item) => item.cartridge === hitCartridge
          );
          if (found) {
            soundFX.playSelect();
            if (onSelectGameRef.current) {
              onSelectGameRef.current(found.game);
            }
          }
        }
      }
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('click', handleClick);

    // 8. Animation loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation if enabled and not currently dragging
      if (autoRotateRef.current && !isDraggingRef.current) {
        targetCameraAngleRef.current.theta += 0.0018;
      }

      // Smooth camera interpolation (lerp)
      cameraAngleRef.current.theta +=
        (targetCameraAngleRef.current.theta - cameraAngleRef.current.theta) * 0.08;
      cameraAngleRef.current.phi +=
        (targetCameraAngleRef.current.phi - cameraAngleRef.current.phi) * 0.08;
      cameraAngleRef.current.radius +=
        (targetCameraAngleRef.current.radius - cameraAngleRef.current.radius) * 0.08;

      const camX =
        cameraAngleRef.current.radius *
        Math.sin(cameraAngleRef.current.theta) *
        Math.cos(cameraAngleRef.current.phi);
      const camY =
        cameraAngleRef.current.radius * Math.sin(cameraAngleRef.current.phi) + 2.5;
      const camZ =
        cameraAngleRef.current.radius *
        Math.cos(cameraAngleRef.current.theta) *
        Math.cos(cameraAngleRef.current.phi);

      camera.position.set(camX, camY, camZ);
      camera.lookAt(0, 0.5, 0);

      // Rotate particle galaxy gently
      particles.rotation.y = elapsedTime * 0.02;
      floorRing.rotation.z = -elapsedTime * 0.1;

      // Raycasting for hover detection
      raycasterRef.current.setFromCamera(mouseScreenRef.current, camera);
      const clickableMeshes = gameMeshesRef.current.map((item) => item.cartridge);
      const intersects = raycasterRef.current.intersectObjects(clickableMeshes);

      let currentlyHovered = null;

      if (intersects.length > 0) {
        const hitCartridge = intersects[0].object;
        const found = gameMeshesRef.current.find(
          (item) => item.cartridge === hitCartridge
        );
        if (found) {
          currentlyHovered = found.game;
          container.style.cursor = 'pointer';
        }
      } else {
        container.style.cursor = 'grab';
      }

      if (currentlyHovered?.id !== hoveredGameRef.current?.id) {
        hoveredGameRef.current = currentlyHovered;
        if (onHoverGameRef.current) {
          onHoverGameRef.current(currentlyHovered);
        }
        if (currentlyHovered) {
          soundFX.playHover();
        }
      }

      // Animate game meshes: floating sine waves, target interpolation, hover elevation
      gameMeshesRef.current.forEach((item, index) => {
        // Move towards target layout position
        item.mesh.position.lerp(item.targetPosition, 0.08);

        const isHovered = item.game.id === hoveredGameRef.current?.id;

        // Floating sine wave animation
        const floatOffset =
          Math.sin(elapsedTime * 1.6 + index * 0.6) * 0.22 +
          (isHovered ? 0.7 : 0);
        item.cartridge.position.y = floatOffset;

        // Make cartridge face center of scene, plus slight tilt
        if (!isHovered) {
          item.mesh.rotation.y =
            Math.atan2(item.mesh.position.x, item.mesh.position.z) + Math.PI;
          item.cartridge.rotation.z = Math.sin(elapsedTime * 1.5 + index) * 0.03;
        } else {
          // Point directly toward camera when hovered
          const lookAngle = Math.atan2(
            camera.position.x - item.mesh.position.x,
            camera.position.z - item.mesh.position.z
          );
          item.mesh.rotation.y = lookAngle;
          item.cartridge.rotation.y = Math.sin(elapsedTime * 4) * 0.08;
        }

        // Pulse base ring
        if (item.baseRing) {
          item.baseRing.rotation.z += 0.02;
          const ringScale = isHovered ? 1.3 : 1 + Math.sin(elapsedTime * 3) * 0.05;
          item.baseRing.scale.set(ringScale, ringScale, ringScale);
        }
      });

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('click', handleClick);

      // Dispose Three.js objects
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []); // Run once on mount! Stable callbacks stored in refs

  // Re-calculate & build game 3D objects whenever `games` or layout changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clean up old meshes
    gameMeshesRef.current.forEach((item) => {
      scene.remove(item.mesh);
      item.cartridge.geometry.dispose();
      if (Array.isArray(item.cartridge.material)) {
        item.cartridge.material.forEach((m) => m.dispose());
      } else {
        item.cartridge.material.dispose();
      }
      item.baseRing.geometry.dispose();
      item.baseRing.material.dispose();
    });
    gameMeshesRef.current = [];

    const total = games.length;
    if (total === 0) return;

    games.forEach((game, index) => {
      const group = new THREE.Group();

      // Determine 3D Layout Target Position
      const targetPos = new THREE.Vector3();
      const radius = 10;

      if (layoutMode === 'ring') {
        const angle = (index / total) * Math.PI * 2;
        targetPos.x = Math.sin(angle) * radius;
        targetPos.z = Math.cos(angle) * radius;
        targetPos.y = 0;
      } else if (layoutMode === 'grid') {
        const cols = 4;
        const col = index % cols;
        const row = Math.floor(index / cols);
        const spacingX = 4.8;
        const spacingY = 4.8;
        targetPos.x = (col - (cols - 1) / 2) * spacingX;
        targetPos.y = (1.5 - row) * spacingY;
        targetPos.z = 0;
      } else if (layoutMode === 'helix') {
        const angle = index * 0.75;
        const helixRadius = 8.5;
        targetPos.x = Math.sin(angle) * helixRadius;
        targetPos.z = Math.cos(angle) * helixRadius;
        targetPos.y = (index - total / 2) * 1.5;
      }

      // Initial position for smooth entry transition
      group.position.set(targetPos.x * 1.4, targetPos.y + 5, targetPos.z * 1.4);

      // Cartridge Box Geometry: Width=2.6, Height=3.2, Depth=0.5
      const geometry = new THREE.BoxGeometry(2.6, 3.2, 0.5);

      // Generate front texture
      const frontTexture = createGameTexture(game);

      // Multi-material for 6 faces: Right, Left, Top, Bottom, Front, Back
      const sideColor = new THREE.Color(game.color || '#00ffcc').multiplyScalar(0.3);
      const edgeMaterial = new THREE.MeshStandardMaterial({
        color: sideColor,
        roughness: 0.3,
        metalness: 0.8,
      });

      const frontMaterial = new THREE.MeshStandardMaterial({
        map: frontTexture,
        roughness: 0.2,
        metalness: 0.4,
        emissive: new THREE.Color(game.color || '#00ffcc'),
        emissiveIntensity: 0.15,
      });

      const backMaterial = new THREE.MeshStandardMaterial({
        color: 0x090d16,
        roughness: 0.5,
        metalness: 0.8,
      });

      const materials = [
        edgeMaterial, // +X
        edgeMaterial, // -X
        edgeMaterial, // +Y
        edgeMaterial, // -Y
        frontMaterial, // +Z (Front)
        backMaterial, // -Z (Back)
      ];

      const cartridge = new THREE.Mesh(geometry, materials);
      cartridge.castShadow = true;
      cartridge.receiveShadow = true;
      group.add(cartridge);

      // Floor Hologram Ring beneath each cartridge
      const ringGeo = new THREE.RingGeometry(1.4, 1.6, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(game.color || '#00ffcc'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const baseRing = new THREE.Mesh(ringGeo, ringMat);
      baseRing.rotation.x = Math.PI / 2;
      baseRing.position.y = -3.8;
      group.add(baseRing);

      scene.add(group);

      gameMeshesRef.current.push({
        mesh: group,
        cartridge,
        baseRing,
        game,
        targetPosition: targetPos,
        originalY: targetPos.y,
      });
    });
  }, [sceneReady, games, layoutMode]);

  // Handle Filtering (dim/scale non-matching games)
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    gameMeshesRef.current.forEach(({ mesh, cartridge, game }) => {
      const matchCategory =
        activeCategory === 'All' ||
        game.category.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch =
        !q ||
        game.title.toLowerCase().includes(q) ||
        game.description.toLowerCase().includes(q) ||
        game.category.toLowerCase().includes(q);

      const isMatch = matchCategory && matchSearch;

      // Smooth visual transition for matches
      const targetScale = isMatch ? 1 : 0.45;
      mesh.scale.set(targetScale, targetScale, targetScale);

      // Adjust opacity of materials
      if (Array.isArray(cartridge.material)) {
        cartridge.material.forEach((mat) => {
          mat.transparent = true;
          mat.opacity = isMatch ? 1 : 0.18;
        });
      }
    });
  }, [activeCategory, searchQuery]);

  return (
    <div
      ref={mountRef}
      id="three-canvas-container"
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
    />
  );
};
