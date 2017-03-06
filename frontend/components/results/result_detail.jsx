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
    if (hour/100 < 12){
      return 'AM'
    } else {
      return 'PM'
    }
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


    let addressLink = `http://maps.google.com/?q=${individualBusiness.address}`

    let address;

    // Format phone number
    let phoneNumber = individualBusiness.phone;
    let s2 = (""+ phoneNumber.substring(2, phoneNumber.length)).replace(/\D/g, '');
    let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    let formattedPhone =  (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];

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
    console.log(currentTime)

//  CLOSED 
    let timeStatement;
    let closingTimeToday;
    
    if (individualBusiness.hours.hasOwnProperty(currentDay)){
      closingTimeToday = individualBusiness.hours[currentDay][1]
    }

    console.log('Closing time:', closingTimeToday)

//  .... until the NEXT DAY
                                                    // There is no closing time b/c it's been closed the whole day
    if (individualBusiness.openOrNot === "Closed" && (!closingTimeToday || currentTime > closingTimeToday) ){
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
    let tomorrowOrNot = (nextOpenDay === currentDay + 1)  ? 'tomorrow' : '';
    let nextStartTime = individualBusiness.hours[nextOpenDay][0].toString();
    let formattedStart = this.addSemiColon(nextStartTime)
    let amOrPm = this.amOrPm(nextStartTime)
    timeStatement = `until ${formattedStart} ${amOrPm} ${tomorrowOrNot}, ${weekifiedDay}`
    }



// - until a later hour in the same day 


// OPEN
// - until the end of the day
    // let closingTimeToday = individualBusiness.hours[endHour][1].toString();
// - until the next morning (overnight)



    
//     // We have the time now. 
//     let openingTime;
//     let openingHour;




//     let startHour;
//     let startMinute;

//     let endHour;
//     let endMinute;

//     if (nextStartTime.length > 3){
//       startHour = Number(nextStartTime.substring(0,2))
//       startMinute = Number(nextStartTime.substring(2,4))
//       endHour = Number(closingTimeToday.substring(0,2))
//       endMinute = Number(closingTimeToday.substring(2,4))
//     } else {
//       startHour = Number(nextStartTime.substring(0,1))
//       startMinute = Number(nextStartTime.substring(1,3))      
//       endHour = Number(closingTimeToday.substring(0,1))
//       endMinute = Number(closingTimeToday.substring(1,3))
//     }


//     let amOrPm;

//     if (individualBusiness.open === 'Closed'){
//       amOrPm = startHour < 12 ? 'AM' : 'PM';
      
//     } else {
//       amOrPm = endHour < 12 ? 'AM' : 'PM';
//     }
 
//     startMinute = (startMinute.toString() < 10) ? '0' + startMinute.toString() : startMinute.toString()
//     endMinute = (endMinute.toString() < 10) ? '0' + endMinute.toString() : endMinute.toString()

//     console.log('Here is the start hour:', startHour)
//     console.log('Here is the start minute:', startMinute)
//     // openingTime.setHours(startHour, minutes, 0, 0)

// let timeStatement;
//   if (individualBusiness.openOrNot === 'Closed' ){
//     timeStatement = `until ${startHour}:${startMinute} ${amOrPm}`
//   } else if (individualBusiness.openOrNot === 'Open'){
//     timeStatement = `until ${endHour}:${endMinute} ${amOrPm}`
//   }

  
    // if (individualBusiness.openOrNot === 'Open'){
    //   timeStatement = `for ${timeRemaining} ${hoursOrMinutes}` 
    // } else if (individualBusiness.openOrNot === 'Closed' ){
    //   timeStatement = `until ${ifTomorrow}, ${dayOfWeek}`
    // } else {
    //   timeStatement = 'Not enough data to confirm that it is open :-('
    // }
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