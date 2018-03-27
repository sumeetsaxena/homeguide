import React from "react"
import { inject, observer } from "mobx-react"
//import { width } from "window-size";


class LocationEditor extends React.Component {
  constructor(){
    super();
    this.state={
      id:0,
      loc_title:"",
      loc_address:"",
      loc_is_house:false,
      loc_is_active:true,
      error_message:""
    }
  }

  save() {
    if (this.state.loc_title===""||this.state.loc_address==="")
    {
      this.setState({error_message:"Title and Address are mandatory"});
    }else{
      if(this.state.id===0){
        this.props.LocationStore.createLocation(this.state.loc_title,this.state.loc_address, this.state.loc_is_house);
      }else{
        this.props.LocationStore.updateLocation(this.state.id,this.state.loc_title,this.state.loc_address, this.state.loc_is_house);        
      }
      this.setState({
        id:0,
        loc_title:"",
        loc_address:"",
        loc_is_house:false,
        loc_is_active:true,
        error_message:""
      });
    }
  }

  load_location(id){
    const location=this.props.LocationStore.getLocation(id);

    this.setState({
      id:location.id,
      loc_title:location.title,
      loc_address:location.address,
      loc_is_house:location.is_home,
      loc_is_active:location.is_active,
      error_message:""
    });
  }

  change_field(e){
    this.setState({
    [e.target.name]:e.target.value,error_message:""});
  }

  render() {
    const { removeLocation, flipLocation,toggleActive, locations } = this.props.LocationStore;

    const location_list = locations.map(loc => {

        return (
          <div key={loc.id} className={loc.is_home?"card mb-3 border-primary":"card mb-3"}>
            <div className={loc.is_active?"card-body":"card-body card-inactive"}>
              <h3 className="card-title">{loc.title}</h3>
              <p className="card-text">{loc.address}</p>
            </div>
            <div className="card-footer">
                <div className="btn-group" role="group" >
                  <button onClick={flipLocation.bind(this.props.LocationStore,loc.id)}  type="button" className="btn">
                  <img style={{"maxWidth":"2em","height":"auto"}} className="img-fluid" alt="Home Toggle" src={loc.is_home?"./icons8-home.png":"./icons8-region_code.png"}/>
                  </button>
                  <button type="button" className="btn btn-warning" onClick={this.load_location.bind(this,loc.id)}>
                    <img style={{"maxWidth":"2em","height":"auto"}} className="img-fluid"  alt="Edit Location" src="./icons8-edit.png"/>
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={toggleActive.bind(this.props.LocationStore,loc.id)}>
                    <img style={{"maxWidth":"2em","height":"auto"}} className="img-fluid"  alt="Edit Location" src={loc.is_active?"./icons8-visible.png":"./icons8-invisible.png"}/>
                  </button>
                  <button type="button" className="btn btn-danger" onClick={removeLocation.bind(this.props.LocationStore,loc.id)} >
                    <img style={{"maxWidth":"2em","height":"auto"}} className="img-fluid" alt="Delete Location" src="./icons8-cancel.png"/>
                  </button>
                </div>              
              </div>            
          </div>          
          );
    })
    var error_message;
    if (this.state.error_message==="")
      error_message=(<span/>);
    else
      error_message=(<div className="alert alert-danger" role="alert"> {this.state.error_message}</div>);

    const location_form=(<div className="card">
      <div className="card-body"> 
        <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
          </div>
          <input name="loc_title" type="text" className="form-control" onChange={e=> this.change_field(e)} placeholder="Title" value={this.state.loc_title}/>
        </div>
        <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">Address</span>
          </div>
          <input name="loc_address" type="text" className="form-control" onChange={e=> this.change_field(e)} placeholder="Address" value={this.state.loc_address}/>
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input onChange={e=> this.setState({loc_is_house:e.target.value})} type="checkbox" checked={this.state.loc_is_house} aria-label="Checkbox for following text input"/>
            </div>
          </div>
          <div className="input-group-append">
            <span className="input-group-text"  id="inputGroup-sizing-sm">Home?</span>
          </div>                  
        </div>            
      </div>
      <div className="card-footer">
        <button type="submit" className="btn btn-primary" onClick={this.save.bind(this)}>{this.state.id>0?"Update":"Add"}</button>          
      </div>
    </div>);

    return (
          <div className="card-columns">
            {error_message}
              {location_form}      
              {location_list}
          </div>
      );
  }
}

export default inject('LocationStore')(observer(LocationEditor));