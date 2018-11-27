// ==UserScript==
// @name         CharlieB Loader
// @version      0.1
// @author       CalvT
// @author       ArtOfCode
// @match        https://chat.stackexchange.com/rooms/57773/calvbot-sandbox
// @match        https://chat.stackexchange.com/rooms/65945/charcoal-test
// @grant        none
// ==/UserScript==

function injectDependency(url, callback) {
    var validator = /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    var scriptElement = document.createElement("script");
    scriptElement.src = url.match(validator) ? url : "";
    scriptElement.setAttribute("type", "text/javascript");
    scriptElement.addEventListener("load", function() {
        callback();
    });
    document.body.appendChild(scriptElement);
}

injectDependency("https://cdn.jsdelivr.net/gh/CalvT/CharlieB/charlieb.js", function() {
    console.log("CharlieB is loaded.");
});
