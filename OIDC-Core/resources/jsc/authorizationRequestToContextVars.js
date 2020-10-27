  /* set context variables from application session data (JSON String)
 *
 */
 
 //--------------------JS to decode user profile---------------------------//

function base64Decode(input) {
  // Takes a base 64 encoded string "input", strips any "=" or
  // "==" padding off it and converts its base 64 numerals into
  // regular integers (using a string as a lookup table). These
  // are then written out as 6-bit binary numbers and concatenated
  // together. The result is split into 8-bit sequences and these
  // are converted to string characters, which are concatenated
  // and output.


  // The index/character relationship in the following string acts
  // as a lookup table to convert from base 64 numerals to
  // Javascript integers
  var swaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      ob = "",
      output = "",
      tb = "",
      i, L;


  input = input.replace("=",""); // strip padding


  for (i=0, L = input.length; i < L; i++) {
    tb = swaps.indexOf(input.charAt(i)).toString(2);
    while (tb.length < 6) {
      // Add significant zeroes
      tb = "0"+tb;
    }
    while (tb.length > 6) {
      // Remove significant bits
      tb = tb.substring(1);
    }
    ob += tb;
    while (ob.length >= 8) {
      output += String.fromCharCode(parseInt(ob.substring(0,8),2));
      ob = ob.substring(8);
    }
  }
  return output;
}


function decodeJwt(input){
  payload = base64Decode(input);
  payload = payload.replace(/\0/g, '');
  payload = JSON.parse(payload);
  return {
    payload : payload
  };
}
 
 
 //----------------------------------------//
var requestData = context.getVariable("authorization.request");
if(requestData !== null){
 
var sessionData = context.getVariable("authorization.request"),

    hash = JSON.parse(sessionData),
    namesToExport = [
      'response_type_token',
      'response_type_code',
      'response_type_id_token',
      'nonce',
      'redirect_uri',
      'client_id',
      'req_state',
      'req_scope',
      'appName',
      'appLogoUrl',
      'authenticated',
      'userProfile',
  ];
  
 

// // Set flow variables
namesToExport.forEach(function(name){
  context.setVariable(name, hash[name]);
});
if (hash.response_type_code && hash.response_type_code == "true") {
  context.setVariable("code", "code");
}
if (hash.response_type_id_token && hash.response_type_id_token == "true") {
  context.setVariable("id_token", "id_token");
}
if (hash.response_type_token && hash.response_type_token == "true") {
  context.setVariable("token", "token");
}
if (hash.authenticated == "true") {
    var result = decodeJwt(hash.userProfile);
    context.setVariable("userProfile",result.payload);
    context.setVariable("userProfileJSON", JSON.stringify(result.payload))
  
}
}