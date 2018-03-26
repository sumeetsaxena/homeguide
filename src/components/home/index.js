import React, { Component } from 'react';
import { inject,observer } from "mobx-react";
import TrafficMap from "./trafficmap";
import TimePicker from "./timepicker";

@inject('LocationStore')
@observer
class Home extends Component {
  constructor(){
    super();
    this.state={
      traffic_map:null,
      drive_time:"8 am"
    };    
  }

  clickMap(){
    var that=this;

    const homes=this.props.LocationStore.homes;    
    const destinations=this.props.LocationStore.destinations;    
    
    const homesURL=homes.map(element => encodeURIComponent(element.address)).join('|');
    const destinationsURL=destinations.map(element => encodeURIComponent(element.address)).join('|');

    fetch('/api?destinations='+destinationsURL+'&origins='+homesURL+'&units=imperial')
    .then((response)=>{
      if (response.ok)
      {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })   
    .then((data)=>{
      console.log("Recieved Map-Data", data);
      that.setState({
        traffic_map : data
      });
    });
  }


  timeChange(time){
    this.setState({drive_time:time});
  }  

  render() {
    return (
      <div>
        <h1 className="text-left display-4">
          Traffic Analysis&nbsp;<br/> <p className="lead">Manage your home choices, and your frequently visited places. </p><hr/>
        </h1>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button type="button" style={{minWidth:"150px"}} className="btn btn-outline-secondary">{this.state.drive_time}</button>
            <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="sr-only">Toggle Dropdown</span>
            </button>
            <div className="dropdown-menu">
              <TimePicker onTimeChange={this.timeChange.bind(this)}/>
            </div>
          </div>     
          <div className="input-group-append">
            <button className="btn btn-success" type="button" onClick={this.clickMap.bind(this)}>Retrieve</button>
          </div>
        </div>
        <TrafficMap traffic_map={this.state.traffic_map}/>
      </div>
    );
  }
}

export default Home;
