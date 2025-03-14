import logo from './logo.svg';
import './App.css';
import { createRoot } from 'react-dom/client'

import { BrowserRouter as Router, Routes, Route, HashRouter}
    from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

import JustUniverse from './JustUniverse';
import TotalViz from './TotalViz';


function App() {
  
  return (
    <div className="App" >
    <HashRouter>
          <Routes>
            <Route path= '/' exact element = {<TotalViz/>
            }/>
          </Routes>
          </HashRouter>
        {/*
        
        */}
        
    </div>
  );
}
createRoot(document.getElementById('root')).render(<App />)

export default App;


















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