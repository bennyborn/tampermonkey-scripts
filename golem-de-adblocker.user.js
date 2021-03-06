// ==UserScript==
// @name         Golem Abo-Blocker
// @version      0.1
// @description  Blocks Golems new Ad-Block-Blocker
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://*.golem.de/*
// @run-at       document-start
// @grant        none
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/golem-de-adblocker.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/golem-de-adblocker.js
// ==/UserScript==

(function() {

    'use strict';

    // remove all script tags
    let removeScripts = function() {

        let children = [...document.getElementsByTagName('script')];
        children.forEach((child) => { child.remove(); });
    };

    new MutationObserver(removeScripts).observe(document, {childList: true, subtree: true});

    removeScripts();

    // remove blocker
    document.addEventListener('DOMContentLoaded', function(){

        let blocker = document.evaluate("//figcaption[contains(., 'Golem-pur-Angebot')]", document, null, XPathResult.ANY_TYPE, null );

        if( blocker ) {

            let blockerElem = blocker.iterateNext();

            if( blockerElem ) {
                blockerElem.parentNode.remove();
                console.info("Removed Golem Ad-Block-Blocker");
            }
        }
    });

})();
