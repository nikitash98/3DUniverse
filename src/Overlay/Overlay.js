import SectorInfo from './SectorInfo';
import "./Overlay.css"
import SectorHeader from './SectorHeader'
import { Button, Divider, Grid, Radio } from 'semantic-ui-react';
import * as Constants from "../constants.jsx"
import { distance } from 'three/src/nodes/TSL.js';
import InformationBox from './InformationBox.js';
import { useState } from 'react';
import ContentSlider from './ContentSlider.js';
function Overlay(props) {


    const [uiVisible, setuiVisible] = useState(true)

    return (
        <>

        
            <div className='logo'>
            </div>
            <div className='ui_visible_container'>
            </div>

            <Grid style = {{"height": "100%", "margin": "0"}}>
                {uiVisible && (
                <>
                <Grid.Row style= {{"height": "10%"}}>
                    <Grid.Column width={2}>
                    <img src="Logo.svg"/>
                    </Grid.Column >

                    <Grid.Column width={2} floated= "right" style = {{"pointer-events": "auto", "text-align": "right"}}>


                        {/*
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
                        active = {props.radecGrid}
                        onClick={()=> {props.setradecGrid((prev) => !prev)}}
                        > guided</Button>
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

                        */}

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered style= {{"height": "70%"}}>
                    <Grid.Column width={4}>
                    </Grid.Column>

                    <Grid.Column width={8} >
                        <button className='inline_button' onClick={()=> {
                            props.setGuidedSection(0)
                        }

                        }>
                            <img src='icons/left-thin.svg'/>
                        </button>
                        <div className='guided_text'>

                            This is earth. You are here

                        </div>

                        <button className='inline_button' onClick={
                            props.setGuidedSection(1)

                        }>
                            <img src='icons/right-thin.svg'/>
                        </button>

                    </Grid.Column>
                    <Grid.Column width={3} >
                        {props.infoBoxShowing && (

                        <InformationBox setInfoBoxShowing = {props.setInfoBoxShowing}
                        infoBoxTitle = {props.infoBoxTitle}
                        
                        />
                    )}

                    </Grid.Column>

                    <Grid.Column width={1} floated= "right">
                    <div className='small_text' style={{"textAlign": "center", "text-wrap": "nowrap"}}>

                        {props.sectorValue == 0 && (
                            <p>
                                {(props.distance).toFixed(0)} Earth Radii
                            </p>
                        )
                        }
                        {props.sectorValue == 1 && (
                            <p>
                                {(props.distance * 1.0/0.7 * 10.0).toFixed(0)} Parsecs
                            </p>
                        )
                        }

                        {props.sectorValue == 2 && (
                            <p>
                                {(props.distance).toFixed(0)} Mpc
                            </p>
                        )
                        }


                    </div>

                        <div style={{width:"100%", height:"100%"}}>

                        <ContentSlider 
                        distance = {props.distance}
                        sectorValue = {props.sectorValue}
                        setSectorValue = {props.setSectorValue}
                        setCameraPosition = {props.setCameraPosition}
                        />
                        </div>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row verticalAlign="bottom" centered style= {{"height": "10%"}}>
                    <Grid.Column width={4} style = {{"textAlign" : "center"}}>
                        {/*
                        {(props.distance/500.0).toFixed(0)} Parsecs
                        <br/>
                        </div>
                        */}
                        {true && (

                        <Button className='classic_icon'
                        
                                onClick={()=> {

                                    props.setCameraTarget([0, 0, 0])
                                }
                        }>
                            <img src='icons/Material_Symbol_Recenter_02.svg'/>
                            <br/>

                            <div className='small_text' style={{"textAlign": "center", "color": "grey"}}>
                                recenter
                            </div>
                        </Button>
                        )}

                    </Grid.Column>

                </Grid.Row>
                </>

                )}

                <Grid.Row verticalAlign="bottom" style = {{"height": "10%"}}>
                    <Grid.Column width={4} verticalAlign='bottom'>
                        <div className='small_text' style={{"textAlign": "left", "color": "grey", "pointer-events" : "auto"}}>
                        © <a href="https://menard.pha.jhu.edu/" target="_blank">Ménard</a> and <a href="https://nikitashtarkman.com/" target="_blank">Shtarkman </a>
                        </div>
                    </Grid.Column>

                    <Grid.Column width={8}>
                        <div className='small_text' style={{"textAlign": "center"}}>
                            {props.raDec[0].toFixed(1)} {props.raDec[1].toFixed(1)}
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4} verticalAlign="bottom" floated= "right" style = {{"pointer-events" : "auto"}}>
                        <div className='small_text' style={{"textAlign": "right", "color": "grey"}}>
                            credits |                 <Button toggle
                            className='toggle_button'

                            active = {uiVisible}
                            onClick={()=> {setuiVisible((prev) => !prev)}}
                            > hide ui</Button>

                        </div>

                    </Grid.Column>

                </Grid.Row>
            </Grid>

            
        </>

    )


}
export default Overlay