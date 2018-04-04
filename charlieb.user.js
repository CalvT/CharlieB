// ==UserScript==
// @name         CharlieB
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       CalvT
// @match        https://chat.stackexchange.com/rooms/11540/charcoal-hq
// @match        https://chat.stackexchange.com/rooms/57773/calvbot-sandbox
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var version = 0.1;

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
        charlieMessage("CharlieB started at revision " + version + " on CalvT/SurfacePro");
    }

})();
