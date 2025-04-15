const vertexShader = `

varying vec3 vColor;
attribute float gSize;

  void main() {
    vec3 pos_test = vec3(0.0);
    pos_test = position;



    vec4 modelPosition = modelMatrix * vec4(pos_test, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    float vDistance = length(viewPosition.xyz);

    gl_PointSize = gSize/vDistance;
    vColor = color;
    gl_Position = projectedPosition;
  }


`

export default vertexShader