const vertexShader = `
uniform float uTime;
uniform float uRadius;
uniform float uClose;
uniform float uFar;
uniform float uDistance;
varying vec3 vColor;
varying float vDist;

attribute float ABC; // Custom size attribute
attribute float magnitude;
attribute float CI;


uniform sampler2D colorTexture;

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
  float vDistance = length(viewPosition.xyz);

  float p_add = max(min(vDist, 15.0), 3.0);
  gl_PointSize = min(ABC * 1.0 * p_add, 12.0);
  float maxStarSize = 300.0;
  float starSize = min(maxStarSize * pow(10.0, magnitude/-2.5), maxStarSize) / vDistance;
  gl_PointSize = starSize;
  vec2 texCoordTest = vec2((CI+0.4)/2.4, 0.5);
  vec3 starColor = texture2D( colorTexture, texCoordTest ).rgb;
  vColor = vec3(starColor);

  if(starSize < 1.0) {
    vColor *= starSize;
  }
  vColor *= min(uDistance, 1.0);
  vColor *= 10.0/vDistance;
}

`

export default vertexShader