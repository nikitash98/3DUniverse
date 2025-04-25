import { Canvas } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

const Saturn = (props) => {
  const texture = useLoader(THREE.TextureLoader, 'Textures/Planets/Saturn/2k_saturn.jpg'); // Adjust the path to your texture

    return (
      <>
    <Sphere args={[.25, 32, 32]}>
      <meshStandardMaterial map={texture}
/>
    </Sphere>

      </>

  );
};

export default Saturn