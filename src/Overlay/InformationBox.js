import "./InformationBox.css"
import { Button, Divider, Grid, Radio } from 'semantic-ui-react';
import { useEffect, useState } from "react"
const InformationBox = (props) => {


    return  <div className='informationBoxContainer'>
                <button className="close_button" onClick={()=>props.setInfoBoxShowing(false)}>
                    <img src={"icons/Close_Icon.svg"}/>
                </button>
                <div className="  informationBoxHeader">
                    <h1>
                        {props.infoBoxTitle}
                    </h1>
                </div>

                <div className="informationBoxData">
                    <Grid>
                        <Grid.Column width={4}>
                            <p>
                                14.0
                            </p>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <p>
                                255
                            </p>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <p>
                                12 AU
                            </p>
                        </Grid.Column>

                    </Grid>
                </div>

                <div className="informationBoxImageContainer">
                    <img src={"Info_Images/NASA_sun.jpg"}/>
                </div>

                <div className="informationBoxImageCaption">
                    Testing caption text
                </div>

                <Divider/>

                <div className="informationBoxTextContiainer">
                    <div className="small_text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
        </div>
}

export default InformationBox