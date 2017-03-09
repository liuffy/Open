import React from 'react';
import {Link, withRouter} from 'react-router';


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       nameQuery: "",
       locationQuery: "",
       position: "",
       lat:"",
       lng:"",
       citySearch:false,
       failMessage:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property){
    return e => this.setState({[property]: e.target.value});
  }

  componentDidMount() {

    let {citySearch, failMessage} = this.state;
    
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({position});

        },
          
        (error) => {
          this.setState({citySearch: true})
          this.setState({failMessage: "Geolocation currently unavailable"})
          document.getElementById('search_city_button').checked = true
        },
                
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      
    } else {
      console.log('Geolocation seems to be down right now.')
    }
 
  }

  handleSubmit(e) {
    let struggleText = "";
    e.preventDefault();
    let {nameQuery, locationQuery, position, lat, lng, citySearch} = this.state; // What we're actually typing into the form
    let {createLocalResults, createCityResults} = this.props;

    if (document.getElementById('current_location_button').checked && position !== ""){
      lat = position.coords.latitude;
      lng = position.coords.longitude;
    
        createLocalResults(nameQuery, lat, lng)
        this.props.router.push(`/results`)
    }else if (locationQuery.length > 0 && nameQuery.length > 0 && document.getElementById('search_city_button').checked){
       createCityResults(nameQuery, locationQuery)
       this.props.router.push(`/results`)
    } else {
      struggleText = "One or more fields missing :-("
    }
  }


  render(){
    let {nameQuery, locationQuery, position, lat, lng, citySearch, failMessage} = this.state;

    let button;
    if (citySearch === true || position !== "" || locationQuery !== ""){
      button = <button className="search-button">check</button>
    } else {
       button = <p className="calculating">Calculating your location...</p>
               
    }

    let failMes;
    if (citySearch === true){
      failMes = <p className="failure-message">{failMessage}</p>
    } else {
      failMes = <div></div>
    }

    return(

      <div>

        <form
          className = "search-form"
          onSubmit = {this.handleSubmit}>
        <br />

        <p className="search-instructions">I want to know if </p>

       <input 
          className="standard-input-field main-search"
          type='text'
          placeholder="ex: Burma Superstar, tacos, CVS"
          onChange={this.update('nameQuery')} />

        <p className="search-instructions">is <span className="pacifico open-fade">open</span> </p>
  
        <br />

        <input type="radio"
              id="current_location_button"
               className="currentLocation"
               name='searchOption'
               value="currentLocation" defaultChecked /> Current location <br/>        
          <p
            className="reveal-if-active-2">Easy peasy, we'll geolocate you</p>
         <input 
               type="radio"
               id="search_city_button"
               className="cityInput"
               name='searchOption'
               value="citySearch"/> Enter location (address, street, or city) <br/>

         <input 
          className="standard-input-field locationQuery reveal-if-active"
          type='text'
          placeholder="ex: Webster St, Oakland"
          onChange={this.update('locationQuery')} />

       {button}
       {failMes}
        </form>
      </div>

    )
  }

}

export default withRouter(SearchForm);