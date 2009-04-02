// Script to put a save as link in youtube pages
// ==UserScript==
// @name Save YouTube video
// @namespace http://bala.domain/
// @description save youtube video
// @include http://www.youtube.com/watch*
// ==/UserScript==

function addSaveButton() {
    divs = document.getElementsByClassName('watch-tabs');
    div = divs[0];
    var clearDiv;
    var args = unsafeWindow.swfArgs;

    saveText = document.createTextNode('Save Video');
    saveLink = "http://www.youtube.com/get_video?video_id=" + args.video_id + "&amp;t=" + args.t + "&amp;fmt=18";
    aElem = document.createElement('a');
    aElem.setAttribute('href', saveLink);
    aElem.appendChild(saveText);
    divElem = document.createElement('div');
    divElem.setAttribute('id', 'save-video');
    divElem.setAttribute('class', 'watch-tab');
    divElem.appendChild(aElem);

    var i = 0;
    for (i = 0; i < div.childNodes.length; i++) {
        if (div.childNodes[i].nodeName == 'DIV' && div.childNodes[i].getAttribute('class') == 'clear') {
            clearDiv = div.childNodes[i];
        }
    }
    div.insertBefore(divElem, clearDiv);
}

window.addEventListener('load', addSaveButton, false);

