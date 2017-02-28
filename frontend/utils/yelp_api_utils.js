const _defaultError = data => console.log(data);
const _defaultSuccess = data => console.log(data);

var oauthSignature = require('oauth-signature');  
var n = require('nonce')();  
var request = require('request');  
var qs = require('querystring');  
var _ = require('lodash');

// Hashing dependencies
// var OAuth = require('oauth');
// var sha1 = require('sha1');

// Making a Request
// Each request must contain the following OAuth protocol parameters:


// oauth_consumer_key       ||          Your OAuth consumer key (from Manage API Access).
// oauth_token              ||          The access token obtained (from Manage API Access).
// oauth_signature_method   ||          hmac-sha1
// oauth_signature          ||          The generated request signature, signed with the
 // oauth_token_secret      ||          obtained (from Manage API Access).
// oauth_timestamp  Timestamp for the request in seconds since the Unix epoch.
// oauth_nonce  A unique string randomly generated per request.


// Consumer Key       kACg96s3LrG0Wwg1qVYhPg
// Consumer Secret    8gm1BPlcPTPH2fidqIlZ6N-L1ck
// Token              8t_TVyD5BgheKr4t5p2AYZRYZtthZC2s
// Token Secret        -d1WLn7cwfEIMmail9H8K6pPemA

export const getBusinesses = (set_parameters, callback) => {

  function callback(data) {        
                console.log('data:', data)
        }


  /* The type of request */
  var httpMethod = 'GET';

  /* The url we are using for the request */
  var url = 'http://api.yelp.com/v2/search';

  /* We can setup default parameters here */
  var default_parameters = {
    location: 'San+Francisco',
    // sort: '2'
  };

  /* We set the require parameters here */
  var required_parameters = {
    oauth_consumer_key : "kACg96s3LrG0Wwg1qVYhPg",
    oauth_token : "8t_TVyD5BgheKr4t5p2AYZRYZtthZC2s",
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
  };

  /* We combine all the parameters in order of importance */ 
  var parameters = _.assign(default_parameters, set_parameters, required_parameters);

  /* We set our secrets here */
  var consumerSecret = "8gm1BPlcPTPH2fidqIlZ6N-L1ck";
  var tokenSecret = "-d1WLn7cwfEIMmail9H8K6pPemA";

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  /* We add the signature to the list of paramters */
  parameters.oauth_signature = signature;

  /* Then we turn the paramters object, to a query string */
  var paramURL = qs.stringify(parameters);

  /* Add the query string to the url */
  var apiURL = url+'?'+paramURL;

  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
     if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
  }
  });

};