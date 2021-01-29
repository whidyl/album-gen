import './App.css';
import ImageCards from './components/ImageCards';
import ImageMenu from './components/ImageMenu';
import React, { Component } from 'react';
import { BlendingModeEnum, FilterEnum } from './enums.js';
import {v4 as uuid} from 'uuid';


class App extends Component {
  state = {
    cards: [
      {
        id: 1,
        term: 'Sunset',
        mode: BlendingModeEnum.MULTIPLY,
        filter: FilterEnum.EDGE_DETECTOR,
        opacity: 1,
        fadeOut: false,
        fadeIn: false
      },

      {
        id: 2,
        term: 'Snow',
        mode: BlendingModeEnum.NONE,
        filter: FilterEnum.BLACK_AND_WHITE,
        opacity: 0.15,
        fadeOut: false,
        fadeIn: false
      }
    ],

    settings: {
      width: 1280,
      height: 1280,
      b64src: ""
    }
  }

  changeMode = (id, e) => {
    this.setState({ cards: this.state.cards.map(card => {
      if(card.id === id) {
        card.mode = e.target.value;
      }
      return card;
    })});
    console.log(this.state);
  }

  changeFilter = (id, e) => {
    this.setState({ cards: this.state.cards.map(card => {
      if(card.id === id) {
        card.filter = e.target.value;
      }
      return card;
    })});
    console.log(this.state);
  }

  changeTerm = (id, e) => {
    this.setState({ cards: this.state.cards.map(card => {
      if(card.id === id) {
        card.term = e.target.value;
      }
      return card;
    })});
    console.log(this.state);
  }

  changeOpacity = (id, e, newValue) => {
    this.setState({ cards: this.state.cards.map(card => {
      if(card.id === id) {
        card.opacity = newValue;
      }
      return card;
    })});
    console.log(this.state);
  }

  delCard = (id) => {
    console.log(id + " deleted");
    this.setState({ cards: [...this.state.cards.filter(card =>  (card.id !== id) || !card.fadeOut)]});
    console.log(this.state);
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
          <ImageMenu settings={this.state.settings} generateImage={this.generateImage}/>
      </div>
    )
  };
}

export default App;
