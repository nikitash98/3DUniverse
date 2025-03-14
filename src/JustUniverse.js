import { Canvas } from '@react-three/fiber'
import UniverseThree from './Galaxies/UniverseThree'
import CMB from './CMB'
import { useState } from 'react'
import Handler from './Handler'
import { TrackballControls } from '@react-three/drei'
const JustUniverse = (props) => {
    let start_dist = 100000000
    let end_dist = 200000000000
    let universe_distance = 10000000000
    let star_distance = 100
    let distance_cutoffs = [0, .1, 6,3600, 80000]
    const [distance, setDistance] = useState(start_dist);

    let minor_distance_cutoffs = [0, 0.00035]

    return <> 
        <div id="canvas-container">
        <Canvas camera={{ position: [Math.sqrt(start_dist), 0, Math.sqrt(start_dist)], near: 0.000001, far: 100000000000}} shadows>
            <TrackballControls/>
            <UniverseThree count={1000} shape="sphere" universe_distance = {universe_distance} distance = {distance} />
        <ambientLight intensity={1.0} />
            <CMB universe_distance = {universe_distance} distance = {distance} max_distance = {327989811429.90} start_distance = {distance_cutoffs[4]}/>
        </Canvas>
        </div>
    </>
}

export default JustUniverse