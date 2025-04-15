import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import vertexShader from "./nearUniverseVertex";
import fragmentShader from "./universeFragment";

import data from './near_galaxy_data.json'

const NearGalaxies = (props) => {

    const universePositions = data["positions"]
    const universeDiameters = data["linear_diameter"]

    const uniforms = useMemo(() => ({
        pointTexture: { value: new THREE.TextureLoader().load( 'circle.png' ) }
      }), [])
    
    // This reference gives us direct access to our points
    const points = useRef();
    // Generate our positions attributes array
    const particlesPosition = useMemo(() => {
      const positions = new Float32Array(universePositions.length * 3);
      universePositions.forEach((element, index) => {
        positions.set([element[0] , element[1] , element[2]], index * 3 )
      });

      return positions;
    });
    
    const linearDiameterValues = useMemo(() => {
        const positions = new Float32Array(universeDiameters.length);
  
        universeDiameters.forEach((element, index) => {
            positions[index] = element;          
          });
      
        return positions;
      });


    useFrame((state) => {
      })


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


      {data["name"].map((value, index) =>  {
        if(props.labelsVisible) {
          return;
        }    
        if(data["linear_diameter"][index] < 15) {
            return
        }
        /*
        if(index < Math.min(Math.pow(props.distance, 1.2), 400.0)){
          return
        }
        */
        if(index < 10 * props.distance){
          return

        }
        let star_position = [data["positions"][index][0], data["positions"][index][1], data["positions"][index][2]];
        return (
        <Html center  position = {star_position}>
          <div className={"planet_text"} onClick={()=> {


              props.setCameraTarget(star_position)
              let newCameraPosition = [star_position[0]-0.1, star_position[1], star_position[2]]
              props.setCameraPosition(newCameraPosition)
              props.setInfoBoxShowing(true)
              props.setInfoBoxTitle(value)
          }}>  
            {value}
          </div>
        </Html>
      )
      })}
        </>

    );
  };
  
  export default NearGalaxies