var charlieRegex = /^@cha(|r(|l(|i(|e(|b)))))\b/i;

var messageRegex = /[^a-z0-9\s._-]/gi;

var commandRegex = /^\s*[a-z]*\b/i;

var shutupOn = 0;

$(document).ready(function () {
    // Add function to the CHAT event handler:
    CHAT.addEventHandlerHook(chatMessageRecieved);
    startup();
});

function chatMessageRecieved({event_type, user_id, content}) {
    // Check if event is a new message (1) or an edit (2)
    if (event_type < 3) {
        // Run regex on message
        var charlieCheck = content.match(charlieRegex);
        // Check if message is to Charlie
        if (charlieCheck !== null) {
            // Prepare content for Charlie
            var charlieMessage = content.replace(charlieRegex, "").replace(messageRegex, "");
            var charlieCommand = charlieMessage.trim().match(commandRegex);
            var charlieParameters = charlieMessage.replace(commandRegex, "").trim();
            chatMessage("I recieved the command *" + charlieCommand + "* along with the parameters *" + charlieParameters + "* from user " + user_id);

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
