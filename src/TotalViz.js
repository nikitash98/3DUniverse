
import SolarSystem from './SolarSystem';
import { Solar_System_Broken } from './Solar_System_Broken.js';
import MilkyWay from './MilkyWay';
import ReactSlider from "react-slider";
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, TrackballControls} from '@react-three/drei'
import { useState } from 'react';
import data from "./sectorinfo.json"
import Overlay from './Overlay/Overlay.js';

import "./3D/3D.css"

//import Handler from './Handler';

import Stars from "./Stars/Stars.js"
import UniverseThree from './Galaxies/UniverseThree.js';
import Satellites from './Satellites/Satellites.js';
import CMB from './CMB';
import Earth_P from "./3D/Earth.jsx"
import TestPoints from './TestPoints.js';
import * as Constants from "./constants.jsx"
import { BackgroundScene } from './3D/Background.js';
import { Ecliptic } from './3D/Ecliptic.js';
import { EffectComposer, Vignette, Bloom, DepthOfField} from "@react-three/postprocessing";
import { useEffect } from 'react';
import Handler from './Handler.js';
import { Grid } from '@react-three/drei';
import TexturedSphere from './3D/TexturedSphere.js';
import MilkyWaySphere from './3D/MilkyWaySphere.js';
import Moon from './3D/Moon.js';
import Sun from './3D/Sun.js';
const TotalViz = (props) => {

    let start_dist = 0.001
    let end_dist = 200000000000
    const [showExtraGalaxies, setShowExtraGalaxies] = useState(false)
    const [distance, setDistance] = useState(start_dist);
    const [sectorValue, setSectorValue] = useState(2);
    const [sector, setSector] = useState("Earth");
    const [showSectorInfo, setShowSectorInfo] = useState(true)
    const [zoom_to, set_zoom_to] = useState(false)
    const [sectorIncrementing, setSectorIncrementing] = useState(true);

    const [cameraTarget, setCameraTarget] = useState([0, 0, 0])
    const [cameraPosition, setCameraPosition] = useState([5,0, 0])
    /*
    const renderSwitch = (param) => {
      if (param > distance_cutoffs[0]) {
        return "Earth"
      } else if (param > distance_cutoffs[1] && param < distance_cutoffs[2]) {
        return "Solar System"
      } else if (param > distance_cutoffs[2] && param < distance_cutoffs[3]) {
      }
    }
  
    */
    let universe_distance = 100000
    let star_distance = 0.7

      /*

    useEffect(() => {
      if (distance > 10000) {
        setSectorValue(prevSector => prevSector + 1);
        setSectorIncrementing(true)
      } else if(distance < 0.0001) {
        setSectorValue(prevSector => prevSector - 1);
        setSectorIncrementing(false)
      }
    }, [distance]);


            */


    return<>
        <div id='overlay-container'>
        <Overlay sector  = {sector} distance = {distance} setSectorValue = {setSectorValue}
        
        setCameraPosition = {setCameraPosition}
        setCameraTarget = {setCameraTarget}
        />
    </div>

    <div id="canvas-container">

        <Canvas camera={{ position: [Math.sqrt(start_dist), 0, Math.sqrt(start_dist)], near: 0.0001, far: 2000000}} shadows>

        <ambientLight intensity={0.01} />
        <directionalLight intensity={1} color="white" position={[0, 10, 10]}  castShadow/>


        {(sectorValue == 0) &&
          <>
          <Satellites/>
          <group scale={1}>
            <Earth_P setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}/>
            <Ecliptic xRadius={60} zRadius = {60}/>
            
            <group position={[60, 0, 0]}>
            <Moon setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}/>
            </group>


            <group position={[23544, 0, 0]}>
              <Ecliptic xRadius={23544.1845864} zRadius = {23544.1845864}/>
              <Sun setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}/>
            </group>


            <group position={[23544, 0, 0]}>
              <Ecliptic xRadius={9093 } zRadius = {9093}/>
            </group>

            <group position={[23544 , 0, 0]}>
              <Ecliptic xRadius={16923 } zRadius = {16923}/>
            </group>

            <group position={[23544  , 0, 0]}>
              <Ecliptic xRadius={35868 } zRadius = {35868}/>
            </group>
            <group position={[23544  , 0, 0]}>
              <Ecliptic xRadius={122253 } zRadius = {122253}/>
            </group>
            <group position={[23544   , 0, 0]}>
              <Ecliptic xRadius={224804 } zRadius = {224804}/>
            </group>
            <group position={[23544    , 0, 0]}>
              <Ecliptic xRadius={454660 } zRadius = {454660}/>
            </group>
            <group position={[23544  , 0, 0]}>
              <Ecliptic xRadius={732508 } zRadius = {732508}/>
            </group>


          </group>
          <TexturedSphere distance_percentage = {distance/1000000}/>
            </>
        } 
        {(sectorValue == 1) &&
        <>
            <Stars star_distance = {star_distance} distance = {distance}  
            
            setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}
            />
            <MilkyWaySphere percentage_away = {Math.min(distance/500.0, 1.0)}/>
        </>

        }
        {(sectorValue == 2) &&
        <>
          <UniverseThree count={1000} shape="sphere" universe_distance = {universe_distance} distance = {distance} />
          <CMB percentage_away = {Math.min(distance/500000.0, 1.0)}/>
          </>

        }


        <EffectComposer>
          <Vignette eskil={false} offset={0.3} darkness={0.9} />
          </EffectComposer>


        <Handler setDistance = {setDistance} distance = {distance} sector = {sector} sectorValue = {sectorValue}
          zoom_to = {zoom_to} set_zoom_to = {set_zoom_to} sectorIncrementing = {sectorIncrementing}
          cameraPosition = {cameraPosition}
          cameraTarget = {cameraTarget}/>
        </Canvas>
    </div>
    </> 
}

export default TotalViz


          {/*
          <Solar_System_Broken/>
          */}


    /*

    {showExtraGalaxies && (
        <>
        <group rotation={[0, Math.PI/2 - 0.2, 0]}>
        <UniverseThree count={1000} shape="sphere"/>
        </group>

        <group rotation={[0, Math.PI - 0.4, 0]}>
        <UniverseThree count={1000} shape="sphere"/>
        </group>
        <group rotation={[0, 3 * Math.PI/2 - 0.2, 0]}>
        <UniverseThree count={1000} shape="sphere"/>
        </group>
        <group rotation={[0,  2 * Math.PI - 0.2, 0]}>
        <UniverseThree count={1000} shape="sphere"/>
        </group>
        </>

        )}
    */