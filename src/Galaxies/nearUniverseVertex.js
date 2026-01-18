const vertexShader = `

varying vec3 vColor;
attribute float gSize;
uniform float uDistance;

  void main() {
    vec3 pos_test = vec3(0.0);
    pos_test = position;


    vec4 modelPosition = modelMatrix * vec4(pos_test, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    float vDistance = length(viewPosition.xyz);
    float distanceFromZero = length(position);

    float universeSize = gSize;//vDistance;

    
    vColor = color;

    universeSize = 10.0;
  /*
    universeSize *= (1.0 + distanceFromZero/1500.0);
    universeSize/=(vDistance/uDistance);
    universeSize /= (1.0 + uDistance/1500.0);
  */
    gl_PointSize = universeSize;

    if(universeSize < 1.0) {
      vColor *= universeSize;
    }

    vColor *= mix(max(1.0-length(position)/100.0, 0.0), 1.0, min(uDistance/10000.0, 1.0));
    vColor *= 1.0/(vDistance/(uDistance*2.0) );
    gl_Position = projectedPosition;

  }


`

export default vertexShader