 var interactionId = context.getVariable('messageid')
 context.setVariable('response.header.set-cookie.1',
   'interaction='+{interactionId}+'; site=Lex; path=/;');