import { Canvas } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const MilkyWaySphere = (props) => {
  const texture = useLoader(THREE.TextureLoader, 'Textures/Skyboxes/milkyway_2020_3k.png'); // Adjust the path to your texture

  return (
    <Sphere args={[2000000, 32, 32]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} opacity={0.25 * (1.0-props.percentage_away)} transparent/>
    </Sphere>
  );
};

export default MilkyWaySphere