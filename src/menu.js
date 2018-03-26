import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from './components/about';
import Home from './components/home';
import MapView from './components/mapview';
import LocationManager from './components/locations';
import SettingsManager from './components/settings';

import svg_nav from './navigate.svg';
import svg_map from './road.svg';
import svg_loc from './location.svg';
import svg_set from './setting.svg';




export default class AppMenuBar extends React.Component {
    render(){
        return (
          <Router>
            <div>
        <header className="App-header">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">HomeGuide</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <Link className="nav-item nav-link" to="/home"><img className="nav-svg" alt="Traffic Analysis" src={svg_nav}/>&nbsp;Traffic</Link>
                <Link className="nav-item nav-link" to="/maps"><img className="nav-svg" alt="Map View" src={svg_map}/>&nbsp;Map View</Link>
                <Link className="nav-item nav-link" to="/locations"><img className="nav-svg" alt="Locations Management" src={svg_loc}/>&nbsp;Locations</Link>
                <Link className="nav-item nav-link" to="/settings"><img className="nav-svg" alt="Settings" src={svg_set}/>&nbsp;Settings</Link>
                </div>
              </div>
            </nav>
          </header>
          <Switch>
            <Route exact path="/"  component={About}/>
            <Route path="/home"  component={Home}/>
            <Route path="/maps"  component={MapView}/>
            <Route path="/locations"  component={LocationManager}/>
            <Route path="/settings"  component={SettingsManager}/>
          </Switch>                     
          </div>
          </Router>
        )
    }
}