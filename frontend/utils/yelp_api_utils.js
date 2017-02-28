const yelp = require('../../yelp-fusion/fusion/node/node_modules/yelp-fusion');

// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = 'APBMKv2E9sl-ik2-8fTW6Q';
const clientSecret = 'LWIK70PM6wSSSRhTPpNNsIBOvwViWG3OuHHpEz1gkMLFd6yPHK6ywDO8mEz4DscH';




export const getBusinesses = (termInput, locationInput) => {
const searchRequest = {
  term: termInput,
  location: locationInput,
  limit: '4'
};

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {
    // const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(response.jsonBody.businesses, null, 4);
    console.log(prettyJson);
  });
}).catch(e => {
  console.log(e);
});

}