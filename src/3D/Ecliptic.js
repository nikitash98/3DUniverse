//https://medium.com/geekculture/build-3d-apps-with-react-animated-solar-system-part-1-c4c394a8574c
import * as THREE from "three";
import { useState } from "react";
import { Line } from "@react-three/drei";

export function Ecliptic({ xRadius = 1, zRadius = 1 }) {
  const [lineWidth, setLineWidth] = useState(2);

    const points = [];
    for (let index = 0; index < 64; index++) {
      const angle = (index / 64) * 2 * Math.PI;
      const x = xRadius * Math.cos(angle);
      const z = zRadius * Math.sin(angle);
      points.push(new THREE.Vector3(x, 0, z));
    }
  points.push(points[0]);
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    return (
      <>
      {/*
      <line geometry={lineGeometry} onPointerOver={() => {setLineWidth(100)}}
      onPointerOut={() => setLineWidth(100)}
 >
        <lineBasicMaterial attach="material" color="#222222" linewidth={lineWidth} />
      </line>
        */}
        <Line points = {points} 
        onPointerOver={() => {setLineWidth(4)}}
        onPointerOut={() => setLineWidth(2)}
        
        lineWidth={lineWidth} color="#222222"/>
        </>

    );
  }