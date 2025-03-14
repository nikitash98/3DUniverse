import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import myData from './Galaxies/data.json';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const width = window.innerWidth;
const height = window.innerHeight;

const regl = require('regl')()
const camera = require('regl-camera')(regl, {
  center: [0, 2.5, 0]
})




const points = [0, 1, 2].map(i => ({
  x: 1,
  y: 1,
  color: [0, Math.random(), 0],
}));

console.log(points)
const pointWidth = 10;
let ps = myData["points"].map(p=> [p[0], p[1], p[2]])
let cs = myData["colors"]
const vertBuffer = regl.buffer(ps)
const colorBuffer = regl.buffer(myData["colors"])


const aBuffer = regl.buffer({
  data: [
  [1, 2, 3],
  [4, 5, 6],
  [2, 1, -2]
  ]
}
)


console.log(aBuffer.data)
const drawTriangle = regl({
    // In a draw call, we can pass the shader source code to regl
    frag: `
    precision mediump float;

    varying vec4 fragColor;
    void main () {
      gl_FragColor = fragColor;
    }`,
  
    vert: `
    precision mediump float;
    attribute vec3 position;
    attribute vec4 color;
    uniform mat4 projection, view;
    varying vec4 fragColor;

    void main () {

      gl_PointSize = 4.0;

      //gl_Position = vec4(position, 0, 1);
      gl_Position = projection * view * vec4(position, 1.0);
      fragColor = color;
    }`,
  
    attributes: {
     position: vertBuffer,
     color: colorBuffer
    },
  
    uniforms: {
    },
  
    count: ps.length,

    primitive: 'points',

  })


const drawPoints = regl({
  frag: `
      // set the precision of floating point numbers
    precision highp float;
    // this value is populated by the vertex shader
      varying vec3 fragColor;
      void main() {
          // gl_FragColor is a special variable that holds the color of a pixel
          gl_FragColor = vec4(fragColor, 1);
      }
      `,

  vert: `
      // per vertex attributes
      attribute vec3 position;
      attribute vec3 color;
      // variables to send to the fragment shader
      varying vec3 fragColor;
      // values that are the same for all vertices
      uniform float pointWidth;
      uniform float stageWidth;
      uniform float stageHeight;
      // helper function to transform from pixel space to normalized device coordinates (NDC)
      // in NDC (0,0) is the middle, (-1, 1) is the top left and (1, -1) is the bottom right.
      void main() {
          // update the size of a point based on the prop pointWidth
          gl_PointSize = pointWidth;
    // send color to the fragment shader
    fragColor = color;
          // scale to normalized device coordinates
          // gl_Position is a special variable that holds the position of a vertex
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      }
      `,

  attributes: {
    // each of these gets mapped to a single entry for each of the points.
    // this means the vertex shader will receive just the relevant value for a given point.
    position: points.map(d => [-d.x * 1000, -d.y * 1000 + 1000, d.z * 1000]),
    color: points.map(d => d.color),
  },

  uniforms: {
    // by using `regl.prop` to pass these in, we can specify them as arguments
    // to our drawPoints function
    pointWidth: regl.prop('pointWidth'),
    
    // regl actually provides these as viewportWidth and viewportHeight but I
    // am using these outside and I want to ensure they are the same numbers,
    // so I am explicitly passing them in.
    stageWidth: regl.prop('stageWidth'),
    stageHeight: regl.prop('stageHeight'),
  },

  // specify the number of points to draw
  count: points.length,

  // specify that each vertex is a point (not part of a mesh)
  primitive: 'points',
});


regl.frame(() => {
  camera((state) => {
    if (!state.dirty) return;
    regl.clear({color: [0, 0, 0, 1]})

   drawTriangle()
  })
})


*/
  /*

  const pointBuffer = regl.buffer(myData["points"].map(function (p) {
    const color = hsv2rgb(Math.random() * 360, 0.6, 1)
    return [
      // freq
      Math.random() * 10,
      Math.random() * 10,
      Math.random() * 10,
      Math.random() * 10,
      // phase
      2.0 * Math.PI * Math.random(),
      2.0 * Math.PI * Math.random(),
      2.0 * Math.PI * Math.random(),
      2.0 * Math.PI * Math.random(),
      // color
      color[0] / 255, color[1] / 255, color[2] / 255
    ]
  }))
  */

  /*

        vec2 normalizeCoords(vec3 position) {
          // read in the positions into x and y vars
    float x = position[0];
    float y = position[1];
    float z = position[2];
          return vec3(
        2.0 * ((x / stageWidth) - 0.5),
        // invert y since we think [0,0] is bottom left in pixel space
        -(2.0 * ((y / stageHeight) - 0.5)));
      }

  */

            /*

      position: [
        [-1, 0, 0],
        [0, -1, 0],
        [1, 1, 0]
      ]
      */
    /*
    drawPoints({
      pointWidth,
      stageWidth: width,
      stageHeight: height,
    });
    */