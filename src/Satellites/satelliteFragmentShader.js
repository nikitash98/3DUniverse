const fragmentShader = `

uniform sampler2D pointTexture;
varying vec4 vColor;

void main() {
  gl_FragColor = vColor;
  gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord );

}
`

export default fragmentShader