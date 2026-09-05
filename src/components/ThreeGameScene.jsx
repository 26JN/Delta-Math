import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { soundFX } from '../utils/audio.js';
import { drawGameCoverArt } from '../utils/gameThumbnails.jsx';

// Generate 4K ultra-sharp canvas texture (1280x1280) for the 3D cartridge front
function createGameTexture(game, isVip = false, renderer = null) {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 1280;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const isGold = isVip || game.vip;
    const primaryColor = isGold ? '#e5c158' : (game.color || '#2997ff');
    const accentColor = isGold ? '#d4af37' : (game.accent || '#0071e3');

    // Deep Space Black & Obsidian brushed texture with radial studio gradient
    const bgGrad = ctx.createRadialGradient(640, 640, 150, 640, 640, 920);
    if (isGold) {
      bgGrad.addColorStop(0, '#1c160b');
      bgGrad.addColorStop(0.5, '#0d0a04');
      bgGrad.addColorStop(1, '#030201');
    } else {
      bgGrad.addColorStop(0, '#0f1422');
      bgGrad.addColorStop(0.5, '#070911');
      bgGrad.addColorStop(1, '#020306');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1280, 1280);

    // Apple-style Precision Hairline Outer Titanium Border
    ctx.lineWidth = 16;
    ctx.strokeStyle = primaryColor;
    ctx.beginPath();
    ctx.roundRect(20, 20, 1240, 1240, 36);
    ctx.stroke();

    // Inner laser guide line (0.5px Apple hairline aesthetic)
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = isGold ? 'rgba(229, 193, 88, 0.45)' : 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.roundRect(46, 46, 1188, 1188, 24);
    ctx.stroke();

    // Micro Specification Laser Header (Apple Industrial Design)
    ctx.fillStyle = isGold ? 'rgba(229, 193, 88, 0.85)' : 'rgba(245, 245, 247, 0.55)';
    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('SPATIAL ARCHIVE // 4K RETINA ENGINE', 64, 82);

    ctx.textAlign = 'right';
    ctx.fillText(isGold ? '24K EXECUTIVE VAULT' : 'VERIFIED PROXY CORE', 1216, 82);

    // Category Badge (Apple Frosted Glass Capsule)
    const catGrad = ctx.createLinearGradient(64, 110, 380, 110);
    catGrad.addColorStop(0, isGold ? 'rgba(229, 193, 88, 0.2)' : 'rgba(41, 151, 255, 0.2)');
    catGrad.addColorStop(1, isGold ? 'rgba(212, 175, 55, 0.08)' : 'rgba(0, 113, 227, 0.08)');
    ctx.fillStyle = catGrad;
    ctx.beginPath();
    ctx.roundRect(64, 110, 320, 68, 18);
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = isGold ? 'rgba(229, 193, 88, 0.5)' : 'rgba(41, 151, 255, 0.5)';
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText((game.category || 'ACTION').toUpperCase(), 224, 152);

    // Star Rating & Plays Capsule
    ctx.fillStyle = isGold ? 'rgba(229, 193, 88, 0.15)' : 'rgba(255, 255, 255, 0.08)';
    ctx.strokeStyle = isGold ? 'rgba(229, 193, 88, 0.35)' : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(860, 110, 356, 68, 18);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isGold ? '#fef08a' : '#fbbf24';
    ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      isGold
        ? `★ ${game.rating}  •  24K VIP`
        : `★ ${game.rating}  •  ${game.plays ? Math.floor(game.plays / 1000) + 'K PLAYS' : 'TOP RATED'}`,
      1038,
      152
    );

    // Custom 4K Game Cover Artwork (1100 x 580 px)
    drawGameCoverArt(ctx, game, 90, 206, 1100, 580, isGold);

    // Hairline frame around cover art
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = isGold ? 'rgba(229, 193, 88, 0.4)' : 'rgba(255, 255, 255, 0.22)';
    ctx.beginPath();
    ctx.roundRect(90, 206, 1100, 580, 20);
    ctx.stroke();

    // Holographic Security Foil Seal (Bottom-right corner of artwork)
    const holoX = 1120;
    const holoY = 720;
    const holoGrad = ctx.createRadialGradient(holoX, holoY, 4, holoX, holoY, 42);
    holoGrad.addColorStop(0, '#ffffff');
    holoGrad.addColorStop(0.3, '#2997ff');
    holoGrad.addColorStop(0.6, '#af52de');
    holoGrad.addColorStop(0.85, '#e5c158');
    holoGrad.addColorStop(1, '#30d158');
    ctx.fillStyle = holoGrad;
    ctx.beginPath();
    ctx.arc(holoX, holoY, 36, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.arc(holoX, holoY, 30, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#05070c';
    ctx.font = '800 13px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('APPLE', holoX, holoY - 3);
    ctx.font = '700 11px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
    ctx.fillText('4K PRO', holoX, holoY + 12);

    // Game Title text with precision Apple typography
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 56px -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif';
    ctx.textAlign = 'center';

    const words = (game.title || '').split(' ');
    if (words.length > 3) {
      ctx.fillText(words.slice(0, 2).join(' '), 640, 875);
      ctx.font = '600 44px -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif';
      ctx.fillStyle = 'rgba(245, 245, 247, 0.85)';
      ctx.fillText(words.slice(2).join(' '), 640, 935);
    } else if (words.length > 1) {
      ctx.fillText(game.title, 640, 900);
    } else {
      ctx.fillText(game.title, 640, 900);
    }

    // "PLAY" Apple-style Titanium Capsule Button
    const btnGrad = ctx.createLinearGradient(340, 1020, 940, 1140);
    if (isGold) {
      btnGrad.addColorStop(0, '#fef08a');
      btnGrad.addColorStop(0.5, '#e5c158');
      btnGrad.addColorStop(1, '#ca8a04');
    } else {
      btnGrad.addColorStop(0, '#2997ff');
      btnGrad.addColorStop(1, '#0071e3');
    }
    ctx.fillStyle = btnGrad;
    ctx.beginPath();
    ctx.roundRect(340, 1020, 600, 116, 32);
    ctx.fill();

    // Specular top highlight on button
    const btnHighlight = ctx.createLinearGradient(340, 1020, 340, 1070);
    btnHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    btnHighlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = btnHighlight;
    ctx.beginPath();
    ctx.roundRect(344, 1022, 592, 52, 28);
    ctx.fill();

    ctx.fillStyle = isGold ? '#05070c' : '#ffffff';
    ctx.font = '700 42px -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(isGold ? '👑 PLAY 24K VIP' : '▶ PLAY NOW', 640, 1094);

    // Laser serial code at bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "SF Pro Text", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      `MODEL: APL-${(game.id || 'GAME').toUpperCase().replace(/[^A-Z0-9]/g, '')} // SPATIAL-ARCADE-4K`,
      640,
      1200
    );
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  if (renderer && renderer.capabilities) {
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  } else {
    texture.anisotropy = 16;
  }
  texture.needsUpdate = true;
  return texture;
}

