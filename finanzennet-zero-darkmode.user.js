// ==UserScript==
// @name         finanzen.net zero Dark Mode
// @description  Dark Mode for the Desktop version
// @version      0.1.11
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://mein.finanzen-zero.net/*
// @run-at       document-end
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/finanzennet-zero-darkmode.user.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/finanzennet-zero-darkmode.user.js
// @icon         https://www.google.com/s2/favicons?domain=mein.finanzen-zero.net
// ==/UserScript==

(function() {

    'use strict';

    GM_addStyle(`

        :root {
          --fzdm-gray: #121212;
          --fzdm-light-gray: #e5e5e5;
          --fzdm-blue: #c1e0ff;
          --fzdm-blue-light: #47a0ff;
          --fzdm-dark-blue: #1e1e1e;
          --fzdm-medium-gray: #818181;
          --fzdm-white: #ffffff;
        }

        .zero-backdrop.main-backdrop, .main-backdrop.tile, .main-backdrop.alert,
        body {
            background: var(--fzdm-gray);
            color: var(--fzdm-light-gray);
        }

        .tile,
        .tile.customer,
        .snackbar-content,
        .tile-slider,
        .text-color-primary,
        a,
        .link-primary,
        .text-color-primary-lighter,
        .table-tickets td,
        .table-post td,
        .table,
        .input-group-material-liste,
        app-asset-search ngb-typeahead-window.dropdown-menu {
            color: var(--fzdm-blue);
        }

        .tile,
        .tile.customer,
        .snackbar-content,
        .tile-slider,
        .input-group-material-liste,
        app-asset-search ngb-typeahead-window.dropdown-menu {
            background-color: var(--fzdm-dark-blue);
        }

        .tile,
        .tile-slider {
            box-shadow: none;
        }

        .tile {
            border-color: transparent;
        }

        ngb-modal-window,
        .chart-container {
            filter: invert(1) brightness(1.75) hue-rotate(198deg);
            mix-blend-mode: exclusion;
        }

        ngb-modal-window,
        ngb-modal-window .chart-container{
            mix-blend-mode: unset;
        }

        ngb-modal-window .chart-container {
           filter: none;
        }

        ng-component svg,
        .cursor-pointer > svg.icon {
            filter: brightness(0) invert(1);
        }

        .input-group-material-liste,
        app-asset-search ngb-typeahead-window.dropdown-menu {
            background: var(--fzdm-transparent-gray);
            color: var(--fzdm-light-gray);
            backdrop-filter: blur(4px);
            box-shadow: none;
        }

        .dropdown-item,
        .d-flex > div.info-item,
        .leverage-products .leverage,
        .input-group-material-liste-headline,
        .dropdown-item .input-group-material-liste-headline,
        .note,
        .nav-tabs a.nav-link,
        .watchlist .input-group-material input::placeholder {
            color: var(--fzdm-medium-gray);
        }

        .dropdown-item:hover,
        .dropdown-item:focus,
        .input-group-material-liste>.input-group-material-liste-item:hover,
        app-asset-search ngb-typeahead-window.dropdown-menu>.dropdown-item .input-group-material-liste-item:hover,
        app-asset-search ngb-typeahead-window.dropdown-menu>.dropdown-item.active .input-group-material-liste-item,
        .input-group-material-liste>.input-group-material-liste-item:focus,
        app-asset-search ngb-typeahead-window.dropdown-menu>.dropdown-item .input-group-material-liste-item:focus,
        .d-flex > div.info-item,
        .leverage-products .leverage {
            background: rgb(0 0 0 / 15%);
        }

        .input-group-material label,
        .alert-danger,
        .watchlist .input-group-material input {
            color: var(--fzdm-white) !important;
        }

        .dividend-value-container .instrument-name {
            background: none !important;
        }

        .link-black {
            color: var(--fzdm-blue);
        }

        a:hover,
        .col .tile .headline {
            color: var(--fzdm-blue-light) !important;
        }

        .card, .circle,
        .btn-icon {
            background: var(--fzdm-gray);
        }

        .buying-power,
        .tile .text,
        .customer-header,
        .btn.btn-toggle {
            color: var(--fzdm-white) !important;
        }

        a.zero-text.default,
        .app-icon.zero-text.default {
            color: var(--fzdm-white);
        }

        .text-color-grey {
            color: var(--fzdm-light-gray);
        }

        .options > div {
            background: transparent !important;
        }

    `);
})();
