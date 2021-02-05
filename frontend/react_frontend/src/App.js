import './App.css';
import ImageCards from './components/ImageCards';
import ImageMenu from './components/ImageMenu';
import React, { Component } from 'react';
import { BlendingModeEnum, FilterEnum, goodSearchTerms } from './enums.js';
import {v4 as uuid} from 'uuid';

class App extends Component {
  state = {
    cards: [
      {
        id: 1,
        term: 'Sunset Landscape',
        mode: BlendingModeEnum.NONE,
        filter: FilterEnum.NONE,
        opacity: 1,
        fadeOut: false,
        fadeIn: false
      },

      {
        id: 2,
        term: 'Fireworks',
        mode: BlendingModeEnum.SCREEN,
        filter: FilterEnum.NONE,
        opacity: 1,
        fadeOut: false,
        fadeIn: false
      },

      {
        id: 3,
        term: 'Gradient',
        mode: BlendingModeEnum.OVERLAY,
        filter: FilterEnum.NONE,
        opacity: 0.7,
        fadeOut: false,
        fadeIn: false
      }
    ],

    settings: {
      width: 1280,
      height: 1280,
      featured_only: true,
      generating: false,
      b64src: ""
    }
  }

  toggleFeatured = () => {
    this.setState({settings: { ...this.state.settings, featured_only: !this.state.settings.featured_only}})
  }

  randomizeTerms = () => {
    this.setState({ cards: this.state.cards.map(card => {
      card.term = goodSearchTerms[Math.floor(Math.random() * goodSearchTerms.length)];
      return card
    })})
  }

  randomizeModes = () => {
    this.setState({ cards: this.state.cards.map(card => {
      const vals = Object.values(BlendingModeEnum);
      card.mode = vals[Math.floor(Math.random() * vals.length)];
      return card
    })})
  }

  changeSize = (e) => {
    var width_change, height_change;
    width_change = height_change = 1280;
    if (e.target.value === "1024x768") {
      width_change = 1024;
      height_change = 768;
    } else if (e.target.value === "768x1024") {
      width_change = 768;
      height_change = 1024;
    } else if (e.target.value === "1600x900") {
      width_change = 1600;
      height_change = 900;
    } else if (e.target.value === "any") {
      width_change = 0;
      height_change = 0;
    }
    this.setState({settings: { ...this.state.settings, width: width_change, height: height_change}})
  }

  changeMode = (id, e) => {
    this.setState({ cards: this.state.cards.map(card => {
      if(card.id === id) {
        card.mode = e.target.value;
      }
      return card;
    })});
  }

  changeFilter = (id, e) => {
    this.setState({ cards: this.state.cards.map(card => {
      if(card.id === id) {
        card.filter = e.target.value;
      }
      return card;
    })});
  }

  changeTerm = (id, e) => {
    this.setState({ cards: this.state.cards.map(card => {
      if(card.id === id) {
        card.term = e.target.value;
      }
      return card;
    })});
  }

  changeOpacity = (id, e, newValue) => {
    this.setState({ cards: this.state.cards.map(card => {
      if(card.id === id) {
        card.opacity = newValue;
      }
      return card;
    })});
  }

  delCard = (id) => {
    console.log(id + " deleted");
    this.setState({ cards: [...this.state.cards.filter(card =>  (card.id !== id) || !card.fadeOut)]});
  }

  newCard = () => {
    const insertedCard = {
      id: uuid(),
      term: '',
      mode: BlendingModeEnum.NONE,
      filter: BlendingModeEnum.NONE,
      opacity: 1,
      fadeOut: false,
      fadeIn: true
    }
    this.setState({ cards: [...this.state.cards, insertedCard]})
  }

  generateImage = async () => {
    this.setState({settings: { ...this.state.settings, generating: true}})
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-type': 'applications/json'
      },
      body: JSON.stringify(this.state)
    })
    const string = await response.text();
    this.setState(state => {
      state.settings.b64src = string;
      return state;
    })
    this.setState({settings: { ...this.state.settings, generating: false}})
  }


  setFadeOut = (id) => {
    this.setState({ cards: this.state.cards.map(card => {
      if(card.id === id) {
        card.fadeIn = false;
        card.fadeOut = true;
      }
      return card;
    })});
  }

  render() {
    return (
      <div className="App">
          <h1 id="site-title">Image Masher</h1>
          <ImageCards 
            cards={this.state.cards} 
            changeMode={this.changeMode} 
            changeOpacity={this.changeOpacity}
            changeFilter={this.changeFilter}
            changeTerm={this.changeTerm}
            delCard={this.delCard}
            newCard={this.newCard} 
            setFadeOut={this.setFadeOut}/>
          <ImageMenu 
            settings={this.state.settings} 
            generateImage={this.generateImage}
            changeSize={this.changeSize}
            toggleFeatured={this.toggleFeatured}
            randomizeTerms={this.randomizeTerms}
            randomizeModes={this.randomizeModes}/>
      </div>
    )
  };
}

export default App;
