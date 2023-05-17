// ==UserScript==
// @name         mydealz.de Dark Mode
// @description  Dark Mode for the Desktop version
// @version      0.0.2
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://www.mydealz.de/*
// @run-at       document-end
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/mydealz-darkmode.user.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/mydealz-darkmode.user.js
// @icon         https://www.google.com/s2/favicons?domain=mydealz.de
// ==/UserScript==

(function() {

    'use strict';

    GM_addStyle(`

        body,
        #main,
        .bg--color-brandSecondaryShade,
        .nav,
        [data-t="bottom"],
        section.subNav,
        #content-list,
        .page-navigation{
            background: #121212;
        }
        
        div[contenteditable="true"] {
            color: #121212;
        }

        .stickyBar-bottom, .stickyBar-top,
        .popover--default .popover-content, .popover--menu .popover-content, .popover--reactions .popover-content,
        .text--overlay {
          background: #0d0d0d;
        }

        .no-touch .carousel-list--air.carousel--isNext:after,
        .overflow--fade-b-r--3:after, .overflow--fade-b-r--l:after, .overflow--fade-b-r--s:after, .overflow--fade-b-r:after, .overflow--fromW3-fade-b-r--l:after, .overflow--fromW3-fade-r--l:after, .thread-title--card:after, .thread-title--list--merchant-v2:after, .thread-title--list--merchant:after, .thread-title--list:after,
        .text--overlay:before,
        .fadeEdge--r:after, .overflow--fade:after {
            background: linear-gradient(90deg,hsla(0,0%,100%,0) 0,#0d0d0d 80%);
        }

        .bg--color-greyPanel, .textBadge--inline--disabled,
        .btn--mode-boxSec,
        .navDropDown-link:focus, .navDropDown-link:hover,
        .bg--color-white, .bg--main, .card, .listingProfile, .thread--type-card, .thread--type-list {
            background-color: rgba(0,0,0,0.25);
        }

        .navDropDown-item, .navDropDown-link, .navDropDown-pItem,
        .subNav {
            border-color: rgba(0,0,0,0.25);
        }

        .thread-title,
        .text--color-charcoal {
            color: #fff;
        }

        #footer-description {
            display: none;
        }

        .vote-box {
            box-shadow: none;
        }
    `);
})();
