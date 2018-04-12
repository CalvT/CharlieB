var shutupOn = 0;

var commandsArray = [
    {"name":"coffee", "reply": "Brews a coffee"},
    {"name":"gimme", "reply":"Gimmez teh codez"},
];

$(document).ready(function () {
    // Add function to the CHAT event handler:
    CHAT.addEventHandlerHook(chatMessageRecieved);
    startup();
});

function chatMessageRecieved({event_type, user_id, content}) {
    // Check if event is a new message (1) or an edit (2)
    if (event_type < 3) {
        // Run regex on message
        var message = content.replace(/[^a-z0-9@\s._-]/gi, "");
        //Separate message
        message = message.split(" ");
        // Check if message is to Charlie
        var charlieCheck = meesage[0].match(/^@cha(|r(|l(|i(|e(|b)))))\b/i);
        if (charlieCheck !== null) {
            // Send command to Charlie
            var commandArray = commandsArray.filter(function(item){
                return item.name === message[1];
            });
            chatMessage(commandArray[0].reply);

        }

    }

}

function chatMessage(message) {

    if (shutupOn === 0) {
        id = document.getElementsByName('room')[0].value;
        message = "[ [CharlieB](https://github.com/CalvT/CharlieB) ] " + message;
        function send() {
            $.ajax({
                "type": "POST",
                "url": "https://chat.stackexchange.com/chats/" + id + "/messages/new",
                "data": fkey({
                    "text": message
                }),
                "dataType": "json",
                "error": error
            });
        }
        function error() {
            console.log("Could not send, waiting 1500.");
            window.setTimeout(send, 1500);
        }
        send();
    } else if (shutupOn !== 0) {
        console.log('CB: ' + message);
    }
}

function startup(){
    $.get("https://api.github.com/repos/CalvT/CharlieB/git/refs/heads/master", function(ghjson){
        chatMessage("CharlieB started at revision [" + ghjson.object.sha.substring(0, 6) + "](https://github.com/CalvT/CharlieB/commit/" + ghjson.object.sha +") on CalvT/SurfaceBook");
    });

}
