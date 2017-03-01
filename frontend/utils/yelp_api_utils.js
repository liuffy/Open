const yelp = require('../../yelp-fusion/fusion/node/node_modules/yelp-fusion');

const clientId = 'APBMKv2E9sl-ik2-8fTW6Q';
const clientSecret = 'LWIK70PM6wSSSRhTPpNNsIBOvwViWG3OuHHpEz1gkMLFd6yPHK6ywDO8mEz4DscH';

// 
let searchRequest;

function findLocation(){
  var options = {
    enableHighAccuracy: true,
    timeout: 10000
  };
  function success(pos) {
    console.log(pos.coords.latitude)
    console.log(pos.coords.longitude)
    searchRequest.latitude = pos.coords.latitude;
    searchRequest.longitude = pos.coords.longitude;
  };
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  navigator.geolocation.getCurrentPosition(success, error, options)
}

// This is the function I'm trying to fix 
export const getLocalBusinesses = (nameInput) =>{

 findLocation()

  searchRequest = {
    term: nameInput,
    limit: '2'
    // Get latitude from findLocation
    // Get longitude from findlocation
  };


yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      // const prettyJson = JSON.stringify(response.jsonBody.businesses, null, 4);

      response.jsonBody.businesses.forEach(function(business){
        businessIds.push(business.id)
      })
      console.log(businessIds);
    });
  }).catch(e => {
    console.log(e);
  });

}


// This works fine
export const getBusinesses = (nameInput, locationInput) => {
  searchRequest = {
    term: nameInput,
    location: locationInput,
    limit: '3'
  };

  var businessIds = [];

  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      response.jsonBody.businesses.forEach(function(business){
        businessIds.push(business.id)
      })
      console.log(businessIds);
    });
  }).catch(e => {
    console.log(e);
  });

}


export const getBusinessHours = (iDInput) =>{

  var businessHours = {};

  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.business(iDInput).then(response => {
      
      response.jsonBody.hours[0].open.forEach(function(dayObject){
          businessHours[dayObject.day] = [dayObject.start, dayObject.end]
      })

      // Let's push all of these into an object? 
      // Hours open
      console.log(businessHours)
      // Formatted address
      console.log(response.jsonBody.location.display_address.toString())
      // Phone number
      console.log(response.jsonBody.phone)
      // Boolean open value

      var openOrNot;
      if (response.jsonBody.hours[0].is_open_now){
        openOrNot = "open"
      } else {
        openOrNot = "closed"
      }
      console.log(openOrNot)
    });
    
  }).catch(e => {
    console.log(e);
  });
}