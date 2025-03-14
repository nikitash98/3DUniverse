const vertexShader = `
uniform float uTime;
uniform float uRadius;
uniform float uClose;
uniform float uFar;
uniform float uDistance;
varying vec3 vColor;
varying float vDist;
varying vec2 vUV;

attribute float apogee; // Custom size attribute
attribute float entry_inclination; // Custom size attribute
attribute float entry_period; // Custom size attribute
attribute float phase_position; // Custom size attribute

#define PI 3.1415926538

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
    vUV = uv;
    vColor = color;
    float a = apogee;
    float e = 0.2;
    float inclination = entry_inclination;
    float omega = 30.0;
    float inclination_rad = radians(inclination);
    float omega_rad = radians(omega);
    float T = entry_period;

    float phased_time = uTime + phase_position * 100.0;
    float x = a * (cos(2.0 * PI * phased_time/T)); 
    
    // * (1.0-e * cos(omega_rad)));
    float y = a * (sin(2.0 * PI * phased_time/T) * cos(inclination_rad)); 
    
    //* (1.0-e * cos(omega_rad)));
    float z = a * (sin(2.0 * PI * phased_time/T) * sin(inclination_rad)); 
    
    //a * (e * sin(omega_rad) * sin(2.0*PI * uTime/T));

    //float x = 0.0001 + uTime;
    //float y = 0.0;
    //float z = 0.0;
    vec3 new_pos = vec3(x, y, z);
    float val = distance(cameraPosition, new_pos);

    vDist = pow(uDistance/(val*2.0),4.0);
    vec4 modelPosition = modelMatrix * vec4(new_pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    float vDistance = length(viewPosition.xyz);

    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    gl_PointSize = 10.0/vDistance;
}

`

export default vertexShader