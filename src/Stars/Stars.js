import { Html, OrbitControls, Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

import data from './star_data.json'
import constellationdata from './constellation_data.json'

import { distance, pow } from "three/src/nodes/TSL.js";

const Stars = (props) => {
    const { count, shape } = props;
    const radius = 20;
    const star_mult = props.star_distance;
    const starPositions = data["positions"];
    const starMagnitudes = data["magnitude"];
    const starCI = data["color"];
    const uniforms = useMemo(() => ({
        uTime: {
          value: 0.0
        },
        uRadius: {
          value: radius
        },
        uClose: {
            value: 5
        },
        uFar: {
            value: 100
        }, 
        uDistance: {
            value: props.distance
        },
        pointTexture: { value: new THREE.TextureLoader().load( 'circle.png' ) },
        colorTexture: { value: new THREE.TextureLoader().load( 'StarColors.png' ) }

      }), [])
    
    // This reference gives us direct access to our points
    const points = useRef();
    // Generate our positions attributes array
    const particlesPosition = useMemo(() => {
      const positions = new Float32Array(starPositions.length * 3);

      starPositions.forEach((element, index) => {

        positions.set([element[0] * star_mult, element[2] * star_mult, element[1] * star_mult], index * 3 )
        
      });
  
      return positions;
    });
    

    const particlesColor = useMemo(()=> {
        const colors = new Float32Array(starPositions.length * 3);
        starPositions.forEach((element, index) => {
            colors.set([1, 1, 1], index * 3 )
            
        });
        return colors
    })

    const particlesCI = useMemo(()=> {
      const CI = new Float32Array(starCI.length);
      starCI.forEach((element, index) => {
        CI[index] = element;          
      });
      return CI
  })

    const particlesSize = useMemo(()=> {
      const magnitudes = new Float32Array(starMagnitudes.length)
      starMagnitudes.forEach((element, index) => {
        magnitudes[index] = element
      });

      return magnitudes
    })

    useFrame((state) => {
        points.current.material.uniforms.uDistance.value = props.distance;
    })


    return (
      <>
      
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />

        <bufferAttribute
            attach="attributes-color"
            count={particlesColor.length / 3}
            array={particlesColor}
            itemSize={3}
          />
        <bufferAttribute
          attach="attributes-magnitude"
          count={particlesSize.length}
          array={particlesSize}
          itemSize={1}
          />

          <bufferAttribute
          attach="attributes-CI"
          count={particlesCI.length}
          array={particlesCI}
          itemSize={1}
          />

        </bufferGeometry>

        <shaderMaterial
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        vertexColors= {true}
        transparent = {true}
        />
      </points>

      {data["proper"].map((value, index) =>  {
        if(props.labelsVisible) {
          return;
        }    
        if(index < Math.min(Math.pow(props.distance, 1.2), 400.0)){
          return
        }
        let star_position = [data["proper_positions"][index][0] * star_mult, data["proper_positions"][index][2] * star_mult - data["magnitude"][index] * 10.0, data["proper_positions"][index][1] * star_mult];
        return (
        <Html center position = {star_position}>
          <div key={value} 
              className={"planet_text"} 
              onClick={()=> {
                props.setCameraTarget(star_position)
                let newCameraPosition = [star_position[0]-2, star_position[1], star_position[2]]
                props.setCameraPosition(newCameraPosition)
                props.setInfoBoxShowing(true)
                props.setInfoBoxTitle(value)
              }}
              style = {{"opacity" : Math.min(props.distance/10.0, 0.5)}}
          >  
            {value}
          </div>
        </Html>
      )
      })}
      
      {Object.entries(constellationdata).map(([key, value], index) => {
        if(props.constellationConnections) {
          return
        }
        if(constellationdata[key]["points"].length <= 0) {
          return
        }
        return (
          <Line
          key = {key}
          points={constellationdata[key]["points"]} // Array of points
          color="white" // Line color
          lineWidth={1 * (1.0 - Math.pow((props.distance/200), 0.5))} // Line width
          opacity={Math.max((Math.min(props.distance - 0.3, 1.0)) * 0.1 * (1.0 - Math.pow((props.distance/200), 0.5)), 0.0)}
          transparent
        />
  
          )
      }
       )}
      
      </>

    );
  };
  
  export default Stars