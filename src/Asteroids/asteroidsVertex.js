const vertexShader = `
uniform float uTime;
varying vec3 vColor;
varying float vDist;

attribute vec3 orbitalElements;
attribute vec3 extraOrbitalElements;

const float PI = 3.14159265359;

float keplerSolve(float M, float e) {
    float E = M;
    for (int i = 0; i < 5; ++i) {
        E = E - (E - e * sin(E) - M) / (1.0 - e * cos(E));
    }
    return E;
}

void main() {


  float a = position[0];
  float e = radians(position[1]);

  float i = radians(position[2]);
  float om = radians(orbitalElements[1]);
  float w = radians(orbitalElements[2]);

  float ma = extraOrbitalElements[0];
  float diameter = extraOrbitalElements[1];
  float M = radians(ma);
  float mu = 1.32712440041 * pow(10.0, 20.0);
  float n = sqrt(mu / pow(a, 3.0)); // mean motion
  float M_t = M - uTime * 0.0001 * n;        // updated mean anomaly
  float E = keplerSolve(M_t, e);    // eccentric anomaly



  float x = cos(M_t);
  float y = sin(M_t);
  float r_c_t = a * (1.0 - e * cos(E));
  vec3 posOrbitalPlane = vec3(x, y, 0.0);
  posOrbitalPlane *= r_c_t;


  mat3 Rzom = mat3(
      cos(om), -sin(om), 0.0,
      sin(om),  cos(om), 0.0,
      0.0,    0.0, 1.0
  );

  mat3 RxI = mat3(
      1.0, 0.0,   0.0,
      0.0, cos(i), -sin(i),
      0.0, sin(i),  cos(i)
  );

  mat3 Rzw = mat3(
      cos(w), -sin(w), 0.0,
      sin(w),  cos(w), 0.0,
      0.0,    0.0, 1.0
  );

mat3 RzID = mat3(
      1.0, 1.0, 0.0,
      0.0,  1.0, 0.0,
      0.0,    0.0, 1.0
  );


  vec3 orbitalPosition = Rzom * RxI * Rzw * posOrbitalPlane;

  orbitalPosition.xyz = orbitalPosition.xzy;
  

  //float val = distance(cameraPosition, position);
  //vDist = max(pow(uDistance/(val*2.0),4.0), 0.5);

  vec4 modelPosition = modelMatrix * vec4(orbitalPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  float vDistance = length(viewPosition.xyz);
  float asteroidSize  = diameter * 10000.0;
  asteroidSize /= vDistance;

  gl_PointSize = asteroidSize;

  vColor = vec3(1.0);
  if(asteroidSize < 1.0) {
    vColor *= asteroidSize;
  }
    
}

`

export default vertexShader