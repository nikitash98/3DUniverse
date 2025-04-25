import Earth_P from "./Earth.jsx"
import { useRef } from "react";
import { Ecliptic } from '../3D/Ecliptic.js';
import Moon from './Moon.js';
import Sun from './Sun.js';
import { ISS } from './ISS.jsx';

import * as THREE from 'three'

import { useFrame } from "@react-three/fiber";
import Uranus from "./Uranus.js";
import Neptune from "./Neptune.js";
import Saturn from "./Saturn.js";
import Jupiter from "./Jupiter.js";
import Venus from "./Venus.js";
import Mars from "./Mars.js";
import Mercury from "./Mercury.js";
import { Html } from '@react-three/drei';

import Asteroids from "../Asteroids/Asteroids.js";

const SolarSystem = (props) => {

    const orbitRefs = useRef({})
    const orbitDistances = [9093, 16923, 35868, 122253, 224804, 454660, 732508]
    const solarSystemRef = useRef()

    let textDistance = 1500000;
    let moonDistance = 20000;
    useFrame((state, delta) => {
        Object.values(orbitRefs.current).forEach((ref, index) => {
            let orbitSpeed = 0.1;
          if (ref) {
            ref.position.x = Math.sin(state.clock.elapsedTime * orbitSpeed/(orbitDistances[index]/10000.0) + index * 3.0) * orbitDistances[index];
            ref.position.z = Math.cos(state.clock.elapsedTime * orbitSpeed/(orbitDistances[index]/10000.0) + index * 3.0) * orbitDistances[index];


            /*
            if(index == 0) {
                const worldPositionTarget = new THREE.Vector3()
                ref.getWorldPosition(worldPositionTarget)
                let camTarget = [worldPositionTarget.x, worldPositionTarget.y, worldPositionTarget.z];
                props.setCameraTarget(camTarget)
    
              }
            */
          } 


        })



        /*
        if(solarSystemRef.current) {
            solarSystemRef.current.rotation.y = state.clock.elapsedTime * .1;
            solarSystemRef.current.position.x = Math.sin(state.clock.elapsedTime * .1) * 23544
            solarSystemRef.current.position.z = Math.cos(state.clock.elapsedTime * .1) * 23544

        }
        */
      })
    

    return (<>
             <Earth_P setCameraTarget = {props.setCameraTarget} setCameraPosition = {props.setCameraPosition}/>
             {props.distance < textDistance && (
                <Html center position={[0,-1,0 ]}>
                    <div className={"planet_text"}
                    onClick={()=> {
                        props.setCameraTarget([0, 0, 0])
                        props.setCameraPosition([5, 0, 0])
                    }}
                    > 
                        Earth
                    </div>
                </Html>
            )}
             
            <Ecliptic xRadius={60} zRadius = {60}/>
            <group position={[0, 1.08, 0]} scale={0.0001}>
                <ISS/>
            </group>

            <group position={[60, 0, 0]} >
                <Moon setCameraTarget = {props.setCameraTarget} setCameraPosition = {props.setCameraPosition}/>
                {props.distance < moonDistance && (

                <Html center position={[0,-.25,0 ]}>
                    <div className={"planet_text"} onClick={()=> {
                        props.setCameraTarget([60, 0, 0])
                        props.setCameraPosition([61, 0.2, 0.5])
                    }}> 
                        Moon
                    </div>
                </Html>
                )}

            </group>

            <group position={[23544, 0, 0]} ref = {solarSystemRef}>
                <Asteroids/>
                <Ecliptic xRadius={23544.1845864} zRadius = {23544.1845864}/>
                <Sun setCameraTarget = {props.setCameraTarget} setCameraPosition = {props.setCameraPosition}/>
                {props.distance < textDistance && (

                <Html center position={[0,-109,0 ]}>
                    <div className={"planet_text"} onClick={()=> {
                        props.setCameraTarget([23544, 0, 0])
                        props.setCameraPosition([23544 + 109 * 2, 0, 0])
                    }}> 
                        Sun
                    </div>
                </Html>
                )}


                <Ecliptic xRadius={9093 } zRadius = {9093} />
                <group position={[9093, 0, 0]} ref={ref => orbitRefs.current["Mercury"] = ref}>
                    <Mercury setCameraTarget = {props.setCameraTarget} setCameraPosition = {props.setCameraPosition}/>
                    {props.distance < textDistance && (

                    <Html center position={[0,-.25,0 ]}>
                        <div className={"planet_text"} onClick={()=> {
                            console.log(orbitRefs.current["Mercury"].position)
                            const worldPositionTarget = new THREE.Vector3()
                            orbitRefs.current["Mercury"].getWorldPosition(worldPositionTarget)
                            let camTarget = [worldPositionTarget.x, worldPositionTarget.y, worldPositionTarget.z];
                            let camPos = [9093, 0, 0]

                            props.setCameraTarget(camTarget)
                            console.log(camTarget)

                            camPos[0] = worldPositionTarget.x 
                            camPos[1] = 100
                            camPos[2] = worldPositionTarget.z
                            console.log(camPos)

                            props.setCameraPosition(camPos)
                        }}> 
                            Mercury
                        </div>
                    </Html>
                    )}
                </group>

                <Ecliptic xRadius={16923} zRadius = {16923}/>
                <group position={[16923, 0, 0]} ref={ref => orbitRefs.current["venus"] = ref}>
                    <Venus setCameraTarget = {props.setCameraTarget} setCameraPosition = {props.setCameraPosition}/>
                    {props.distance < textDistance && (

                    <Html center position={[0,-.25,0 ]}>
                        <div className={"planet_text"} onClick={()=> {
                            props.setCameraTarget([60, 0, 0])
                            props.setCameraPosition([61, 0.2, 0.5])
                        }}> 
                            Venus
                        </div>
                    </Html>
                    )}

                </group>

                <Ecliptic xRadius={35868} zRadius = {35868}/>
                <group position={[35868, 0, 0]} ref={ref => orbitRefs.current["mars"] = ref}>
                    <Mars setCameraTarget = {props.setCameraTarget} setCameraPosition = {props.setCameraPosition}/>
                    {props.distance < textDistance && (

                    <Html center position={[0,-.25,0 ]}>
                        <div className={"planet_text"} onClick={()=> {
                            props.setCameraTarget([60, 0, 0])
                            props.setCameraPosition([61, 0.2, 0.5])
                        }}> 
                            Mars
                        </div>
                    </Html>
                    )}
                </group>

                <Ecliptic xRadius={122253} zRadius = {122253}/>

                <group position={[122253, 0, 0]} ref={ref => orbitRefs.current["jupiter"] = ref}>
                    <Jupiter setCameraTarget = {props.setCameraTarget} setCameraPosition = {props.setCameraPosition}/>
                    {props.distance < textDistance && (

                    <Html center position={[0,-.25,0 ]}>
                        <div className={"planet_text"} onClick={()=> {
                            props.setCameraTarget([60, 0, 0])
                            props.setCameraPosition([61, 0.2, 0.5])
                        }}> 
                            Jupiter
                        </div>
                    </Html>
                    )}
                </group>

                <Ecliptic xRadius={224804} zRadius = {224804}/>
                <group position={[224804, 0, 0]} ref={ref => orbitRefs.current["saturn"] = ref}>
                    <Saturn setCameraTarget = {props.setCameraTarget} setCameraPosition = {props.setCameraPosition}/>
                    {props.distance < textDistance && (
                        <Html center position={[0,-.25,0 ]}>
                            <div className={"planet_text"} onClick={()=> {
                                props.setCameraTarget([60, 0, 0])
                                props.setCameraPosition([61, 0.2, 0.5])
                            }}> 
                                Saturn
                            </div>
                        </Html>
                    )}
                </group>

                <Ecliptic xRadius={454660} zRadius = {454660}/>
                <group position={[454660, 0, 0]} ref={ref => orbitRefs.current["uranus"] = ref}>
                    <Uranus setCameraTarget = {props.setCameraTarget} setCameraPosition = {props.setCameraPosition}/>
                    {props.distance < textDistance && (
                    <Html center position={[0,-.25,0 ]}>
                        <div className={"planet_text"} onClick={()=> {
                            props.setCameraTarget([60, 0, 0])
                            props.setCameraPosition([61, 0.2, 0.5])
                        }}> 
                            Uranus
                        </div>
                    </Html>
                    )}

                </group>
                <Ecliptic xRadius={732508} zRadius = {732508}/>
                <group position={[732508, 0, 0]} ref={ref => orbitRefs.current["neptune"] = ref}>
                    {props.distance < textDistance && (

                        <Html center position={[0,-.25,0 ]}>
                            <div className={"planet_text"} onClick={()=> {
                                props.setCameraTarget([60, 0, 0])
                                props.setCameraPosition([61, 0.2, 0.5])
                            }}> 
                                Neptune
                            </div>
                        </Html>
                    )}
                    <Neptune setCameraTarget = {props.setCameraTarget} setCameraPosition = {props.setCameraPosition}/>
                </group>

                <Html  position={[1000000,0,0 ]}
                rotation = {[-Math.PI/2, 0, 2 *Math.PI]}
                scale={100000}
                center
                transform
                >
                        <div className={"annotation_text "} onClick={()=> {
                        }}> 
                            Kuiper belt
                        </div>
                </Html>

                <Html  position={[70000,0,0 ]}
                center
                rotation = {[-Math.PI/2, 0, 2 *Math.PI]}
                scale={50000}
                transform
                
                >
                        <div className={"annotation_text "} onClick={()=> {
                        }}> 
                            asteroid belt
                        </div>
                </Html>

                <Html  position={[10000000,0,0 ]}
                center
                rotation = {[-Math.PI/2, 0, 2 *Math.PI]}
                scale={1000000}
                transform
                
                >
                        <div className={"annotation_text "} onClick={()=> {
                        }}> 
                            Oort cloud
                        </div>
                </Html>

            </group>


    
    
    </>)
}
export default SolarSystem