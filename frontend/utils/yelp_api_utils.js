const yelp = require('../../yelp-fusion/fusion/node/node_modules/yelp-fusion');

const clientId = 'APBMKv2E9sl-ik2-8fTW6Q';
const clientSecret = 'LWIK70PM6wSSSRhTPpNNsIBOvwViWG3OuHHpEz1gkMLFd6yPHK6ywDO8mEz4DscH';

let searchRequest = {};


export const getLocalBusinesses = (nameInput) => {

  findLocation()
    .then(pos => {
      const { latitude, longitude } = pos.coords;
      // console.log('[findLocationSuccess]', 'latitude', latitude, 'longitude', longitude)
      searchRequest.latitude = latitude;
      searchRequest.longitude = longitude;
      searchRequest.term = nameInput;
      searchRequest.limit = '3';
      // searchRequest.sort_by = "distance"
      let businessIds = [];

      
      yelp.accessToken(clientId, clientSecret).then(response => {
        const client = yelp.client(response.jsonBody.access_token);

        client.search(searchRequest).then(response => {

          let businessDistances = {};
          response.jsonBody.businesses.forEach(function(business){
            // Only grab business IDs of places within 3 miles of user's location
            if (business.distance < 4828.03){
              businessIds.push(business.id)
            // Convert from meters to miles
              businessDistances[business.id] = (Math.round((business.distance*0.000621371) * 100) / 100)
            }
          })

          // return businessIds; // send this to the action creator 
          console.log(businessIds);
          console.log(businessDistances);
        });
      }).catch(e => {
        console.log(e);
      });
    }).catch(e => {
      console.log(e);
    })
}

// This works fine
export const getBusinessesByCity = (nameInput, locationInput) => {
  searchRequest = {
    term: nameInput,
    location: locationInput,
    limit: '3'
  };

  const businessIds = [];

  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      let businessDistances = {};

      response.jsonBody.businesses.forEach(function(business){
        businessIds.push(business.id)
        businessDistances[business.id.toString()] = (Math.round((business.distance * 0.000621371) * 100) / 100)
      })

      // return businessIds; // send these to the actionCreator
      console.log(businessIds);
      console.log(businessDistances);
    });
  }).catch(e => {
    console.log(e);
  });
}



let businessDataObject = {}

export const getBusinessData = (id, businessDistances) => {

  const businessHours = {};
  // grabbed this from the previous API calls
  // businessDistances = {"rustys-southern-san-francisco": 1.01, 
  //                           "hops-and-hominy-san-francisco": 0.22, 
  //                           "little-skillet-san-francisco-2": 0.92}
  yelp.accessToken(clientId, clientSecret)
    .then(response => yelp.client(response.jsonBody.access_token))
    .then(client => client.business(id))
    .then(response => {
      response.jsonBody.hours[0].open.forEach(function(dayObject){
        businessHours[dayObject.day] = [dayObject.start, dayObject.end]
      })

      // Distance from either the user's location or the address/city inputted
      businessDataObject.distance = businessDistances[id]
      // business hours
      businessDataObject.hours = businessHours;
      // Correctly formatted address
      businessDataObject.address = response.jsonBody.location.display_address.toString();
      // Phone #
      businessDataObject.phone = response.jsonBody.phone;
      // Openness 
      businessDataObject.openOrNot = response.jsonBody.hours[0].is_open_now ? 'open' : 'closed'

      // return businessDataObject; // send this to the action creator 

      console.log(businessDataObject)
  }).catch(err => {
    console.warn('[getBusinessHours]', err);
  });
}




function findLocation(){

  const options = {enableHighAccuracy:false,
                   maximumAge:Infinity, 
                   timeout:20000}

  return new Promise((resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

function findLocationSuccess(pos) {
  const { latitude, longitude } = pos
  // console.log('[findLocationSuccess]', 'latitude', latitude, 'longitude', longitude)
  searchRequest.latitude = latitude;
  searchRequest.longitude = longitude;
};

function findLocationError(err) {
  console.warn('[findLocationError]', err.code, err.message, err);
};