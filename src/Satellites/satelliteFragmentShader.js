const fragmentShader = `

uniform sampler2D pointTexture;

void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 0.2);
  gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord );

}
`

export default fragmentShader