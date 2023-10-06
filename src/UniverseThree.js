import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

import data from './data.json'

const UniverseThree = (props) => {
    const { count, shape } = props;
    const radius = 20;
    const universeMult = props.universe_distance;
    const universePositions = data["points"]
    const universeColors = data["colors"]
    const universeSizes = data["size"]
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
            value: 1000000000000
        },
        uDistance: {
          value: props.distance
        }
      }), [])
    
    // This reference gives us direct access to our points
    const points = useRef();
    // Generate our positions attributes array
    const particlesPosition = useMemo(() => {
      const positions = new Float32Array(universePositions.length * 3);

      universePositions.forEach((element, index) => {
        positions.set([element[0] * universeMult, element[1] * universeMult, element[2] * universeMult], index * 3 )
        
      });
  
      return positions;
    });
    

    const particlesColor = useMemo(()=> {
        const colors = new Float32Array(universePositions.length * 3);
        
        universeColors.forEach((element, index) => {
            colors.set([element[0], element[1], element[2]], index * 3 )
        });
        return colors
    })


    const particlesSize = useMemo(()=> {
      const sizes = new Float32Array(universeSizes.length);

      universeSizes.forEach((element, index) => {
        sizes.set([element], index )

        

      });

      return sizes
      
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
        

        <bufferAttribute
            attach="attributes-ABC"
            count={particlesSize.length}
            array={particlesSize}
            itemSize={1}
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
  
  export default UniverseThree