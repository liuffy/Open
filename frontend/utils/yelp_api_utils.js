const yelp = require('../../yelp-fusion/fusion/node/node_modules/yelp-fusion');

const clientId = 'APBMKv2E9sl-ik2-8fTW6Q';
const clientSecret = 'LWIK70PM6wSSSRhTPpNNsIBOvwViWG3OuHHpEz1gkMLFd6yPHK6ywDO8mEz4DscH';

let searchRequest = {};


export const getLocalBusinesses = (nameInput) => {

  findLocation()
    .then(pos => {
      const { latitude, longitude } = pos.coords;
      console.log('[findLocationSuccess]', 'latitude', latitude, 'longitude', longitude)
      searchRequest.latitude = latitude;
      searchRequest.longitude = longitude;
      searchRequest.term = nameInput;
      searchRequest.limit = '2';
        // Get latitude from findLocation
        // Get longitude from findlocation
      let businessIds = [];

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
    }).catch(e => {
      console.log(e);
    })
}

// This works fine
export const getBusinesses = (nameInput, locationInput) => {
  searchRequest = {
    term: nameInput,
    location: locationInput,
    limit: '3'
  };

  const businessIds = [];

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


export const getBusinessHours = (id) => {

  const businessHours = {};

  yelp.accessToken(clientId, clientSecret)
    .then(response => yelp.client(response.jsonBody.access_token))
    .then(client => client.business(id))
    .then(response => {
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
      const openOrNot = response.jsonBody.hours[0].is_open_now ? 'open' : 'closed'
      console.log(openOrNot)
  }).catch(err => {
    console.warn('[getBusinessHours]', err);
  });
}

function findLocation(){
  const options = {enableHighAccuracy:true,maximumAge:Infinity, timeout:20000}
  return new Promise((resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

function findLocationSuccess(pos) {
  const { latitude, longitude } = pos
  console.log('[findLocationSuccess]', 'latitude', latitude, 'longitude', longitude)
  searchRequest.latitude = latitude;
  searchRequest.longitude = longitude;
};

function findLocationError(err) {
  console.warn('[findLocationError]', err.code, err.message, err);
};