import React from 'react'
import {withRouter, Link } from 'react-router';

class ResultDetail extends React.Component{
   constructor(props){
    super(props);
  }

  render(){
    console.log('current path:', this.props.location.pathname)
    let {businessName, individualBusiness} = this.props;
    let addressLink = `http://maps.google.com/?q=${individualBusiness.address}`

    let address;
    // Opens up address to Google map

    if (individualBusiness.address){
      address = <a href={addressLink}
              target="_blank">{individualBusiness.address.split(',').map(function(item, key) {
                return (
                  <span key={key}>
                    {item}
                    <br/>
                  </span>
                )
              })}</a>
    } else {
      address = "Not available"
    }
    return (
      <div className="result-detail">
        <Link 
            className="results-button"
            to={'/results'}>back to results</Link><br/>

        <Link 
            className="search-button detail right-detail"
            to={'/'}>new search </Link><br/>

        <div className="big-results-text"><br/>
          <p className="search-instructions results-text">{individualBusiness.name} is </p>
          <p className="pacifico open-big">{individualBusiness.openOrNot}</p>
          <p className="search-instructions results-text">for 4 minutes</p>
              </div>
       <div className="technical-details">
        <div className="phone-side">
          <p >{individualBusiness.phone}</p><br/> 
        </div>

        <div className="address-side">
          {address}
        </div>
        </div>
      </div>
      )
  }
}

export default ResultDetail;