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
    optics: "Canon FD 50mm f/1.4 S.S.C. • ISO 100",
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
    optics: "Canon FD 50mm f/1.4 • ISO 200",
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
    optics: "Canon FD 50mm f/2.8 • ISO 100",
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
    optics: "Canon FD 50mm f/1.4 • ISO 400",
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
    optics: "Canon FD 50mm f/1.8 • ISO 400",
    pos: [0.0, 1.75, -2.0],
    rot: [0.15, 0.0, 0.0],
    scale: [1.5, 1.15],
  },
];

// Helper: Generates high-res circular front lens face texture (Canon FD 50mm 1:1.4 S.S.C.)
function createLensFaceTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  const cx = 512;
  const cy = 512;

  // Outer dark chassis
  ctx.fillStyle = "#0c0d0f";
  ctx.fillRect(0, 0, 1024, 1024);

  // Concentric filter threads
  for (let r = 490; r >= 420; r -= 10) {
    ctx.strokeStyle = r % 20 === 0 ? "#25262c" : "#141518";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Matte black text rim surface
  ctx.fillStyle = "#16171a";
  ctx.beginPath();
  ctx.arc(cx, cy, 415, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#0a0a0c";
  ctx.lineWidth = 8;
  ctx.stroke();

  // Helper to draw text along circular arc
  function drawCurvedText(text, radius, startAngle, letterSpacing, fillStyle, isBoldRed = false) {
    ctx.save();
    ctx.font = isBoldRed ? "900 36px 'Arial', sans-serif" : "bold 34px 'Arial', sans-serif";
    ctx.fillStyle = fillStyle;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let angle = startAngle;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charWidth = ctx.measureText(char).width;
      const angleStep = (charWidth + letterSpacing) / radius;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.translate(0, -radius);
      ctx.fillText(char, 0, 0);
      ctx.restore();

      angle += angleStep;
    }
    ctx.restore();
  }

  // Draw signature Canon FD 50mm 1:1.4 S.S.C. markings
  // 1. "S.S.C." in prominent red
  drawCurvedText("S.S.C.", 345, -Math.PI * 0.72, 4, "#e52323", true);
  // 2. "CANON LENS MADE IN JAPAN" in white
  drawCurvedText("CANON LENS MADE IN JAPAN", 345, -Math.PI * 0.42, 5, "#f1f5f9");
  // 3. "CANON LENS FD 50mm 1:1.4" on bottom arc
  drawCurvedText("CANON LENS FD 50mm 1:1.4", 345, Math.PI * 0.28, 5, "#f1f5f9");

  // Inner beveled retaining ring
  ctx.strokeStyle = "#272830";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(cx, cy, 275, 0, Math.PI * 2);
  ctx.stroke();

  // Glass aperture center
  ctx.fillStyle = "#040405";
  ctx.beginPath();
  ctx.arc(cx, cy, 260, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Helper: Generates cylindrical lens distance scale and waffle knurl texture
function createLensBarrelTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Dark anodized aluminum base
  ctx.fillStyle = "#18181b";
  ctx.fillRect(0, 0, 2048, 512);

  // Waffle knurl diamond pattern on focus ring (Top 210px)
  const patternCanvas = document.createElement("canvas");
  patternCanvas.width = 16;
  patternCanvas.height = 16;
  const pctx = patternCanvas.getContext("2d");
  pctx.fillStyle = "#101012";
  pctx.fillRect(0, 0, 16, 16);
  pctx.fillStyle = "#26262c";
  pctx.beginPath();
  pctx.moveTo(8, 0);
  pctx.lineTo(16, 8);
  pctx.lineTo(8, 16);
  pctx.lineTo(0, 8);
  pctx.closePath();
  pctx.fill();
  pctx.fillStyle = "#33333d";
  pctx.fillRect(7, 7, 2, 2);

  const pattern = ctx.createPattern(patternCanvas, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 2048, 220);

  // Divider lines
  ctx.strokeStyle = "#383842";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 222);
  ctx.lineTo(2048, 222);
  ctx.stroke();

  // Distance Numbers
  ctx.font = "bold 30px 'Arial', sans-serif";
  // Orange feet
  ctx.fillStyle = "#f59e0b";
  const feet = [
    { t: "3.5", x: 450 },
    { t: "4", x: 580 },
    { t: "5", x: 720 },
    { t: "7", x: 880 },
    { t: "10", x: 1040 },
    { t: "15", x: 1220 },
    { t: "30", x: 1400 },
    { t: "∞", x: 1600 },
  ];
  feet.forEach((f) => ctx.fillText(f.t, f.x, 275));

  // White meters
  ctx.fillStyle = "#f8fafc";
  const meters = [
    { t: "1", x: 450 },
    { t: "1.2", x: 580 },
    { t: "1.5", x: 720 },
    { t: "2", x: 880 },
    { t: "3", x: 1040 },
    { t: "5", x: 1220 },
    { t: "10", x: 1400 },
    { t: "∞", x: 1600 },
  ];
  meters.forEach((m) => ctx.fillText(m.t, m.x, 322));

  // Depth of field color index lines
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ef4444"; // Center red index
  ctx.beginPath();
  ctx.moveTo(1024, 345);
  ctx.lineTo(1024, 370);
  ctx.stroke();

  ctx.strokeStyle = "#f59e0b";
  ctx.beginPath();
  ctx.moveTo(960, 348);
  ctx.lineTo(960, 365);
  ctx.moveTo(1088, 348);
  ctx.lineTo(1088, 365);
  ctx.stroke();

  ctx.strokeStyle = "#3b82f6";
  ctx.beginPath();
  ctx.moveTo(880, 348);
  ctx.lineTo(880, 365);
  ctx.moveTo(1168, 348);
  ctx.lineTo(1168, 365);
  ctx.stroke();

  // Aperture scale
  ctx.strokeStyle = "#3f3f48";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 395);
  ctx.lineTo(2048, 395);
  ctx.stroke();

  ctx.font = "bold 32px 'Arial', sans-serif";
  ctx.fillStyle = "#f1f5f9";
  const apertures = [
    { t: "1.4", x: 560 },
    { t: "2", x: 670 },
    { t: "2.8", x: 770 },
    { t: "4", x: 870 },
    { t: "5.6", x: 970 },
    { t: "8", x: 1070 },
    { t: "11", x: 1170 },
    { t: "16", x: 1270 },
    { t: "A", x: 1390, green: true },
  ];
  apertures.forEach((a) => {
    ctx.fillStyle = a.green ? "#10b981" : "#f1f5f9";
    ctx.fillText(a.t, a.x, 460);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Helper: Generates front wordmarks ("Canon" script on pentaprism and "AT-1" badge)
function createBrandingTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Transparent background
  ctx.clearRect(0, 0, 1024, 512);

  // Pentaprism "Canon" script wordmark (Dark black vintage serif)
  ctx.font = "italic bold 100px 'Times New Roman', 'Georgia', serif";
  ctx.fillStyle = "#121214";
  ctx.textAlign = "center";
  ctx.fillText("Canon", 512, 145);

  // Red alignment dot under Canon
  ctx.fillStyle = "#dc2626";
  ctx.beginPath();
  ctx.arc(512, 185, 9, 0, Math.PI * 2);
  ctx.fill();

  // Vintage "AT-1" outlined metallic badge
  ctx.font = "900 96px 'Impact', 'Arial Black', sans-serif";
  ctx.fillStyle = "#161619";
  ctx.strokeStyle = "#80838d";
  ctx.lineWidth = 5;
  ctx.textAlign = "center";
  ctx.strokeText("AT-1", 260, 395);
  ctx.fillText("AT-1", 260, 395);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Helper: Generates leatherette pebble bump texture
function createLeatherBumpTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  const imgData = ctx.createImageData(512, 512);
  const data = imgData.data;

  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 512; x++) {
      const idx = (y * 512 + x) * 4;
      const cellX = (x % 14) - 7;
      const cellY = (y % 14) - 7;
      const dist = Math.sqrt(cellX * cellX + cellY * cellY);
      const noise = (Math.sin(x * 0.8) + Math.cos(y * 0.8)) * 18;
      const val = Math.max(0, Math.min(255, 130 - dist * 12 + noise + (Math.random() * 20 - 10)));
      data[idx] = val;
      data[idx + 1] = val;
      data[idx + 2] = val;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  return texture;
}

// High-Fidelity Vintage Canon AT-1 3D Film Camera Generator
function buildVintageCanonAT1() {
  const root = new THREE.Group();

  // 1. Textures
  const lensFaceTex = createLensFaceTexture();
  const lensBarrelTex = createLensBarrelTexture();
  const brandingTex = createBrandingTexture();
  const leatherBumpTex = createLeatherBumpTexture();

  // 2. High-Grade Materials
  // Brushed Silver Metal (Satin alloy with fine reflections, NOT chrome)
  const silverMetalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d7dd,
    roughness: 0.28,
    metalness: 0.92,
  });

  // Dark Brushed Silver (Accents, bevel edges)
  const darkSilverMat = new THREE.MeshStandardMaterial({
    color: 0x9fa3ab,
    roughness: 0.35,
    metalness: 0.85,
  });

  // Black Textured Pebble Leatherette (Front grip, side & rear panels)
  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x161618,
    roughness: 0.86,
    metalness: 0.08,
    bumpMap: leatherBumpTex,
    bumpScale: 0.04,
  });

  // Matte Black Anodized Metal (Lens rings, dials)
  const matteBlackMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.42,
    metalness: 0.65,
  });

  // Polished Chrome (Strap eyelets, hot-shoe rails, screws)
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xedf0f5,
    roughness: 0.12,
    metalness: 0.98,
  });

  // 3. Main Camera Body
  const bodyGroup = new THREE.Group();
  root.add(bodyGroup);

  // Beveled Main Shape (Chassis) - Width: 1.74, Height: 1.05, Depth: 0.64
  // A) Silver Base Plate (Lower Section)
  const baseShape = new THREE.Shape();
  const bw = 0.86;
  const bd = 0.31;
  const bevel = 0.12;
  baseShape.moveTo(-bw + bevel, -bd);
  baseShape.lineTo(bw - bevel, -bd);
  baseShape.lineTo(bw, -bd + bevel);
  baseShape.lineTo(bw, bd - bevel);
  baseShape.lineTo(bw - bevel, bd);
  baseShape.lineTo(-bw + bevel, bd);
  baseShape.lineTo(-bw, bd - bevel);
  baseShape.lineTo(-bw, -bd + bevel);
  baseShape.closePath();

  const baseExtrudeSettings = { depth: 0.12, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.015, bevelThickness: 0.015 };
  const basePlateGeo = new THREE.ExtrudeGeometry(baseShape, baseExtrudeSettings);
  basePlateGeo.rotateX(Math.PI / 2);
  const basePlate = new THREE.Mesh(basePlateGeo, silverMetalMat);
  basePlate.position.set(0, -0.48, 0);
  basePlate.castShadow = true;
  basePlate.receiveShadow = true;
  bodyGroup.add(basePlate);

  // Bottom Base Plate Details (Tripod screw, battery chamber, rewind button)
  const tripodSocket = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.03, 20),
    darkSilverMat
  );
  tripodSocket.position.set(-0.25, -0.55, 0);
  bodyGroup.add(tripodSocket);

  const batteryCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.02, 24),
    darkSilverMat
  );
  batteryCap.position.set(0.48, -0.55, 0.02);
  bodyGroup.add(batteryCap);

  // B) Middle Leatherette Body
  const midExtrudeSettings = { depth: 0.65, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.01, bevelThickness: 0.01 };
  const midBodyGeo = new THREE.ExtrudeGeometry(baseShape, midExtrudeSettings);
  midBodyGeo.rotateX(Math.PI / 2);
  const midBody = new THREE.Mesh(midBodyGeo, leatherMat);
  midBody.position.set(0, 0.18, 0);
  midBody.castShadow = true;
  midBody.receiveShadow = true;
  bodyGroup.add(midBody);

  // Front Metallic Branding & Badge Overlay Plane (AT-1 Badge & Canon Logo)
  const brandingPlaneGeo = new THREE.PlaneGeometry(1.65, 0.85);
  const brandingMat = new THREE.MeshBasicMaterial({
    map: brandingTex,
    transparent: true,
    opacity: 0.98,
  });
  const brandingMesh = new THREE.Mesh(brandingPlaneGeo, brandingMat);
  brandingMesh.position.set(0, 0.08, 0.33);
  bodyGroup.add(brandingMesh);

  // C) Silver Top Deck (Upper Section)
  const topExtrudeSettings = { depth: 0.28, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.015, bevelThickness: 0.015 };
  const topDeckGeo = new THREE.ExtrudeGeometry(baseShape, topExtrudeSettings);
  topDeckGeo.rotateX(Math.PI / 2);
  const topDeck = new THREE.Mesh(topDeckGeo, silverMetalMat);
  topDeck.position.set(0, 0.52, 0);
  topDeck.castShadow = true;
  topDeck.receiveShadow = true;
  bodyGroup.add(topDeck);

  // Vertical Silver Corner Pillars (Flanking the front corners)
  const pillarGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.65, 12);
  const pillarL = new THREE.Mesh(pillarGeo, silverMetalMat);
  pillarL.position.set(-0.84, -0.15, 0.28);
  bodyGroup.add(pillarL);

  const pillarR = new THREE.Mesh(pillarGeo, silverMetalMat);
  pillarR.position.set(0.84, -0.15, 0.28);
  bodyGroup.add(pillarR);

  // Front Right Finger Rest Block (Characteristic black battery chamber door on front)
  const gripBlockGeo = new THREE.BoxGeometry(0.14, 0.52, 0.09);
  const gripBlock = new THREE.Mesh(gripBlockGeo, matteBlackMat);
  gripBlock.position.set(0.55, -0.16, 0.34);
  bodyGroup.add(gripBlock);

  // Lens Release Button (Front Right of Mount)
  const lensReleaseBtn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.04, 16),
    chromeMat
  );
  lensReleaseBtn.rotation.x = Math.PI / 2;
  lensReleaseBtn.position.set(0.46, -0.18, 0.33);
  bodyGroup.add(lensReleaseBtn);

  // PC Sync Terminal (Front Left)
  const syncPort = new THREE.Mesh(
    new THREE.CylinderGeometry(0.042, 0.048, 0.035, 16),
    chromeMat
  );
  syncPort.rotation.x = Math.PI / 2;
  syncPort.position.set(-0.52, 0.12, 0.33);
  bodyGroup.add(syncPort);

  // Red LED / Flash Socket
  const redLed = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.02, 12),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.2, metalness: 0.5 })
  );
  redLed.rotation.x = Math.PI / 2;
  redLed.position.set(-0.52, 0.22, 0.33);
  bodyGroup.add(redLed);

  // Chrome Strap Lugs on Left & Right Sides
  const lugGeo = new THREE.TorusGeometry(0.042, 0.01, 8, 16);
  const lugL = new THREE.Mesh(lugGeo, chromeMat);
  lugL.rotation.y = Math.PI / 2;
  lugL.position.set(-0.87, 0.18, 0);
  bodyGroup.add(lugL);

  const lugR = new THREE.Mesh(lugGeo, chromeMat);
  lugR.rotation.y = Math.PI / 2;
  lugR.position.set(0.87, 0.18, 0);
  bodyGroup.add(lugR);

  // 4. Vintage Pyramidal Pentaprism Housing (Center Viewfinder)
  const prismGroup = new THREE.Group();
  prismGroup.position.set(0, 0.52, 0.02);

  // Faceted Pentaprism geometry with sloping triangular facets
  const prismShape = new THREE.Shape();
  prismShape.moveTo(-0.44, 0);
  prismShape.lineTo(0.44, 0);
  prismShape.lineTo(0.32, 0.36);
  prismShape.lineTo(-0.32, 0.36);
  prismShape.closePath();

  const prismExtrude = { depth: 0.55, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.03, bevelThickness: 0.03 };
  const prismGeo = new THREE.ExtrudeGeometry(prismShape, prismExtrude);
  prismGeo.center();
  const prismMesh = new THREE.Mesh(prismGeo, silverMetalMat);
  prismMesh.castShadow = true;
  prismGroup.add(prismMesh);

  // Integrated Chrome Hot-Shoe Flash Bracket
  const hotShoeGeo = new THREE.BoxGeometry(0.34, 0.05, 0.34);
  const hotShoe = new THREE.Mesh(hotShoeGeo, silverMetalMat);
  hotShoe.position.set(0, 0.22, -0.04);
  prismGroup.add(hotShoe);

  const shoeRailsGeo = new THREE.BoxGeometry(0.3, 0.02, 0.32);
  const shoeRails = new THREE.Mesh(shoeRailsGeo, matteBlackMat);
  shoeRails.position.set(0, 0.245, -0.04);
  prismGroup.add(shoeRails);

  const shoeContact = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 0.02, 16),
    chromeMat
  );
  shoeContact.position.set(0, 0.26, -0.04);
  prismGroup.add(shoeContact);

  // Rear Vintage Flared Rubber Eyecup (Prominent in Image 2!)
  const eyecupGeo = new THREE.CylinderGeometry(0.24, 0.16, 0.18, 28, 1, true);
  const eyecupMat = new THREE.MeshStandardMaterial({
    color: 0x121214,
    roughness: 0.95,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });
  const eyecup = new THREE.Mesh(eyecupGeo, eyecupMat);
  eyecup.rotation.x = -Math.PI / 2;
  eyecup.position.set(0, 0.04, -0.38);
  prismGroup.add(eyecup);

  bodyGroup.add(prismGroup);

  // 5. Top Deck Mechanical Controls
  // A) Shutter Release Button & Collar (Front Right from front view)
  const shutterCollar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.11, 0.08, 24),
    darkSilverMat
  );
  shutterCollar.position.set(-0.52, 0.54, 0.14);
  bodyGroup.add(shutterCollar);

  const shutterBtn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.075, 0.06, 20),
    silverMetalMat
  );
  shutterBtn.position.set(-0.52, 0.58, 0.14);
  bodyGroup.add(shutterBtn);

  // B) Shutter Speed / ASA Dial (Large dual-tone knurled dial)
  const speedDialBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.11, 32),
    silverMetalMat
  );
  speedDialBase.position.set(-0.54, 0.54, -0.06);
  bodyGroup.add(speedDialBase);

  const speedDialKnurl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.205, 0.205, 0.07, 32),
    matteBlackMat
  );
  speedDialKnurl.position.set(-0.54, 0.6, -0.06);
  bodyGroup.add(speedDialKnurl);

  // C) Film Advance Winding Lever (Silver die-cast arm with black tip)
  const leverArmGeo = new THREE.BoxGeometry(0.48, 0.04, 0.1);
  const leverArm = new THREE.Mesh(leverArmGeo, silverMetalMat);
  leverArm.position.set(-0.64, 0.55, -0.05);
  leverArm.rotation.y = 0.45;
  bodyGroup.add(leverArm);

  const leverTipGeo = new THREE.BoxGeometry(0.16, 0.06, 0.12);
  const leverTip = new THREE.Mesh(leverTipGeo, matteBlackMat);
  leverTip.position.set(-0.84, 0.55, -0.15);
  bodyGroup.add(leverTip);

  // D) Frame Counter (Circular silver bezel with white disc)
  const frameCounterBezel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.09, 0.04, 20),
    chromeMat
  );
  frameCounterBezel.position.set(-0.7, 0.54, 0.14);
  bodyGroup.add(frameCounterBezel);

  const frameCounterDisc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.075, 0.042, 20),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 })
  );
  frameCounterDisc.position.set(-0.7, 0.542, 0.14);
  bodyGroup.add(frameCounterDisc);

  // E) Film Rewind Crank & ISO Wheel (Left side from front view)
  const rewindWheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.24, 0.1, 32),
    silverMetalMat
  );
  rewindWheel.position.set(0.58, 0.54, 0);
  bodyGroup.add(rewindWheel);

  const rewindCrankGeo = new THREE.BoxGeometry(0.34, 0.03, 0.08);
  const rewindCrank = new THREE.Mesh(rewindCrankGeo, silverMetalMat);
  rewindCrank.position.set(0.58, 0.6, 0);
  bodyGroup.add(rewindCrank);

  const rewindKnob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.05, 16),
    darkSilverMat
  );
  rewindKnob.position.set(0.72, 0.62, 0);
  bodyGroup.add(rewindKnob);

  // 6. Professional Canon FD 50mm f/1.4 S.S.C. Vintage Prime Lens
  const lensGroup = new THREE.Group();
  lensGroup.position.set(0, -0.06, 0.32);
  root.add(lensGroup);

  // A) Silver Breech-Lock Bayonet Ring (The iconic Canon FD silver collar!)
  const breechLockGeo = new THREE.CylinderGeometry(0.58, 0.6, 0.18, 48);
  const breechLock = new THREE.Mesh(breechLockGeo, silverMetalMat);
  breechLock.rotation.x = Math.PI / 2;
  breechLock.position.z = 0.09;
  breechLock.castShadow = true;
  lensGroup.add(breechLock);

  // Red alignment index dot on breech ring
  const breechDot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 0.02, 12),
    new THREE.MeshBasicMaterial({ color: 0xdc2626 })
  );
  breechDot.position.set(0, 0.59, 0.09);
  lensGroup.add(breechDot);

  // B) Aperture Selector Ring (Matte black with ribbed edges)
  const apertureRingGeo = new THREE.CylinderGeometry(0.56, 0.57, 0.16, 48);
  const apertureRing = new THREE.Mesh(apertureRingGeo, matteBlackMat);
  apertureRing.rotation.x = Math.PI / 2;
  apertureRing.position.z = 0.24;
  lensGroup.add(apertureRing);

  // C) Main Focus Barrel with Knurled Waffle Grip & Distance Scale
  const barrelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.68, 48);
  const barrelMat = new THREE.MeshStandardMaterial({
    map: lensBarrelTex,
    roughness: 0.42,
    metalness: 0.6,
  });
  const barrel = new THREE.Mesh(barrelGeo, barrelMat);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.z = 0.64;
  barrel.castShadow = true;
  lensGroup.add(barrel);

  // D) Front Filter Thread Rim & Nameplate
  const nameplateGeo = new THREE.RingGeometry(0.28, 0.54, 48);
  const nameplateMat = new THREE.MeshStandardMaterial({
    map: lensFaceTex,
    roughness: 0.38,
    metalness: 0.5,
    side: THREE.DoubleSide,
  });
  const nameplate = new THREE.Mesh(nameplateGeo, nameplateMat);
  nameplate.position.z = 0.985;
  lensGroup.add(nameplate);

  // Outer Metal Lens Lip
  const outerLipGeo = new THREE.CylinderGeometry(0.56, 0.55, 0.06, 48);
  const outerLip = new THREE.Mesh(outerLipGeo, matteBlackMat);
  outerLip.rotation.x = Math.PI / 2;
  outerLip.position.z = 0.99;
  lensGroup.add(outerLip);

  // 7. Dynamic Mechanical 8-Blade Aperture Iris
  const apertureGroup = new THREE.Group();
  apertureGroup.position.z = 0.52;
  const blades = [];

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, 0);
  bladeShape.quadraticCurveTo(0.18, 0.08, 0.34, 0.26);
  bladeShape.lineTo(0.25, 0.36);
  bladeShape.quadraticCurveTo(0.1, 0.18, 0, 0);
  const bladeGeo = new THREE.ShapeGeometry(bladeShape);
  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0x18191d,
    roughness: 0.7,
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

  // 8. Multi-Coated Convex Front Glass with EMERALD-GREEN ANTI-REFLECTIVE COATING
  // As clearly seen in the Canon FD 50mm 1:1.4 S.S.C. reference photos!
  const frontGlassGeo = new THREE.SphereGeometry(0.48, 36, 28);
  const frontGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x153e2e, // Deep emerald green multi-coating hue
    roughness: 0.04,
    metalness: 0.08,
    transmission: 0.92,
    ior: 1.58,
    reflectivity: 0.98,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  });
  const frontGlass = new THREE.Mesh(frontGlassGeo, frontGlassMat);
  frontGlass.position.z = 0.92;
  frontGlass.scale.set(1, 1, 0.22);
  lensGroup.add(frontGlass);

  // Internal Spherical Lens Element (Deep in the optical chamber with warm amber coat)
  const rearGlassGeo = new THREE.SphereGeometry(0.36, 28, 20);
  const rearGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x3d281a, // Warm amber anti-reflective coating
    roughness: 0.06,
    transmission: 0.88,
    ior: 1.52,
    reflectivity: 0.8,
  });
  const rearGlass = new THREE.Mesh(rearGlassGeo, rearGlassMat);
  rearGlass.position.z = 0.32;
  rearGlass.scale.set(1, 1, 0.16);
  lensGroup.add(rearGlass);

  return { root, blades, frontGlass, lensGroup };
}

