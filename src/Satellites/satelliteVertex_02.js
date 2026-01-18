const vertexShader = `
precision highp float;

attribute float inclination;   // Inclination (radians)
attribute float ra_asc_node;   // Right ascension (radians)
attribute float eccentricity;  // Eccentricity
attribute float arg_perigee;   // Argument of perigee (radians)
attribute float mean_anomaly;  // Mean anomaly (radians)
attribute float semi_major;    // Semi-major axis (km)
attribute float mean_motion;    // Semi-major axis (km)

uniform float time;          // Animation time

varying vec4 vColor;

const float PI = 3.141592653589793;
const float TWO_PI = 6.28318530718;

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
    float n = TWO_PI * mean_motion / 5000.0; // Mean motion in radians per second

    // Compute the true anomaly from mean anomaly (simplified approximation)
    float E = mean_anomaly + eccentricity * sin(mean_anomaly); // Eccentric anomaly
    float true_anomaly = 2.0 * atan(sqrt((1.0 + eccentricity) / (1.0 - eccentricity)) * tan(E / 2.0));
    true_anomaly += n * time;
    // Compute distance from center (Kepler's equation)
    float radius = semi_major * (1.0 - eccentricity * cos(E));

    // Orbital plane coordinates
    float x_orbital = radius * cos(true_anomaly);
    float y_orbital = radius * sin(true_anomaly);

    // 3D Rotation matrices for inclination and RAAN
    mat3 rotation_matrix = mat3(
        cos(ra_asc_node), -sin(ra_asc_node), 0.0,
        sin(ra_asc_node), cos(ra_asc_node),  0.0,
        0.0,              0.0,               1.0
    ) * mat3(
        1.0, 0.0,           0.0,
        0.0, cos(inclination), -sin(inclination),
        0.0, sin(inclination), cos(inclination)
    );

    // Rotate the orbit coordinates
    vec3 pos = rotation_matrix * vec3(x_orbital, y_orbital, 0.0);

    // Output the transformed position
    gl_Position = vec4(pos * 0.001, 1.0); // Scale to normalized space
    pos *= 0.000155;

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    float vDistance = length(viewPosition.xyz);

    float satelliteSize = (pow(radius/3000.0, 1.5))/vDistance;
    
    gl_PointSize = satelliteSize;
    vColor = vec4(0.2, 0.5, 0.2, 1.0);
    

    if(satelliteSize < 1.0) {
      vColor *= satelliteSize;
    }


    vec3 pos_test = vec3(0.0);
    pos_test = position;
    pos_test.y += inclination * 100.0;
    gl_Position = projectedPosition;


}

`

export default vertexShader