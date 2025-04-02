import { Canvas } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const RADECGrid = (props) => {
  const texture = useLoader(THREE.TextureLoader, 'Textures/Grids/RA_DEC_Grid.png'); // Adjust the path to your texture

  return (
    <Sphere args={[2000000, 64, 64]}>
      <lineSegments>
        <edgesGeometry args={[new THREE.SphereGeometry(2000000, 24, 24)]} />
        <lineBasicMaterial color="grey" linewidth={1.0} opacity={0.05} transparent/>
      </lineSegments>

    </Sphere>
  );
};

export default RADECGrid