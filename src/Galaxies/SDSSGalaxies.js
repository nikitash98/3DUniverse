import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import vertexShader from "./nearUniverseVertex";
import fragmentShader from "./universeFragment";

import data from './sdss_galaxy_data.json'

const SDSSGalaxies = (props) => {

    const universePositions = data["positions"]
    const universeColors = data["colors"]
    const uniforms = useMemo(() => ({
        pointTexture: { value: new THREE.TextureLoader().load( 'circle.png' ) }
      }), [])
    let multValue = 1
    // This reference gives us direct access to our points
    const points = useRef();
    // Generate our positions attributes array
    const particlesPosition = useMemo(() => {
      const positions = new Float32Array(universePositions.length * 3);

      universePositions.forEach((element, index) => {
        positions.set([element[0] * multValue , element[1] * multValue, element[2] * multValue], index * 3 )
      });

      return positions;
    });
    
    const linearDiameterValues = useMemo(() => {
        const positions = new Float32Array(universePositions.length);
  
        universePositions.forEach((element, index) => {
            positions[index] = 10;          
          });
        return positions;
      });

      const colorValues = useMemo(() => {
        const positions = new Float32Array(universeColors.length * 3);
        
        universeColors.forEach((element, index) => {
          positions.set([element[0], element[1], element[2]], index * 3 )
        });
        return positions;
      });



    return (
        <>
      <points ref={points} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />

          <bufferAttribute
            attach="attributes-gSize"
            count={linearDiameterValues.length}
            array={linearDiameterValues}
            itemSize={1}
          />

        <bufferAttribute
            attach="attributes-color"
            count={colorValues.length}
            array={colorValues}
            itemSize={3}
          />

          
        </bufferGeometry>
        <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        vertexColors= {true}
        transparent = {true}
        blending={THREE.NormalBlending}
        depthWrite={true}
        />
      </points>

        </>

    );
  };
  
  export default SDSSGalaxies