const yelp = require('../../yelp-fusion/fusion/node/node_modules/yelp-fusion');

const clientId = 'APBMKv2E9sl-ik2-8fTW6Q';
const clientSecret = 'LWIK70PM6wSSSRhTPpNNsIBOvwViWG3OuHHpEz1gkMLFd6yPHK6ywDO8mEz4DscH';

let searchRequest = {};

export const getLocalBusinesses = (nameInput, lat, lng) => {

  // Instead of returning a value, I need to return a promise. So, I simply wrap
  // the function in a promise, resolving the value (dataObject)!
  return new Promise((resolve, reject) => {


      // console.log('[findLocationSuccess]', 'latitude', latitude, 'longitude', longitude);
      searchRequest.latitude = lat;
      searchRequest.longitude = lng;
      searchRequest.term = nameInput;
      searchRequest.limit = '5';
      let businessIds = [];

      yelp
        .accessToken(clientId, clientSecret)
        .then(response => {
          const client = yelp.client(response.jsonBody.access_token);
          console.log(response)
          client
            .search(searchRequest)
            .then(response => {
              let businessDistances = {};
              let businessNames = {};
              let businessPhones = {};
              let businessImages = {};
              let businessStreets = {};

              response
                .jsonBody
                .businesses
                .forEach(function (business) {
                  // Only grab business IDs of places within 3 miles of user's location
                  if (business.distance < 4828.03) {
                    businessIds.push(business.id)
                    // Convert from meters to miles
                    businessNames[business.id] = business.name;
                    businessStreets[business.id] = business.location.address1;
                    businessImages[business.id] = business.image_url ? business.image_url : "../../assets/images/open_cursive.png";


                    businessPhones[business.id] = business.phone.length > 5 ? business.phone : ''
                    businessDistances[business.id] = (Math.round((business.distance * 0.000621371) * 100) / 100)
                  }
                })
              var dataObject = {
                ids: businessIds,
                distances: businessDistances,
                names: businessNames,
                phones: businessPhones,
                images: businessImages,
                streets: businessStreets
              }
              resolve(dataObject); // send this to the .then by resolving it
            });
        })
        .catch(e => {
          reject(e) // reject the error
        });

    });
}

// This works fine
export const getBusinessesByCity = (nameInput, locationInput) => {

  return new Promise((resolve, reject) => {
    searchRequest = {
      term: nameInput,
      location: locationInput,
      limit: '5'
    };
    yelp
      .accessToken(clientId, clientSecret)
      .then(response => {
        const client = yelp.client(response.jsonBody.access_token);
        client
          .search(searchRequest)
          .then(response => {

            let businessIds = [];
            let businessDistances = {};
            let businessNames = {};
            let businessPhones = {};
            let businessImages = {};
            let businessStreets = {}

            response
              .jsonBody
              .businesses
              .forEach(function (business) {
                businessIds.push(business.id)
                businessNames[business.id] = business.name;
                businessPhones[business.id] = business.phone;
                businessStreets[business.id] = business.location.address1;
                businessImages[business.id] = business.image_url ? business.image_url : "../../assets/images/open_cursive.png";
                businessDistances[
                  business
                    .id
                    .toString()
                ] = (Math.round((business.distance * 0.000621371) * 100) / 100)
              })

            var dataObject = {
              ids: businessIds,
              distances: businessDistances,
              images: businessImages,
              names: businessNames,
              phones: businessPhones,            
              streets: businessStreets
            }
            resolve(dataObject); // send this to the action creator
          });
      })
      .catch(e => {
        console.log(e);
        reject(e)
      });

  });

}

// What do we want to output? A businessObject that contains objects for each of
// the ids    Each businessObject has all the info for itself
export const getBusinessData = (dataObject) => {
  // creates an empty object for each idea within the larger ResultObject

  const newDataObject = dataObject
    .ids
    .map(function (id) {
      return new Promise((resolve, reject) => {
        const resultObject = {}
        // console.log(resultObject, 'result object'); Convert dashed IDs to camelCase
        let camelCasedName = id.replace(/-([a-z0-9])/g, function (g) {
          return g[1].toUpperCase();
        });
        resultObject[camelCasedName] = {}

        // Inject info from the previous call
        resultObject[camelCasedName]["phone"] = dataObject.phones[id]
        resultObject[camelCasedName]["address1"] = dataObject.streets[id]
        resultObject[camelCasedName]["image"] = dataObject.images[id]
        resultObject[camelCasedName]["distance"] = dataObject.distances[id]
        resultObject[camelCasedName]["name"] = dataObject.names[id]
        resultObject[camelCasedName]["camelCased"] =  camelCasedName;


        let businessHours;

        yelp
          .accessToken(clientId, clientSecret)
          .then(response => yelp.client(response.jsonBody.access_token))
          .then(client => client.business(id))
          .then(response => {

            console.log(response)
            resultObject[camelCasedName]["address"] = response
              .jsonBody
              .location
              .display_address
              .toString();
            // Openness console.log('hey now', resultObject[camelCasedName]["address"])
            let openOrNot;
            if (response.jsonBody.hours && response.jsonBody.hours[0].is_open_now === true){
              openOrNot ='Open'
            } else if (response.jsonBody.hours && response.jsonBody.hours[0].is_open_now === false){
              openOrNot = 'Closed'
            } else {
              openOrNot ='n/a'
            }
            resultObject[camelCasedName]["openOrNot"] = openOrNot


            businessHours = {}
            // Collect info about business hours
            if (response.jsonBody.hours) {
              response
                .jsonBody
                .hours[0]
                .open
                .forEach(function (dayObject) {
                  let setDate = dayObject.day === 6 ? 0 : dayObject.day + 1
                  let inCaseMidnight;
                  let inCaseMidnight2

                  if (Number(dayObject.end) === 0){
                    inCaseMidnight = 2400
                  } else {
                    inCaseMidnight = Number(dayObject.end)
                  }

                   if (Number(dayObject.start) === 0){
                                    inCaseMidnight2 = 2400
                                  } else {
                                    inCaseMidnight2 = Number(dayObject.start)
                                  }


                  businessHours[setDate] = [inCaseMidnight2, inCaseMidnight, dayObject.is_overnight]
                  resultObject[camelCasedName]["hours"] = businessHours;
                })
            }
            resolve(resultObject);
          })
          .catch(err => {
            reject(err)
          })
      })

    });
  return new Promise((resolve) => {
    Promise
      .all(newDataObject)
      .then(res => {
        const allData = res.reduce((acc, val) => {
          acc = Object.assign(acc, val)
          return acc
        }, {})
        resolve(allData);
      });
  })

}

function findLocation() {
  const options = {
    enableHighAccuracy: false,
    maximumAge: Infinity,
    timeout: 20000
  }
  return new Promise((resolve, reject) => {
    return navigator
      .geolocation
      .getCurrentPosition(resolve, reject, options)
  })
}

function findLocationSuccess(pos) {
  console.log('Successfully found location!')

  const {latitude, longitude} = pos;
  // console.log('[findLocationSuccess]', 'latitude', latitude, 'longitude',
  // longitude)
  searchRequest.latitude = latitude;
  searchRequest.longitude = longitude;
};

function findLocationError(err) {
  console.warn('[findLocationError]', err.code, err.message, err);
};

