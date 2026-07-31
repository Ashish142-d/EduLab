"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function PhysicsBall({ isRunning, angle, velocity, onResetComplete }: {
  isRunning: boolean;
  angle: number;
  velocity: number;
  onResetComplete: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef<number | null>(null);

  useFrame((state) => {
    if (!isRunning || !meshRef.current) {
      if (startTime.current !== null) startTime.current = null;
      return;
    }

    if (startTime.current === null) {
      startTime.current = state.clock.getElapsedTime();
    }

    const t = state.clock.getElapsedTime() - startTime.current;
    const rad = (angle * Math.PI) / 180;
    const g = 9.81;

    // Standard trajectory vector equations
    const x = velocity * Math.cos(rad) * t;
    const y = velocity * Math.sin(rad) * t - 0.5 * g * t * t;

    // Basic ground collision detection
    if (y < 0 && t > 0.1) {
      meshRef.current.position.set(x, 0.25, 0);
      onResetComplete();
      return;
    }

    meshRef.current.position.set(x, Math.max(0.25, y + 0.25), 0);
  });

  return (
    <mesh ref={meshRef} position={[0, 0.25, 0]}>
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshStandardMaterial color="#f43f5e" roughness={0.1} metalness={0.1} />
    </mesh>
  );
}

export default function ProjectileExperiment() {
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(15);
  const [isRunning, setIsRunning] = useState(false);

  const triggerReset = () => {
    setIsRunning(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 relative h-[450px] bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 15, 10]} intensity={1.2} />
          <PhysicsBall
            isRunning={isRunning}
            angle={angle}
            velocity={velocity}
            onResetComplete={triggerReset}
          />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0, 0]}>
            <planeGeometry args={[50, 10]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <gridHelper args={[50, 50, "#475569", "#334155"]} position={[10, 0.01, 0]} />
          <OrbitControls enableZoom={true} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-slate-900/80 p-3 rounded text-xs border border-slate-800 max-w-xs">
          <p className="font-semibold mb-1">Theoretical Metrics:</p>
          <p>Peak Height: {((Math.pow(velocity * Math.sin(angle * Math.PI / 180), 2)) / (2 * 9.81)).toFixed(2)} m</p>
          <p>Range: {((Math.pow(velocity, 2) * Math.sin(2 * angle * Math.PI / 180)) / 9.81).toFixed(2)} m</p>
        </div>
      </div>

      <div className="p-6 border border-slate-800 rounded-lg bg-slate-950 space-y-6">
        <div>
          <h3 className="font-bold text-lg text-slate-200">Controls</h3>
          <p className="text-slate-400 text-sm">Configure variables to run the simulation.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Launch Angle ({angle}°)</label>
            <input
              type="range"
              min="10"
              max="90"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Initial Velocity ({velocity} m/s)</label>
            <input
              type="range"
              min="5"
              max="30"
              value={velocity}
              onChange={(e) => setVelocity(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={() => setIsRunning(true)}
            disabled={isRunning}
            className="flex-1 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition"
          >
            Launch Ball
          </button>
          <button
            onClick={triggerReset}
            className="flex-1 px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-sm font-medium transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
