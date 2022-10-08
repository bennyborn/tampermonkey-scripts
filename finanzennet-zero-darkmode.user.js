// ==UserScript==
// @name         finanzen.net zero Dark Mode
// @description  Dark Mode for the Desktop version
// @version      0.1
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://mein.finanzen-zero.net/*
// @run-at       document-end
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/finanzennet-zero-darkmode.user.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/finanzennet-zero-darkmode.user.js
// ==/UserScript==

(function() {
    
    'use strict';

    GM_addStyle(`

        body {
            background: #121212;
            color: #e5e5e5;
        }

        .tile {
            border-color: transparent;
        }

        .tile,
        .tile.customer,
        .snackbar-content{
            background-color: #1e1e1e;
        }

        .tile,
        .tile-slider {
            box-shadow: none;
        }

        .text-color-primary {
            color: #c1e0ff;
        }

        a,
        .text-color-primary-lighter {
            color: #c1e0ff73;
        }

        charts-web-trading-view-chart {
            filter: invert(1) brightness(1.75) hue-rotate(198deg);
            mix-blend-mode: exclusion;
        }

        svg {
            filter: brightness(0) invert(1);
        }

        .input-group-material-liste,
        app-asset-search ngb-typeahead-window.dropdown-menu {
            background: #1212125e;
            color: #e5e5e5;
            backdrop-filter: blur(4px);
            box-shadow: none;
        }

        .dropdown-item {
            color: inherit;
        }

        .dropdown-item:hover,
        .dropdown-item:focus,
        .input-group-material-liste>.input-group-material-liste-item:hover,
        app-asset-search ngb-typeahead-window.dropdown-menu>.dropdown-item .input-group-material-liste-item:hover,
        app-asset-search ngb-typeahead-window.dropdown-menu>.dropdown-item.active .input-group-material-liste-item,
        .input-group-material-liste>.input-group-material-liste-item:focus,
        app-asset-search ngb-typeahead-window.dropdown-menu>.dropdown-item .input-group-material-liste-item:focus {
            background-color: #1e1e1e;
        }

        .input-group-material-liste-headline,
        .dropdown-item .input-group-material-liste-headline {
            background: #121212;
            color: inherit;
        }
    `);
})();
