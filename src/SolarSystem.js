import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const SolarSystem = (props) => {
  const gltf = useLoader(GLTFLoader, 'Solar_System.glb')

  return <group scale={0.001} position={[0, 0, 0]}>
    <primitive object={gltf.scene} />
    </group>
}
//abc
export default SolarSystem