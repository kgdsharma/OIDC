if(context.getVariable("apigee.client_id")!==null){
context.setVariable("client_id", context.getVariable("apigee.client_id"))
}
// if(context.getVariable("request.queryparam.redirect_uri")!==null){
// context.setVariable("redirect_uri", context.getVariable("request.queryparam.redirect_uri"))
// }

if(context.getVariable("verifyapikey.VerifyAPIKey-1.redirection_uris")!==null){
context.setVariable("redirect_uri", context.getVariable("verifyapikey.VerifyAPIKey-1.redirection_uris"))
}

//print(context.getVariable("verifyapikey.VerifyAPIKey-1.redirection_uris"));