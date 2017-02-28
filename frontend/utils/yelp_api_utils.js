const _defaultError = data => console.log(data);
const _defaultSuccess = data => console.log(data);

// Making a Request
// Each request must contain the following OAuth protocol parameters:


// oauth_consumer_key 			|| 					Your OAuth consumer key (from Manage API Access).
// oauth_token							|| 					The access token obtained (from Manage API Access).
// oauth_signature_method		||					hmac-sha1
// oauth_signature 					||					The generated request signature, signed with the
 // oauth_token_secret 			||					obtained (from Manage API Access).
// oauth_timestamp	Timestamp for the request in seconds since the Unix epoch.
// oauth_nonce	A unique string randomly generated per request.

export const getBusinesses = (terms) => {
var auth = {
  consumerKey : "kACg96s3LrG0Wwg1qVYhPg",
  consumerSecret : "8gm1BPlcPTPH2fidqIlZ6N-L1ck",
  accessToken : "OV0Hnd63Wixx42ciVhw38z5yAHxQC3K",
  // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
  // You wouldn't actually want to expose your access token secret like this in a real application.
  accessTokenSecret : "d17L9cwIO6l0tMJbWmWy3xSO3VM",
  serviceProvider : {
      signatureMethod : "HMAC-SHA1"
  }
};

var accessor = {
    consumerSecret : auth.consumerSecret,
    tokenSecret : auth.accessTokenSecret
};

// var terms;
var near = 'San+Francisco';
  
var parameters = [];
          parameters.push(['term', terms]);
          parameters.push(['location', near]);
          parameters.push(['callback', 'cb']);
          parameters.push(['oauth_consumer_key', auth.consumerKey]);
          parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
          parameters.push(['oauth_token', auth.accessToken]);
          parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var message = {
          'action' : 'https://api.yelp.com/v2/search',
          'method' : 'GET',
          'parameters' : parameters
      };

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);

var parameterMap = OAuth.getParameterMap(message.parameters);
          
$.ajax({
    'url' : message.action,
    'data' : parameterMap,
    'dataType' : 'jsonp',
    'jsonpCallback' : 'cb',
    'cache': true
})
.done(function(data, textStatus, jqXHR) {
        console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
    }
)
.fail(function(jqXHR, textStatus, errorThrown) {
                    console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
        }
);
  
  }


// export const getBusinesses = (businessName, error = _defaultError) => 
// 	$.ajax({
// 		url: 'https://api.spotify.com/v1/search',
// 		method: 'GET',
// 		dataType: 'json',
// 		data: {
// 			type: 'name',
// 			q: 'target'
// 		},
// 		error
// 	});