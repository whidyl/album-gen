import React, { Component } from 'react';
import ImageCard from './ImageCard';
import PropTypes from 'prop-types';

class ImageCards extends Component {

    render () {
        return ( 
            <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "flex-start", 
                paddingBottom: "15px", backgroundColor: "lightgray", boxShadow: "inset 5px 3px 27px 10px rgba(0,0,0,0.25)",
                margin:"15px", borderRadius: "10px", minHeight: "315px"}}>
            {this.props.cards.map((card) => (
                <ImageCard 
                    key={card.id} 
                    card={card} 
                    changeMode={this.props.changeMode}
                    changeFilter={this.props.changeFilter}
                    changeOpacity={this.props.changeOpacity}
                    changeTerm={this.props.changeTerm}
                    setFadeOut={this.props.setFadeOut}
                    delCard={this.props.delCard}
                    />
            ))}
            <button className="btn btn-dark" onClick={this.props.newCard} disabled={this.props.cards.length >= 8}>+</button>
            </div>
        );
    }
}

ImageCards.propTypes = {
    cards: PropTypes.array.isRequired
}

export default ImageCards