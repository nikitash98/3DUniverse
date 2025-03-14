import SectorInfo from './SectorInfo';
import "./Overlay.css"
import SectorHeader from './SectorHeader'
import { Divider, Grid } from 'semantic-ui-react';
import * as Constants from "../constants.jsx"
import ReactSlider from 'react-slider';
import { distance } from 'three/src/nodes/TSL.js';
function Overlay(props) {
    return (
        <>

        
            <div className='logo'>
            </div>
            <Grid style = {{"height": "100%", "margin": "0"}}>
                <Grid.Row style= {{"height": "10%"}}>
                    <Grid.Column width={2}>
                    <img src="Logo.svg"/>

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered style= {{"height": "70%"}}>
                    <Grid.Column width={2}>
                    <div className='small_text' style={{"textAlign": "center"}}>
                    </div>

                    </Grid.Column>
                    <Grid.Column width={1} floated= "right">
                    <div className='small_text' style={{"textAlign": "center"}}>
                        {(props.distance).toFixed(0)} Earth Radii
                    </div>

                        <div style={{width:"100%", height:"100%"}}>
                        <ReactSlider
                            min={0}
                            max={1000000}
                            step={1}
                            value={props.distance}
                            className="customSlider"
                            trackClassName="customSlider-track"
                            thumbClassName="customSlider-thumb"
                            markClassName="customSlider-mark"
                            orientation="vertical"
                    />

                        </div>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row verticalAlign="bottom" centered style= {{"height": "10%"}}>
                    <Grid.Column width ={2} style={{"textAlign": "center"}}>
                        <button className='testbutton clickable'  style={{"textAlign": "center"}} onClick={()=> {
                                    props.setSectorValue(prevSector => prevSector - 1);
                                    props.setCameraPosition([1000000, 0, 0]);
                                    props.setCameraTarget([0, 0, 0])
        
                        }}>
                            back
                        </button>

                    </Grid.Column>
                    <Grid.Column width={4} >
                        <Divider/>
                        <div className='small_text' style={{"textAlign": "center"}}>
                        {(props.distance/500.0).toFixed(0)} Parsecs
                    </div>

                    </Grid.Column>
                    <Grid.Column width ={2} style={{"textAlign": "center"}}>
                        <button className='testbutton clickable' style={{"textAlign": "center"}} onClick={()=> {
                            props.setSectorValue(prevSector => prevSector + 1);
                            props.setCameraPosition([5, 0, 0]);
                            props.setCameraTarget([0, 0, 0])

                        }}>
                            next
                        </button>

                    </Grid.Column>

                </Grid.Row>
                <Grid.Row verticalAlign="bottom" style = {{"height": "10%"}}>
                    <Grid.Column width={4} verticalAlign='bottom'>
                    <div className='small_text' style={{"textAlign": "left"}}>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4} verticalAlign="bottom" floated= "right">
                        <div className='small_text' style={{"textAlign": "right"}}>
                        © <a href="https://menard.pha.jhu.edu/" target="_blank">Ménard</a> and <a href="https://nikitashtarkman.com/" target="_blank">Shtarkman </a>
                        </div>
                    </Grid.Column>

                </Grid.Row>
            </Grid>

            
        </>

    )


}
export default Overlay