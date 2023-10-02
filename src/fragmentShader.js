const fragmentShader = `

varying vec3 vColor;
varying float vDist;
void main() {
  gl_FragColor = vec4(vColor , max(2.0 - vDist, 0.0) + 0.3);
  
}
`

export default fragmentShader
