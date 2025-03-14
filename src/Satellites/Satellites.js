import { OrbitControls, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./satelliteVertex";
import fragmentShader from "./satelliteFragmentShader";

import data from './satellite_data.json'

const Satellites = (props) => {
  const points = useRef();

    const apogees = data["apogee"]
    const inclination = data["inclination"]
    const period = data["period"]
    const names = data["names"]

    const uniforms = useMemo(() => ({
        uTime: {
          value: 0.0
        },
        pointTexture: { value: new THREE.TextureLoader().load( 'circle.png' ) }

    }), []
    )
    const labelRefs = useRef({})
    useFrame((state) => 
    {
      const { clock } = state;
      points.current.material.uniforms.uTime.value = clock.getElapsedTime();
    }
    );
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(apogees.length * 3);
        apogees.forEach((element, index) => {
          positions.set([element/500 , 0, 0], index * 3 )
        });
    
        return positions;
      });

      const apogeePositions = useMemo(() => {
        const positions = new Float32Array(apogees.length);
        apogees.forEach((element, index) => {
          positions.set([element/500], index )
        });
        return positions;
      });

      const inclinationPositions = useMemo(() => {
        const positions = new Float32Array(inclination.length);
        inclination.forEach((element, index) => {
          positions.set([element], index )
        });
        return positions;
      });

      const periodPositions = useMemo(() => {
        const positions = new Float32Array(period.length);
        period.forEach((element, index) => {
          positions.set([element], index )
        });
        return positions;
      });
      const phasePosition = useMemo(() => {
        const positions = new Float32Array(period.length);
        period.forEach((element, index) => {
          positions.set([Math.random(index)], index )
        });
        return positions;
      });

    let interestingSatelliteIndices = [0, 5, 10]

    let calculatePosition = (index, time) => {
      let a = apogees[index];
      let e = 0.2;
      let inclination = inclination[index];
      let omega = 30.0;
      let inclination_rad = Math.radians(inclination);
      let omega_rad = Math.radians(omega);
      let T = period[index];
  
      let phased_time = time + phasePosition[0] * 100.0;

      let x = a * (Math.cos(2.0 * Math.PI * phased_time/T)); 
      
      // * (1.0-e * cos(omega_rad)));
      let y = a * (Math.sin(2.0 * Math.PI * phased_time/T) * Math.cos(inclination_rad)); 
      
      //* (1.0-e * cos(omega_rad)));
      let z = a * (Math.sin(2.0 * Math.PI * phased_time/T) * Math.sin(inclination_rad)); 
      
      //a * (e * sin(omega_rad) * sin(2.0*PI * uTime/T));
  
      //float x = 0.0001 + uTime;
      //float y = 0.0;
      //float z = 0.0;
      return [x, y, z]
    }
    

    useFrame((state) => { 
      Object.entries(labelRefs.current).forEach(([key, ref]) => {
        if(ref.current) {
          console.log(ref.current.position)
          ref.current.position.set(Math.random() * 2, Math.random() * 2, Math.random() * 2)
        }

      })
    })
    return <>
          <points ref={points}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={particlesPosition.length / 3}
                array={particlesPosition}
                itemSize={3}
              />

            <bufferAttribute
                attach="attributes-apogee"
                count={apogeePositions.length}
                array={apogeePositions}
                itemSize={1}
              />

              <bufferAttribute
                attach="attributes-entry_inclination"
                count={inclinationPositions.length}
                array={inclinationPositions}
                itemSize={1}
              />
              <bufferAttribute
                attach="attributes-entry_period"
                count={periodPositions.length}
                array={periodPositions}
                itemSize={1}
              />
              <bufferAttribute
                attach="attributes-phase_position"
                count={phasePosition.length}
                array={phasePosition}
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

      {/*
      {interestingSatelliteIndices.map((index, i) => {
        return (
          <Html position={[i * 0.00001, 0.0, 0.0]} ref = {ref => labelRefs.current[index] = ref}>
            <div className={"planet_text"}> 
            ISS
            </div>
          </Html>
  
        )
      })
        */
        }
    </>
}
export default Satellites