// Procedural Web Audio Synthetic Mechanical Film Shutter Sound
function triggerMechanicalShutter(isMuted) {
  if (isMuted) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();

    // 1. Heavy mechanical mirror slap
    const mirrorOsc = ctx.createOscillator();
    const mirrorGain = ctx.createGain();
    mirrorOsc.type = "sine";
    mirrorOsc.frequency.setValueAtTime(160, ctx.currentTime);
    mirrorOsc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.075);
    mirrorGain.gain.setValueAtTime(0.4, ctx.currentTime);
    mirrorGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.075);
    mirrorOsc.connect(mirrorGain);
    mirrorGain.connect(ctx.destination);
    mirrorOsc.start(ctx.currentTime);
    mirrorOsc.stop(ctx.currentTime + 0.075);

    // 2. High-speed cloth focal-plane shutter curtain release click
    const bufferSize = Math.floor(ctx.sampleRate * 0.07);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.012));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 3100;
    filter.Q.value = 3.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.45, ctx.currentTime + 0.035);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(ctx.currentTime + 0.035);
  } catch {
    // Graceful fallback
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
  const [isDragging, setIsDragging] = useState(false);

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
            z: baseAngle - 0.45, // Close down to f/16
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
    const cameraScrollRig = new THREE.Group();
    const cameraInteractiveGroup = new THREE.Group();
    cameraScrollRig.add(cameraInteractiveGroup);
    let framesGroup = new THREE.Group();
    let dustParticles;
    let blades = [];
    let clickableObjects = [];
    const mouse = new THREE.Vector2();
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
      renderer.toneMappingExposure = 1.18;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // 2. Deep Photographic Gallery Scene
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x121413, 0.038);

      // 3. Perspective Camera
      const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
      camera.position.set(0, 0, 6.2);
      scene.add(camera);

      // 4. Studio Lighting Rig Tailored for Brushed Silver & Glass
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
      scene.add(ambientLight);

      // Warm Golden Key Light (Top-Right)
      const keyLight = new THREE.DirectionalLight(0xfff3e2, 3.0);
      keyLight.position.set(5.5, 7.5, 6.5);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0004;
      scene.add(keyLight);

      // Cool Silver Specular Rim Light (Back-Left - highlights brushed silver top deck and knurled dials)
      const rimLight = new THREE.DirectionalLight(0xa5cbf0, 2.4);
      rimLight.position.set(-6.5, 4.5, -3.5);
      scene.add(rimLight);

      // Emerald Optical Specular Accent Light (Aimed at front convex glass)
      const glassAccentLight = new THREE.DirectionalLight(0x4ade80, 0.9);
      glassAccentLight.position.set(1.5, 3.2, 5.0);
      scene.add(glassAccentLight);

      // Soft Fill Light from Below
      const fillLight = new THREE.DirectionalLight(0xdbe0d8, 1.3);
      fillLight.position.set(0, -5, 4);
      scene.add(fillLight);

      // 5. Build High-Detail Vintage Canon AT-1 Film Camera
      // cameraInteractiveGroup holds the camera model so local mouse/drag transforms
      // compose cleanly with cameraScrollRig's scroll-driven position and rotation.
      const cameraData = buildVintageCanonAT1();
      cameraInteractiveGroup.add(cameraData.root);
      blades = cameraData.blades;
      cameraScrollRig.position.set(0, 0, 0);
      scene.add(cameraScrollRig);

      // Make camera elements clickable
      cameraData.root.traverse((child) => {
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
        cameraGroup: cameraScrollRig,
        cameraInteractiveGroup,
        framesGroup,
        blades,
        frameMeshes,
      };

      // 8. Bidirectional GSAP ScrollTrigger Sequence
      // Operates exclusively on cameraScrollRig, keeping scroll transforms
      // completely separate from mouse-driven local interactive transforms.
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
        cameraScrollRig.position,
        {
          x: -1.2,
          y: -0.1,
          z: 1.1,
          ease: "none",
        },
        0
      );
      scrollTl.to(
        cameraScrollRig.rotation,
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

      // 9. Interactive Mouse Parallax & Fluid Drag Interaction
      let isPointerDown = false;
      let isDraggingCamera = false;
      let hasMovedEnoughToDrag = false;
      let startX = 0;
      let startY = 0;
      let prevPointerX = 0;
      let prevPointerY = 0;
      let pointerStartTime = 0;

      // Drag rotation and velocity momentum
      const dragRotation = { x: 0, y: 0 };
      const dragVelocity = { x: 0, y: 0 };

      // Inactivity / Settle-back management
      let mouseActive = false;
      let lastMouseMoveTime = performance.now();
      let mouseInfluence = 0;
      let targetMouseInfluence = 0;

      // Smoothed current transforms for cameraInteractiveGroup
      let currentRotX = 0;
      let currentRotY = 0;
      let currentPosX = 0;
      let currentPosY = 0;

      const handlePointerDown = (e) => {
        if (!containerRef.current) return;
        isPointerDown = true;
        isDraggingCamera = false;
        hasMovedEnoughToDrag = false;
        startX = e.clientX;
        startY = e.clientY;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
        dragVelocity.x = 0;
        dragVelocity.y = 0;
        pointerStartTime = performance.now();
      };

      const handlePointerMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // Normalized mouse coordinates (-1 to 1)
        mouse.x = Math.max(-1.1, Math.min(1.1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
        mouse.y = Math.max(-1.1, Math.min(1.1, -((e.clientY - rect.top) / rect.height) * 2 + 1));

        lastMouseMoveTime = performance.now();
        mouseActive = true;

        // Hover raycasting when not actively dragging
        if (!isDraggingCamera) {
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(clickableObjects);
          if (intersects.length > 0) {
            const hit = intersects[0].object;
            setIsHoveringCamera(hit.userData?.type === "camera");
          } else {
            setIsHoveringCamera(false);
          }
        }

        if (isPointerDown) {
          const dx = e.clientX - prevPointerX;
          const dy = e.clientY - prevPointerY;
          const totalDist = Math.hypot(e.clientX - startX, e.clientY - startY);

          // Mobile touch protection: if predominantly vertical swipe on touch, allow native page scroll
          if (e.pointerType === "touch" && !hasMovedEnoughToDrag) {
            if (Math.abs(e.clientY - startY) > Math.abs(e.clientX - startX) * 1.5 && totalDist > 10) {
              isPointerDown = false;
              return;
            }
          }

          if (totalDist > 6) {
            hasMovedEnoughToDrag = true;
            if (!isDraggingCamera) {
              isDraggingCamera = true;
              setIsDragging(true);
            }
          }

          if (isDraggingCamera) {
            // Direct drag rotation
            const rotDeltaY = dx * 0.0055;
            const rotDeltaX = dy * 0.0045;

            dragRotation.y += rotDeltaY;
            dragRotation.x += rotDeltaX;

            // Clamped limits so camera never flips or rotates excessively
            dragRotation.x = Math.max(-0.45, Math.min(0.45, dragRotation.x));
            dragRotation.y = Math.max(-0.85, Math.min(0.85, dragRotation.y));

            // Record instantaneous velocity for momentum on release
            dragVelocity.y = rotDeltaY * 0.85;
            dragVelocity.x = rotDeltaX * 0.85;
          }

          prevPointerX = e.clientX;
          prevPointerY = e.clientY;
        }
      };

      const handlePointerUp = (e) => {
        if (!containerRef.current) return;
        const totalDist = Math.hypot(e.clientX - startX, e.clientY - startY);
        const duration = performance.now() - pointerStartTime;

        // Short tap / click without drag triggers camera shutter or photo frame
        if (isPointerDown && (!hasMovedEnoughToDrag || totalDist <= 6) && duration < 500) {
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
        }

        isPointerDown = false;
        if (isDraggingCamera) {
          isDraggingCamera = false;
          setIsDragging(false);
        }
      };

      const handlePointerLeave = () => {
        mouseActive = false;
        if (isPointerDown) {
          isPointerDown = false;
          isDraggingCamera = false;
          setIsDragging(false);
        }
      };

      const domElem = renderer.domElement;
      domElem.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
      document.addEventListener("pointerleave", handlePointerLeave);

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
        const now = performance.now();

        // Subtle organic floating motion
        const floatY = Math.sin(elapsed * 1.2) * 0.045;
        const floatRot = Math.cos(elapsed * 0.85) * 0.02;

        // Mouse inactivity / settle-back logic:
        // When mouse stops moving for > 1000ms or leaves, mouse influence smoothly decays to 0
        if (now - lastMouseMoveTime > 1000 || !mouseActive) {
          targetMouseInfluence = 0.0;
        } else {
          targetMouseInfluence = 1.0;
        }
        mouseInfluence += (targetMouseInfluence - mouseInfluence) * 0.035;

        // Subtle mouse parallax rotation (horizontal and vertical)
        const targetParallaxRotX = -mouse.y * 0.22 * mouseInfluence;
        const targetParallaxRotY = mouse.x * 0.32 * mouseInfluence;

        // Subtle depth position parallax
        const targetParallaxPosX = mouse.x * 0.12 * mouseInfluence;
        const targetParallaxPosY = mouse.y * 0.07 * mouseInfluence;

        // Drag momentum & return spring
        if (!isPointerDown) {
          // Apply momentum
          dragRotation.x += dragVelocity.x;
          dragRotation.y += dragVelocity.y;

          // Friction decay
          dragVelocity.x *= 0.88;
          dragVelocity.y *= 0.88;

          // Smoothly settle drag rotation back toward 0 (natural position)
          dragRotation.x += (0 - dragRotation.x) * 0.022;
          dragRotation.y += (0 - dragRotation.y) * 0.022;
        }

        // Smooth inertia & damping (lerp) toward target rotation and position
        currentRotX += (targetParallaxRotX + dragRotation.x + floatRot - currentRotX) * 0.065;
        currentRotY += (targetParallaxRotY + dragRotation.y - currentRotY) * 0.065;
        currentPosX += (targetParallaxPosX - currentPosX) * 0.055;
        currentPosY += (targetParallaxPosY + floatY - currentPosY) * 0.055;

        // Apply exclusively to cameraInteractiveGroup (child of cameraScrollRig)
        cameraInteractiveGroup.rotation.x = currentRotX;
        cameraInteractiveGroup.rotation.y = currentRotY;
        cameraInteractiveGroup.position.x = currentPosX;
        cameraInteractiveGroup.position.y = currentPosY;

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
        domElem.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);
        document.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("resize", handleResize);
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
      aria-label="Interactive Vintage 3D Film Camera & Photography Studio Experience"
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        style={{ touchAction: "pan-y" }}
        className={`w-full h-full block absolute inset-0 ${
          isDragging ? "cursor-grabbing" : isHoveringCamera ? "cursor-pointer" : "cursor-grab"
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
              CANON AT-1 // 35MM VINTAGE SLR
            </span>
          </div>
          <div className="mt-1 text-xs font-editorial text-stone-200 flex items-center gap-3">
            <span>Canon FD 50mm 1:1.4 S.S.C.</span>
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
                  Documented through authentic Scottish light and heirloom 35mm film optics. Every photograph honors honest emotion and genuine human connection.
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
