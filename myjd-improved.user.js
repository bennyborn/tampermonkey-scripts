// ==UserScript==
// @name         MyJdownloader improved
// @description  Making MyJD more responsive and dark
// @version      0.1.2
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

body,
header,footer,
.listRow.rowSelected,
html.no-touch .listRow.rowSelected:hover{
background-color: #1d2025;
}


a.dropDownButton.current,
header nav li a.mainNavButton.current,
header nav li a.mainNavButton:active.current,
header nav li a.mainNavButton:hover.current,
header nav li a.mainNavButton:visited.current,
.listFooter, .listHeader, .selectionHeader {
background-color: #1f2933;
}

header nav li a.mainNavButton,
header nav li a.mainNavButton:active,
header nav li a.mainNavButton:hover,
header nav li a.mainNavButton:visited,
header nav li div.moreButton {
color: #b3fff8;
}

a.dropDownButton.current,
header nav li a.mainNavButton.current,
header nav li a.mainNavButton:active.current,
header nav li a.mainNavButton:hover.current,
header nav li a.mainNavButton:visited.current {
border-color: #02dac5 !important;
}

progress,
html.no-touch .listRow:hover, html.no-touch .listRowHover,
.listFooter, .listHeader, .selectionHeader,
.listRow.rowSelected {
border: none;
}

html.no-touch .listRow:hover, html.no-touch .listRowHover {
margin: initial;
}

progress { color: #6ab04c; background: #6ab04c; }
progress::-moz-progress-bar { color: #6ab04c; background: #6ab04c; }
progress::-webkit-progress-value { color: #6ab04c; background: #6ab04c; }
progress[aria-valuenow] { color: #6ab04c; background: #6ab04c; }

header nav p {
color: #b3fff8 !important;
}

header,
.contextMenu a, .listHeader a, .listHeader p, .selectionHeader p,
#gwtContent,
.footerBar,
.contextMenu a, .selectionHeader a{
color: #ffffff;
}


body,
#gwtContent,
.footerBar{
text-shadow: none;
}

#gwtContent {
background: #434b55;
}

#gwtCaptchasWaiting,
#gwtCaptchasWaitingContainer #gwtCaptchasWaiting{
box-shadow: none;
}

#gwtCaptchasWaitingContainer #gwtCaptchasWaiting {
background: #1f2933;
}

html.no-touch .listRow:hover, html.no-touch .listRowHover {
background-color: rgba(255,255,255,0.1);
}

.contentContainer,
.listHeadingWrapper { width: 100vw; }

.listHeader > div:nth-child(2) {
width: calc(100vw - 100px - 160px - 85px - 130px - 130px - 16px) !important;
}

.listRow > div > div:nth-child(2){
width: calc(100vw - 100px - 160px - 85px - 130px - 130px) !important;
}

.listRowExpanded ~ div > div > div:nth-child(2){
width: calc(100vw - 100px - 160px - 85px - 130px - 130px + 30px) !important;
}

.listRow .expandButton {
background-size: 24px;
color: #000;
filter: invert(1);
}

.listRow .expandButton[style*="closed24.png"] {
background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cGF0aCBkPSJNOTYsMzcwLjljMCwxNS41LDEyLjcsMjkuMSwyOC4yLDI5LjFoMjY2LjNjMTUuNSwwLDI1LjUtMTMuNiwyNS41LTI5LjFWMjA4SDk2VjM3MC45eiIvPjxwYXRoIGQ9Ik00MTYsMTY4LjhjMC0xNS41LTEwLTI0LjgtMjUuNS0yNC44YzAsMC0xNTQuNywwLTE2NywwYy00LjcsMC0xMC43LTkuOS0xOC41LTE5Yy03LjEtOC4zLTE0LjctMTMtMjAuNS0xMyAgIGMtNy41LDAtNjAuMywwLTYwLjMsMGMtMTUuNSwwLTI4LjIsOC45LTI4LjIsMjQuM1YxOTJoMzIwVjE2OC44eiIvPjwvZz48L3N2Zz4=') !important;
}

.listRow .expandButton[style*="open24.png"] {
background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cGF0aCBkPSJNNDMwLjEsMTkySDgxLjljLTE3LjcsMC0xOC42LDkuMi0xNy42LDIwLjVsMTMsMTgzYzAuOSwxMS4yLDMuNSwyMC41LDIxLjEsMjAuNWgzMTYuMmMxOCwwLDIwLjEtOS4yLDIxLjEtMjAuNWwxMi4xLTE4NS4zICAgQzQ0OC43LDE5OSw0NDcuOCwxOTIsNDMwLjEsMTkyeiIvPjxnPjxwYXRoIGQ9Ik00MjYuMiwxNDMuM2MtMC41LTEyLjQtNC41LTE1LjMtMTUuMS0xNS4zYzAsMC0xMjEuNCwwLTE0My4yLDBjLTIxLjgsMC0yNC40LDAuMy00MC45LTE3LjRDMjEzLjMsOTUuOCwyMTguNyw5NiwxOTAuNCw5NiAgICBjLTIyLjYsMC03NS4zLDAtNzUuMywwYy0xNy40LDAtMjMuNi0xLjUtMjUuMiwxNi42Yy0xLjUsMTYuNy01LDU3LjItNS41LDYzLjRoMzQzLjRMNDI2LjIsMTQzLjN6Ii8+PC9nPjwvZz48L3N2Zz4=') !important;
}

/* https://www.iconfinder.com/search?q=folder&iconset=ionicons */

.selectionHeader img {
filter: brightness(0) invert(1);
transform: scale(0.75);
}

.gwt-Button {
background: #ffffff;
text-shadow: none !important;
box-shadow: none !important;
color: #1d2025;
border: none;
}

.gwt-Button:hover {
background: #02dac5;
color: #ffffff;
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
color: #1d2025;
}

header #logo {
position: relative;
}

header #logo::after {
    content: "+";
    display: inline-block;
    background: #434b55;
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

    `);

})();
