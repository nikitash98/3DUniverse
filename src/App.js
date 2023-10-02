import logo from './logo.svg';
import './App.css';
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import UniverseThree from './UniverseThree';

function App() {
  return (
    <div className="App" >
        <div id="canvas-container">

          <Canvas camera={{ position: [0, 0, 15] }} style={{ background: "black" }}>
          <OrbitControls/>
          <UniverseThree count={1000} shape="sphere"/>

          </Canvas>
        </div>

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
