import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Earth = (props) => {

  const gltf = useLoader(GLTFLoader, 'earth_2.glb')
  const earthRef = useRef()
  useFrame((state, delta) => {
    earthRef.current.rotation.y += 0.1 * delta;
})

  return <group scale={0.008} ref= {earthRef}>
    <primitive object={gltf.scene} />
  </group>
}

export default Earth