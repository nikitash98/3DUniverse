import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useRef } from 'react';
import * as THREE from 'three'
import { CameraControls, OrbitControls, TrackballControls } from '@react-three/drei';
import { useScroll } from '@react-three/drei';

import data from "./sectorinfo.json"
import { distance } from 'three/src/nodes/TSL.js';
const Handler = (props) => {
const { camera: mainCamera } = useThree();

let start_dist = 0.0000000001
let end_dist = 200000000000
const cameraControlsRef = useRef()

const [autoRotate, setAutoRotate] = useState(true);


const vec = useRef(new THREE.Vector3(0, 0, 0));
const timeoutRef = useRef(null);

/*
const canvas = document.getElementById("canvas");
const other_GL = canvas.getContext("webgl");

const debugInfo = other_GL.getExtension("WEBGL_debug_renderer_info");
const vendor = other_GL.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
const renderer = other_GL.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
*/

const handleScroll = () => {
  // Do something when scrolling
  // For example, change the position of the mesh
   // set_zoom_to(false)
};

useEffect(() => {
  window.addEventListener('mousewheel', handleScroll);
  console.log("added event")
  /*
  const controls = cameraControlsRef.current;
  if (controls) {
    const stopAutoRotate = () => setAutoRotate(false);
    controls.addEventListener("control", stopAutoRotate);
    return () => controls.removeEventListener("control", stopAutoRotate);
  }

  // Remove the event listener when the component is unmounted
  return () => {
    window.removeEventListener('mousewheel', handleScroll);
  };

  */
  const controls = cameraControlsRef.current;

  const stopAutoRotate = () => {
    setAutoRotate(false);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAutoRotate(true), 5000); // Restart auto-rotate after 5s
  };

  controls.addEventListener("control", stopAutoRotate);
  return () => controls.removeEventListener("control", stopAutoRotate);

}, []);


useEffect(()=> {
  cameraControlsRef?.current?.setLookAt(...props.cameraPosition , ...props.cameraTarget, true);
}, [props.cameraTarget]);



useEffect(()=> {
  cameraControlsRef?.current?.setLookAt(...props.cameraPosition , ...props.cameraTarget, true);
}, [props.cameraPosition]);



/*
useEffect(()=> {
  console.log(data[props.sector].position)
  vec.current.set(data[props.sector].position[0], data[props.sector].position[1], data[props.sector].position[2], )

  props.set_zoom_to(true)
}, [props.sector])
*/




useEffect(() => {
  // gl === WebGLRenderer
  // gl.info.calls
  /*
  console.log(gl.info);
  console.log(gl_context.MAX_ELEMENTS_VERTICES)
  console.log(gl_context.getParameter(gl_context.MAX_ELEMENTS_VERTICES))
  */
  //const maxElementIndex = gl.getParameter(gl.MAX_ELEMENTS_INDICES);

});


useEffect(()=> {
  props.setDistance(100)

  //cameraControlsRef?.current?.setLookAt(...[0, 100, 0] , ...[0, 0, 0], false);
}, [props.sectorValue])

useFrame((state, delta) => {
  let maxValue = 1000000
    if(mainCamera.position.length() < 0.1) {
      props.setSectorValue(prevSector => prevSector-1)
      let newCameraPosition = mainCamera.position.divideScalar(mainCamera.position.length()).multiplyScalar(maxValue * 0.9);
      cameraControlsRef?.current?.setLookAt(...newCameraPosition , ...[0, 0, 0], false);
    }

    if(mainCamera.position.length() > maxValue) {
      props.setSectorValue(prevSector => prevSector+1)
      let newCameraPosition = mainCamera.position.divideScalar(mainCamera.position.length()).multiplyScalar(.15);
      cameraControlsRef?.current?.setLookAt(...newCameraPosition , ...[0, 0, 0], false);
    }
    if (autoRotate && cameraControlsRef.current) {
      cameraControlsRef.current.azimuthAngle += delta * 0.05; // Adjust speed as needed
      cameraControlsRef.current.update(delta);
    }
    props.setDistance(mainCamera.position.length())

});
  return <>
  
  <CameraControls ref = {cameraControlsRef} minDistance = {start_dist} maxDistance={end_dist} noPan target={[0, 0, 0]} >
      <perspectiveCamera position={[0, 0, 0]} fov={80} />
  </CameraControls>

  </>
}

export default Handler