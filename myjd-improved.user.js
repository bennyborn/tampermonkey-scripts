// ==UserScript==
// @name         MyJdownloader improved
// @description  Making MyJD more responsive and dark
// @version      0.1.4
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://my.jdownloader.org/*
// @run-at       document-end
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/myjd-improved.user.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/myjd-improved.user.js
// @icon         https://www.google.com/s2/favicons?domain=jdownloader.org
// ==/UserScript==

(function() {
    
    'use strict';

    GM_addStyle(`

        :root {
            --col-gray-dark: #1d2025;
            --col-gray-medium: #434b55;
            --col-blue-dark: #1f2933;
            --col-mint: #02dac5;
            --col-mint-light: #b3fff8;
            --col-white: #ffffff;
        }

        body,
        header,footer,
        .listRow.rowSelected,
        html.no-touch .listRow.rowSelected:hover,
        .contextMenu,
        .notification,
        #dropDownMenu {
            background: var(--col-gray-dark) !important;
        }

        a.dropDownButton.current,
        header nav li a.mainNavButton.current,
        header nav li a.mainNavButton:active.current,
        header nav li a.mainNavButton:hover.current,
        header nav li a.mainNavButton:visited.current,
        .listFooter, .listHeader, .selectionHeader,
        .contextMenu a:hover {
            background: var(--col-blue-dark);
        }

        header nav li a.mainNavButton,
        header nav li a.mainNavButton:active,
        header nav li a.mainNavButton:hover,
        header nav li a.mainNavButton:visited,
        header nav li div.moreButton {
            color: var(--col-mint-light);
        }

        a.dropDownButton.current,
        header nav li a.mainNavButton.current,
        header nav li a.mainNavButton:active.current,
        header nav li a.mainNavButton:hover.current,
        header nav li a.mainNavButton:visited.current {
            border-color: var(--col-mint) !important;
        }

        progress,
        html.no-touch .listRow:hover, html.no-touch .listRowHover,
        .listFooter, .listHeader, .selectionHeader,
        .listRow.rowSelected,
        .contextMenu {
            border: none !important;
        }

        html.no-touch .listRow:hover, html.no-touch .listRowHover {
            margin: initial;
        }

        progress { color: #6ab04c; background: #6ab04c; }
        progress::-moz-progress-bar { color: #6ab04c; background: #6ab04c; }
        progress::-webkit-progress-value { color: #6ab04c; background: #6ab04c; }
        progress[aria-valuenow] { color: #6ab04c; background: #6ab04c; }

        header nav p {
            color: var(--col-mint-light) !important;
        }

        header,
        .contextMenu a, .listHeader a, .listHeader p, .selectionHeader p,
        #gwtContent,
        .footerBar,
        .contextMenu a, .selectionHeader a,
        #gwtContent h1, .gwt-PopupPanel h1,
        #dropDownMenu a {
            color: var(--col-white) !important;
        }

        body,
        #gwtContent,
        .footerBar,
        .listRowDisabled, .listRowDisabled .expandButton, .listRowDisabled .expandButton:hover, .listRowDisabled.rowSelected {
            text-shadow: none;
        }

        #gwtContent {
            background: var(--col-gray-medium);
        }

        #gwtCaptchasWaiting,
        #gwtCaptchasWaitingContainer #gwtCaptchasWaiting{
            box-shadow: none;
        }

        #gwtCaptchasWaitingContainer #gwtCaptchasWaiting {
            background: var(--col-blue-dark) !important;
        }

        html.no-touch .listRow:hover, html.no-touch .listRowHover {
            background-color: rgba(255,255,255,0.1);
        }

        .contentContainer,
        .listHeadingWrapper {
            width: 100vw;
        }

        .listHeader > div:nth-child(2) {
            width: calc(100vw - 100px - 160px - 85px - 130px - 130px - 16px) !important;
        }

        .listRow > div > div:nth-child(2){
            width: calc(100vw - 100px - 160px - 85px - 130px - 130px) !important;
        }

        .listRowExpanded ~ div.GHS0TFHP1 > div > div:nth-child(2){
            width: calc(100vw - 100px - 160px - 85px - 130px - 130px + 30px) !important;
        }

        .listRow .expandButton {
            background-size: 24px;
            color: #000000;
            filter: invert(1);
        }
        .listRow .expandButton:hover {
            color: #e3448e !important; /* roughly translates to the desired color when inverted */
        }

        /* https://www.iconfinder.com/search?q=folder&iconset=ionicons */

        .listRow .expandButton[style*="closed24.png"] {
            background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cGF0aCBkPSJNOTYsMzcwLjljMCwxNS41LDEyLjcsMjkuMSwyOC4yLDI5LjFoMjY2LjNjMTUuNSwwLDI1LjUtMTMuNiwyNS41LTI5LjFWMjA4SDk2VjM3MC45eiIvPjxwYXRoIGQ9Ik00MTYsMTY4LjhjMC0xNS41LTEwLTI0LjgtMjUuNS0yNC44YzAsMC0xNTQuNywwLTE2NywwYy00LjcsMC0xMC43LTkuOS0xOC41LTE5Yy03LjEtOC4zLTE0LjctMTMtMjAuNS0xMyAgIGMtNy41LDAtNjAuMywwLTYwLjMsMGMtMTUuNSwwLTI4LjIsOC45LTI4LjIsMjQuM1YxOTJoMzIwVjE2OC44eiIvPjwvZz48L3N2Zz4=') !important;
        }

        .listRow .expandButton[style*="open24.png"] {
            background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cGF0aCBkPSJNNDMwLjEsMTkySDgxLjljLTE3LjcsMC0xOC42LDkuMi0xNy42LDIwLjVsMTMsMTgzYzAuOSwxMS4yLDMuNSwyMC41LDIxLjEsMjAuNWgzMTYuMmMxOCwwLDIwLjEtOS4yLDIxLjEtMjAuNWwxMi4xLTE4NS4zICAgQzQ0OC43LDE5OSw0NDcuOCwxOTIsNDMwLjEsMTkyeiIvPjxnPjxwYXRoIGQ9Ik00MjYuMiwxNDMuM2MtMC41LTEyLjQtNC41LTE1LjMtMTUuMS0xNS4zYzAsMC0xMjEuNCwwLTE0My4yLDBjLTIxLjgsMC0yNC40LDAuMy00MC45LTE3LjRDMjEzLjMsOTUuOCwyMTguNyw5NiwxOTAuNCw5NiAgICBjLTIyLjYsMC03NS4zLDAtNzUuMywwYy0xNy40LDAtMjMuNi0xLjUtMjUuMiwxNi42Yy0xLjUsMTYuNy01LDU3LjItNS41LDYzLjRoMzQzLjRMNDI2LjIsMTQzLjN6Ii8+PC9nPjwvZz48L3N2Zz4=') !important;
        }

        .selectionHeader img {
            transform: scale(0.75);
        }

        .gwt-Button {
            background: var(--col-white);
            text-shadow: none !important;
            box-shadow: none !important;
            color: var(--col-gray-dark);
            border: none;
        }

        .gwt-Button:hover {
            background: var(--col-mint);
            color: var(--col-white);
        }

        .gwt-Button:hover img {
            filter: brightness(0) invert(1);
        }

        .spinner>div {
            background-color: rgba(255,255,255,0.5);
        }

        #dropDownMenuButton.current{
            background-color: rgba(255,255,255,0.05);
        }

        #gwtContent h1, .gwt-PopupPanel h1 {
            color: var(--col-gray-dark) !important;
        }

        header #logo {
            position: relative;
        }

        header #logo::after {
            content: "+";
            display: inline-block;
            background: var(--col-gray-medium);
            font-size: 0.75em;
            font-weight: 300;
            line-height: 1;
            padding: 0.4em;
            border-radius: 50%;
            position: absolute;
            bottom: 44px;
            right: -8px;
            width: 1em;
            height: 1em;
            text-align: center;
        }

        #webuiContent footer {
            display: none;
        }

        .contextMenu a, .selectionHeader a,
        #dropDownMenu a b,
        #dropDownMenu .dropDownButton .dropDownButtonTitle {
            font-weight: 400;
        }

        .listHeadingWrapper,
        .GHS0TFHPT {
            background: transparent !important;
        }

        header nav img,
        .contextMenu a img,
        .selectionHeader img {
            -webkit-filter: none;
            filter: grayscale(1) contrast(55);
        }

        .gwt-PopupPanel {
            position: fixed !important;
        }

        .gwt-PopupPanel * {
            color: var(--col-mint);
        }
    `);

})();
