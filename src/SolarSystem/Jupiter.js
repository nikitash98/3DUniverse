import { Canvas } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

const Jupiter = (props) => {
  const texture = useLoader(THREE.TextureLoader, 'Textures/Planets/Jupiter/jup0vss1.jpg'); // Adjust the path to your texture

    return (
      <>
    <Sphere args={[.25, 32, 32]}>
      <meshStandardMaterial map={texture}
/>
    </Sphere>

      </>

  );
};

export default Jupiter