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



const vec = useRef(new THREE.Vector3(0, 0, 0));

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

  // Remove the event listener when the component is unmounted
  return () => {
    window.removeEventListener('mousewheel', handleScroll);
  };
}, []);


useEffect(()=> {
  console.log("Moving")
  cameraControlsRef?.current?.setLookAt(...props.cameraPosition , ...props.cameraTarget, true);
}, [props.cameraTarget]);




useEffect(()=> {
  console.log(data[props.sector].position)
  vec.current.set(data[props.sector].position[0], data[props.sector].position[1], data[props.sector].position[2], )

  /*
  if(props.sector == "Earth") {
    mainCamera.rotation.set(0, 0, 0);
    vec.current.set(0, 0.0, 0.00002)

  } else if (props.sector == "Moon") {
    //mainCamera.position.set(0.379274 * 0.001, -0.00025*0.001, 0.000001);
    vec.current.set(0.0004, 0.0, 0)
  }
  */

  props.set_zoom_to(true)
}, [props.sector])
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
  console.log("SectorUpdated")
  console.log(mainCamera.position)
  let cameraDistance = mainCamera.position.length();
  let newDist = .5
  if(props.sectorIncrementing) {
  }  else {
    newDist = 1000
  }
  props.setDistance(newDist)
  mainCamera.position.set(mainCamera.position.x/cameraDistance * newDist, mainCamera.position.y/cameraDistance * newDist, mainCamera.position.z/cameraDistance * newDist)

}, [props.sectorValue])
useFrame((state) => {
    props.setDistance(mainCamera.position.length())
});
  return <>
  
  <CameraControls ref = {cameraControlsRef} minDistance = {start_dist} maxDistance={end_dist} noPan target={[0, 0, 0]} >
      <perspectiveCamera position={[0, 0, 0]} fov={80} />
  </CameraControls>

  </>
}

export default Handler