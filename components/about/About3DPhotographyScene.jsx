"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Volume2, VolumeX, X, Sparkles, Compass, Aperture, Eye, ArrowUpRight, ChevronDown } from "lucide-react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Gallery photo assets from Vivek Pali's portfolio
const FLOATING_PHOTOS = [
  {
    id: "scotland-dawn",
    title: "Sacred Scottish Horizons",
    category: "Highland Landscapes",
    location: "Rannoch Moor & Glen Coe",
    src: "/media/2024/12/LS1-scaled.jpg",
    optics: "85mm f/1.4 Prime • ISO 100",
    pos: [-2.6, 1.1, -1.2],
    rot: [0.08, 0.28, -0.06],
    scale: [1.6, 1.05],
  },
  {
    id: "wedding-embrace",
    title: "Every Love Story Deserves a Frame",
    category: "Wedding Documentary",
    location: "Highland Estate Ceremony",
    src: "/media/2024/05/17-scaled.jpg",
    optics: "50mm f/1.2 • ISO 200",
    pos: [2.5, 0.95, -0.9],
    rot: [-0.06, -0.32, 0.05],
    scale: [1.25, 1.45],
  },
  {
    id: "loch-mist",
    title: "Morning Mist Rising",
    category: "Fine Art Landscapes",
    location: "Loch Lomond & The Trossachs",
    src: "/media/2024/12/LS4-scaled.jpg",
    optics: "70mm f/2.8 • ISO 100",
    pos: [-2.8, -1.2, -0.5],
    rot: [-0.05, 0.22, 0.04],
    scale: [1.7, 0.95],
  },
  {
    id: "night-celebration",
    title: "Radiant Joy in Edinburgh",
    category: "Couples & Pre-Wedding",
    location: "Edinburgh Old Town",
    src: "/media/2024/05/18-scaled.jpg",
    optics: "35mm f/1.4 • ISO 800",
    pos: [2.7, -1.15, -0.6],
    rot: [0.07, -0.25, -0.05],
    scale: [1.35, 1.15],
  },
  {
    id: "monochrome-vows",
    title: "Unspoken Devotion",
    category: "Intimate Wedding Moments",
    location: "Glasgow Heritage Hall",
    src: "/media/2024/05/20-scaled.jpg",
    optics: "85mm f/1.8 • ISO 400",
    pos: [0.0, 1.75, -2.0],
    rot: [0.15, 0.0, 0.0],
    scale: [1.5, 1.15],
  },
];

