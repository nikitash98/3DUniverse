import { Canvas } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const TexturedSphere = (props) => {
  const texture = useLoader(THREE.TextureLoader, 'starmap_2020_4k.png'); // Adjust the path to your texture

  return (
    <Sphere args={[220000000000, 32, 32]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} opacity={0.1 * Math.min(Math.max(props.distance_percentage, 0.0), 1.0)} transparent/>
    </Sphere>
  );
};

export default TexturedSphere