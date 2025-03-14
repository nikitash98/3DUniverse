import { Canvas } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import {React, useRef} from 'react'

const Sun = (props) => {
  const texture = useLoader(THREE.TextureLoader, 'Textures/Planets/Sun/Sun_Diffuse.png'); // Adjust the path to your texture
  
    const materialRef = useRef();
  
  const uniforms = {
    uTime: { value: 0.0 },
    atmOpacity: { value: 1.0 },
    atmPowFactor: { value: 4.1 },
    atmMultiplier: { value: 9.5 },
  };
  const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 eyeVector;

  void main() {
    vec4 mvPos = modelViewMatrix * vec4( position, 1.0 );

    // normalMatrix is a matrix that is used to transform normals from object space to view space.
    vNormal = normalize( normalMatrix * normal );

    // vector pointing from camera to vertex in view space
    eyeVector = - (modelViewMatrix * vec4(position, 1.0)).xyz;

    vUv = uv;


    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 eyeVector;


  uniform float atmOpacity;
  uniform float atmPowFactor;
  uniform float atmMultiplier;

  void main() {
    float dotP = dot( normalize(vNormal), normalize(eyeVector) );
    // This factor is to create the effect of a realistic thickening of the atmosphere coloring
    float factor = pow(dotP, atmPowFactor) * atmMultiplier;
    // Adding in a bit of dotP to the color to make it whiter while the color intensifies
    vec3 atmColor = vec3(1.0, 0.5, 0.0);
    // use atmOpacity to control the overall intensity of the atmospheric color
    gl_FragColor = vec4(pow(dotP, 2.0) * 1.0);
    gl_FragColor.rgb *= vec3(atmColor);
    gl_FragColor.a *= 0.2;
  }
`;

    return (
      <>
    <Sphere args={[109, 32, 32]} renderOrder={0}>
      <meshBasicMaterial map={texture} 
/>
    </Sphere>
      <Sphere args={[140, 32, 32]} renderOrder={10}>
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={THREE.BackSide}
          transparent
          />
      </Sphere>
      <Html center position={[0,-109,0 ]}>
          <div className={"planet_text"} onClick={()=> {
            props.setCameraTarget([23544, 0, 0])
            props.setCameraPosition([23544 + 109 * 2, 0, 0])
          }}> 
            Sun
          </div>
      </Html>
      </>

  );
};

export default Sun