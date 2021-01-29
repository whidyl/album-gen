import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { BlendingModeEnum, FilterEnum } from '../enums.js'
import capitalizeFirstLetter from '../utils.js'
import { Slider, Typography } from '@material-ui/core';

export class ImageCard extends Component {

    render() {
        const { id, mode, filter, term, opacity, fadeOut, fadeIn } = this.props.card;
        return (
            //fade classNames are to trigger CSS animation.
            <div className={"image-card card " + (fadeOut ? 'fade-out' : '') + (fadeIn ? 'fade-in' : '')} 
                onAnimationEnd={this.props.delCard.bind(this, id)}>
                {/* Header contains image search term and remove button */}
                <div className="card-header">
                    <div className="form-inline">
                        <div className="col-xs-3">
                            <input type="search" value={term} className="form-control rounded" placeholder="Search term" aria-label="Search" aria-describedby="search-addon" 
                                onChange={this.props.changeTerm.bind(this, id)}/>
                        </div>
                        <button className="btn btn-secondary" onClick={this.props.setFadeOut.bind(this, id)}>x</button>
                    </div>
                </div>
                
                <div className="card-body">
                    
                        {/* Mode selection */}
                        <div className="form-row form-group form-inline">
                            <Typography variant='subtitle1'> Mode</Typography>
                            <select className="form-control selector" value={mode} 
                                    onChange={this.props.changeMode.bind(this, id)}>

                                {Object.values(BlendingModeEnum).map((mode) => 
                                    <option key={mode} value={mode}>{capitalizeFirstLetter(mode)}</option>
                                )}

                            </select>
                        </div>

                        {/* Filter selection */}
                        <div className="form-row form-group form-inline">
                        <Typography>Filter</Typography>
                            <select className="form-control selector" value={filter} 
                                    onChange={this.props.changeFilter.bind(this, id)}>

                                {Object.values(FilterEnum).map((filter) => 
                                    <option key={filter} value={filter}>{capitalizeFirstLetter(filter)}</option>
                                )}

                            </select>
                        </div>

                        <div className="form-row form-group form-inline">
                            <Typography variant="subtitle1">Opacity</Typography>
                            <Slider value={opacity} max={1} min={0} step={0.01} scale={(x) => x*100}
                                onChange={this.props.changeOpacity.bind(this, id)}/>
                        </div>
                    
                </div>

            </div>
        )
    }
}

ImageCard.propTypes = {
    card: PropTypes.object.isRequired
}
export default ImageCard
