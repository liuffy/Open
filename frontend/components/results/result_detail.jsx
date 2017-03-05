import React from 'react'
import {withRouter, Link } from 'react-router';

class ResultDetail extends React.Component{
   constructor(props){
    super(props);
  }

  render(){
    let {businessName, individualBusiness} = this.props;
    return (
      <div className="result-detail">
      <h1>Hi! Welcome to {individualBusiness.name}</h1>
      </div>
      )
  }
}

export default ResultDetail;