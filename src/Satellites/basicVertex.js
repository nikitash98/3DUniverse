const vertexShader = `

attribute float testValue;   // Argument of perigee (radians)

  void main() {
    vec3 pos_test = vec3(0.0);
    pos_test = position;
    pos_test.y = testValue * 100.0;
    gl_PointSize = 3.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos_test, 1.0);
  }


`

export default vertexShader