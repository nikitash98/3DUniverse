import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

import data from './more_stars.json'

const Stars = (props) => {
    const { count, shape } = props;
    const radius = 20;
    const star_mult = props.star_distance;
    const starPositions = data["points"];
    const uniforms = useMemo(() => ({
        uTime: {
          value: 0.0
        },
        uRadius: {
          value: radius
        },
        uClose: {
            value: 5
        },
        uFar: {
            value: 100
        }, 
        uDistance: {
            value: props.distance
        }
      }), [])
    
    // This reference gives us direct access to our points
    const points = useRef();
    // Generate our positions attributes array
    const particlesPosition = useMemo(() => {
      const positions = new Float32Array(starPositions.length * 3);

      starPositions.forEach((element, index) => {
        positions.set([element[0] * star_mult, element[1] * star_mult, element[2] * star_mult], index * 3 )
        
      });
  
      return positions;
    });
    

    const particlesColor = useMemo(()=> {
        const colors = new Float32Array(starPositions.length * 3);
        
        starPositions.forEach((element, index) => {
            colors.set([1, 1, 1], index * 3 )
            
        });
        return colors
    })

    useFrame((state) => {
        points.current.material.uniforms.uDistance.value = props.distance;
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

        <shaderMaterial
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        vertexColors= {true}
        transparent = {true}
      />

      </points>
    );
  };
  
  export default Stars