// Procedural DSLR Camera Generator (Magnesium chassis, tactile dials, multi-element prime lens, optical glass)
function buildRealisticDSLR() {
  const root = new THREE.Group();

  // 1. Camera Body Chassis (Matte magnesium with bevels)
  const chassisGeo = new THREE.BoxGeometry(1.65, 1.1, 0.85);
  const chassisMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.52,
    metalness: 0.38,
  });
  const chassis = new THREE.Mesh(chassisGeo, chassisMat);
  chassis.castShadow = true;
  chassis.receiveShadow = true;
  root.add(chassis);

  // 2. Leatherette Textured Handgrip
  const gripGeo = new THREE.BoxGeometry(0.45, 1.05, 0.55);
  const gripMat = new THREE.MeshStandardMaterial({
    color: 0x111113,
    roughness: 0.88,
    metalness: 0.08,
  });
  const grip = new THREE.Mesh(gripGeo, gripMat);
  grip.position.set(-0.7, -0.02, 0.22);
  chassis.add(grip);

  // 3. Pentaprism Optical Viewfinder Housing
  const prismGeo = new THREE.ConeGeometry(0.42, 0.34, 4);
  const prismMat = new THREE.MeshStandardMaterial({
    color: 0x1c1c20,
    roughness: 0.45,
    metalness: 0.35,
  });
  const prism = new THREE.Mesh(prismGeo, prismMat);
  prism.rotation.y = Math.PI / 4;
  prism.position.set(0.12, 0.68, 0.02);
  root.add(prism);

  // Hot Shoe Flash Mount
  const hotShoeGeo = new THREE.BoxGeometry(0.24, 0.04, 0.26);
  const hotShoeMat = new THREE.MeshStandardMaterial({
    color: 0x4a4a50,
    roughness: 0.25,
    metalness: 0.85,
  });
  const hotShoe = new THREE.Mesh(hotShoeGeo, hotShoeMat);
  hotShoe.position.set(0.12, 0.86, 0.02);
  root.add(hotShoe);

  // 4. Mode & Exposure Dials
  const dialGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.09, 24);
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0x222225,
    roughness: 0.3,
    metalness: 0.8,
  });
  const modeDial = new THREE.Mesh(dialGeo, dialMat);
  modeDial.position.set(-0.55, 0.58, 0.05);
  root.add(modeDial);

  const commandDial = new THREE.Mesh(dialGeo, dialMat);
  commandDial.position.set(0.68, 0.58, 0.05);
  root.add(commandDial);

  // Golden Shutter Release Button
  const shutterGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.06, 20);
  const shutterMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37, // Polished luxury gold
    roughness: 0.22,
    metalness: 0.88,
  });
  const shutter = new THREE.Mesh(shutterGeo, shutterMat);
  shutter.position.set(-0.68, 0.58, 0.3);
  root.add(shutter);

  // Red Dot Luxury Brand Emblem
  const dotGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.02, 20);
  const dotMat = new THREE.MeshStandardMaterial({
    color: 0xb91c1c,
    roughness: 0.3,
    metalness: 0.3,
  });
  const redDot = new THREE.Mesh(dotGeo, dotMat);
  redDot.rotation.x = Math.PI / 2;
  redDot.position.set(0.65, 0.32, 0.43);
  root.add(redDot);

  // 5. 85mm f/1.4 Luxury Prime Lens Barrel System
  const lensGroup = new THREE.Group();
  lensGroup.position.set(0.12, 0, 0.42);

  // Lens Base Flange
  const flangeGeo = new THREE.CylinderGeometry(0.48, 0.5, 0.18, 36);
  const flangeMat = new THREE.MeshStandardMaterial({
    color: 0x141416,
    roughness: 0.35,
    metalness: 0.75,
  });
  const flange = new THREE.Mesh(flangeGeo, flangeMat);
  flange.rotation.x = Math.PI / 2;
  lensGroup.add(flange);

  // Main Ribbed Focus Barrel
  const barrelGeo = new THREE.CylinderGeometry(0.45, 0.47, 0.95, 36);
  const barrelMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.4,
    metalness: 0.65,
  });
  const barrel = new THREE.Mesh(barrelGeo, barrelMat);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.z = 0.52;
  barrel.castShadow = true;
  lensGroup.add(barrel);

  // Signature Crimson Accent Ring
  const ringGeo = new THREE.TorusGeometry(0.455, 0.022, 16, 36);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xdc2626,
    roughness: 0.25,
    metalness: 0.6,
  });
  const redRing = new THREE.Mesh(ringGeo, ringMat);
  redRing.position.z = 0.92;
  lensGroup.add(redRing);

  // Outer Lens Hood Lip
  const hoodLipGeo = new THREE.CylinderGeometry(0.48, 0.45, 0.22, 36);
  const hoodLipMat = new THREE.MeshStandardMaterial({
    color: 0x121214,
    roughness: 0.3,
    metalness: 0.8,
  });
  const hoodLip = new THREE.Mesh(hoodLipGeo, hoodLipMat);
  hoodLip.rotation.x = Math.PI / 2;
  hoodLip.position.z = 1.05;
  lensGroup.add(hoodLip);

  // 6. Dynamic 8-Blade Aperture Mechanism
  const apertureGroup = new THREE.Group();
  apertureGroup.position.z = 0.55;
  const blades = [];

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, 0);
  bladeShape.quadraticCurveTo(0.18, 0.08, 0.34, 0.26);
  bladeShape.lineTo(0.25, 0.36);
  bladeShape.quadraticCurveTo(0.1, 0.18, 0, 0);
  const bladeGeo = new THREE.ShapeGeometry(bladeShape);
  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0x1c1e22,
    roughness: 0.65,
    metalness: 0.25,
    side: THREE.DoubleSide,
  });

  const BLADE_COUNT = 8;
  for (let i = 0; i < BLADE_COUNT; i++) {
    const angle = (i * Math.PI * 2) / BLADE_COUNT;
    const bladePivot = new THREE.Group();
    bladePivot.rotation.z = angle;

    const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
    bladeMesh.position.set(0.14, 0, 0);
    bladePivot.add(bladeMesh);

    apertureGroup.add(bladePivot);
    blades.push({ pivot: bladePivot, baseAngle: angle, mesh: bladeMesh });
  }
  lensGroup.add(apertureGroup);

  // 7. Multi-Coated Curved Optical Glass Elements
  const frontGlassGeo = new THREE.SphereGeometry(0.43, 32, 24);
  const frontGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x1e354d,
    roughness: 0.06,
    metalness: 0.15,
    transmission: 0.92,
    ior: 1.58,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  });
  const frontGlass = new THREE.Mesh(frontGlassGeo, frontGlassMat);
  frontGlass.position.z = 0.96;
  frontGlass.scale.set(1, 1, 0.22);
  lensGroup.add(frontGlass);

  // Rear Internal Element with warm anti-reflective coating
  const rearGlassGeo = new THREE.SphereGeometry(0.38, 24, 20);
  const rearGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x2e243f, // Violet/amber anti-reflective coat
    roughness: 0.08,
    transmission: 0.88,
    ior: 1.52,
    reflectivity: 0.8,
  });
  const rearGlass = new THREE.Mesh(rearGlassGeo, rearGlassMat);
  rearGlass.position.z = 0.28;
  rearGlass.scale.set(1, 1, 0.18);
  lensGroup.add(rearGlass);

  root.add(lensGroup);

  return { root, blades, frontGlass, lensGroup };
}

