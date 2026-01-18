import SectorInfo from './SectorInfo';
import "./Overlay.css"
import SectorHeader from './SectorHeader'
import { Button, Divider, Grid, Radio } from 'semantic-ui-react';
import * as Constants from "../constants.jsx"
import { distance } from 'three/src/nodes/TSL.js';
import InformationBox from './InformationBox.js';
import { useState } from 'react';
import ContentSlider from './ContentSlider.js';
import guidedData from "../guidedStory.json"
import ReactSlider from 'react-slider';
function Overlay(props) {


    const [uiVisible, setuiVisible] = useState(true)
    const [viewSettings, setViewSettings] = useState(false)
    return (
        <>

        
            <div className='ui_visible_container'>
            </div>

            <Grid style = {{"height": "100%", "margin": "0"}}>
                {uiVisible && (
                <>

                <Grid.Row centered style= {{"height": "100%"}}>
                     <Grid.Column width={2}>
                        <img src="Logo.svg"/>
                        {/*
                        */}
                        
                        <div className='bottomCreditContainer'>

                                <Button 
                                className='toggle_button'
                                toggle
                                    active = {viewSettings}
                                    onClick={()=> {setViewSettings((prev) => !prev)}}
                                    > view settings
                                </Button>     
                                <ReactSlider
                                        className="horizontal-slider"
                                        thumbClassName="example-thumb"
                                        trackClassName="example-track"
                                        max={10}
                                        min={-10}
                                        value = {props.timeSpeed}
                                        onChange={(value) => {
                                            console.log(value)
                                            props.setTimeSpeed(value)
                                        }}
                                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                    />


                            {viewSettings && (

                            <div>
                                <Divider/>
                                    
                                    <Button 
                                    className='toggle_button'
                                    toggle
                                        active = {props.radecGrid}
                                        onClick={()=> {props.setradecGrid((prev) => !prev)}}
                                        > celestial grid
                                    </Button>

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
                                <Divider/>
                            </div>
                            )}
                            <div className='small_text credit_text'>
                                credits | <button toggle
                                    className='default_button'
                                    active = {uiVisible}
                                    onClick={()=> {setuiVisible((prev) => !prev)}}
                                    > hide ui</button>
                                    <br/>

                                © <a href="https://nikitashtarkman.com/" target="_blank">Nikita Shtarkman </a>
                            </div>
                            
                        </div>

                    </Grid.Column >
                    <Grid.Column width={2}>
                    </Grid.Column>
                    <Grid.Column width={8}  style={{"textAlign": "center"}}>
                        <div className='small_text coordinate_text' style={{"textAlign": "center"}}>

                        {props.sectorValue == 0 && (
                            <>
                                {(props.distance/100.0).toFixed(0)} AU
                            </>
                        )
                        }
                        {props.sectorValue == 1 && (
                            <>
                                {(props.distance * 1.0/0.7 * 10.0).toFixed(0)} Parsecs
                            </>
                        )
                        }

                        {props.sectorValue == 2 && (
                            <>
                                {(props.distance).toFixed(0)} Mpc
                            </>
                        )
                        }
                        <br/>
                            {props.raDec[0].toFixed(1)} {props.raDec[1].toFixed(1)}
                        </div>

                        {true && (

                            <Button className='classic_icon'
                                    onClick={()=> {
                                        props.setCameraTarget([0, 0, 0])
                                    }
                                }>
                                    {/*
                                <img src='icons/Material_Symbol_Recenter_02.svg'/>
                                <br/>
                                    */}

                                <div className='small_text' style={{"textAlign": "center", "color": "var(--medium-grey)"}}>
                                    recenter
                                </div>
                            </Button>
                            )}

                        <div className='guidedSectionContainer'>
                            <button className='inline_button' onClick={()=> {
                                props.setGuidedSection(0)
                            }

                            }>
                                <img src='icons/left-thin.svg'/>
                            </button>
                            <div className='guided_text'>

                                {guidedData[props.guidedSection]["caption"]}
                            </div>

                            <button className='inline_button' onClick={ ()=>{

                                props.setGuidedSection(1)
                            }


                            }>
                                <img src='icons/right-thin.svg'/>
                            </button>
                        </div>

                    </Grid.Column>
                    <Grid.Column width={3} style = {{"textAlign": "right"}}>

                        {props.infoBoxShowing && (

                        <InformationBox setInfoBoxShowing = {props.setInfoBoxShowing}
                        infoBoxTitle = {props.infoBoxTitle}
                        
                        />
                    )}

                    </Grid.Column>

                    <Grid.Column width={1} floated= "right">

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
                </>

                )}
           

            </Grid>

        {!uiVisible && (

        <div className='show_ui_container'>

            <button toggle
                className='default_button'
                active = {uiVisible}
                onClick={()=> {setuiVisible((prev) => !prev)}}
            > show ui</button>
        </div>
        )}

        </>

    )


}
export default Overlay