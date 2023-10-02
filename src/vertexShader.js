const vertexShader = `
uniform float uTime;
uniform float uRadius;
varying vec3 vColor;
varying float vDist;
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

  float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
  vec3 particlePosition = position * rotation3dY(uTime * 0.3 * distanceFactor);
  float val = distance(cameraPosition, position);
  vDist = val;
  vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
  gl_PointSize = 3.0 * max((10.0 - vDist)/10.0, 0.0) + 2.0;// * (max((20.0 - vDist), 0.0)/20.0) + 10.0;

}

`

export default vertexShader