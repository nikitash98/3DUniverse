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
        
    </div>
  );
}
createRoot(document.getElementById('root')).render(<App />)

export default App;

