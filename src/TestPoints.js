import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";


const TestPoints = (props) => {
        // This reference gives us direct access to our points
        const points = useRef();

        const particles = 500000;
        const n = 1000, n2 = n / 2; // particles spread in the cube


        const positions = [];
        const colors = [];

        const color = new THREE.Color();

        for ( let i = 0; i < particles; i ++ ) {

            // positions

            const x = Math.random() * n - n2;
            const y = Math.random() * n - n2;
            const z = Math.random() * n - n2;

            positions.push( x, y, z );

            // colors

            const vx = ( x / n ) + 0.5;
            const vy = ( y / n ) + 0.5;
            const vz = ( z / n ) + 0.5;

            color.setRGB( vx, vy, vz, THREE.SRGBColorSpace );

            colors.push( color.r, color.g, color.b );
        }

        // Generate our positions attributes array
        const particlesPosition = useMemo(() => {
          const p_positions = new Float32Array(positions);

        /*
          starPositions.forEach((element, index) => {
            positions.set([element[0] * star_mult, element[1] * star_mult, element[2] * star_mult], index * 3 )
            
          });
        */
          return p_positions;
        });

        
        const particlesColor = useMemo(()=> {
            const p_colors = new Float32Array(colors);
            
            return p_colors
        })
    

        return (
            <points ref={points}>
            <bufferGeometry>
            <bufferAttribute
                attach="attributes-position"
                count={particlesPosition.length / 3}
                array={particlesPosition}
                itemSize={3}
            />

            <bufferAttribute
                attach="attributes-color"
                count={particlesColor.length / 3}
                array={particlesColor}
                itemSize={3}
            />
            </bufferGeometry>
            <pointsMaterial
                size = {15}
                vertexColors
                depthWrite
            />
            </points>
        )
}

export default TestPoints