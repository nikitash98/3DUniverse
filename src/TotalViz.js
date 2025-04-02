
import SolarSystem from './SolarSystem';
import { Solar_System_Broken } from './Solar_System_Broken.js';
import MilkyWay from './MilkyWay';
import ReactSlider from "react-slider";
import { Canvas} from '@react-three/fiber'
import { Stats, OrbitControls, TrackballControls, Box, Sphere, Line} from '@react-three/drei'
import { Suspense, useState } from 'react';
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
import { Grid, Html } from '@react-three/drei';
import TexturedSphere from './3D/TexturedSphere.js';
import MilkyWaySphere from './3D/MilkyWaySphere.js';
import Moon from './3D/Moon.js';
import Sun from './3D/Sun.js';
import { CheckGPULimits } from './CheckGPULimits.js';
import RADECGrid from './3D/DecGrid.js';
import { ISS } from './3D/ISS.jsx';
import Satellites_02 from './Satellites/Satellites_02.js';
import * as THREE from 'three';


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
    const [cameraPosition, setCameraPosition] = useState([0,0, 3])

    const [radecGrid, setradecGrid] = useState(false)
    const [constellationConnections, setconstellationConnections] = useState(true)

    let universe_distance = 100000
    let star_distance = 0.7
    const [infoBoxShowing, setInfoBoxShowing] = useState(false)
    const [infoBoxTitle, setInfoBoxTitle] = useState("")

    const [labelsVisible, setLabelsVisible] = useState(false)

    const spiralPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(200, 0, -200),
      new THREE.Vector3(800, 0, -100),
      new THREE.Vector3(1200, 0, 400),
      new THREE.Vector3(1300, 0, 900),
      new THREE.Vector3(1200, 0, 1200),
  
    ];
  
    // Convert points to BufferGeometry
  

    return<>
        <div id='overlay-container'>
          <Overlay 
          sector  = {sector} 
          sectorValue = {sectorValue}
          distance = {distance} 
          setDistance = {setDistance}
          setSectorValue = {setSectorValue}
          setCameraPosition = {setCameraPosition}
          setCameraTarget = {setCameraTarget}
          radecGrid = {radecGrid}
          setradecGrid = {setradecGrid}
          constellationConnections = {constellationConnections}
          setconstellationConnections = {setconstellationConnections}
          setInfoBoxShowing = {setInfoBoxShowing}
          infoBoxShowing = {infoBoxShowing}
          infoBoxTitle = {infoBoxTitle}

          labelsVisible = {labelsVisible}
          setLabelsVisible = {setLabelsVisible}
          />
        </div>

        <div id="canvas-container">
            <Canvas camera={{ position: [Math.sqrt(start_dist), 0, Math.sqrt(start_dist)], near: 0.0001, far: 2000000}} shadows>
              <CheckGPULimits/>
              <ambientLight intensity={0.01} />
              <directionalLight intensity={1} color="white" position={[0, 10, 10]}  castShadow/>



            {(sectorValue == 0) &&
            <Suspense fallback = {<Box/>}>

              <>
              <Satellites_02/>



              <group scale={1}>
                <Earth_P setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}/>
                <Ecliptic xRadius={60} zRadius = {60}/>
                <group position={[0, 1.08, 0]} scale={0.0001}>
                  
                <ISS/>
                <Html center position={[0,-1,0 ]}>
                    <div className={"planet_text"}
                    onClick={()=> {
                      setCameraTarget([0, 1.08, 0])
                      setCameraPosition([0.02, 1.1, 0.02])
                    }}
                    > 
                      ISS
                    </div>
                </Html>
              
                </group>

                <group position={[60, 0, 0]}>
                  <Moon setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}/>
                </group>


                <group position={[23544, 0, 0]}>
                  <Ecliptic xRadius={23544.1845864} zRadius = {23544.1845864}/>
                  <Sun setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}/>
                </group>


                <group position={[23544, 0, 0]}>
                  <Ecliptic xRadius={9093 } zRadius = {9093}/>
                
                    <group position={[9093, 0, 0]}>
                      <Moon setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}/>
                    </group>

                </group>

                <group position={[23544, 0, 0]}>
                  <Ecliptic xRadius={16923} zRadius = {16923}/>
                  <group position={[16923, 0, 0]}>
                    <Moon setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}/>
                  </group>

                </group>

                <group position={[23544, 0, 0]}>
                  <Ecliptic xRadius={35868} zRadius = {35868}/>
                  <group position={[35868, 0, 0]}>
                    <Moon setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}/>
                  </group>

                </group>
                <group position={[23544, 0, 0]}>
                  <Ecliptic xRadius={122253} zRadius = {122253}/>
                  <group position={[122253, 0, 0]}>
                    <Moon setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}/>
                  </group>

                </group>
                <group position={[23544, 0, 0]}>
                  <Ecliptic xRadius={224804} zRadius = {224804}/>
                  <group position={[224804, 0, 0]}>
                    <Moon setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}/>
                  </group>

                </group>
                <group position={[23544, 0, 0]}>
                  <Ecliptic xRadius={454660} zRadius = {454660}/>
                  <group position={[454660, 0, 0]}>
                    <Moon setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}/>
                  </group>

                </group>
                <group position={[23544, 0, 0]}>
                  <Ecliptic xRadius={732508} zRadius = {732508}/>
                  <group position={[732508, 0, 0]}>
                    <Moon setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}/>
                  </group>

                </group>


              </group>

              <TexturedSphere distance_percentage = {distance/1000000}/>
                </>
            </Suspense>

            } 
            {(sectorValue == 1) &&
              <Suspense fallback = {
                <Box/>
              }>
            
            <>
                <Stars star_distance = {star_distance} distance = {distance}  
                constellationConnections = {constellationConnections}
                setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}
                setInfoBoxShowing  = {setInfoBoxShowing}
                labelsVisible = {labelsVisible}
                setInfoBoxTitle = {setInfoBoxTitle}
                />
                <group position={[-34.16581651681187, -271.4933873379488, -488.5939393949807]}>


                  <group position={[0, 0, 0]} rotation = {[0, 0, 1.1]}>
                    <group position={[0, -15.6, 0]}>
                     <Ecliptic xRadius={2146} zRadius = {2146}/>
                    </group>
                    <group position={[0, 15.6, 0]}>
                     <Ecliptic xRadius={2146} zRadius = {2146}/>
                    </group>

                    <lineSegments>
                      <edgesGeometry args={[new THREE.SphereGeometry(100, 16, 16)]} />
                      <lineBasicMaterial color="#333333" linewidth={0.1} opacity={0.5} transparent/>
                    </lineSegments>

                    <Line points = {spiralPoints} lineWidth={1.0} color="#333333"/>

                  </group>
                  <Html center position={[0,-100,0 ]}>
                    <div className={"planet_text"}
                      onClick={()=> {
                        setCameraTarget([0, 1.08, 0])
                        setCameraPosition([0.02, 1.1, 0.02])
                      }}
                    > 
                      center of galaxy
                    </div>
                </Html>


                  </group>

                
                <MilkyWaySphere percentage_away = {Math.min(distance/500.0, 1.0)}/>


            </>
            </Suspense>


            }
            {(sectorValue == 2) &&
            <Suspense fallback = {
              <Box/>
            }>

            <>
              <UniverseThree count={1000} shape="sphere" universe_distance = {universe_distance} distance = {distance} />
              <CMB percentage_away = {Math.min(distance/500000.0, 1.0)}/>

            <group position={[0, 0, 0]} rotation = {[0, 0, 1.1]}>
              <Ecliptic xRadius={0.2} zRadius = {0.2}/>

            </group>

              </>

            </Suspense>
            }



          {(radecGrid) &&
            <>
            <group renderOrder={10}>
              <RADECGrid/>
            </group>
            </>
            }

            <EffectComposer>
              <Vignette eskil={false} offset={0.3} darkness={0.9} />
              </EffectComposer>


            <Handler 
              setDistance = {setDistance} 
              distance = {distance} 
              sector = {sector} 
              sectorValue = {sectorValue}
              zoom_to = {zoom_to} set_zoom_to = {set_zoom_to} 
              sectorIncrementing = {sectorIncrementing}
              cameraPosition = {cameraPosition}
              cameraTarget = {cameraTarget}
              setSectorValue = {setSectorValue}
              
              />
            </Canvas>
        </div>
    </> 
}

export default TotalViz