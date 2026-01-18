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