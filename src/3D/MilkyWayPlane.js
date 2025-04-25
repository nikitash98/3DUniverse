import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useRef } from 'react'
import * as THREE from 'three';


function MilkyWayPlane(props) {
    const texture = useLoader(TextureLoader, 'Textures/MilkyWay/MilkyWayTexture.jpg')
    const meshRef = useRef()
  
    return (
        <group rotation = {[Math.PI/2, 0, 0]}>

      <mesh ref={meshRef}>
        <planeGeometry args={[3000, 3000]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent opacity={Math.min(Math.max(props.distance - 10000.0, 0.0)/10000.0, 1.0)}/>
      </mesh>
      </group>

    )
  }
  
export default MilkyWayPlane