import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useRef } from 'react';
import * as THREE from 'three'
import { CameraControls, OrbitControls, TrackballControls, PerspectiveCamera} from '@react-three/drei';
import { useScroll } from '@react-three/drei';
import { Box } from '@react-three/drei';
import { distance } from 'three/src/nodes/TSL.js';
const Handler = (props) => {
const { camera: mainCamera } = useThree();
const set = useThree(({ set }) => set)

let start_dist = 0.0000000001
let end_dist = 200000000000
const cameraControlsRef = useRef()

const [autoRotate, setAutoRotate] = useState(true);

const prevSectorRef = useRef(props.sectorValue);

const vec = useRef(new THREE.Vector3(0, 0, 0));

const testCameraRef = useRef();
const timeoutRef = useRef(null);
const testRef = useRef();
const orbitRef = useRef();
const orbitCameraRef = useRef();

const handleScroll = () => {
  // Do something when scrolling
  // For example, change the position of the mesh
   // set_zoom_to(false)
};

useEffect(() => {
  window.addEventListener('mousewheel', handleScroll);
  const controls = cameraControlsRef.current;

  const stopAutoRotate = () => {
    setAutoRotate(false);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAutoRotate(true), 15000); // Restart auto-rotate after 5s
  };

  controls.addEventListener("control", stopAutoRotate);
  return () => controls.removeEventListener("control", stopAutoRotate);

  if(testCameraRef.current){
    set({ camera: testCameraRef.current })
  }
}, []);


useEffect(()=> {
  if(!(typeof (props.cameraTarget) === 'object' && "position" in props.cameraTarget)) {
    cameraControlsRef?.current?.setLookAt(...props.cameraPosition , ...props.cameraTarget, true);
  } else {
    //cameraControlsRef.current.parent = props.cameraTarget;
    //testCameraRef.current.parent = props.cameraTarget;
    //testCameraRef.current.parent = props.cameraTarget;
    //console.log(testCameraRef.current.parent)
  }


}, [props.cameraTarget]);



useEffect(()=> {
  cameraControlsRef?.current?.setLookAt(...props.cameraPosition, ...props.cameraTarget, true);
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

  if(typeof (props.cameraTarget) === 'object' && "position" in props.cameraTarget) {

    const worldPosition = new THREE.Vector3()
    props.cameraTarget.getWorldPosition(worldPosition)
    cameraControlsRef?.current?.moveTo(...[worldPosition.x, worldPosition.y, worldPosition.z], true);
    /*
    let cameraOffset = new THREE.Vector3();
    let targVec = new THREE.Vector3(...cameraControlsRef?.current.target);
    let camVec = new THREE.Vector3(...cameraControlsRef?.current.camera.position);
    let targetDelta = targVec.sub(worldPosition)
    */
    //cameraControlsRef?.current?.setPosition(...[camVec.x , camVec.y , camVec.z], false);

    //cameraControlsRef?.current?.setPosition(...[camVec.x + targetDelta.x , camVec.y + targetDelta.y , camVec.z + targetDelta.z], false);

    //cameraControlsRef?.current?.setPosition(...[worldPosition.x, worldPosition.y, worldPosition.z], false);

    //cameraControlsRef?.current?.camera.lookAt(...[worldPosition.x, worldPosition.y, worldPosition.z]);
    //cameraControlsRef?.current?.camera.position.set(...[worldPosition.x + 15, worldPosition.y, worldPosition.z]);
    //cameraControlsRef?.current?.setLookAt(...[worldPosition.x + 1, worldPosition.y + 1, worldPosition.z], ...[worldPosition.x, worldPosition.y, worldPosition.z], false);
    
  }


  if(testCameraRef.current && orbitRef.current) {
    testCameraRef.current.position.copy(orbitRef.current.object.position);
    testCameraRef.current.quaternion.copy(orbitRef.current.object.quaternion);
    testCameraRef.current.scale.copy(orbitRef.current.object.scale);
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

    if(typeof (props.cameraTarget) === 'object' && "position" in props.cameraTarget) {

      const worldPosition = new THREE.Vector3()
      props.cameraTarget.getWorldPosition(worldPosition)
      //cameraControlsRef?.current?.camera.lookAt(...[worldPosition.x, worldPosition.y, worldPosition.z]);
      //cameraControlsRef?.current?.camera.position.set(...[worldPosition.x + 15, worldPosition.y, worldPosition.z]);
      //cameraControlsRef?.current?.setLookAt(...[worldPosition.x + 15, worldPosition.y + 10, worldPosition.z], ...[worldPosition.x, worldPosition.y, worldPosition.z], true);
      
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

<group position={[100, 0, 0]}>

</group>
  {/*
  <group position={[0, 0, 0]}>
    <perspectiveCamera position={[0, 5 ,0]} ref = {testCameraRef}/>
  </group>



  <OrbitControls target={[0, 0, 0]} ref = {orbitRef}>

  </OrbitControls>
  */}

  {/*
    <perspectiveCamera ref = {orbitCameraRef}/>

    <group ref = {testCameraRef}>

      <PerspectiveCamera 
        makeDefault 
        position={[0, 500, 0]} 
        rotation = {[-Math.PI/2, 0, 0]}
        fov={75} 
        near={0.1} 
        far={1000} 
        />

    </group>



  */}
  <group position={[0, 0, 0]}>
    <CameraControls ref = {cameraControlsRef} minDistance = {start_dist} maxDistance={end_dist} noPan target={[0, 0, 0]} >
        <group position={[0, 0, 0]}>
          <perspectiveCamera position={[0, 0, 0]} fov={10} >
          </perspectiveCamera>

        </group>

    </CameraControls>
  </group>


  </>
}

export default Handler