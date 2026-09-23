'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface StripeWaveCanvasProps {
  className?: string;
}

export function StripeWaveCanvas({ className = '' }: StripeWaveCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // 1. Feature detection: WebGL availability
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let isVisible = true;

    // 2. Three.js Scene Setup
    const scene = new THREE.Scene();
    
    const width = container.clientWidth || 700;
    const height = container.clientHeight || 580;
    
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Custom Iridescent Ribbon Geometry: 140x50 mesh for organic fluid folds
    const geometry = new THREE.PlaneGeometry(8.2, 5.0, 140, 50);

    // 4. Custom GLSL Shader for Authentic Stripe Iridescent Wave (Blurple, Cyan, Violet, Coral)
    const waveUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      // Stripe signature palette: Blurple, Violet, Cyan, Coral accent
      uColor1: { value: new THREE.Color('#635BFF') }, // Stripe Flagship Blurple
      uColor2: { value: new THREE.Color('#E03177') }, // Vibrant Magenta / Rose
      uColor3: { value: new THREE.Color('#FF5E3A') }, // Warm Sunset Coral
      uColor4: { value: new THREE.Color('#FFA03A') }, // Warm Golden Amber
      uColor5: { value: new THREE.Color('#00D4FF') }, // Electric Cyan
    };

    const material = new THREE.ShaderMaterial({
      uniforms: waveUniforms,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vNormalVec;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Harmonic multi-frequency fluid wave deformation (Stripe 3D ribbon effect)
          float wave1 = sin(pos.x * 1.6 + uTime * 0.92) * 0.52;
          float wave2 = cos(pos.y * 2.0 + uTime * 0.78) * 0.38;
          float wave3 = sin((pos.x + pos.y) * 1.4 + uTime * 1.15) * 0.28;
          float mouseDist = distance(uv, uMouse);
          float mouseInteraction = sin(mouseDist * 5.0 - uTime * 1.5) * 0.16 * smoothstep(0.8, 0.0, mouseDist);

          pos.z += wave1 + wave2 + wave3 + mouseInteraction;
          pos.y += sin(pos.x * 0.75 + uTime * 0.35) * 0.28;

          vElevation = pos.z;
          vNormalVec = normal;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        uniform vec3 uColor5;
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          // Dynamic iridescent color blending across UV coordinates and wave heights
          float normElevation = (vElevation + 0.9) * 0.55;
          float t = clamp(vUv.x * 0.70 + vUv.y * 0.30 + normElevation * 0.30, 0.0, 1.0);

          vec3 color = uColor1;
          if (t < 0.25) {
            color = mix(uColor1, uColor2, t / 0.25);
          } else if (t < 0.50) {
            color = mix(uColor2, uColor3, (t - 0.25) / 0.25);
          } else if (t < 0.75) {
            color = mix(uColor3, uColor4, (t - 0.50) / 0.25);
          } else {
            color = mix(uColor4, uColor5, (t - 0.75) / 0.25);
          }

          // Ambient luminous edge highlight (Stripe silk shine)
          float fresnel = 0.55 + 0.45 * pow(1.0 - abs(vElevation * 0.65), 1.8);
          color *= fresnel;

          // Progressive left-edge feathering so ribbon gracefully dissolves before left column
          float edgeAlpha = smoothstep(0.0, 0.28, vUv.x) * smoothstep(1.0, 0.88, vUv.x) *
                           smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y);

          // Alpha curve: luminous transparency, soft fade out at perimeter
          float finalAlpha = clamp(0.82 * edgeAlpha * (0.75 + normElevation * 0.25), 0.0, 0.86);

          gl_FragColor = vec4(color, finalAlpha);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.32;
    mesh.rotation.y = 0.22;
    mesh.rotation.z = -0.14;
    // Shift mesh slightly right to frame the HUD card and leave left side clean
    mesh.position.set(0.65, 0.0, 0);
    scene.add(mesh);

    // 5. Mouse tracking with smooth lerp
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        targetMouse.x = (e.clientX - rect.left) / rect.width;
        targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Responsive Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 7. Visibility Observer (Zero CPU when scrolled away)
    const intersectionObserver = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    intersectionObserver.observe(container);

    // 8. High-Performance Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible || document.hidden) return;

      const delta = clock.getDelta();
      waveUniforms.uTime.value += delta * 0.88;
      waveUniforms.uMouse.value.lerp(targetMouse, 0.05);
      mesh.rotation.z = -0.14 + Math.sin(waveUniforms.uTime.value * 0.3) * 0.04;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Layer 1: Instant CSS Radial Aura Fallback (Zero CLS, Fades Cleanly on WebGL Load) */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#533AFD]/20 via-[#00D4FF]/15 to-transparent blur-3xl" />
      </div>

      {/* Layer 2: Real 3D WebGL Three.js Wave Canvas (Exact Stripe Architecture) */}
      {hasWebGL && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
