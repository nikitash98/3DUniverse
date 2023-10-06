import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const MilkyWay = (props) => {
  const gltf = useLoader(GLTFLoader, 'Milky_Way.glb')

  return <group rotation={[0, Math.PI/5 * 1.4,  0]} >
    <group scale={props.star_distance * 3} rotation={[0, 0,  -Math.PI/2]} >
        <primitive object={gltf.scene} />
    </group>
</group>

}

export default MilkyWay