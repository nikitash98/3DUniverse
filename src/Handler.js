import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
const Handler = (props) => {
const { camera: mainCamera } = useThree();
const { gl } = useThree();

/*
const canvas = document.getElementById("canvas");
const other_GL = canvas.getContext("webgl");

const debugInfo = other_GL.getExtension("WEBGL_debug_renderer_info");
const vendor = other_GL.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
const renderer = other_GL.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
*/
useEffect(() => {
  // gl === WebGLRenderer
  // gl.info.calls
  const gl_context= gl.getContext() 
  console.log(gl.info);
  console.log(gl_context.MAX_ELEMENTS_VERTICES)
  console.log(gl_context.getParameter(gl_context.MAX_ELEMENTS_VERTICES))
  //const maxElementIndex = gl.getParameter(gl.MAX_ELEMENTS_INDICES);

});

useFrame((state) => {
    props.setDistance(mainCamera.position.length())
});
  return <></>
}

export default Handler