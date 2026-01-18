
import SolarSystem from './SolarSystem/SolarSystem';
import MilkyWay from './MilkyWay';
import ReactSlider from "react-slider";
import { Canvas} from '@react-three/fiber'
import { Stats, OrbitControls, TrackballControls, Box, Sphere, Line} from '@react-three/drei'
import { Suspense, useState, useRef } from 'react';
import Overlay from './Overlay/Overlay.js';

import "./3D/3D.css"

//import Handler from './Handler';

import Stars from "./Stars/Stars.js"
import UniverseThree from './Galaxies/UniverseThree.js';
import CMB from './CMB';
import * as Constants from "./constants.jsx"
import { BackgroundScene } from './3D/Background.js';
import { Ecliptic } from './3D/Ecliptic.js';
import { EffectComposer, Vignette, Bloom, DepthOfField} from "@react-three/postprocessing";
import { useEffect } from 'react';
import Handler from './Handler.js';
import { Grid, Html, PerspectiveCamera } from '@react-three/drei';
import TexturedSphere from './3D/TexturedSphere.js';
import MilkyWaySphere from './3D/MilkyWaySphere.js';
import { CheckGPULimits } from './CheckGPULimits.js';
import RADECGrid from './3D/DecGrid.js';
import Satellites_02 from './Satellites/Satellites_02.js';
import * as THREE from 'three';
import NearGalaxies from './Galaxies/NearGalaxies.js';
import SDSSGalaxies from './Galaxies/SDSSGalaxies.js';
import Compass from './3D/Compass.js';
import MilkyWayPlane from './3D/MilkyWayPlane.js';
import guidedData from "./guidedStory.json"
import { useFrame } from '@react-three/fiber';
function TimeKeeper(props) {
  useFrame((state, delta) => {
    props.globalTime.current += delta * props.timeSpeed;
  })
}

