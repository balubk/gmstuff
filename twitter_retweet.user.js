// Script to add retweet (RT) links to twitter page
// ==UserScript==
// @name Add twitter RT links
// @namespace http://bala.domain/
// @description Add twitter RT links
// @include http://twitter.com/home
// ==/UserScript==

function makeRTLinks() {
    var statusElem = document.getElementById('status');
    var entries = document.getElementsByClassName('hentry');
    var i = 0;
    for (i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var actions = entry.getElementsByClassName('actions')[0];
        var div = actions.getElementsByTagName('div')[0];
        var aElem = document.createElement('a');
        //aElem.setAttribute('class', 'reply');
        aElem.setAttribute('title', 're tweet');
        var aText = document.createTextNode("»");
        aElem.appendChild(aText);
        aElem.setAttribute('onclick', getActionFunction(statusElem, entry));
        div.appendChild(aElem);
    }
}

function getActionFunction(statusElem, hentry) {
    var classElem = hentry.attributes.getNamedItem('class');
    if (classElem != null) {
        var class_values = classElem.value.split(' ');
        // get class value that starts with u-. Everything after the u- is the username.
        var i = 0;
        var username = "";
        for (i = 0; i < class_values.length; i++) {
            var str = class_values[i];
            if (str.match("u-")) {
                username = str.substring(str.indexOf("-") + 1);
                break;
            }
        }
        var tweet_message = hentry.getElementsByClassName('entry-content')[0].textContent;
        var retweet = "RT @" + username + " " + tweet_message;
        var onclick_value = "document.getElementById('status').value = " + "\"" + retweet + "\"" + "; document.getElementById('status').focus()";
        //GM_log(onclick_value);
        return onclick_value;
    }
}

window.addEventListener('load', makeRTLinks, false);
