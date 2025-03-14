
import { useLoader } from '@react-three/fiber'

import * as THREE from "three";

import { TextureLoader } from 'three/src/loaders/TextureLoader'

const CMB = (props) => {
    const colorMap = useLoader(TextureLoader, 'CMB.jpg')
    return (
        <>
          <mesh frustumCulled = {false}> 
            <sphereGeometry args={[1300000, 32, 32]} />
            <meshBasicMaterial map={colorMap}  side={THREE.DoubleSide} transparent opacity={0.01 * props.percentage_away}/>


          </mesh>
          
        </>
      )
    
}

export default CMB