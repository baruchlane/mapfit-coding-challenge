import React, { Component } from 'react';
import LocationCardList from './LocationCardList';

export default class Mapfit extends Component {
  constructor(props) {
    super(props);
    this.apiEndpoint = 'https://api.mapfit.com/v1/geocode';
    //in a prod environment this would be hidden away
    this.apiKey = '591dccc4e499ca0001a4c6a4376d9e037bb8498a5d301c0f08a1f275';
    this.mapDOMId = 'map';
    this.state = {
      theme: 'day',
      popups: 'cardsOn',
      zoomEnabled: 'zoomPanOn',
      externalNav: 'extNavOff',
      points: []
    };

    this.drawMap = this.drawMap.bind(this);
    this.encodeMarker = this.encodeMarker.bind(this);
  }

  componentWillMount() {
    this.props.requests.forEach(request => {
      fetch(`${this.apiEndpoint}?api_key=${this.apiKey}`, {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(request)
      }).then(response => response.json()).then(points => {
        console.log('got points from api');
        this.setState({
          points: [...this.state.points, ...points]
        });
        console.log('set points from api');
      }).catch(e => {
        console.log('MooError ' + e);
      });
    })
  }


  render() {
    //if (this.state.points.length === 0) return null;
    console.log('rendering');
    return (
      <div className="row">
        <LocationCardList locations={this.state.points} />
        <div id="mapWrapper" className="col-sm-9">
          <div id={this.mapDOMId} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const {theme, popups, zoomEnabled, externalNav} = this.state;;
    console.log('drawing map');
    L.mapfit.drawmap(this.mapDOMId, theme, popups, zoomEnabled, externalNav, this.apiKey)
  }

  componentDidUpdate() {;
    if (this.state.points.length > 0) {
      console.log('drawing on map')
      this.drawMap(this.state.points.map(this.encodeMarker));
    }
  }

  encodeMarker(point, id = null) {
    return {
      id,
      location: `${point.city}, ${point.state} ${point.zip}`,
      cardData: {
        title: `Point ${id}`,
        subTitle1: point.address,
        subTitle2: `${point.city}, ${point.state} ${point.zip}`
      },
      markerUrl: 'arts'
    };
  }

  drawMap(markers) {
    console.log(markers);
    L.mapfit.addMarkers(markers, this.mapDOMId, this.state.theme);
  }
}