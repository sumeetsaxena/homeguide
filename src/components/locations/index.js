import React, { Component } from 'react';
import LocationEditor from "./locationeditor"

class Locations extends Component {
  render() {
    return (
      <div>
        <h1 className="text-left display-4">
          Locations&nbsp;<br/> <p className="lead">Edit locations you would like to edit. </p><hr/>
        </h1>
        <LocationEditor/>          
      </div>
    );
  }
}

export default Locations;
