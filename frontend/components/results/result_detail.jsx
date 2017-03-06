import React from 'react'
import {withRouter, Link } from 'react-router';

class ResultDetail extends React.Component{
   constructor(props){
    super(props);
  }

  render(){
    let {businessName, individualBusiness} = this.props;
    let addressLink = `http://maps.google.com/?q=${individualBusiness.address}`

    let address;
    let phoneNumber = individualBusiness.phone
    let s2 = (""+ phoneNumber.substring(2, phoneNumber.length)).replace(/\D/g, '');
    let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    let formattedPhone =  (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];


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
          <p>{formattedPhone}</p><br/> 
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