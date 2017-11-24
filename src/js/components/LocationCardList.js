import React, { Component } from 'react';
import LocationCard from './LocationCard';

class LocationCardList extends Component {
  render() {
    const locationCards = this.props.locations.map((location, i) => (
      <LocationCard key={i} {...location} />
    ));
    return (
      <div id="sidebar" className="col-sm-3">
        <h4>Our Locations</h4>
        <div className="list-group">
          <a href="#" className="list-group-item prev">
            <strong>See Previous Five</strong>
          </a>
          {locationCards}
          <a href="#" className="list-group-item next active">
            <strong>See Next Five</strong>
          </a>
        </div>
      </div>
    );
  }
}

export default LocationCardList;