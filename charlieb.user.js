// ==UserScript==
// @name         CharlieB
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       CalvT
// @match        https://chat.stackexchange.com/rooms/11540/charcoal-hq
// @match        https://chat.stackexchange.com/rooms/57773/calvbot-sandbox
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var charlieRegex = /^@Cha(\b|r(\b|l(\b|i(\b|e(\b|B)))))\b/;

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

                console.log(event_type + " $$$ " + user_id + " $$$ " + content);

            }

        }

    }

    function charlieMessage(message) {
        console.log("[CharlieB] " + message);
    }

    function startup(){
        $.get("https://api.github.com/repos/CalvT/CharlieB/git/refs/heads/master", function(ghjson){
            charlieMessage("CharlieB started at revision [" + ghjson.object.sha.substring(0, 6) + "](https://github.com/CalvT/CharlieB/commit/" + ghjson.object.sha +") on CalvT/SurfacePro");
        });

    }

})();
