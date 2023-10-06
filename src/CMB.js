
import { useLoader } from '@react-three/fiber'

import * as THREE from "three";

import { TextureLoader } from 'three/src/loaders/TextureLoader'

const CMB = (props) => {
    const colorMap = useLoader(TextureLoader, 'CMB.jpg')
    return (
        <>
          <mesh>
            <sphereGeometry args={[13 * props.universe_distance, 32, 32]} />
            <meshStandardMaterial map={colorMap}  side={THREE.DoubleSide}  opacity={Math.pow((props.distance - props.start_distance)/(props.max_distance-props.start_distance), 2)} transparent/>
          </mesh>
        </>
      )
    
}

export default CMB