const TotalViz = (props) => {

    let start_dist = 0.001
    let end_dist = 200000000000
    const [showExtraGalaxies, setShowExtraGalaxies] = useState(false)
    const [distance, setDistance] = useState(start_dist);
    const [sectorValue, setSectorValue] = useState(0);
    const [sector, setSector] = useState("Earth");
    const [showSectorInfo, setShowSectorInfo] = useState(true)
    const [zoom_to, set_zoom_to] = useState(false)
    const [timeSpeed, setTimeSpeed] = useState(1.0);
    const globalTime = useRef(0)
    const movingRefs = useRef({});


    const [guidedSection, setGuidedSection] = useState(0)

    const [guided, setGuided] = useState(true)
    const [sectorIncrementing, setSectorIncrementing] = useState(true);

    const [raDec, setRaDec] = useState([0, 0]);

    const [cameraTarget, setCameraTarget] = useState([0, 0, 0])
    const [cameraPosition, setCameraPosition] = useState([0,0, 3])

    const [radecGrid, setradecGrid] = useState(false)
    const [constellationConnections, setconstellationConnections] = useState(false)

    let universe_distance = 100000
    let star_distance = 0.7
    const [infoBoxShowing, setInfoBoxShowing] = useState(false)
    const [infoBoxTitle, setInfoBoxTitle] = useState("")

    const [labelsVisible, setLabelsVisible] = useState(false)

    const hasRun = useRef(false);

    const spiralPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(200, 0, -200),
      new THREE.Vector3(360, 0, -250),

      new THREE.Vector3(700, 0, -100),
      new THREE.Vector3(1000, 0, 400),
      new THREE.Vector3(900, 0, 600),
      new THREE.Vector3(800, 0, 800),
  
    ];

    // Convert points to BufferGeometry


    useEffect(()=> {
      setCameraPosition(guidedData[guidedSection].cameraPosition)
      setCameraTarget(guidedData[guidedSection].cameraTarget)
    }, [guidedSection]);
    
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
          raDec = {raDec}
          cameraTarget = {cameraTarget}
          guidedSection = {guidedSection}
          setGuidedSection = {setGuidedSection}
          setTimeSpeed = {setTimeSpeed}
          timeSpeed = {timeSpeed}
          />
        </div>
        {/*
         
        */}
        <div id="canvas-container">
            <Canvas shadows camera={{ position: [Math.sqrt(start_dist), 0, Math.sqrt(start_dist)], near: 0.1, far: 2000000000}}>
              <CheckGPULimits/>
              <ambientLight intensity={0.01} />
              <directionalLight intensity={0} color="white" position={[10, 0, 0]}  castShadow/>

              {/*
              <Compass/>
              */}
      
            <TimeKeeper globalTime = {globalTime} timeSpeed = {timeSpeed}/>
            {(sectorValue == 0 && !hasRun.current) &&
            <Suspense fallback = {<>
            </>}>
              <>

              {distance < 100 && (
              <Satellites_02
              globalTime = {globalTime}
              setCameraTarget = {setCameraTarget}/>
              )}
              {distance < 50000000 && (
                <group scale={1.0}>
                  <SolarSystem 
                  setCameraPosition = {setCameraPosition}
                  setCameraTarget = {setCameraTarget}
                  movingRefs = {movingRefs}
                  distance = {distance}
                  globalTime = {globalTime}
                  />
                </group>
              )}
      

              {/*
              <TexturedSphere distance_percentage = {distance/5000000}/>
              */}

               </>
              {distance > 50000000 && (
                <>
                  <Sphere args={[500000, 32, 32]}>
                        <meshBasicMaterial transparent/>
                  </Sphere>
                  
                  <Html center position={[0,-.25,0 ]}>
                    <div className={"planet_text"} onClick={()=> {
                              props.setCameraTarget([60, 0, 0])
                              props.setCameraPosition([61, 0.2, 0.5])
                          }}> 
                        Sun
                    </div>
                  </Html>
                </>
              )}
              <TexturedSphere distance_percentage = {0.2}/>
            </Suspense>

            } 

            
            {(sectorValue == 1 && !hasRun.current) &&
              <Suspense fallback = {
                <Box/>
              }>
              <>

              {distance < 1000 &&  (

                <Stars 
                star_distance = {star_distance} 
                distance = {distance}  
                constellationConnections = {constellationConnections}
                setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}
                setInfoBoxShowing  = {setInfoBoxShowing}
                labelsVisible = {labelsVisible}
                setInfoBoxTitle = {setInfoBoxTitle}
                />
              )}

                <Sphere args={[0.001, 32, 32]}>
                      <meshBasicMaterial/>
                </Sphere>

                {distance < 500 && (
                  <Html center position={[0, 0, 0]}>
                      <div className={"planet_text"} onClick={()=> {
                                props.setCameraTarget([60, 0, 0])
                                props.setCameraPosition([61, 0.2, 0.5])
                            }}> 
                          Sun
                      </div>
                  </Html>
                )}

                <group position={[-34.16581651681187, -271.4933873379488, -488.5939393949807]}>
                  <group position={[0, 0, 0]} rotation = {[0, 0, 1.1]}>
                    {distance > 5000 && (

                    <MilkyWayPlane
                      distance = {distance * 0.5}
                    />
                    )}

                      {distance > 1200000 && (
                      
                        <Sphere args={[10000, 32, 32]}>
                              <meshBasicMaterial transparent/>
                        </Sphere>
                      )}
                    
                    {distance > 12000 && (
                      <Html center position={[-1100,1,0 ]}>
                          <div className={"planet_text"} onClick={()=> {
                                    props.setCameraTarget([60, 0, 0])
                                    props.setCameraPosition([61, 0.2, 0.5])
                                }}> 
                              Milky Way
                          </div>
                      </Html>
                      )}

                    {distance > 200 && distance < 25000 && (
                    <>
                      <group position={[0, -15.6, 0]}>
                      <Ecliptic xRadius={1134.27185637} zRadius = {1134.27185637}/>
                      </group>

                      <group position={[0, 15.6, 0]}>
                      <Ecliptic xRadius={1134.27185637} zRadius = {1134.27185637}/>
                      </group>

                      <lineSegments>
                        <edgesGeometry args={[new THREE.SphereGeometry(100, 12, 12)]} />
                        <lineBasicMaterial color="#111111" linewidth={0.1} opacity={1.0} transparent/>
                      </lineSegments>
                      <Line points = {spiralPoints} lineWidth={1.0} color="#111111"/>


                      {distance < 3000 && (
                        <>

                        <Html position={[-80,0,0 ]}
                        rotation = {[-Math.PI/2, 0, 0]}
                        scale={200}
                        center
                        transform
        
                        >
                          <div className={"annotation_text"}
                            onClick={()=> {
                              setCameraTarget([0, 1.08, 0])
                              setCameraPosition([0.02, 1.1, 0.02])
                            }}
                          > 
                            center of galaxy
                          </div>
                        </Html>

                        <Html position={[800,0,0 ]}
                          rotation = {[-Math.PI/2, 0, 0]}
                          scale={200}
                          center
                          transform
                        
                        
                        >
                          <div className={"annotation_text"}
                          rotation = {[-Math.PI/2, 0, 0]}
                          scale={200}
                          center
                          transform
                          > 
                            Perseus Arm
                          </div>
                        </Html>

                        <Html position={[-800,0,0 ]}
                        
                        rotation = {[-Math.PI/2, 0, 0]}
                        scale={200}
                        center
                        transform
>
                          <div className={"annotation_text"}
                            onClick={()=> {
                              setCameraTarget([0, 1.08, 0])
                              setCameraPosition([0.02, 1.1, 0.02])
                            }}
                          > 
                            Outer Arm
                          </div>
                        </Html>


                        <Html  position={[-400,0,-400 ]}
                          rotation = {[-Math.PI/2, 0, 0]}
                          scale={200}
                          center
                          transform
                        
                        >
                          <div className={"annotation_text"}
                            onClick={()=> {
                              setCameraTarget([0, 1.08, 0])
                              setCameraPosition([0.02, 1.1, 0.02])
                            }}
                          > 
                            Sagitarius Arm
                          </div>
                        </Html>


                        <Html position={[500,0,500 ]}
                        
                        rotation = {[-Math.PI/2, 0, 0]}
                        scale={200}
                        center
                        transform
>
                          <div className={"annotation_text"}
                            onClick={()=> {
                              setCameraTarget([0, 1.08, 0])
                              setCameraPosition([0.02, 1.1, 0.02])
                            }}
                          > 
                            Scutum-Centaurus Arm
                          </div>
                        </Html>

                        </>
                      )}
                    </>
                    
                    )}
                  </group>

                  </group>

                
                {/*
                {distance < 1.0 ? (

                  <TexturedSphere distance_percentage = {1.0-distance}/>
                ) :
                (
                  <MilkyWaySphere percentage_away = {Math.min(distance/100.0, 1.0)}/>

                )
              }
                  
                */}


              </>
            </Suspense>
            }
            {(sectorValue == 1 || sectorValue == 0) && (
            <TexturedSphere distance_percentage = {(1.0 - (distance * !hasRun.current)) * 0.2}/>

            )}

            {(sectorValue == 2 && !hasRun.current) &&
            <Suspense fallback = {
              <>
              </>
            }>

            <>
              <group scale={100.0}>
                <SDSSGalaxies
                  distance = {distance}  

                />
                <NearGalaxies
                distance = {distance}  
                setCameraTarget = {setCameraTarget} setCameraPosition = {setCameraPosition}
                setInfoBoxShowing  = {setInfoBoxShowing}
                labelsVisible = {labelsVisible}
                setInfoBoxTitle = {setInfoBoxTitle}
                />

              </group>

              {distance < 5000 && (
                <>
                  <Sphere args={[0.001, 32, 32]}>
                        <meshBasicMaterial transparent/>
                  </Sphere>
                  
                  <Html center position={[0,-.001,0 ]}>
                    <div className={"planet_text"} onClick={()=> {
                              props.setCameraTarget([60, 0, 0])
                              props.setCameraPosition([61, 0.2, 0.5])
                          }}> 
                        Milky Way
                    </div>
                  </Html>
                </>
              )}

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
              setRaDec = {setRaDec}
              hasRun = {hasRun}
              />

            {/*

                            <group position={[100, 0, 0]}>

                <PerspectiveCamera 
                makeDefault 
                position={[0, 0, 5]} 
                fov={75} 
                near={0.1} 
                far={1000} 
              />
              </group>

            */}

            </Canvas>
        </div>
    </> 
}

export default TotalViz