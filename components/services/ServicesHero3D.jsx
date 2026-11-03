"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Aperture,
  Compass,
  ArrowDown,
  Maximize2,
  X,
  Sliders,
  ChevronRight,
  RotateCw,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

export default function ServicesHero3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const framesGroupRef = useRef(null);
  const textGroupRef = useRef(null);

  // Frame element refs
  const frameRefs = useRef([]);
  frameRefs.current = [];
  const addToFrameRefs = (el) => {
    if (el && !frameRefs.current.includes(el)) {
      frameRefs.current.push(el);
    }
  };

  // State for active focused frame and 3D depth mode
  const [activeFrameId, setActiveFrameId] = useState(null);
  const [depthMode, setDepthMode] = useState("cinematic"); // 'natural', 'cinematic', 'deep'

  // The 5 Curated Exhibition Frames representing Vivek Pali's 3 Service Categories
  // Positioned on the left and right flanks so they never obstruct the central editorial text
  const exhibitionFrames = [
    {
      id: "wedding-ceremony",
      category: "01. Wedding Photography",
      title: "Sacred Vows & Emotion",
      image: "/media/2025/01/2-scaled.jpg",
      aspect: "aspect-[4/5]",
      lens: "85mm Prime ƒ/1.4",
      iso: "ISO 100",
      shutter: "1/500s",
      location: "Highland Chapel",
      // Right flank lower foreground
      transform: {
        x: 41,
        y: 18,
        z: 110,
        rx: 8,
        ry: -18,
        rz: 1.5,
        scale: 0.95,
      },
      widthClass: "w-[170px] sm:w-[220px] md:w-[260px] lg:w-[290px]",
    },
    {
      id: "wedding-sunset",
      category: "01. Wedding Photography",
      title: "Golden Hour Embrace",
      image: "/media/2024/05/17-scaled.jpg",
      aspect: "aspect-[16/11]",
      lens: "50mm Editorial ƒ/1.2",
      iso: "ISO 200",
      shutter: "1/1000s",
      location: "Sunset Ridge",
      // Right flank upper midground
      transform: {
        x: 42,
        y: -20,
        z: -100,
        rx: -8,
        ry: -24,
        rz: -2,
        scale: 0.9,
      },
      widthClass: "w-[180px] sm:w-[230px] md:w-[270px] lg:w-[300px]",
    },
    {
      id: "birthday-wonder",
      category: "02. Birthday Photography",
      title: "Pure Joy & Giggles",
      image: "/media/2024/08/K43.jpg",
      aspect: "aspect-[4/5]",
      lens: "35mm Documentary ƒ/1.8",
      iso: "ISO 400",
      shutter: "1/800s",
      location: "Celebration Garden",
      // Left flank lower foreground
      transform: {
        x: -41,
        y: 18,
        z: 120,
        rx: -8,
        ry: 18,
        rz: -2,
        scale: 0.95,
      },
      widthClass: "w-[170px] sm:w-[220px] md:w-[260px] lg:w-[290px]",
    },
    {
      id: "events-banquet",
      category: "03. Events & Celebrations",
      title: "Midnight Grandeur",
      image: "/media/2024/05/10-scaled.jpg",
      aspect: "aspect-[16/10]",
      lens: "24-70mm Pro ƒ/2.8",
      iso: "ISO 800",
      shutter: "1/250s",
      location: "Grand Ballroom",
      // Left flank upper midground
      transform: {
        x: -42,
        y: -20,
        z: -90,
        rx: 10,
        ry: 24,
        rz: 3,
        scale: 0.9,
      },
      widthClass: "w-[180px] sm:w-[230px] md:w-[270px] lg:w-[310px]",
    },
    {
      id: "events-cheer",
      category: "03. Events & Celebrations",
      title: "Spontaneous Cheers",
      image: "/media/2024/05/9-scaled.jpg",
      aspect: "aspect-[3/2]",
      lens: "35mm Prime ƒ/2.0",
      iso: "ISO 640",
      shutter: "1/320s",
      location: "Private Soirée",
      // Far right center accent
      transform: {
        x: 48,
        y: 0,
        z: -30,
        rx: 4,
        ry: -28,
        rz: 1,
        scale: 0.85,
      },
      widthClass: "w-[160px] sm:w-[200px] md:w-[240px] lg:w-[270px]",
    },
  ];

  // Perspective multipliers based on selected Depth Mode
  const depthMultipliers = {
    natural: 0.65,
    cinematic: 1.0,
    deep: 1.45,
  };

  // --- THREE.JS INTERACTIVE 3D PARTICLES & OPTICAL DEPTH CANVAS ---
  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    let animationFrameId;
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create 3D floating optical bokeh & dust particles
    const particleCount = 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 140;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 110;
      scales[i] = Math.random() * 2.8 + 0.9;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Custom circular soft bokeh particle shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color("#777B60") },
      },
      vertexShader: `
        attribute float scale;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (220.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.08, dist) * 0.35;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse target position for Three.js camera parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = nx * 14;
      targetY = ny * 10;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation render loop
    const clock = new THREE.Clock();
    const render = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(0, 0, 0);

      // Subtle slow rotation of particles
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // --- GSAP 3D STAGE & PARALLAX ENGINE ---
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || !stageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.to(containerRef.current, { opacity: 1, duration: 0.5 });
        return;
      }

      // QuickTo setters for 60fps cursor-driven 3D stage rotation
      const rotateXTo = gsap.quickTo(stageRef.current, "rotationX", {
        duration: 0.8,
        ease: "power2.out",
      });
      const rotateYTo = gsap.quickTo(stageRef.current, "rotationY", {
        duration: 0.8,
        ease: "power2.out",
      });

      // QuickTo setters for frame group counter-depth translation
      const moveXTo = gsap.quickTo(framesGroupRef.current, "x", {
        duration: 0.9,
        ease: "power2.out",
      });
      const moveYTo = gsap.quickTo(framesGroupRef.current, "y", {
        duration: 0.9,
        ease: "power2.out",
      });

      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let dragDeltaX = 0;
      let dragDeltaY = 0;

      const handlePointerDown = (e) => {
        if (e.target.closest("button") || e.target.closest("a")) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
      };

      const handlePointerUp = () => {
        isDragging = false;
      };

      const handlePointerMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;

        if (isDragging) {
          dragDeltaX += (e.clientX - startX) * 0.05;
          dragDeltaY -= (e.clientY - startY) * 0.05;
          startX = e.clientX;
          startY = e.clientY;
        }

        const maxTiltY = 18 * depthMultipliers[depthMode];
        const maxTiltX = 14 * depthMultipliers[depthMode];

        rotateYTo(px * maxTiltY + dragDeltaX);
        rotateXTo(-py * maxTiltX + dragDeltaY);
        moveXTo(px * 40 * depthMultipliers[depthMode]);
        moveYTo(py * 28 * depthMultipliers[depthMode]);
      };

      const handlePointerLeave = () => {
        isDragging = false;
        rotateXTo(0);
        rotateYTo(0);
        moveXTo(0);
        moveYTo(0);
      };

      const container = containerRef.current;
      container.addEventListener("pointerdown", handlePointerDown, { passive: true });
      window.addEventListener("pointerup", handlePointerUp, { passive: true });
      container.addEventListener("pointermove", handlePointerMove, { passive: true });
      container.addEventListener("pointerleave", handlePointerLeave, { passive: true });

      // Coordinated Bi-directional Entrance Timeline for the 3D Hero
      const heroEntranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Split text & heading reveal
      if (textGroupRef.current) {
        heroEntranceTl.fromTo(
          textGroupRef.current.querySelectorAll(".gsap-hero-reveal"),
          { opacity: 0, y: 35, rotationX: 10 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.0,
            stagger: 0.1,
            ease: "power3.out",
          },
          0
        );
      }

      // Staggered 3D fly-in entrance for the floating photographic planes
      frameRefs.current.forEach((frame, idx) => {
        if (!frame) return;
        const config = exhibitionFrames[idx];
        const zTarget = config.transform.z * depthMultipliers[depthMode];

        heroEntranceTl.fromTo(
          frame,
          {
            opacity: 0,
            z: zTarget - 450,
            rotationY: config.transform.ry - 30,
            rotationX: config.transform.rx + 20,
            scale: 0.75,
          },
          {
            opacity: 1,
            z: zTarget,
            rotationY: config.transform.ry,
            rotationX: config.transform.rx,
            rotationZ: config.transform.rz,
            scale: config.transform.scale,
            duration: 1.25,
            ease: "power3.out",
          },
          0.1 + idx * 0.1
        );

        // Continuous subtle 3D floating animation with unique offsets
        gsap.to(frame, {
          y: `+=${8 + (idx % 3) * 4}`,
          rotationZ: `+=${1.5 + (idx % 2)}`,
          duration: 3.2 + idx * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: idx * 0.3,
        });
      });

      // ScrollTrigger 3D Divergence / Parallax zoom directly connected to scroll progress (scrub: true)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (stageRef.current) {
            gsap.set(stageRef.current, {
              rotationX: progress * -18,
              z: progress * -220,
            });
          }
          frameRefs.current.forEach((frame, idx) => {
            if (!frame) return;
            const dir = idx % 2 === 0 ? 1 : -1;
            gsap.set(frame, {
              y: progress * 140 * dir,
              rotationY: exhibitionFrames[idx].transform.ry + progress * 20 * dir,
            });
          });
        },
      });

      return () => {
        container.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [depthMode]);

  // Frame Click: Focus inspection mode
  const handleFrameClick = useCallback((id) => {
    setActiveFrameId((prev) => (prev === id ? null : id));
  }, []);

  const activeFocusedFrame = exhibitionFrames.find((f) => f.id === activeFrameId);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#F5F2EB] text-[#242421] pt-32 pb-24 select-none [--spread-factor:0.5] sm:[--spread-factor:0.75] lg:[--spread-factor:1.0]"
      style={{ perspective: "1500px" }}
      aria-label="3D Interactive Photography Exhibition"
    >
      {/* 1. THREE.JS 3D OPTICAL BOKEH BACKGROUND CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      {/* 2. PHOTOGRAPHIC TELEMETRY GRID & WATERMARKS */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-10 md:p-14 opacity-40">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-[0.25em] text-[#777B60]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#777B60] animate-pulse" />
            <span>EXHIBITION STAGE • 3D MATRIX ACTIVE</span>
          </div>
          <div className="hidden sm:block">FOV: 45° • FOCAL DEPTH: ∞</div>
        </div>
        <div className="flex justify-between items-end text-[10px] font-mono tracking-[0.25em] text-[#777B60]">
          <div>SCOTLAND ARCHIVE // 2024–2025</div>
          <div className="hidden sm:block">[ + / - ] INTERACTIVE PERSPECTIVE</div>
        </div>
      </div>

      {/* 3. CENTER EDITORIAL NARRATIVE OVERLAY (Elevated in 3D Space with Protected Zone) */}
      <div
        ref={textGroupRef}
        className="relative z-40 max-w-2xl lg:max-w-3xl mx-auto px-6 sm:px-10 py-10 sm:py-12 bg-[#FAF9F6]/92 backdrop-blur-md border border-[#D8D2C7]/90 shadow-[0_30px_70px_-20px_rgba(36,36,33,0.14)] text-center space-y-6 pointer-events-auto"
        style={{ transform: "translateZ(190px)" }}
      >
        {/* Eyebrow */}
        <div className="gsap-hero-reveal inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#FAF9F6] border border-[#D8D2C7] shadow-xs text-xs uppercase tracking-[0.28em] text-[#777B60]">
          <Sparkles className="w-3.5 h-3.5 text-[#777B60]" />
          <span>Services &amp; Offerings • Immersive Exhibition</span>
        </div>

        {/* Headline */}
        <h1 className="gsap-hero-reveal font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1c1c1a] font-light leading-[1.04] tracking-tight">
          Commissions &amp; Collections
        </h1>

        {/* Narrative Description */}
        <p className="gsap-hero-reveal text-sm sm:text-base md:text-lg text-[#242421] font-normal leading-relaxed max-w-xl mx-auto">
          Every story deserves a beautiful frame. Whether documenting an emotional wedding day,
          a joyous birthday celebration, or extraordinary events and gatherings, Vivek Pali brings
          warm, cinematic visual storytelling to every frame.
        </p>

        {/* Quick Category Anchors & 3D Depth Toggle */}
        <div className="gsap-hero-reveal pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#wedding-photography"
            className="px-4 py-2 bg-[#242421] text-[#FAF9F6] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#343430] transition-all shadow-md flex items-center gap-1.5"
          >
            <span>01. Wedding</span>
            <ChevronRight className="w-3 h-3 text-[#777B60]" />
          </a>
          <a
            href="#birthday-photography"
            className="px-4 py-2 bg-[#FAF9F6] text-[#242421] border border-[#D8D2C7] text-xs uppercase tracking-[0.18em] font-medium hover:border-[#242421] transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>02. Birthday</span>
            <ChevronRight className="w-3 h-3 text-[#777B60]" />
          </a>
          <a
            href="#events-celebrations"
            className="px-4 py-2 bg-[#FAF9F6] text-[#242421] border border-[#D8D2C7] text-xs uppercase tracking-[0.18em] font-medium hover:border-[#242421] transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>03. Events</span>
            <ChevronRight className="w-3 h-3 text-[#777B60]" />
          </a>
        </div>

        {/* Depth Mode Control Bar */}
        <div className="gsap-hero-reveal pt-1 flex items-center justify-center gap-2 text-[10px] uppercase font-mono tracking-widest text-[#777B60]">
          <Sliders className="w-3 h-3 text-[#777B60]" />
          <span>3D Depth:</span>
          {["natural", "cinematic", "deep"].map((mode) => (
            <button
              key={mode}
              onClick={() => setDepthMode(mode)}
              className={`px-2 py-0.5 transition-all uppercase border ${
                depthMode === mode
                  ? "bg-[#242421] text-[#FAF9F6] border-[#242421]"
                  : "bg-transparent text-[#777B60] border-transparent hover:border-[#D8D2C7]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* 4. TRUE 3D MULTI-PLANE FLOATING PHOTOGRAPHY STAGE */}
      <div
        ref={stageRef}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={framesGroupRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {exhibitionFrames.map((frame, index) => {
            const isFocused = activeFrameId === frame.id;
            const currentZ = isFocused
              ? 340
              : frame.transform.z * depthMultipliers[depthMode];

            return (
              <div
                key={frame.id}
                ref={addToFrameRefs}
                onClick={() => handleFrameClick(frame.id)}
                className={`absolute pointer-events-auto cursor-pointer transition-shadow duration-500 group ${
                  frame.widthClass
                } ${isFocused ? "z-50" : "z-20"}`}
                style={{
                  transformStyle: "preserve-3d",
                  left: `calc(50% + calc(var(--spread-factor, 1) * ${frame.transform.x}%))`,
                  top: `calc(50% + ${frame.transform.y}%)`,
                  transform: `translate(-50%, -50%) translateZ(${currentZ}px) rotateY(${
                    isFocused ? 0 : frame.transform.ry
                  }deg) rotateX(${isFocused ? 0 : frame.transform.rx}deg) rotateZ(${
                    isFocused ? 0 : frame.transform.rz
                  }deg)`,
                }}
              >
                {/* 3D Frame Outer Structure */}
                <div
                  className={`relative p-2.5 sm:p-3 bg-[#FAF9F6] border transition-all duration-500 ${
                    isFocused
                      ? "border-[#242421] shadow-[0_45px_90px_-15px_rgba(36,36,33,0.5)] ring-2 ring-[#777B60]/50"
                      : "border-[#D8D2C7] shadow-[0_25px_50px_-12px_rgba(36,36,33,0.22)] group-hover:border-[#777B60] group-hover:shadow-[0_35px_70px_-12px_rgba(36,36,33,0.32)]"
                  }`}
                >
                  {/* Viewfinder Corner Notches */}
                  <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#777B60]" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#777B60]" />
                  <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#777B60]" />
                  <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#777B60]" />

                  {/* Image Container with Photographic Aspect Ratio */}
                  <div
                    className={`relative ${frame.aspect} w-full overflow-hidden bg-[#D8D2C7]`}
                  >
                    <Image
                      src={frame.image}
                      alt={`${frame.title} — ${frame.category}`}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 768px) 70vw, 350px"
                      className="object-cover object-center filter brightness-[0.96] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-106"
                    />

                    {/* Subtle Photographic Glass Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FAF9F6]/15 to-[#FAF9F6]/30 pointer-events-none opacity-60 group-hover:opacity-85 transition-opacity" />

                    {/* Focus Overlay on Hover */}
                    <div className="absolute top-2.5 right-2.5 p-1.5 bg-[#242421]/80 backdrop-blur-xs text-[#FAF9F6] opacity-0 group-hover:opacity-100 transition-opacity">
                      {isFocused ? (
                        <X className="w-3 h-3" />
                      ) : (
                        <Maximize2 className="w-3 h-3" />
                      )}
                    </div>
                  </div>

                  {/* Frame Lower Caption & Camera Telemetry */}
                  <div className="mt-2.5 pt-2 border-t border-[#D8D2C7]/70 flex items-center justify-between text-left">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#777B60] block font-mono">
                        {frame.category.split(" ")[1]}
                      </span>
                      <p className="font-editorial text-xs sm:text-sm text-[#242421] font-normal leading-tight truncate">
                        {frame.title}
                      </p>
                    </div>

                    <div className="text-right text-[8px] font-mono text-[#5E5D57] hidden sm:block shrink-0 pl-2">
                      <span className="block text-[#777B60]">{frame.lens}</span>
                      <span>{frame.shutter}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Realistic Soft Drop Shadow on Back Plane */}
                <div
                  className="absolute inset-0 bg-[#242421]/15 filter blur-xl pointer-events-none -z-10"
                  style={{
                    transform: `translateZ(-40px) translateY(20px) scale(0.92)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. ACTIVE FRAME ZOOM INSPECTION MODAL (when clicked) */}
      {activeFocusedFrame && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#FAF9F6]/95 backdrop-blur-md border border-[#242421] shadow-2xl max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-[#D8D2C7]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#777B60]">
              Plate Telemetry
            </span>
            <button
              onClick={() => setActiveFrameId(null)}
              className="p-1 hover:bg-[#242421] hover:text-[#FAF9F6] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-2 text-left space-y-1">
            <h4 className="font-editorial text-base text-[#242421]">
              {activeFocusedFrame.title}
            </h4>
            <p className="text-xs text-[#777B60]">{activeFocusedFrame.category}</p>
            <div className="pt-2 grid grid-cols-2 gap-1 text-[9px] font-mono text-[#5E5D57]">
              <span>OPTICS: {activeFocusedFrame.lens}</span>
              <span>EXP: {activeFocusedFrame.shutter}</span>
              <span>ISO: {activeFocusedFrame.iso}</span>
              <span>LOC: {activeFocusedFrame.location}</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. BOTTOM HINT / SCROLL INDICATOR */}
      <div className="absolute bottom-6 inset-x-0 z-30 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.25em] text-[#777B60] bg-[#FAF9F6]/75 backdrop-blur-xs px-3 py-1 border border-[#D8D2C7]/60">
          <Compass className="w-3 h-3 text-[#777B60]" />
          <span>Move cursor or drag to orbit 3D gallery • Click frame to inspect</span>
        </div>
        <ArrowDown className="w-4 h-4 text-[#777B60] mt-2 animate-bounce opacity-70" />
      </div>
    </section>
  );
}
