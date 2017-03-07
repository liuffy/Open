import React from 'react'
import {withRouter, Link } from 'react-router';

class ResultDetail extends React.Component{
   constructor(props){
    super(props);
  }

  weekify(dayNum) {
    if (dayNum === 1) {
      return "Mon"
    } else if (dayNum === 2) {
      return "Tues"
    } else if (dayNum === 3) {
      return "Wed"
    } else if (dayNum === 4) {
      return "Thurs"
    } else if (dayNum === 5) {
      return "Fri"
    } else if (dayNum === 6) {
      return "Sat"
    } else if (dayNum === 0) {
      return "Sun"
    }
  }

  amOrPm(hour){
    if (hour/100 < 12 || hour/100 === 24){
      return 'AM'
    } else {
      return 'PM'
    }
  }

  twelveHourFormat(num){

    let newHour;
    newHour = (num/100 > 13) ? num - 1200 : num;
    return newHour;
  }

  addSemiColon(num){
    var semi = ":";
    let numString = num.toString()
    var position = numString.length - 2
    var newString = [numString.slice(0, position), semi, numString.slice(position)].join('');

    return newString;
  }

  render(){

    let {businessName, individualBusiness} = this.props;

    let openClass;
    
    if (individualBusiness.openOrNot === "Closed"){
      openClass = "pacifico-big-closed";
    } else if (individualBusiness.openOrNot === "Open"){
      openClass = "pacifico-big-open";
    } else {
      openClass = "pacifico-big-not-available";
    }

    let closeToOpenClass;

    let addressLink = `http://maps.google.com/?q=${individualBusiness.address}`

    let address;

    // Format phone number
    let formattedPhone;

    if (individualBusiness.phone.length < 5){
      formattedPhone = "Not available"
    } else {
      let phoneNumber = individualBusiness.phone;
      let s2 = (""+ phoneNumber.substring(2, phoneNumber.length)).replace(/\D/g, '');
      let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
      formattedPhone =  (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
    }


    let timeRemaining;
    let hoursOrMinutes;
    let ifTomorrow;
    let dayOfWeek;

    // CURRENT TIME - use to calculate upcoming closing time or opening time
    let currentDate = new Date(); // current time with date included
    let currentDay = currentDate.getDay();
    let currentHour = currentDate.getHours(); // => 9
    let currentMinutes = currentDate.getMinutes(); // =>  30
    let currentTime = Number(currentHour.toString()+currentMinutes.toString())

// CLOSED 
    let timeStatement;
    let closingTimeToday;
    let openingTimeToday;

    if (individualBusiness.openOrNot !== "n/a"){
      if (individualBusiness.hours.hasOwnProperty(currentDay)){
        closingTimeToday = individualBusiness.hours[currentDay][1]
        openingTimeToday = individualBusiness.hours[currentDay][0]
      }
    }

// ...until sometime later today
if (individualBusiness.openOrNot === "Closed" && currentTime < openingTimeToday) {
  let openingTime = this.addSemiColon(this.twelveHourFormat(openingTimeToday))
  let amOrPm = this.amOrPm(openingTimeToday)

      timeStatement = `until ${openingTime} ${amOrPm} today (patience is a virtue!)`
//  ... until the NEXT DAY

} else if (individualBusiness.openOrNot === "Closed" && (!closingTimeToday || currentTime > closingTimeToday)){
        let nextOpenDay;
        let hours = individualBusiness.hours;

        // If we're at the end of the week, restart
        let startingNum = (currentDay === 6) ? 0 : currentDay + 1

// - First, gotta iterate through the hours object and find the next day it will be open
        for (let i =  startingNum; i < 7; i++) { 

          if (hours[i]){
            nextOpenDay = i;
            break
          }
    } 
    let weekifiedDay = this.weekify(nextOpenDay)
    let tomorrowOrNot = (nextOpenDay === currentDay + 1)  ? 'tomorrow,' : '';
    let nextStartTime = individualBusiness.hours[nextOpenDay][0].toString();
    let formattedStart = this.addSemiColon(this.twelveHourFormat(nextStartTime))
    let amOrPm = this.amOrPm(nextStartTime)
    timeStatement = `until ${formattedStart} ${amOrPm} ${tomorrowOrNot} ${weekifiedDay}`

  // OPEN
} else if (individualBusiness.openOrNot === "Open" &&  
                        individualBusiness.hours[currentDay][0] === individualBusiness.hours[currentDay][1]){ // 24 hrs
  timeStatement = 'all day (24 hours) today!'
} else if (individualBusiness.openOrNot === "Open") { // less than 24 hrs
    let formattedEnd = this.addSemiColon(this.twelveHourFormat(closingTimeToday))
    let amOrPm = this.amOrPm(closingTimeToday)
    timeStatement = `until ${formattedEnd} ${amOrPm}`
} else {
  timeStatement = '(info on hours currently unavailable)'
}





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
          <p className="search-instructions results-text business-name">{individualBusiness.name} is </p>
          <p className={openClass}>{individualBusiness.openOrNot}</p>
          <p className="search-instructions results-text">{timeStatement}</p>
              </div>
       <div className="technical-details">
        <div className="phone-side">
          <img className="icon"src = '../../../assets/images/phone_vector_small.png'/>
          <p>{formattedPhone}</p><br/> 
        </div>

        <div className="address-side">
        <img title="Click address to open in Google Maps" alt="Click address to open in Google Maps" className="icon"src = '../../../assets/images/pin_vector_small.png'/>
          {address}
        </div>
        </div>
      </div>
      )
  }
}

export default ResultDetail;