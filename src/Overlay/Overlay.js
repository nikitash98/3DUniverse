import SectorInfo from './SectorInfo';
import "./Overlay.css"
import SectorHeader from './SectorHeader'
import { Button, Divider, Grid, Radio } from 'semantic-ui-react';
import * as Constants from "../constants.jsx"
import ReactSlider from 'react-slider';
import { distance } from 'three/src/nodes/TSL.js';
import InformationBox from './InformationBox.js';
import { useState } from 'react';

function Overlay(props) {


    const [uiVisible, setuiVisible] = useState(true)

    return (
        <>

        
            <div className='logo'>
            </div>
            <div className='ui_visible_container'>
                <Button toggle
                className='toggle_button'

                active = {uiVisible}
                onClick={()=> {setuiVisible((prev) => !prev)}}
                > hide ui</Button>
            </div>
            {uiVisible && (

            <Grid style = {{"height": "100%", "margin": "0"}}>
                <Grid.Row style= {{"height": "10%"}}>
                    <Grid.Column width={2}>
                    <img src="Logo.svg"/>
                    </Grid.Column >

                    <Grid.Column width={2} floated= "right" style = {{"pointer-events": "auto", "text-align": "right"}}>
                        <Button 
                        className='toggle_button'
                        toggle
                        active = {props.radecGrid}
                        onClick={()=> {props.setradecGrid((prev) => !prev)}}
                        > celestial grid</Button>
                        <br/>

                        <Button 
                        className='toggle_button'
                        toggle
                        active = {!props.constellationConnections}
                        onClick={()=> {props.setconstellationConnections((prev) => !prev)}}
                        >constellations</Button>
                        <br/>

                        <Button 
                        className='toggle_button'
                        toggle
                        active = {!props.labelsVisible}
                        onClick={()=> {props.setLabelsVisible((prev) => !prev)}}
                        > labels</Button>


                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered style= {{"height": "70%"}}>
                    <Grid.Column width={2}>
                    </Grid.Column>

                    <Grid.Column width={10} >
                    </Grid.Column>
                    <Grid.Column width={3} >
                        {props.infoBoxShowing && (

                        <InformationBox setInfoBoxShowing = {props.setInfoBoxShowing}
                        infoBoxTitle = {props.infoBoxTitle}
                        
                        />
                    )}

                    </Grid.Column>

                    <Grid.Column width={1} floated= "right">
                    <div className='small_text' style={{"textAlign": "center"}}>
                        {(props.distance).toFixed(0)} Earth Radii
                    </div>

                        <div style={{width:"100%", height:"100%"}}>
                        <ReactSlider
                            min={0}
                            max={100}
                            step={1}
                            value={props.distance/10000 * 1.0/3.0 + props.sectorValue * 100.0/3.0 }

                            onChange={(value)=> {
                                props.setCameraPosition(previousPosition => [1 * value * 10000, 0 , 0])
                                console.log(value)
                            }
                            }
                            marks = {10}
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
                    <Grid.Column width={4} style = {{"textAlign" : "center"}}>
                        <Divider/>
                        {/*
                        <div className='small_text' style={{"textAlign": "center"}}>
                        {(props.distance/500.0).toFixed(0)} Parsecs
                        <br/>
                        </div>
                        */}

                        <Button className='classic_icon'
                        
                        onClick={()=> {

                            props.setCameraTarget([0, 0, 0])
                        }

                        }>
                            <img src='icons/Material_Symbol_Recenter_02.svg'/>
                        </Button>


                    </Grid.Column>

                </Grid.Row>
                <Grid.Row verticalAlign="bottom" style = {{"height": "10%"}}>
                    <Grid.Column width={4} verticalAlign='bottom'>
                        <div className='small_text' style={{"textAlign": "left", "color": "grey"}}>
                        © <a href="https://menard.pha.jhu.edu/" target="_blank">Ménard</a> and <a href="https://nikitashtarkman.com/" target="_blank">Shtarkman </a>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4} verticalAlign="bottom" floated= "right">
                        <div className='small_text' style={{"textAlign": "right", "color": "grey"}}>
                            credits 
                        </div>

                    </Grid.Column>

                </Grid.Row>
            </Grid>
            )}

            
        </>

    )


}
export default Overlay