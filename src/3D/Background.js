// BackgroundScene/index.tsx
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import {
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  WebGLCubeRenderTarget,
} from "three";


export const BackgroundScene = () => {
  const [cubeTexture, setCubeTexture] = useState(null);

  const { gl, scene } = useThree();


  useEffect(() => {
    const loader = new TextureLoader();
    loader.load("starmap_2020_4k.png", (texture) => {
      texture.colorSpace = SRGBColorSpace;
      const cubeRenderTarget = new WebGLCubeRenderTarget(texture.image.height);
      cubeRenderTarget.fromEquirectangularTexture(gl, texture);
      setCubeTexture(cubeRenderTarget.texture);
    });
  }, [gl]);

  useEffect(() => {
    if (cubeTexture) {
      scene.background = cubeTexture;
      scene.backgroundIntensity = 0.2;
    }
  }, [cubeTexture]);

  useEffect(() => {
    return () => {
      scene.backgroundIntensity = 0.0;

    }
  }, [scene])
  return (
    <>
    </>
  );
};