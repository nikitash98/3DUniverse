import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useRef } from 'react';
import * as THREE from 'three'
import { CameraControls, OrbitControls, TrackballControls } from '@react-three/drei';
import { useScroll } from '@react-three/drei';
import { Box } from '@react-three/drei';
import data from "./sectorinfo.json"
import { distance } from 'three/src/nodes/TSL.js';
const Handler = (props) => {
const { camera: mainCamera } = useThree();

let start_dist = 0.0000000001
let end_dist = 200000000000
const cameraControlsRef = useRef()

const [autoRotate, setAutoRotate] = useState(true);

const prevSectorRef = useRef(props.sectorValue);

const vec = useRef(new THREE.Vector3(0, 0, 0));
const timeoutRef = useRef(null);




const handleScroll = () => {
  // Do something when scrolling
  // For example, change the position of the mesh
   // set_zoom_to(false)
};

useEffect(() => {
  window.addEventListener('mousewheel', handleScroll);
  console.log("added event")
  const controls = cameraControlsRef.current;

  const stopAutoRotate = () => {
    setAutoRotate(false);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAutoRotate(true), 15000); // Restart auto-rotate after 5s
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
  //cameraControlsRef?.current?.setLookAt(...[0, 100, 0] , ...[0, 0, 0], false);


  let maxValue = 1000000
  if(prevSectorRef.current > props.sectorValue) {

    if(props.sectorValue == 0) {
      maxValue = 100000000
    }

    let newCameraPosition = mainCamera.position.divideScalar(mainCamera.position.length()).multiplyScalar(maxValue * 0.85);
    cameraControlsRef?.current?.setLookAt(...newCameraPosition , ...[0, 0, 0], false);

  } else if(prevSectorRef.current < props.sectorValue) {

    let newCameraPosition = mainCamera.position.divideScalar(mainCamera.position.length()).multiplyScalar(.15);
    cameraControlsRef?.current?.setLookAt(...newCameraPosition , ...[0, 0, 0], false);

  }

  console.log(props.sectorValue)
  prevSectorRef.current = props.sectorValue;
  props.hasRun.current = false;

}, [props.sectorValue])

useFrame((state, delta) => {
  if(state.clock.getElapsedTime() < 0.5) {
    return
  }
  let maxValue = 1000000
  if(!props.hasRun.current) {
    let cameraDistance = cameraControlsRef.current?.camera.position.length()
    if(cameraDistance < 0.1) {
      props.setSectorValue((prevSector) => {
        return prevSector-1
      })
      props.hasRun.current = true;
    }

    if(props.sectorValue == 0) {
      maxValue = 100000000
    }

    if(props.sectorValue < 2) {

      if(cameraDistance > maxValue) {
        props.setSectorValue((prevSector) => {
          return prevSector+1
        })
        props.hasRun.current = true;
      }
    }

  }


    if (autoRotate && cameraControlsRef.current) {
      cameraControlsRef.current.azimuthAngle += delta * 0.05; // Adjust speed as needed
      cameraControlsRef.current.update(delta);
    }

    props.setDistance(mainCamera.position.length())
    const direction = new THREE.Vector3();
    mainCamera.getWorldDirection(direction);
    // Convert to spherical coordinates
    const dec = THREE.MathUtils.radToDeg(Math.asin(direction.y)); // Declination
    const ra = THREE.MathUtils.radToDeg(Math.atan2(direction.x, direction.z)); // Right Ascension
    props.setRaDec([(ra + 360)%360, dec])

});
  return <>

  <CameraControls ref = {cameraControlsRef} minDistance = {start_dist} maxDistance={end_dist} noPan target={[0, 0, 0]} >
      <perspectiveCamera position={[0, 1, 0]} fov={80} >
      <group position={[-2, -2, -2]}>

<mesh >
<boxGeometry args={[0.2, 0.2, 0.2]} />
<meshBasicMaterial color="hotpink" />
</mesh>
</group>

        </perspectiveCamera>
  </CameraControls>

  </>
}

export default Handler