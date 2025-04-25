import { OrbitControls, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./satelliteVertex_02";
import fragmentShader from "./satelliteFragmentShader";
import data from './satellite_data_02.json'

const Satellites_02 = (props) => {
  const points = useRef();

    const inclination = data["Inclination (deg)"]
    const ra_asc_node = data["RA Asc Node (deg)"]
    const eccentricity = data["Eccentricity"]
    const arg_perigee = data["Argument of Perigee (deg)"]
    const mean_anomaly = data["Mean Anomaly (deg)"]
    const mean_motion = data["Mean Motion (rev/day)"]
    const semi_major = data["Semi-major Axis (km)"]


    const uniforms = useMemo(() => ({
        time: {
          value: 0.0
        },
        pointTexture: { value: new THREE.TextureLoader().load( 'icons/X.png' ) }

    }), []
    )
    const labelRefs = useRef({})
    const labelRef = useRef();
    useFrame((state) => 
    {
      const { clock } = state;
      points.current.material.uniforms.time.value = clock.getElapsedTime();
    }
    );

    useEffect(()=> {
    }, []);

    const inclinationPositions = useMemo(() => {
        const positions = new Float32Array(inclination.length);
        inclination.forEach((element, index) => {
            positions.set([element], index )
        });
        return positions;
    });


    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(arg_perigee.length * 3);
        arg_perigee.forEach((element, index) => {
          positions.set([index/500 , 0, 0], index * 3 )
        });
    
        return positions;
      });


    const ra_asc_nodeValues = useMemo(() => {
        const positions = new Float32Array(ra_asc_node.length);
        ra_asc_node.forEach((element, index) => {
            positions.set([element], index )
        });
        return positions;
        });

    const eccentricityValues = useMemo(() => {
        const positions = new Float32Array(eccentricity.length);
        eccentricity.forEach((element, index) => {
            positions.set([element], index )
        });
        return positions;
    });

        const arg_perigeeValues = useMemo(() => {
            const positions = new Float32Array(arg_perigee.length);
            arg_perigee.forEach((element, index) => {
                positions.set([100.0], index )
            });
            return positions;
        });

        
    const mean_anomalyValues = useMemo(() => {
        const positions = new Float32Array(mean_anomaly.length);
        mean_anomaly.forEach((element, index) => {
            positions.set([element], index )
        });
        return positions;
    });

    const semi_majorValues = useMemo(() => {
        const positions = new Float32Array(semi_major.length);
        semi_major.forEach((element, index) => {
            positions.set([element], index )
        });
        return positions;
    });

    const mean_motionValues = useMemo(() => {
        const positions = new Float32Array(mean_motion.length);
        mean_motion.forEach((element, index) => {
            positions.set([element], index )
        });
        return positions;
    });

    const sizes = useMemo(()=> {
        const sizes = new Float32Array(arg_perigee.length).fill(5 + Math.random() * 10);
        return sizes
    })
    

    const center = [0, 0, 0]; // The center point around which the label will rotate
    const radius = 1.1; // Distance from the center point
    const speed = 0.1; // Speed of rotation
  
    // Use useFrame to update the label's position on each frame
    useFrame(({ clock }) => {
      if (labelRef.current) {
        const elapsedTime = clock.getElapsedTime();
        
        // Calculate new position using circular motion
        const x = center[0] + radius * Math.cos(elapsedTime * speed);
        const z = center[2] + radius * Math.sin(elapsedTime * speed);
        // Update label's position
        labelRef.current.position.set(x, center[1], z);
      }
    });
  
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
                attach="attributes-inclination"
                count={inclinationPositions.length}
                array={inclinationPositions}
                itemSize={1}
              />



            <bufferAttribute
                attach="attributes-mean_motion"
                count={mean_motionValues.length}
                array={mean_motionValues}
                itemSize={1}
              />

              <bufferAttribute
                attach="attributes-ra_asc_node"
                count={ra_asc_nodeValues.length}
                array={ra_asc_nodeValues}
                itemSize={1}
              />
              <bufferAttribute
                attach="attributes-eccentricity"
                count={eccentricityValues.length}
                array={eccentricityValues}
                itemSize={1}
              />
              <bufferAttribute
                attach="attributes-arg_perigee"
                count={arg_perigeeValues.length}
                array={arg_perigeeValues}
                itemSize={1}
              />
            <bufferAttribute
                attach="attributes-mean_anomaly"
                count={mean_anomalyValues.length}
                array={mean_anomalyValues}
                itemSize={1}
              />
            <bufferAttribute
                attach="attributes-semi_major"
                count={semi_majorValues.length}
                array={semi_majorValues}
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



      
      <group ref = {labelRef}>

      <Html position = {[0, 0.0, 0]}
                   
                  >
                <div className={"planet_text"}
                    onClick={()=> {
                      /*
                      setCameraTarget([0, 1.08, 0])
                      setCameraPosition([0.02, 1.1, 0.02])
                      */
                    }}
                    
                    > 
                      ISS
                      </div>

      </Html>
      </group>

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
export default Satellites_02