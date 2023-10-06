import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const SolarSystem = (props) => {
  const gltf = useLoader(GLTFLoader, 'solar_system.glb')

  return <group scale={.008} position={[0, -.05, -.12]}>
    <primitive object={gltf.scene} />
    </group>
}
//abc
export default SolarSystem