const fragmentShader = `

varying vec3 vColor;
varying float vDist;
uniform sampler2D pointTexture;

void main() {
  gl_FragColor = vec4(vColor , 1.0);
  gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
  
}
`

export default fragmentShader
