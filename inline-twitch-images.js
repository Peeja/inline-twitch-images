// ==UserScript==
// @name        Inline Twitch Images
// @namespace   http://inline-twitch-images.peeja.com
// @description Inlines images linked from Twitch chat
// @match       https://www.twitch.tv/*
// @version     0.2.0
// @updateURL   https://raw.githubusercontent.com/Peeja/inline-twitch-images/master/inline-twitch-images.js
// @downloadURL https://raw.githubusercontent.com/Peeja/inline-twitch-images/master/inline-twitch-images.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require     https://raw.githubusercontent.com/bryanwoods/autolink-js/master/autolink-min.js
// ==/UserScript==

/* eslint-env browser */
/* global $:false, waitForKeyElements:false */

waitForKeyElements("#root", watchChat);

function watchChat($target) {
  // Create an observer instance
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      var newNodes = mutation.addedNodes; // DOM NodeList
      if (newNodes !== null) {
        var linkSelector = ".tw-link";
        var $links = $(newNodes)
          .find(linkSelector)
          .addBack(linkSelector);
        $links.each(function() {
          var re = /(.*(?:jpg|png|gif))$/gm;
          if (re.test($(this).text())) {
            $(this).html(
              '<img src="' + $(this).text() + '" alt="' + $(this).text() + '"/>'
            );
          }
        });
      }
    });
  });

  // Configuration of the observer:
  var config = {
    childList: true,
    subtree: true
  };

  // Pass in the target node, as well as the observer options
  observer.observe($target.get(0), config);
}
