import { Canvas } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

const Mars = (props) => {
  const texture = useLoader(THREE.TextureLoader, 'Textures/Planets/Uranus/2k_uranus.jpg'); // Adjust the path to your texture

    return (
      <>
    <Sphere args={[1.0, 32, 32]}>
      <meshStandardMaterial map={texture}
/>
    </Sphere>

      </>

  );
};

export default Mars