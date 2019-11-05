import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      beers: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch ('https://api.punkapi.com/v2/beers')
    .then(response => response.json())
    .then(parsedJSON => parsedJSON.map(beer => ({
      name: `${beer.name}`,
      tagline: `${beer.tagline}`,
      abv: `${beer.abv}`,
      ibu: `${beer.ibu}`,
    })))
    .then(beers => this.setState({
      beers,
      isLoading: false
    }))
    .catch(error => console.log("parsing failed", error))
    }

  render() {
    const {isLoading, beers} = this.state;
    return (
      <div className="whole-page">
        <header>The Best Beers</header>
        <div className={`content ${isLoading ? 'is-loading' : ''}`}>
          <div className="beer-info">
            {
              !isLoading && beers.length > 0 ? beers.map(beer => {
                const {name, tagline, abv, ibu} = beer;
                return <div key={beer} title={name}>
                  <p className="name-line">{name} <button onclick="likeClicked()" className="like-button">Like</button></p>
                  <p className="tagline-line"> {tagline}</p>
                  <p className="abv-line"> {abv}</p>
                  <p className="ibu-line"> {ibu}</p>
                  <br></br>
                  </div>
              }) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App;