// Procedural Web Audio Synthetic Mechanical DSLR Shutter
function triggerMechanicalShutter(isMuted) {
  if (isMuted) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();

    // 1. Mirror slap low thump
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.065);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.065);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.065);

    // 2. High-speed shutter curtain release click
    const bufferSize = Math.floor(ctx.sampleRate * 0.06);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.011));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 2900;
    filter.Q.value = 3.2;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.42, ctx.currentTime + 0.03);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(ctx.currentTime + 0.03);
  } catch {
    // Graceful silent fallback
  }
}

export default function About3DPhotographyScene() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const flashRef = useRef(null);
  const sceneState = useRef(null);

  const [activePhoto, setActivePhoto] = useState(null);
  const [apertureFStop, setApertureFStop] = useState("f/1.4");
  const [isMuted, setIsMuted] = useState(false);
  const [isHoveringCamera, setIsHoveringCamera] = useState(false);

  // Aperture & Shutter Capture Trigger
  const handleShutterCapture = useCallback(() => {
    triggerMechanicalShutter(isMuted);

    // Camera flash overlay
    if (flashRef.current) {
      gsap.killTweensOf(flashRef.current);
      gsap.fromTo(
        flashRef.current,
        { opacity: 0.95 },
        { opacity: 0, duration: 0.5, ease: "power2.out" }
      );
    }

    // Animate 3D Aperture blades snap & reopen
    if (sceneState.current?.blades) {
      sceneState.current.blades.forEach(({ pivot, baseAngle }) => {
        gsap.killTweensOf(pivot.rotation);
        gsap.timeline()
          .to(pivot.rotation, {
            z: baseAngle - 0.45, // Close to f/16
            duration: 0.08,
            ease: "power2.in",
          })
          .to(pivot.rotation, {
            z: baseAngle + 0.12, // Open wide to f/1.4
            duration: 0.35,
            ease: "back.out(1.8)",
          });
      });
    }

    // Cycle aperture display indicator
    setApertureFStop("f/16");
    setTimeout(() => setApertureFStop("f/1.4"), 400);

    // Open signature photograph frame
    setActivePhoto(FLOATING_PHOTOS[1]);
  }, [isMuted]);

  // Main Three.js Lifecycle
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let animFrameId;
    let renderer;
    let scene;
    let camera;
    let cameraGroup = new THREE.Group();
    let framesGroup = new THREE.Group();
    let dustParticles;
    let blades = [];
    let clickableObjects = [];
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    try {
      // 1. Renderer Setup with PBR Studio Lighting
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // 2. Deep Photographic Gallery Scene
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x121413, 0.04);

      // 3. Perspective Camera
      const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
      camera.position.set(0, 0, 6.2);
      scene.add(camera);

      // 4. Studio Lighting Rig
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      // Warm Golden Key Light (Top-Right)
      const keyLight = new THREE.DirectionalLight(0xfff1dc, 2.8);
      keyLight.position.set(5, 7, 6);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      scene.add(keyLight);

      // Cool Scottish Highland Rim Light (Back-Left for Metallic Bevels)
      const rimLight = new THREE.DirectionalLight(0x89b6d8, 1.8);
      rimLight.position.set(-6, -3, -4);
      scene.add(rimLight);

      // Soft Fill Light
      const fillLight = new THREE.DirectionalLight(0xd4d8d1, 1.2);
      fillLight.position.set(0, -5, 4);
      scene.add(fillLight);

      // 5. Build 3D DSLR Camera
      const dslrData = buildRealisticDSLR();
      cameraGroup.add(dslrData.root);
      blades = dslrData.blades;
      cameraGroup.position.set(0, 0, 0);
      scene.add(cameraGroup);

      // Make camera elements clickable
      dslrData.root.traverse((child) => {
        if (child.isMesh) {
          child.userData = { type: "camera" };
          clickableObjects.push(child);
        }
      });

      // 6. Floating Photographic Frames around Camera
      const textureLoader = new THREE.TextureLoader();
      const frameMeshes = [];

      FLOATING_PHOTOS.forEach((photo) => {
        const fGroup = new THREE.Group();
        fGroup.position.set(photo.pos[0], photo.pos[1], photo.pos[2]);
        fGroup.rotation.set(photo.rot[0], photo.rot[1], photo.rot[2]);
        fGroup.userData = { photoData: photo, initialPos: [...photo.pos], initialRot: [...photo.rot] };

        // Mount / Border Frame
        const borderGeo = new THREE.BoxGeometry(photo.scale[0] + 0.12, photo.scale[1] + 0.12, 0.04);
        const borderMat = new THREE.MeshStandardMaterial({
          color: 0x1f2220,
          roughness: 0.6,
          metalness: 0.3,
        });
        const borderMesh = new THREE.Mesh(borderGeo, borderMat);
        borderMesh.castShadow = true;
        fGroup.add(borderMesh);

        // Photograph Print Canvas
        const printGeo = new THREE.PlaneGeometry(photo.scale[0], photo.scale[1]);
        const texture = textureLoader.load(photo.src);
        texture.colorSpace = THREE.SRGBColorSpace;

        const printMat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.25,
          metalness: 0.05,
        });
        const printMesh = new THREE.Mesh(printGeo, printMat);
        printMesh.position.z = 0.022;
        printMesh.userData = { type: "frame", photoData: photo, group: fGroup };
        fGroup.add(printMesh);

        clickableObjects.push(printMesh);
        clickableObjects.push(borderMesh);
        frameMeshes.push(fGroup);
        framesGroup.add(fGroup);
      });
      scene.add(framesGroup);

      // 7. Ambient Bokeh / Dust Particles
      const particleGeo = new THREE.BufferGeometry();
      const particleCount = 220;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 14;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 8;
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0xd8dfcb,
        size: 0.035,
        transparent: true,
        opacity: 0.55,
      });
      dustParticles = new THREE.Points(particleGeo, particleMat);
      scene.add(dustParticles);

      // Store scene references
      sceneState.current = {
        scene,
        camera,
        cameraGroup,
        framesGroup,
        blades,
        frameMeshes,
      };

      // 8. Bidirectional GSAP ScrollTrigger Sequence
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=160%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Stage 1: Camera floats forward, tilts to dramatic 3/4 angle
      scrollTl.to(
        cameraGroup.position,
        {
          x: -1.2,
          y: -0.1,
          z: 1.1,
          ease: "none",
        },
        0
      );
      scrollTl.to(
        cameraGroup.rotation,
        {
          x: 0.18,
          y: -0.55,
          z: -0.08,
          ease: "none",
        },
        0
      );

      // Stage 2: Floating photographs glide into a curated circular arch
      frameMeshes.forEach((mesh, idx) => {
        const offsetAngle = (idx / frameMeshes.length) * Math.PI * 1.4 - 0.7;
        scrollTl.to(
          mesh.position,
          {
            x: Math.sin(offsetAngle) * 3.2 + 0.8,
            y: Math.cos(offsetAngle) * 1.5 - 0.1,
            z: Math.cos(offsetAngle) * 1.2 - 0.8,
            ease: "none",
          },
          0
        );
        scrollTl.to(
          mesh.rotation,
          {
            y: -offsetAngle * 0.7,
            ease: "none",
          },
          0
        );
      });

      // Stage 3: Camera zoom toward viewfinder & aperture breathes
      scrollTl.to(
        camera.position,
        {
          z: 4.8,
          ease: "none",
        },
        0.5
      );

      // 9. Mouse Parallax & Interactive Pointer Events
      const handlePointerMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        targetRotation.x = mouse.y * 0.28;
        targetRotation.y = mouse.x * 0.35;

        // Raycasting for cursor feedback
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(clickableObjects);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          if (hit.userData?.type === "camera") {
            setIsHoveringCamera(true);
          } else {
            setIsHoveringCamera(false);
          }
        } else {
          setIsHoveringCamera(false);
        }
      };

      const handlePointerClick = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(clickableObjects);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          if (hit.userData?.type === "camera") {
            handleShutterCapture();
          } else if (hit.userData?.photoData) {
            triggerMechanicalShutter(isMuted);
            setActivePhoto(hit.userData.photoData);
          }
        }
      };

      window.addEventListener("pointermove", handlePointerMove);
      const domElem = renderer.domElement;
      domElem.addEventListener("click", handlePointerClick);

      // 10. Window Resize Handling
      const handleResize = () => {
        if (!containerRef.current || !renderer || !camera) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      // 11. Render Loop
      const clock = new THREE.Clock();
      const render = () => {
        animFrameId = requestAnimationFrame(render);
        const elapsed = clock.getElapsedTime();

        // Subtle organic floating motion
        const floatY = Math.sin(elapsed * 1.2) * 0.08;
        const floatRot = Math.cos(elapsed * 0.9) * 0.03;

        // Smooth parallax interpolation
        cameraGroup.rotation.x += (targetRotation.x + floatRot - cameraGroup.rotation.x) * 0.06;
        cameraGroup.rotation.y += (targetRotation.y - cameraGroup.rotation.y) * 0.06;
        cameraGroup.position.y += (floatY - cameraGroup.position.y) * 0.05;

        // Gentle floating for each photograph frame
        frameMeshes.forEach((mesh, i) => {
          const wave = Math.sin(elapsed * 1.4 + i * 1.1) * 0.05;
          mesh.position.y = mesh.userData.initialPos[1] + wave;
        });

        // Dust particle drift
        if (dustParticles) {
          dustParticles.rotation.y = elapsed * 0.02;
        }

        renderer.render(scene, camera);
      };
      render();

      return () => {
        cancelAnimationFrame(animFrameId);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("resize", handleResize);
        if (domElem) domElem.removeEventListener("click", handlePointerClick);
        renderer.dispose();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    } catch (err) {
      console.warn("Three.js initialization notice:", err);
    }
  }, [handleShutterCapture, isMuted]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#111311] text-[#FAF9F6] overflow-hidden select-none border-b border-[#D8D2C7]/20"
      aria-label="Interactive 3D Photography Studio Experience"
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block absolute inset-0 cursor-${
          isHoveringCamera ? "pointer" : "grab"
        }`}
      />

      {/* Camera Shutter Flash Effect */}
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 bg-white opacity-0 z-30 transition-opacity"
      />

      {/* Top HUD Telemetry / Metadata Bar */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-start justify-between pointer-events-none">
        <div className="bg-[#181b18]/85 backdrop-blur-md px-5 py-3 rounded-sm border border-white/10 text-white pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-2.5">
            <Compass className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#e5ebd9]">
              PALI 3D STUDIO // OPTICAL SUITE
            </span>
          </div>
          <div className="mt-1 text-xs font-editorial text-stone-200 flex items-center gap-3">
            <span>Vivek Pali &bull; Visual Storyteller</span>
            <span className="text-[#a4b591] font-mono text-[11px]">{apertureFStop} Prime</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            aria-label={isMuted ? "Unmute Shutter Click" : "Mute Shutter Click"}
            className="w-10 h-10 rounded-full bg-[#181b18]/85 backdrop-blur-md border border-white/10 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#222722] transition-colors shadow-xl"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleShutterCapture}
            className="px-4 py-2.5 bg-[#252a24] hover:bg-[#343b32] text-[#f7f8f5] text-[11px] uppercase tracking-[0.22em] font-medium border border-white/15 shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95"
          >
            <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Trigger Shutter</span>
          </button>
        </div>
      </div>

      {/* Interactive Reticle Hint */}
      <div className="absolute left-1/2 bottom-8 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center text-center">
        <div className="px-5 py-2 bg-[#161a16]/85 backdrop-blur-md rounded-full border border-white/15 text-stone-200 text-[11px] tracking-[0.22em] uppercase font-mono shadow-2xl flex items-center gap-2.5">
          <Aperture className="w-3.5 h-3.5 text-[#d4af37] animate-spin" style={{ animationDuration: "12s" }} />
          <span>Click Camera or Floating Frames &bull; Scroll to Compose</span>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-stone-400 font-mono tracking-widest uppercase opacity-75">
          <span>Explore Documentary Story Below</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>

      {/* Expanded Lightbox Modal for Clicked 3D Photograph */}
      {activePhoto && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            onClick={() => setActivePhoto(null)}
            className="absolute inset-0 cursor-pointer"
          />

          <div className="relative max-w-4xl w-full bg-[#181a18] text-[#FAF9F6] border border-white/15 rounded-sm shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              aria-label="Close Lightbox"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-[#242921] text-white border border-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Photo Preview (7 cols) */}
            <div className="relative md:w-3/5 aspect-[4/3] md:aspect-auto min-h-[340px] md:min-h-[460px] bg-black">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Story & Metadata (5 cols) */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#a4b591] block mb-2">
                  {activePhoto.category}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-light text-white leading-tight">
                  {activePhoto.title}
                </h3>
                <p className="text-xs uppercase font-mono tracking-[0.2em] text-stone-400 mt-2">
                  {activePhoto.location}
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-stone-300 font-light leading-relaxed">
                  Documented through natural Scottish light and genuine emotion. Every photograph is captured with an easygoing documentary presence to honor your unique milestone.
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                  Optics: <span className="text-stone-200">{activePhoto.optics}</span>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#d4af37] hover:text-white transition-colors border-b border-[#d4af37] pb-1"
                  >
                    <span>View Portfolio Archive</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

