import React, { useState } from 'react';
import { SizeEnum } from '../enums.js'
import FilerobotImageEditor from 'filerobot-image-editor';


export const ImageMenu = ({ settings, changeSize, generateImage, toggleFeatured, randomizeTerms, randomizeModes, is_featured }) => {
    const [editorShown, setEditorShown] = useState(false);
    return (
        <div>
            <div style={{width: "250px", height: "250px", float:"left", marginLeft:"20px", display:"flex", flexFlow: "wrap column", justifyContent: "space-evenly"}}>
                <select className="form-control selector" 
                    value={settings.width === 0 ? "any" : settings.width + "x" + settings.height} onChange={changeSize} 
                    style={{width: "200px", marginLeft:"8px"}}>

                    {Object.values(SizeEnum).map((size) => 
                        <option key={size} value={size}>{size}</option>
                    )}

                </select>
                <div className="form-check" style={{marginLeft: "10px", marginBottom: "5px"}}>
                    <input className="form-check-input" style={{marginTop: "10px"}} type="checkbox" value="" id="flexCheckChecked" checked={is_featured} onClick={toggleFeatured}/>
                    <label className="form-check-label" for="flexCheckChecked">
                        Include non-featured images
                    </label>
                </div>
                <button className="btn btn-secondary" style={{width:"auto"}} onClick={randomizeTerms}>Random Terms</button>
                <button className="btn btn-secondary" style={{width:"auto"}} onClick={randomizeModes}>Random Modes</button>
                <button className="btn btn-secondary" style={{width:"auto"}}
                    onClick={() => { setEditorShown(true) }}>Edit / Save</button>
                    {/* TODO: disable button until ajax returns */}
                <button className="btn btn-primary" onClick={generateImage}
                    style={{width:"auto", marginLeft:"8px"}} disabled={settings.generating}> {settings.generating ? "generating..." : "GENERATE"} </button>
            </div>
            <img 
                style={{maxWidth: '50%', height: 'auto', float: 'right', margin:"15px", marginRight:"50px", display:"inline-block"}} 
                src={'data:image/png;base64,'+settings.b64src}>
            </img>
            <FilerobotImageEditor
                show={editorShown}
                src={'data:image/png;base64,'+settings.b64src}
                onClose={() => { setEditorShown(false) }}
            />
        </div>
    )
}

export default ImageMenu;