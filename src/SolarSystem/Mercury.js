import { Canvas } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Mercury = (props) => {
  const texture = useLoader(THREE.TextureLoader, 'Textures/Planets/Mercury/2k_mercury.jpg'); // Adjust the path to your texture

    return (
      <>
    <Sphere args={[.25, 32, 32]}>
      <meshStandardMaterial map={texture}
/>
    </Sphere>
      </>

  );
};

export default Mercury