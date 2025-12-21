"use client";

import React, { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";

const StarBackground = (props: any) => {
    const ref = useRef<any>(null);

    // Generate stars in a sphere manually to avoid NaN issues
    const sphere = useMemo(() => {
        const positions = new Float32Array(5000 * 3);
        const radius = 1.2;

        for (let i = 0; i < 5000; i++) {
            // Generate random point on sphere using spherical coordinates
            const theta = Math.random() * Math.PI * 2; // 0 to 2π
            const phi = Math.acos(2 * Math.random() - 1); // 0 to π
            const r = radius * Math.cbrt(Math.random()); // Random radius with cubic root for uniform distribution

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

        return positions;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled
                {...props}
            >
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const StarsCanvas = () => (
    <div className="w-full h-auto fixed inset-0 z-[1] pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }} style={{ pointerEvents: 'none' }}>
            <Suspense fallback={null}>
                <StarBackground />
            </Suspense>
            <Preload all />
        </Canvas>
    </div>
);

export default StarsCanvas;
