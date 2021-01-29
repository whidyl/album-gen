import React, { useState } from 'react';
import { SizeEnum } from '../enums.js'
import { Magnifier } from "react-image-magnifiers";
import FilerobotImageEditor from 'filerobot-image-editor';


export const ImageMenu = ({ settings, changeSize, generateImage }) => {
    const [editorShown, setEditorShown] = useState(false);
    return (
        <div>
            <div style={{width: "200px", height: "230px", float:"left", marginLeft:"20px", display:"flex", flexFlow: "wrap column", justifyContent: "space-evenly"}}>
                <select className="form-control selector" value={settings.width + "x" + settings.height} onChange={changeSize} 
                    style={{width: "200px", marginLeft:"8px"}}>

                    {Object.values(SizeEnum).map((size) => 
                        <option key={size} value={size}>{size}</option>
                    )}

                </select>
                <button className="btn btn-secondary" style={{width:"auto"}}>Random Terms</button>
                <button className="btn btn-secondary" style={{width:"auto"}}>Save Preset</button>
                <button className="btn btn-secondary" style={{width:"auto"}}
                    onClick={() => { setEditorShown(true) }}>Edit / Save</button>
                    {/* TODO: disable button until ajax returns */}
                <button className="btn btn-primary" onClick={generateImage}
                    style={{width:"auto", marginLeft:"8px"}}>GENERATE</button>
            </div>
            <div className="image-container" style={{margin:"15px", marginRight:"50px", width: settings.width/2+"px", height: settings.height/2+"px", display:"inline-block", float:"right"}}>
                {/* <Magnifier style={{height: settings.height/2+"px", width: settings.width/2+"px"}}
                imageSrc={'data:image/png;base64,'+settings.b64src}
                dragToMove={false}/> */}
                <img src={'data:image/png;base64,'+settings.b64src}></img>
            </div>
            <FilerobotImageEditor
                show={editorShown}
                src={'data:image/png;base64,'+settings.b64src}
                onClose={() => { setEditorShown(false) }}
            />
        </div>
    )
}

export default ImageMenu;