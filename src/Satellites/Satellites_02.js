import { OrbitControls, Html, Sphere } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./satelliteVertex_02";
import fragmentShader from "./satelliteFragmentShader";
import data from './satellite_data_02.json'

const PI = Math.PI;
const TWO_PI = 2 * PI;

// Rotation around Y axis
function rotation3dY(angle) {
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  return [
    [ c, 0.0, -s],
    [0.0, 1.0, 0.0],
    [ s, 0.0,  c]
  ];
}

// Multiply 3x3 matrix with vec3
function mat3MulVec3(m, v) {
  return [
    m[0][0]*v[0] + m[0][1]*v[1] + m[0][2]*v[2],
    m[1][0]*v[0] + m[1][1]*v[1] + m[1][2]*v[2],
    m[2][0]*v[0] + m[2][1]*v[1] + m[2][2]*v[2]
  ];
}

// Inputs
function computeOrbitalPosition(params, time) {
  const {
    mean_motion,
    mean_anomaly,
    eccentricity,
    semi_major,
    ra_asc_node,
    inclination
  } = params;

  const n = TWO_PI * mean_motion / 5000.0;

  // Eccentric anomaly approximation
  const E = mean_anomaly + eccentricity * Math.sin(mean_anomaly);

  // True anomaly
  let true_anomaly = 2.0 * Math.atan(
    Math.sqrt((1.0 + eccentricity) / (1.0 - eccentricity)) * Math.tan(E / 2.0)
  );
  true_anomaly += n * time;

  // Radius from center
  const radius = semi_major * (1.0 - eccentricity * Math.cos(E));

  // Orbital plane coordinates
  const x_orbital = radius * Math.cos(true_anomaly);
  const y_orbital = radius * Math.sin(true_anomaly);

  // Rotation matrices
  const rotZ_raan = [
    [ Math.cos(ra_asc_node), -Math.sin(ra_asc_node), 0.0 ],
    [ Math.sin(ra_asc_node),  Math.cos(ra_asc_node), 0.0 ],
    [ 0.0,                    0.0,                   1.0 ]
  ];

  const rotX_inc = [
    [ 1.0, 0.0,                   0.0 ],
    [ 0.0, Math.cos(inclination), -Math.sin(inclination) ],
    [ 0.0, Math.sin(inclination),  Math.cos(inclination) ]
  ];

  // Combine rotations: R = Rz * Rx
  const rotation_matrix = multiplyMat3(rotZ_raan, rotX_inc);

  // Position in 3D
  const pos = mat3MulVec3(rotation_matrix, [x_orbital, y_orbital, 0.0]);

  // Normalize position (similar to gl_Position)
  return pos.map(v => v * 0.001);
}

// Multiply two 3x3 matrices
function multiplyMat3(a, b) {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result[i] = [];
    for (let j = 0; j < 3; j++) {
      result[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j];
    }
  }
  return result;
}

function OrbitalObject(props) {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    const angle = state.clock.getElapsedTime();
    const orbitalParams = {
      mean_motion: props.mean_motion,         // revolutions per second (example value)
      mean_anomaly: props.mean_anomaly,        // radians
      eccentricity: props.eccentricity,     // Earth's eccentricity (for example)
      semi_major: props.semi_major,    // meters (Earth radius + ~300km LEO)
      ra_asc_node: props.ra_asc_node,         // radians
      inclination: props.inclination          // radians (~51.6° like the ISS)
    };
    
    let orbitalPositionComputed = computeOrbitalPosition(orbitalParams, angle)
    //props.movingRefs.current[props.full_name].position.set(...orbitalPositionComputed);
    meshRef.current.position.set(...orbitalPositionComputed);
  })

  return (
    <>
      <group ref={meshRef}>
          <Html center
            position={[0.0, -0.2, 0]}>
            <div className={"satellite_text"} 
            onClick={()=> {
              props.setCameraTarget(meshRef.current)
            }}>
              {props.full_name}
            </div>
          </Html>
          <Sphere args={[0.05, 16, 16]}/>

    </group>

    </>

  )
}
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
        pointTexture: { value: new THREE.TextureLoader().load( 'Square.png' ) }

    }), []
    )
    const labelRefs = useRef({})
    const labelRef = useRef();
    useFrame((state) => 
    {
      const { clock } = state;
      points.current.material.uniforms.time.value = props.globalTime.current;
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
        const elapsedTime = props.globalTime.current;
        
        // Calculate new position using circular motion
        const x = center[0] + radius * Math.cos(elapsedTime * speed);
        const z = center[2] + radius * Math.sin(elapsedTime * speed);
        // Update label's position
        labelRef.current.position.set(x, center[1], z);
      }
    });
  
    return <>
    
    {/**
     *     const inclination = data["Inclination (deg)"]
    const ra_asc_node = data["RA Asc Node (deg)"]
    const eccentricity = data["Eccentricity"]
    const arg_perigee = data["Argument of Perigee (deg)"]
    const mean_anomaly = data["Mean Anomaly (deg)"]
    const mean_motion = data["Mean Motion (rev/day)"]
    const semi_major = data["Semi-major Axis (km)"]


     */}
    {data["Satellite Name"].slice(0, 10).map((value, index) => {
      
        return (
          <OrbitalObject 
            mean_motion = {mean_motion[index]}
            mean_anomaly = {mean_anomaly[index]}
            eccentricity = {eccentricity[index]}
            semi_major = {semi_major[index]}
            ra_asc_node = {ra_asc_node[index]}
            inclination = {inclination[index]}
            full_name = {data["Satellite Name"][index]}
            movingRefs = {props.movingRefs}
            setCameraTarget = {props.setCameraTarget}
          />
        )
      })}
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


    </>
}
export default Satellites_02