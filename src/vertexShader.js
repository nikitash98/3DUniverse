const vertexShader = `
uniform float uTime;
uniform float uRadius;
uniform float uClose;
uniform float uFar;
uniform float uDistance;
varying vec3 vColor;
varying float vDist;

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

vColor = color;

  float val = distance(cameraPosition, position);
  vDist = pow(uDistance/(val*2.0),4.0);
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
  //gl_PointSize = 3.0 * max((uFar - vDist)/uFar, 0.0) + 2.0;// * (max((20.0 - vDist), 0.0)/20.0) + 10.0;
  //gl_PointSize = (uFar*100.0 * 1.0/uDistance)/pow(val, 1.3);
  //if(gl_PointSize < 0.5) {
  //  gl_PointSize = 0.0;
  //}
  //gl_PointSize = size * 100.0;
  float p_add = max(min(vDist, 15.0), 3.0);
  gl_PointSize = min(ABC * 1.0 * p_add, 12.0);
}

`

export default vertexShader