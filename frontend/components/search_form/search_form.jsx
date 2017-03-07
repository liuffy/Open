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
       lng:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property){
  	return e => this.setState({[property]: e.target.value});
  }

  componentDidMount() {
 
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
        console.log(position)

      },
 
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
 
  }

  handleSubmit(e) {

    let struggleText = "";
    e.preventDefault();
    let {nameQuery, locationQuery, position, lat, lng} = this.state; // What we're actually typing into the form
    let {createLocalResults, createCityResults} = this.props;


    if (document.getElementById('current_location_button').checked && position !== ""){
        console.log('cmon lat', lat)
      console.log('cmon lng', lng)
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
    let {tracktlists} = this.props;
  	let {nameQuery, locationQuery} = this.state;

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
          // value={nameQuery}
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
               value="citySearch"/> Near (address, street, or city): <br/>

         <input 
          className="standard-input-field locationQuery reveal-if-active"
          type='text'
          // value={locationQuery}
          placeholder="ex: Webster St, Oakland"
          onChange={this.update('locationQuery')} />

        <button
        className="search-button">check</button>
             
        </form>
      </div>

    )
  }

}

export default withRouter(SearchForm);