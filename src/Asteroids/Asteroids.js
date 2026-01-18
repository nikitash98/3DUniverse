import { Html, OrbitControls, Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./asteroidsVertex";
import fragmentShader from "./asteroidsFragment";

import data from './small_body_data.json';


// OrbitalObject component: takes radius and speed
function OrbitalObject(props) {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    const angle = props.globalTime.current;
    let orbitalPositionComputed = computeOrbitalPosition(props.a * 23454.8, props.e, props.i, props.om, props.w, props.ma, angle)
    //props.movingRefs.current[props.full_name].position.set(...orbitalPositionComputed);
    meshRef.current.position.set(...orbitalPositionComputed);
  })


  return (
    
    <>
      <group ref={meshRef}>
          <Html center
            position={[0.0, 0, 0]}>
            <div className={"planet_text"} 
            onClick={()=> {
              props.setCameraTarget(meshRef.current)

            }}>
              {props.full_name}
            </div>
          </Html>

    </group>

    </>

  )
}

function multiply3x3(A, B) {
  // Initialize result as a 3×3 zero matrix
  const C = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  for (let i = 0; i < 3; i++) {         // for each row of A
    for (let j = 0; j < 3; j++) {       // for each column of B
      let sum = 0;
      for (let k = 0; k < 3; k++) {     // dot product of A’s row and B’s column
        sum += A[i][k] * B[k][j];
      }
      C[i][j] = sum;
    }
  }

  return C;
}

function keplerSolve(M, e) {
  let E = M;
  for (let i = 0; i < 5; i++) {
    E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  }
  return E;
}

function computeOrbitalPosition(
  a,       
  e_deg,
  i_deg,      // [a, e_deg, i_deg]
  Ω_deg,
  ω_deg,
  M_deg,
  input_time) {
  const e = e_deg * Math.PI / 180;
  const i = i_deg * Math.PI / 180;
  const Ω = Ω_deg * Math.PI / 180;
  const ω = ω_deg * Math.PI / 180;

  let M = M_deg * Math.PI / 180; // mean anomaly in rad

  const mu = 1.32712440041e20;
  const n = Math.sqrt(mu / Math.pow(a, 3));        // mean motion
  const M_t = M - input_time * 0.0001 * n;              // updated mean anomaly

  const E = keplerSolve(M_t, e);                   // eccentric anomaly
  const r_ct = a * (1 - e * Math.cos(E));          // radius

  // parametric coords in orbital plane
  const x_op = Math.cos(M_t);
  const y_op = Math.sin(M_t);

  let posOrbitalPlane = [x_op * r_ct, y_op * r_ct, 0];

  // rotation matrices
  const cosΩ = Math.cos(Ω), sinΩ = Math.sin(Ω);
  const cosI = Math.cos(i), sinI = Math.sin(i);

  // Rz(Ω)
  const RzΩ = [
    [ cosΩ, -sinΩ, 0 ],
    [ sinΩ,  cosΩ, 0 ],
    [    0,     0, 1 ],
  ];
  // Rx(i)
  const RxI = [
    [1,     0,    0],
    [0,  cosI, -sinI],
    [0,  sinI,  cosI],
  ];
  // Rz(ω)
  const Rzω = [
    [ Math.cos(ω), -Math.sin(ω), 0 ],
    [ Math.sin(ω),  Math.cos(ω), 0 ],
    [    0,     0, 1 ],
  ];


  const RzID = [
    [ 1.0, 1.0, 0 ],
    [ 0.0,  1.0, 0 ],
    [    0,     0, 1 ],
  ];

  // multiply matrices: R = RzΩ * RxI * Rzω
  function matMul(A, B) {
    return A.map((row) =>
      B[0].map((_, j) =>
        row[0]*B[0][j] + row[1]*B[1][j] + row[2]*B[2][j]
      )
    );
  }
  let R = multiply3x3(Rzω,multiply3x3(RxI,RzΩ));

  //R = RxI;
  // apply R to posOrbitalPlane
  const [x, y, z] = posOrbitalPlane;
  
  let orbitalPosition = [
    R[0][0]*x + R[1][0]*y + R[2][0]*z,
    R[0][1]*x + R[1][1]*y + R[2][1]*z,
    R[0][2]*x + R[1][2]*y + R[2][2]*z,
  ];

  let swapped = [orbitalPosition[0], orbitalPosition[2], orbitalPosition[1]];
  

  return swapped;
}

const Asteroids = (props) => {
    const points = useRef();
    const asteroidsAData = data["a"];
    const asteroidsName = data["full_name"];

    const uniforms = useMemo(() => ({
        uDistance: {
            value: props.distance
        },
        uTime: {
            value: 0
        },
        pointTexture: { value: new THREE.TextureLoader().load( 'circle.png' ) },
      }), [])
    

    // Generate our positions attributes array

    const asteroidsPositions = useMemo(() => {
        const positions = new Float32Array(asteroidsAData.length * 3);
        asteroidsAData.forEach((element, index) => {
            positions.set([data["a"][index] * 23454.8, data["e"][index], data["i"][index]], index * 3 )
        });
        return positions;
      });
  
    const orbitalElements = useMemo(() => {
        const positions = new Float32Array(asteroidsAData.length * 3);
        asteroidsAData.forEach((element, index) => {
            positions.set([0.0, data["om"][index], data["w"][index]], index * 3 )
        });
        return positions;
    })

    const extraOrbitalElements = useMemo(() => {
    const positions = new Float32Array(asteroidsAData.length * 3);
    asteroidsAData.forEach((element, index) => {
        positions.set([data["ma"][index], data["diameter"][index], 0.0], index * 3 )
    });
      return positions;
    });

    useFrame((state) => {
        points.current.material.uniforms.uDistance.value = props.distance;
        points.current.material.uniforms.uTime.value = props.globalTime.current;
        //points.current.material.uniforms.uTime.value = 0.0;

    })


    return (
      <>

      {data["full_name"].slice(0, 10).map((value, index) => {
        if(props.distance > 500000 || props.distance < 50000) {
          return
        }
    

        return (
          <OrbitalObject 
            a = {data["a"][index]}
            e = {data["e"][index]}
            i = {data["i"][index]}
            om = {data["om"][index]}
            w = {data["w"][index]}
            ma = {data["ma"][index]}
            full_name = {data["full_name"][index]}
            movingRefs = {props.movingRefs}
            setCameraTarget = {props.setCameraTarget}
            globalTime = {props.globalTime}
          />
        )
      })}

      <points ref={points} frustumCulled = {false}>
        <bufferGeometry>
            <bufferAttribute
            attach="attributes-position"
            count={asteroidsPositions.length / 3}
            array={asteroidsPositions}
            itemSize={3}
          />

        <bufferAttribute
            attach="attributes-orbitalElements"
            count={orbitalElements.length / 3}
            array={orbitalElements}
            itemSize={3}
          />

          <bufferAttribute
            attach="attributes-extraOrbitalElements"
            count={extraOrbitalElements.length / 3}
            array={extraOrbitalElements}
            itemSize={3}
          />

        </bufferGeometry>

        <shaderMaterial
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent = {true}
        />
      </points>

      
      </>

    );
  };
  
  export default Asteroids