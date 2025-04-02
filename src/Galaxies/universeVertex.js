const vertexShader = `
uniform float uTime;
uniform float uRadius;
uniform float uClose;
uniform float uFar;
uniform float uDistance;
uniform float uEdgeUniverse;
varying vec3 vColor;
varying float vDist;

attribute float psize;

attribute float ABC; // Custom size attribute

// Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}


void main() {

  
  float val = distance(cameraPosition, position);
  vDist = max(pow(uDistance/(val*2.0),4.0), 0.5);
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  float vDistance = length(viewPosition.xyz);
  float universeSize = 1.0 * 50.0/vDistance;
  gl_PointSize = universeSize ;
  vColor = color;
  if(universeSize < 1.0) {
    //vColor *= universeSize;
  }

  vColor *= uDistance/vDistance;
}

`

export default vertexShader