// Generate circular soft contact shadow texture
function createContactShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
    grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.5)');
    grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
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
  isVipUnlocked = false,
  focusedGame = null,
}) => {
  const mountRef = useRef(null);
  const hoveredGameRef = useRef(null);
  const [sceneReady, setSceneReady] = useState(false);

  // Stable callback refs
  const onHoverGameRef = useRef(onHoverGame);
  onHoverGameRef.current = onHoverGame;

  const onSelectGameRef = useRef(onSelectGame);
  onSelectGameRef.current = onSelectGame;

  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  // Scene references
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const gameMeshesRef = useRef([]);

  // Theme elements refs
  const dirLight1Ref = useRef(null);
  const dirLight2Ref = useRef(null);
  const centerPointLightRef = useRef(null);
  const gridHelperRef = useRef(null);
  const floorRingRef = useRef(null);
  const particlesRef = useRef(null);

  // Drag & Orbit state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraAngleRef = useRef({ theta: 0, phi: 0.25, radius: 24 });
  const targetCameraAngleRef = useRef({ theta: 0, phi: 0.25, radius: 24 });
  const mouseScreenRef = useRef(new THREE.Vector2(-9999, -9999));
  const mouseNormalizedRef = useRef({ x: 0, y: 0 });
  const raycasterRef = useRef(new THREE.Raycaster());

  // Cinematic Camera Fly-In Transition state (Apple product style)
  const isTransitioningRef = useRef(false);
  const transitionStartRef = useRef(0);
  const transitionDurationRef = useRef(420); // ms
  const transitionStartPosRef = useRef(new THREE.Vector3());
  const transitionTargetPosRef = useRef(new THREE.Vector3());
  const transitionTargetLookRef = useRef(new THREE.Vector3());
  const transitionGameRef = useRef(null);

  // Fly to focused game when selected from catalog drawer
  useEffect(() => {
    if (!focusedGame) return;
    const found = gameMeshesRef.current.find((item) => item.game.id === focusedGame.id);
    if (found) {
      const pos = found.targetPosition;
      const angle = Math.atan2(pos.x, pos.z);
      targetCameraAngleRef.current.theta = angle;
      targetCameraAngleRef.current.phi = Math.max(0.05, Math.min(0.4, (pos.y / 20) * 0.3));
      const dist = Math.sqrt(pos.x * pos.x + pos.z * pos.z);
      targetCameraAngleRef.current.radius = Math.max(16, dist + 6);
      hoveredGameRef.current = found.game;
      if (onHoverGameRef.current) {
        onHoverGameRef.current(found.game);
      }
    }
  }, [focusedGame]);

  // Setup Three.js scene ONCE on mount
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.014);
    sceneRef.current = scene;
    setSceneReady(true);

    // 2. Camera with cinematic focal length
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 6.5, 25);
    cameraRef.current = camera;

    // 3. Renderer configured for Apple-grade Retina 4K sharpness
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting Rig (Apple Key, Specular Rim, Ambient Fill)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    // Studio Key Light (Warm titanium soft white)
    const dirLight1 = new THREE.DirectionalLight(0xfffaed, 2.6);
    dirLight1.position.set(20, 26, 18);
    scene.add(dirLight1);
    dirLight1Ref.current = dirLight1;

    // Horizon Specular Rim Light (Cupertino electric blue / champagne gold)
    const dirLight2 = new THREE.DirectionalLight(0x2997ff, 2.4);
    dirLight2.position.set(-22, 14, -18);
    scene.add(dirLight2);
    dirLight2Ref.current = dirLight2;

    // Center ambient pedestal glow
    const centerPointLight = new THREE.PointLight(0x2997ff, 2.2, 60);
    centerPointLight.position.set(0, 2, 0);
    scene.add(centerPointLight);
    centerPointLightRef.current = centerPointLight;

    // 5. Apple Spatial Micro-Particle Atmosphere
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 95;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 65;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 95;

      const c = new THREE.Color(
        i % 4 === 0 ? 0x2997ff : i % 4 === 1 ? 0xf5f5f7 : i % 4 === 2 ? 0x86868b : 0xe5c158
      );
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.24,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 6. Apple Studio Titanium Pedestal & Concentric Hairline Rings
    const pedestalGroup = new THREE.Group();
    const pedestalGeo = new THREE.CylinderGeometry(52, 54, 0.5, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x05070c,
      roughness: 0.22,
      metalness: 0.85,
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalMesh.position.y = -4.75;
    pedestalGroup.add(pedestalMesh);

    // Concentric etched titanium hairline rings
    const ringRadii = [8, 14, 20, 26, 32, 38, 44, 50];
    ringRadii.forEach((rad) => {
      const ringGeo = new THREE.RingGeometry(rad, rad + 0.12, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x2997ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -4.48;
      pedestalGroup.add(ring);
    });

    scene.add(pedestalGroup);
    gridHelperRef.current = pedestalGroup;

    // Center focal ring
    const focalRingGeo = new THREE.RingGeometry(4.8, 5.05, 64);
    const focalRingMat = new THREE.MeshBasicMaterial({
      color: 0x2997ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const floorRing = new THREE.Mesh(focalRingGeo, focalRingMat);
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.y = -4.47;
    scene.add(floorRing);
    floorRingRef.current = floorRing;

    // 7. Mouse and Resize Handlers
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    const handlePointerDown = (e) => {
      if (isTransitioningRef.current) return;
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseScreenRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseScreenRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Normalized coordinates for magnetic hover tilt
      mouseNormalizedRef.current.x = mouseScreenRef.current.x;
      mouseNormalizedRef.current.y = mouseScreenRef.current.y;

      if (isDraggingRef.current && !isTransitioningRef.current) {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;

        targetCameraAngleRef.current.theta -= deltaX * 0.0055;
        targetCameraAngleRef.current.phi = Math.max(
          -0.2,
          Math.min(0.85, targetCameraAngleRef.current.phi + deltaY * 0.0045)
        );

        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e) => {
      if (isTransitioningRef.current) return;
      e.preventDefault();
      targetCameraAngleRef.current.radius = Math.max(
        8,
        Math.min(75, targetCameraAngleRef.current.radius + e.deltaY * 0.024)
      );
    };

    // Click handler with Apple-style Cinematic Fly-In
    const handleClick = (e) => {
      if (isTransitioningRef.current) return;
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

        const clickableMeshes = gameMeshesRef.current.map((item) => item.clickBox);
        const intersects = raycasterRef.current.intersectObjects(clickableMeshes);

        if (intersects.length > 0) {
          const hitMesh = intersects[0].object;
          const found = gameMeshesRef.current.find(
            (item) => item.clickBox === hitMesh || item.cartridge === hitMesh
          );
          if (found) {
            soundFX.playSelect();

            // Initiate Apple Cinematic Fly-In Zoom
            isTransitioningRef.current = true;
            transitionStartRef.current = performance.now();
            transitionGameRef.current = found.game;

            // Compute current camera position
            transitionStartPosRef.current.copy(cameraRef.current.position);

            // Compute target position directly facing the cartridge
            const cPos = new THREE.Vector3();
            found.cartridge.getWorldPosition(cPos);

            // Normal vector towards center
            const dir = new THREE.Vector3().copy(cPos).normalize();
            transitionTargetPosRef.current.set(
              cPos.x + dir.x * 3.4,
              cPos.y + 0.1,
              cPos.z + dir.z * 3.4
            );
            transitionTargetLookRef.current.copy(cPos);
          }
        }
      }
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('click', handleClick);

    // 8. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);
      const elapsedTime = clock.getElapsedTime();

      // Handle Apple Cinematic Fly-In Transition
      if (isTransitioningRef.current && cameraRef.current) {
        const now = performance.now();
        const elapsedMs = now - transitionStartRef.current;
        const progress = Math.min(1, elapsedMs / transitionDurationRef.current);

        // Apple signature cubic bezier ease-out (0.16, 1, 0.3, 1)
        const t = progress;
        const ease = 1 - Math.pow(1 - t, 3.8);

        camera.position.lerpVectors(
          transitionStartPosRef.current,
          transitionTargetPosRef.current,
          ease
        );
        camera.lookAt(transitionTargetLookRef.current);

        if (progress >= 1) {
          isTransitioningRef.current = false;
          if (onSelectGameRef.current && transitionGameRef.current) {
            onSelectGameRef.current(transitionGameRef.current);
          }
        }
      } else {
        // Smooth Auto-Rotate with inertial momentum
        if (autoRotateRef.current && !isDraggingRef.current) {
          targetCameraAngleRef.current.theta += 0.0016;
        }

        // Apple-style damped camera interpolation (lerp)
        cameraAngleRef.current.theta +=
          (targetCameraAngleRef.current.theta - cameraAngleRef.current.theta) * 0.075;
        cameraAngleRef.current.phi +=
          (targetCameraAngleRef.current.phi - cameraAngleRef.current.phi) * 0.075;
        cameraAngleRef.current.radius +=
          (targetCameraAngleRef.current.radius - cameraAngleRef.current.radius) * 0.075;

        const camX =
          cameraAngleRef.current.radius *
          Math.sin(cameraAngleRef.current.theta) *
          Math.cos(cameraAngleRef.current.phi);
        const camY =
          cameraAngleRef.current.radius * Math.sin(cameraAngleRef.current.phi) + 2.4;
        const camZ =
          cameraAngleRef.current.radius *
          Math.cos(cameraAngleRef.current.theta) *
          Math.cos(cameraAngleRef.current.phi);

        camera.position.set(camX, camY, camZ);
        camera.lookAt(0, 0.5, 0);

        // Raycasting for hover detection
        raycasterRef.current.setFromCamera(mouseScreenRef.current, camera);
        const clickableMeshes = gameMeshesRef.current.map((item) => item.clickBox);
        const intersects = raycasterRef.current.intersectObjects(clickableMeshes);

        let currentlyHovered = null;
        if (intersects.length > 0) {
          const hitMesh = intersects[0].object;
          const found = gameMeshesRef.current.find(
            (item) => item.clickBox === hitMesh || item.cartridge === hitMesh
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
      }

      // Rotate micro-particles & floor ring
      particles.rotation.y = elapsedTime * 0.015;
      floorRing.rotation.z = -elapsedTime * 0.08;

      // Animate Game 3D Cartridges: Floating sine wave + Magnetic Hover Tilt
      const mouseX = mouseNormalizedRef.current.x;
      const mouseY = mouseNormalizedRef.current.y;

      gameMeshesRef.current.forEach((item, index) => {
        item.mesh.position.lerp(item.targetPosition, 0.08);

        const isHovered = item.game.id === hoveredGameRef.current?.id;

        // Smooth levitation with inertia
        const floatOffset =
          Math.sin(elapsedTime * 1.5 + index * 0.5) * 0.2 + (isHovered ? 0.85 : 0);
        item.cartridge.position.y = floatOffset;

        // Magnetic Hover Tilt: Tilt slightly toward cursor when hovered
        if (isHovered) {
          const lookAngle = Math.atan2(
            camera.position.x - item.mesh.position.x,
            camera.position.z - item.mesh.position.z
          );
          item.mesh.rotation.y = lookAngle;

          // Apple spring tilt
          const targetTiltX = -mouseY * 0.25;
          const targetTiltY = mouseX * 0.25;
          item.cartridge.rotation.x += (targetTiltX - item.cartridge.rotation.x) * 0.12;
          item.cartridge.rotation.y += (targetTiltY - item.cartridge.rotation.y) * 0.12;
        } else {
          item.mesh.rotation.y =
            Math.atan2(item.mesh.position.x, item.mesh.position.z) + Math.PI;
          item.cartridge.rotation.x += (0 - item.cartridge.rotation.x) * 0.1;
          item.cartridge.rotation.y += (0 - item.cartridge.rotation.y) * 0.1;
          item.cartridge.rotation.z = Math.sin(elapsedTime * 1.2 + index) * 0.025;
        }

        // Dynamic Soft Contact Shadow beneath each cartridge
        if (item.shadowDisc) {
          const shadowScale = isHovered ? 1.4 : 1.0 + Math.sin(elapsedTime * 1.5) * 0.08;
          item.shadowDisc.scale.set(shadowScale, shadowScale, shadowScale);
          item.shadowDisc.material.opacity = isHovered ? 0.45 : 0.65;
        }

        // Pulse Hologram Base Ring
        if (item.baseRing) {
          item.baseRing.rotation.z += 0.02;
          const ringScale = isHovered ? 1.35 : 1 + Math.sin(elapsedTime * 2.8) * 0.05;
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

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Build Sculpted 3D Cartridge Models whenever games list or layout changes
  useEffect(() => {
    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    if (!scene) return;

    // Dispose old meshes
    gameMeshesRef.current.forEach((item) => {
      scene.remove(item.mesh);
      if (item.cartridge) {
        item.cartridge.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
      if (item.shadowDisc) {
        item.shadowDisc.geometry.dispose();
        item.shadowDisc.material.dispose();
      }
      if (item.baseRing) {
        item.baseRing.geometry.dispose();
        item.baseRing.material.dispose();
      }
    });
    gameMeshesRef.current = [];

    const total = games.length;
    if (total === 0) return;

    // Contact shadow texture for all floor discs
    const contactShadowTex = createContactShadowTexture();

    games.forEach((game, index) => {
      const group = new THREE.Group();

      // Layout positioning logic (Amphitheater Coliseum, IMAX Grid, DNA Helix)
      const targetPos = new THREE.Vector3();

      if (layoutMode === 'ring') {
        const tierCapacities = [14, 20, 26, 32, 38, 44, 50];
        const tierRadii = [12.5, 18.0, 23.5, 29.0, 34.5, 40.0, 46.0];

        let accumulated = 0;
        let tier = 0;
        let indexInTier = 0;
        let itemsInThisTier = 14;

        for (let t = 0; t < tierCapacities.length; t++) {
          const cap = tierCapacities[t];
          const remaining = total - accumulated;
          const countForThisTier =
            t === tierCapacities.length - 1
              ? Math.max(1, remaining)
              : Math.min(cap, Math.max(1, remaining));

          if (index < accumulated + countForThisTier || t === tierCapacities.length - 1) {
            tier = t;
            indexInTier = index - accumulated;
            itemsInThisTier = countForThisTier;
            break;
          }
          accumulated += countForThisTier;
        }

        const tierRadius = tierRadii[tier] || 46 + (tier - 6) * 5.5;
        const tierY = tier * 3.8;
        const tierAngleOffset = tier * 0.32;
        const angle = (indexInTier / itemsInThisTier) * Math.PI * 2 + tierAngleOffset;

        targetPos.x = Math.sin(angle) * tierRadius;
        targetPos.z = Math.cos(angle) * tierRadius;
        targetPos.y = tierY;
      } else if (layoutMode === 'grid') {
        const cols = Math.min(10, Math.max(4, Math.ceil(Math.sqrt(total * 1.1))));
        const col = index % cols;
        const row = Math.floor(index / cols);
        const totalRows = Math.ceil(total / cols);
        const spacingX = 5.2;
        const spacingY = 4.6;

        const curvedRadius = 32 + (totalRows > 12 ? 8 : 0);
        const angle = (col - (cols - 1) / 2) * (spacingX / curvedRadius);

        targetPos.x = Math.sin(angle) * curvedRadius;
        targetPos.z = Math.cos(angle) * curvedRadius - curvedRadius;
        targetPos.y = (totalRows / 2 - row) * spacingY;
      } else if (layoutMode === 'helix') {
        const angle = index * 0.36;
        const helixRadius = 16.5;
        targetPos.x = Math.sin(angle) * helixRadius;
        targetPos.z = Math.cos(angle) * helixRadius;
        targetPos.y = (index - total / 2) * 0.95;
      }

      group.position.set(targetPos.x * 1.4, targetPos.y + 5, targetPos.z * 1.4);

      // --- SCULPTED 3D CARTRIDGE MODEL ASSEMBLY ---
      const cartridgeAssembly = new THREE.Group();

      const isGold = isVipUnlocked || game.vip;
      const edgeBaseColor = isGold ? '#f59e0b' : game.color || '#00ffcc';
      const bodyTitaniumColor = isGold ? 0x1f1708 : 0x0c0f17;

      // 1. Main Outer Titanium Chassis
      const bodyGeo = new THREE.BoxGeometry(2.6, 3.4, 0.42);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: bodyTitaniumColor,
        roughness: isGold ? 0.22 : 0.28,
        metalness: isGold ? 0.88 : 0.78,
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      cartridgeAssembly.add(bodyMesh);

      // 2. Top Grip Grooves (3 horizontal recessed slots molded into top)
      for (let g = 0; g < 3; g++) {
        const grooveGeo = new THREE.BoxGeometry(1.9, 0.05, 0.44);
        const grooveMat = new THREE.MeshStandardMaterial({
          color: 0x040609,
          roughness: 0.6,
          metalness: 0.3,
        });
        const groove = new THREE.Mesh(grooveGeo, grooveMat);
        groove.position.set(0, 1.45 - g * 0.14, 0);
        cartridgeAssembly.add(groove);
      }

      // 3. Recessed 4K Front Artwork Screen
      const frontTex = createGameTexture(game, isVipUnlocked, renderer);
      const screenGeo = new THREE.PlaneGeometry(2.38, 3.16);
      const screenMat = new THREE.MeshStandardMaterial({
        map: frontTex,
        roughness: isGold ? 0.12 : 0.18,
        metalness: isGold ? 0.55 : 0.35,
        emissive: new THREE.Color(edgeBaseColor),
        emissiveIntensity: isGold ? 0.22 : 0.12,
      });
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.set(0, 0, 0.215);
      cartridgeAssembly.add(screenMesh);

      // 4. Protective Clear-Coat Acrylic Glass Lens
      const glassGeo = new THREE.PlaneGeometry(2.38, 3.16);
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.04,
        metalness: 0.1,
        transparent: true,
        opacity: 0.22,
      });
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      glassMesh.position.set(0, 0, 0.22);
      cartridgeAssembly.add(glassMesh);

      // 5. Gold Connector Terminal Blades (At bottom bay)
      const goldBladeMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        roughness: 0.08,
        metalness: 0.96,
      });
      for (let pin = 0; pin < 8; pin++) {
        const pinGeo = new THREE.BoxGeometry(0.12, 0.2, 0.04);
        const pinMesh = new THREE.Mesh(pinGeo, goldBladeMat);
        pinMesh.position.set(-0.85 + pin * 0.24, -1.72, 0);
        cartridgeAssembly.add(pinMesh);
      }

      // Clickable Raycast Hit Box
      const hitBoxGeo = new THREE.BoxGeometry(2.7, 3.5, 0.6);
      const hitBoxMat = new THREE.MeshBasicMaterial({ visible: false });
      const clickBox = new THREE.Mesh(hitBoxGeo, hitBoxMat);
      cartridgeAssembly.add(clickBox);

      group.add(cartridgeAssembly);

      // Dynamic Contact Floor Shadow Disc
      const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
      const shadowMat = new THREE.MeshBasicMaterial({
        map: contactShadowTex,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
      });
      const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
      shadowDisc.rotation.x = -Math.PI / 2;
      shadowDisc.position.y = -3.8;
      group.add(shadowDisc);

      // Floor Halo Ring (Apple Vision Pro subtle floor glow)
      const ringGeo = new THREE.RingGeometry(1.4, 1.56, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(isGold ? '#e5c158' : game.color || '#2997ff'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isGold ? 0.55 : 0.4,
      });
      const baseRing = new THREE.Mesh(ringGeo, ringMat);
      baseRing.rotation.x = Math.PI / 2;
      baseRing.position.y = -3.78;
      group.add(baseRing);

      scene.add(group);

      gameMeshesRef.current.push({
        mesh: group,
        cartridge: cartridgeAssembly,
        clickBox,
        shadowDisc,
        baseRing,
        game,
        targetPosition: targetPos,
        originalY: targetPos.y,
      });
    });
  }, [sceneReady, games, layoutMode, isVipUnlocked]);

  // Update scene atmosphere when VIP mode is toggled
  useEffect(() => {
    if (!sceneReady) return;
    const isGold = isVipUnlocked;

    if (dirLight1Ref.current) {
      dirLight1Ref.current.color.setHex(isGold ? 0xfffaed : 0xffffff);
    }
    if (dirLight2Ref.current) {
      dirLight2Ref.current.color.setHex(isGold ? 0xe5c158 : 0x2997ff);
    }
    if (centerPointLightRef.current) {
      centerPointLightRef.current.color.setHex(isGold ? 0xe5c158 : 0x2997ff);
    }
    if (floorRingRef.current && floorRingRef.current.material) {
      floorRingRef.current.material.color.setHex(isGold ? 0xe5c158 : 0x2997ff);
    }
  }, [isVipUnlocked, sceneReady]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-[#040508]">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};
