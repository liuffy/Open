
const yelp = require('../../yelp-fusion/fusion/node/node_modules/yelp-fusion');

const clientId = 'APBMKv2E9sl-ik2-8fTW6Q';
const clientSecret = 'LWIK70PM6wSSSRhTPpNNsIBOvwViWG3OuHHpEz1gkMLFd6yPHK6ywDO8mEz4DscH';

let searchRequest = {};


export const getLocalBusinesses = (nameInput) => {

  // Instead of returning a value, I need to return a promise.

  // So, I simply wrap the function in a promise, resolving the value (dataObject)!
    return new Promise((resolve, reject) => {

  findLocation()
    .then(pos => {
      const { latitude, longitude } = pos.coords;
    // console.log('[findLocationSuccess]', 'latitude', latitude, 'longitude', longitude)
      searchRequest.latitude = latitude;
      searchRequest.longitude = longitude;
      searchRequest.term = nameInput;
      searchRequest.limit = '4';
      let businessIds = [];
      console.log('We have calculated the users location')

      yelp.accessToken(clientId, clientSecret).then(response => {
        const client = yelp.client(response.jsonBody.access_token);

        client.search(searchRequest).then(response => {

          let businessDistances = {};
          let businessNames = {};
          let businessPhones = {};

          response.jsonBody.businesses.forEach(function(business){
    // Only grab business IDs of places within 3 miles of user's location
            if (business.distance < 3218.69){
              businessIds.push(business.id)
            // Convert from meters to miles
              businessNames[business.id] = business.name;
              businessPhones[business.id] = business.phone;
              businessDistances[business.id] = (Math.round((business.distance * 0.000621371) * 100) / 100)
            }
          })
               var dataObject = {
                ids: businessIds,
                distances: businessDistances,
                names: businessNames,
                phones: businessPhones
              }
          resolve(dataObject); // send this to the .then by resolving it 
    });
  }).catch(e => {
    console.log(e);
    reject(e) // reject the error
  });

  });
  })
}
  

// This works fine
export const getBusinessesByCity = (nameInput, locationInput) =>{
  return new Promise((resolve, reject) => {

  searchRequest = {
    term: nameInput,
    location: locationInput,
    limit: '4'
  };
   yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);
    client.search(searchRequest).then(response => {
      let businessIds = [];
      let businessDistances = {};
      let businessNames = {};
      let businessPhones = {};

      response.jsonBody.businesses.forEach(function(business){
        businessIds.push(business.id)
        businessNames[business.id] = business.name;
        businessPhones[business.id] = business.phone;
        businessDistances[business.id.toString()] = (Math.round((business.distance * 0.000621371) * 100) / 100)
      })

          var dataObject = {
          ids: businessIds,
          distances: businessDistances,
          names: businessNames,
          phones: businessPhones
          }
          resolve(dataObject); // send this to the action creator
    });
  }).catch(e => {
    console.log(e);
    reject(e)
  });


  });
  
}

// What do we want to output? 
// A businessObject that contains objects for each of the ids 
//    Each businessObject has all the info for itself
export const getBusinessData = (dataObject) => {

  return new Promise ((resolve, reject) => {
    // creates an empty object for each idea within the larger ResultObject
    const resultObject = {}

      dataObject.ids.forEach(function(id){
      // Convert dashed IDs to camelCase
        let camelCasedName = id.replace(/-([a-z0-9])/g, function (g) { return g[1].toUpperCase(); });
        resultObject[camelCasedName] = {}

        // Inject info from the previous call
        resultObject[camelCasedName]["phone"] =  dataObject.phones[id] 
        resultObject[camelCasedName]["distance"] =  dataObject.distances[id]
        resultObject[camelCasedName]["name"] =  dataObject.names[id]
        resultObject[camelCasedName]["camelCased"] =  camelCasedName;

        let businessHours;

        yelp.accessToken(clientId, clientSecret)
          .then(response => yelp.client(response.jsonBody.access_token))
          .then(client => client.business(id))
          .then(response => {
          // Correctly formatted address
           resultObject[camelCasedName]["address"] = response.jsonBody.location.display_address.toString();         
          // Openness 

            resultObject[camelCasedName]["openOrNot"] = response.jsonBody.hours[0].is_open_now ? 'Open' : 'Closed'

            businessHours = {}
            // Collect info about business hours
            response.jsonBody.hours[0].open.forEach(function(dayObject){
              businessHours[weekify(dayObject)] = `${dayObject.start} - ${dayObject.end}`
              resultObject[camelCasedName]["hours"] = businessHours;
          })

      }).catch(err => {
        reject(err)
      })

    })
      var clonedResult = Object.assign({}, resultObject);
      resolve(clonedResult); // send this to the action creator 

  });
}


function findLocation(){
  const options = {enableHighAccuracy:false,
                   maximumAge:Infinity, 
                   timeout:20000}
  return new Promise((resolve, reject) => {
    console.log ('We are currently finding location.....')
    return navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

function findLocationSuccess(pos) {
  console.log ('Successfully found location!')

  const { latitude, longitude } = pos;
  // console.log('[findLocationSuccess]', 'latitude', latitude, 'longitude', longitude)
  searchRequest.latitude = latitude;
  searchRequest.longitude = longitude;
};

function findLocationError(err) {
  console.warn('[findLocationError]', err.code, err.message, err);
};

function weekify(dayObject){

  if (dayObject.day === 0){
    return "Mon"
  } else if (dayObject.day === 1){
    return "Tues"
  } else if (dayObject.day === 2){
    return "Wed"
  } else if (dayObject.day === 3){
    return "Thurs"
  } else if (dayObject.day === 4){
    return "Fri"
  } else if (dayObject.day === 5){
    return "Sat"
  } else if (dayObject.day === 6){
    return "Sunday"
  }
}


function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
 
    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }
 
    return temp;
}
