import React from 'react';
import {Link, withRouter} from 'react-router';
// For a Chrome Extension, you should be using a hash or memory history. 
// You'll run into problems otherwise.

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       nameQuery: "",
       locationQuery: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property){
  	return e => this.setState({[property]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
  }


  render(){
    let {tracktlists} = this.props;
  	let {title, artists, index_image_url, user_id, playlistUrl} = this.state;


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
          placeholder="ex: Burma Superstar"
          onChange={this.update('nameQuery')} />

        <p className="search-instructions">is <span className="pacifico open-fade">open</span> </p>
  
        <br />

        <input type="radio"
               className="currentLocation"
               name='searchOption'
               value="currentLocation"/> Current location <br/>        
          <p
            className="reveal-if-active-2">Easy peasy, we'll geolocate you.</p>
         <input 
               type="radio"
               className="cityInput"
               name='searchOption'
               value="citySearch"/> Find results near: <br/>

         <input 
          className="standard-input-field reveal-if-active"
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