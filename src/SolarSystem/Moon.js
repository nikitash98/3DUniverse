import { Canvas } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

const Moon = (props) => {
  const texture = useLoader(THREE.TextureLoader, 'Textures/Planets/Moon/Moon_Diffuse.png'); // Adjust the path to your texture
  const normalTexture = useLoader(THREE.TextureLoader, 'Textures/Planets/Moon/Moon_Normal2.png'); // Adjust the path to your texture

    return (
      <>
    <Sphere args={[.25, 32, 32]}>
      <meshStandardMaterial map={texture} normalMap={normalTexture} normalScale={0.5}
      normalMap-colorSpace={THREE.LinearSRGBColorSpace}
/>
    </Sphere>

      </>

  );
};

export default Moon