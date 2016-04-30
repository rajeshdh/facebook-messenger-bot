// handler receiving messages
app.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
 if (event.message && event.message.text) {
    if (!kittenMessage(event.sender.id, event.message.text)) {
        sendMessage(event.sender.id, {text: "Echo: " + event.message.text});
    }
} else if (event.postback) {
    console.log("Postback received: " + JSON.stringify(event.postback));
}
    }
    res.sendStatus(200);
});

function analyseMessage(text) {
    text = text || "";
    console.log(text);
   // var messageElements = text.split(' ');
    var reply = eliza.transform(text);
    return reply;
//     for (var key in knowledgeBase) {        
//     if (knowledgeBase.hasOwnProperty(key)) {
//         var areEqual = text.toUpperCase() === key.toUpperCase();
//         if (areEqual) {
//             var answer = knowledgeBase[key] ;
//             return (answer[Math.floor(Math.random()*answer.length)]).toLowerCase();
//         }        
//      }    
//     }
//     var defaultAnswers = [
//         "I'm not sure I understand you fully.",
//         "Please go on.",
//         "That is interesting. Please continue.",
//         "Tell me more about that.",
//         "Does talking about this bother you?"
//     ];
//    return defaultAnswers[Math.floor(Math.random()*answer.length)];
}

// send rich message with kitten
function kittenMessage(recipientId, text) {
    
    text = text || "";
    var values = text.split(' ');
    
    if (values.length === 3 && values[0] === 'kitten') {
        if (Number(values[1]) > 0 && Number(values[2]) > 0) {
            
            var imageUrl = "https://placekitten.com/" + Number(values[1]) + "/" + Number(values[2]);
            
            message = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Kitten",
                            "subtitle": "Cute kitten picture",
                            "image_url": imageUrl ,
                            "buttons": [{
                                "type": "web_url",
                                "url": imageUrl,
                                "title": "Show kitten"
                                }, {
                                "type": "postback",
                                "title": "I like this",
                                "payload": "User " + recipientId + " likes kitten " + imageUrl,
                            }]
                        }]
                    }
                }
            };
    
            sendMessage(recipientId, message);
            
            return true;
        }
    }
    
    return false;
    
};
