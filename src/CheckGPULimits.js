import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function CheckGPULimits() {
  const { gl } = useThree();

  useEffect(() => {
    console.log(gl)
    const glContext = gl.getContext(); // Get the raw WebGL context
    console.log(glContext)
    console.log("MAX_VERTEX_UNIFORM_VECTORS:", glContext.getParameter(glContext.MAX_VERTEX_UNIFORM_VECTORS));

    console.log("MAX_TEXTURE_SIZE:", glContext.getParameter(glContext.MAX_TEXTURE_SIZE));
    console.log("MAX_RENDERBUFFER_SIZE:", glContext.getParameter(glContext.MAX_RENDERBUFFER_SIZE));
    console.log("MAX_COMBINED_TEXTURE_IMAGE_UNITS:", glContext.getParameter(glContext.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
    console.log("MAX_VERTEX_TEXTURE_IMAGE_UNITS:", glContext.getParameter(glContext.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
    console.log("MAX_FRAGMENT_UNIFORM_VECTORS:", glContext.getParameter(glContext.MAX_FRAGMENT_UNIFORM_VECTORS));
  }, [gl]);

  return null;
}

