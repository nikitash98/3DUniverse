import ReactSlider from 'react-slider';
import "./ContentSlider.css"
const ContentSlider = (props) => {

    const sectorTitles = ["Earth", "Milky Way", "Galactic"]
    return (
        <>

                <ReactSlider
                            min={0}
                            max={99}
                            step={1}
                            value={props.distance/10000 * 1.0/3.0 + props.sectorValue * 100.0/3.0 }
                            onChange={(value)=> {
                                let s_value = Math.round(value/33.33)
                                props.setSectorValue(s_value)
                                props.setCameraPosition(previousPosition => [(value - s_value * 33.33) * 10000 *3.0, 0 , 0])
                            }
                            }
                            marks = {33}
                            renderMark={(props) => {
                                
                                /*
                                let tick_class = "tick_label_top small_type"
                                if(Math.floor(props.key/mul > Math.floor(convertCounter(val, show, mul)/mul))) {
                                    props.className = "customSlider-mark selected_mark"
                                    tick_class = "tick_label_top small_type  selected_tick"
                                } 
                                if(props.key == show.length * mul) {
                                    props.className = "customSlider-mark end_mark"
                                }
                                return <span {...props}  onMouseEnter={()=>{setSliderHover(props.key)}} onMouseLeave={()=> {setSliderHover(null)}}>
                                    <div className={tick_class} >
                                        {slides[show_two[Math.floor(props.key/mul)]]["title"]}
                                    </div>
                                </span>;
                                */
                               return <>

                                        <div {...props} className='slider_label_text '>
                                            {sectorTitles[props.key/33]} 
                                        </div>

                                <div {...props} key={props.key + 1}>
                                </div>
                               </>
                            }}
                            className="customSlider"
                            trackClassName="customSlider-track"
                            thumbClassName="customSlider-thumb"
                            markClassName="customSlider-mark"
                            orientation="vertical"
                    />
        </>
    )
}
export default ContentSlider;