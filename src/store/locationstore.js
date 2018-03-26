import { computed, observable } from "mobx"

class Location {
  @observable id
  @observable title
  @observable address
  @observable is_home
  @observable is_active


  constructor(title,address,is_home,is_active) {
    this.id = Date.now();
    this.title = title;
    this.address = address;
    this.is_home = (is_home===true||is_home==='true'||is_home==='on'||is_home==='ON')?true:false;
    this.is_active=(is_active===true||is_active==='true'||is_active==='on'||is_active==='ON')?true:false;
  }
}

export class LocationStore {
  @observable locations = [];
  @observable checkpoint = Date.now();

  constructor()
  {
    this.load();
  }

  save()
  {
    if (typeof(Storage) !== "undefined") {
      this.checkpoint = Date.now();      
      localStorage.setItem("locations",JSON.stringify(this.locations));
      localStorage.setItem("checkpoint",this.checkpoint);
    }
  }

  load()
  {
    if (typeof(Storage) !== "undefined"){
      const locations_json=localStorage.getItem("locations");
      const checkpoint=localStorage.getItem("checkpoint");
      if ((this.locations.length===0) && (locations_json!==null))
        this.locations=JSON.parse(locations_json);
      if (checkpoint!=null)
        this.checkpoint=checkpoint;
    }
  }

  @computed get destinations() {
    const destinations = this.locations.filter(location => location.is_home===false && (typeof location.is_active==="undefined" || location.is_active===true));
    
    return destinations;
  }

  @computed get homes(){
    const homes = this.locations.filter(location => location.is_home===true && (typeof location.is_active==="undefined" || location.is_active===true));
    
    return homes;
  }

 getLocation(id){
    const idx=this.locations.findIndex(loc => loc.id===id);
    if (idx>-1){
      return this.locations[idx];
    }else
      return null;
  }

  removeLocation(id) {
    console.log("ID"+id);
    const selectedLocations = this.locations.filter(location => location.id!==id);
    console.log("selectedLocations"+selectedLocations.length);
    this.locations.replace(selectedLocations);
    this.save();
  }

  flipLocation(id) {
    const idx=this.locations.findIndex(loc => loc.id===id);
    if (idx>-1){
      this.locations[idx].is_home=!this.locations[idx].is_home ;
    }
    this.save();
  }

  toggleActive(id){
    console.log("ID"+id);
    const idx=this.locations.findIndex(loc => loc.id===id);
    if (idx>-1){
      if (typeof(this.locations[idx].is_active)==="undefined")
      this.locations[idx].is_active=true;
      var is_active=this.locations[idx].is_active;
      is_active=(is_active===true||is_active==='true'||is_active==='on'||is_active==='ON')?true:false
      this.locations[idx].is_active=!is_active;
    }
    this.save();    
  }  

  createLocation(title,address,is_home,is_active) {
    this.locations.push(new Location(title,address,is_home,is_active));
    this.save();
  }
  updateLocation(id,title,address,is_home) {
    const idx=this.locations.findIndex(loc => loc.id===id);
    if (idx>-1){    
      this.locations[idx].title=title;
      this.locations[idx].address=address;
      this.locations[idx].is_home=is_home;
    }
    this.save();    
  }
}
const locationStore=new LocationStore();
export default locationStore;

