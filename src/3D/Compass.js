import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three'

const Compass = () => {
  const { camera } = useThree();
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.position.copy(camera.position)
 
    
    // Offset the object in front of the camera
    const offset = new THREE.Vector3(0, 1, -2)
    offset.applyQuaternion(camera.quaternion)
    ref.current.position.add(offset)

  }
  );
    return <>
        <group ref={ref}>
          {/*
          <mesh  position={[0, 0, 0]} >
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color="hotpink" />
          </mesh>
          */}

          <axesHelper args={[.1]} />
          <lineSegments>
            <edgesGeometry args={[new THREE.SphereGeometry(.1, 24, 24)]} />
            <lineBasicMaterial color="grey" linewidth={1.0} opacity={0.05} transparent/>
          </lineSegments>
          
        </group>
        </>;
};


export default Compass