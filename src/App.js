import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, TrackballControls} from '@react-three/drei'
import UniverseThree from './UniverseThree';
import CMB from './CMB';
import Earth from './Earth.js';
import Stars from './Stars';
import Handler from './Handler';
import SolarSystem from './SolarSystem';
import MilkyWay from './MilkyWay';
import { Perf } from 'r3f-perf'

import ReactSlider from "react-slider";
import 'semantic-ui-css/semantic.min.css'
import { Grid, Image } from 'semantic-ui-react'

function App() {
  let start_dist = 0.00015
  let end_dist = 200000000000
  const [showExtraGalaxies, setShowExtraGalaxies] = useState(false)
  const [distance, setDistance] = useState(start_dist);

  const renderSwitch = (param) => {
    if (param > distance_cutoffs[0]) {
      return "Earth"
    } else if (param > distance_cutoffs[1] && param < distance_cutoffs[2]) {
      return "Solar System"
    } else if (param > distance_cutoffs[2] && param < distance_cutoffs[3]) {
      
    }
  }


  let universe_distance = 10000000000
  let star_distance = 100
  let distance_cutoffs = [0, .1, 6,3600, 80000]



  
  return (
    <div className="App" >
        <div id="canvas-container">
          <Stats />

          <Canvas camera={{ position: [Math.sqrt(start_dist), 0, Math.sqrt(start_dist)], near: 0.000001, far: 100000000000}} shadows>
          {/*
          <fog attach="fog"  args={['black', 0, 1]} />
          */}
          <Perf />

          <ambientLight intensity={0.5} />
          <directionalLight intensity={3} color="white" position={[0, 10, 10]}  castShadow/>

          {(distance > distance_cutoffs[0]) && 
            (
              <Earth/>

            )
          }



          {(distance > distance_cutoffs[2] && distance < distance_cutoffs[3]) && 
            <Stars star_distance = {star_distance} distance = {distance} />
          }

          
          {(distance > distance_cutoffs[3] && distance < distance_cutoffs[4]) && 
            <MilkyWay star_distance = {star_distance}/>
          }

          {(distance > distance_cutoffs[4]) && 
          <>
            <UniverseThree count={1000} shape="sphere" universe_distance = {universe_distance} distance = {distance} />
            <CMB universe_distance = {universe_distance} distance = {distance} max_distance = {327989811429.90} start_distance = {distance_cutoffs[4]}/>

            {/*showExtraGalaxies && (
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

            )*/}

            </>

          }


          <TrackballControls minDistance = {start_dist} maxDistance={end_dist} noPan />
          <Handler setDistance = {setDistance} distance = {distance}/>
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

          </Canvas>
        </div>
        <div id='overlay-container'>
          <div className='logo'>
          <img src="Logo.svg"/>

          </div>
        <Grid  style = {{height: "100%"}}>
          <Grid.Row>
            <Grid.Column width={2}>
              <br/>
            {/*
            <button onClick={()=> {setShowExtraGalaxies(!showExtraGalaxies)}}>
                See extra galaxies 
            </button>
            */}

            </Grid.Column>
            <Grid.Column width={12}>
            {/*
            <ReactSlider
                    min={0}
                    step={1}
                    className="customSlider"
                    trackClassName="customSlider-track"
                    thumbClassName="customSlider-thumb"
                    value={0}
                    markClassName="customSlider-mark"
                    orientation="vertical"

                    />
            */}

              {/*
            <ReactSlider
    className="horizontal-slider"
    thumbClassName="example-thumb"
    trackClassName="example-track"
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
/>
              */}

            </Grid.Column>
            <Grid.Column width={2} className='controls-container'>
              <input type="range" orient="vertical" 
                  min={start_dist} max={Math.log(end_dist)}
                  defaultValue="3" 
                  value={Math.log(distance)}
                  onChange={(event)=> {setDistance(event.target.value)}}
            
              />

              <ReactSlider
                  className="vertical-slider"
                  thumbClassName="example-thumb"
                  trackClassName="example-track"
                  defaultValue={[0, 50, 100]}
                  ariaLabel={['Lowest thumb', 'Middle thumb', 'Top thumb']}
                  renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                  orientation="vertical"
                  invert
                  pearling
                  minDistance={10}
              />

            </Grid.Column>
          </Grid.Row>

        </Grid>
        </div>

          {/*
          <div className='controls-container'>
            
          </div>

          <div className='distances-container'>
            <h1>Distance</h1>
          <h2>{distance.toFixed(2)}</h2>
            {(distance > distance_cutoffs[1]) && 
              <h2>ABC</h2>
            }

            <img src = "combined.jpg"/>
          </div>

          */}

      {/* 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
      */}

    </div>
  );
}
createRoot(document.getElementById('root')).render(<App />)

export default App;
