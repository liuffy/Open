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

          var dataObject = {
            ids: businessIds,
            distances: businessDistances
          }
            return dataObject; // send this to the action creator
          // console.log(dataObject);
        
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

          var dataObject = {
            ids: businessIds,
            distances: businessDistances
          }
            return dataObject; // send this to the action creator
          // console.log(dataObject);
    });
  }).catch(e => {
    console.log(e);
  });
}

// What do we want to output? 
// A businessObject that contains objects for each of the ids 
//    Each businessObject has all the info for itself
let resultObject = {}
export const getBusinessData = (dataObject) => {

  // var dataObject = { ids: ["the-bird-san-francisco-2", 
  //                           "hot-sauce-and-panko-san-francisco", 
  //                           "little-skillet-san-francisco-2"],
  //                   distances:{"hot-sauce-and-panko-san-francisco":0.9,"little-skillet-san-francisco-2":0.92, 
  //                   "the-bird-san-francisco-2":0.25}

  
  //                 }
 // creates an empty object for each idea within the larger ResultObject
  dataObject.ids.forEach(function(id){
    let camelCased = id.replace(/-([a-z0-9])/g, function (g) { return g[1].toUpperCase(); });
    resultObject[camelCased] = {}
    // Now let's add info 
    resultObject[camelCased]["distance"] =  dataObject.distances[id]

    let businessHours;

    yelp.accessToken(clientId, clientSecret)
      .then(response => yelp.client(response.jsonBody.access_token))
      .then(client => client.business(id))
      .then(response => {

// it knows what id is 
        businessHours = {}
        // Collect info about business hours
        response.jsonBody.hours[0].open.forEach(function(dayObject){
          businessHours[dayObject.day] = [dayObject.start, dayObject.end]
        // Formatted name of business
        resultObject[camelCased]["name"]= response.jsonBody.name;
        // Distance from either the user's location or the address/city inputted
        // business hours
        resultObject[camelCased]["hours"] = businessHours;
        // Correctly formatted address
        resultObject[camelCased]["address"]= response.jsonBody.location.display_address.toString();
        // Phone #
        resultObject[camelCased]["phone"] = response.jsonBody.phone;
        // Openness 
        resultObject[camelCased]["openOrNot"] = response.jsonBody.hours[0].is_open_now ? 'Open' : 'Closed'
        })


    }).catch(err => {
      console.warn('[getBusinessHours]', err);
    });
  })
    return resultObject; // send this to the action creator 
    console.log(resultObject)
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