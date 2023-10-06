const fragmentShader = `

varying vec3 vColor;
varying float vDist;
void main() {
  gl_FragColor = vec4(vColor , max(vDist, 0.3));
  //gl_FragColor = vec4(1.0, 1.0, 1.0 , 1.0);
  
}
`

export default fragmentShader
