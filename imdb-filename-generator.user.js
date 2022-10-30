// ==UserScript==
// @name         IMDB Filename Generator
// @description  Generate a filename of the shown movie for use in Emby or Jellyfin
// @version      0.1.1
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://www.imdb.com/title/tt*/
// @run-at       document-end
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/imdb-filename-generator.user.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/imdb-filename-generator.user.js
// ==/UserScript==

(function() {

    'use strict';

    GM_addStyle(`

        button.copyButton {

            position: fixed;
            z-index: 10;
            left: 1em;
            bottom: 1em;

            display: inline-block;
            padding: 1.25em 2em;
            
            background: #f5c518;
            cursor: pointer;
            
            border: 0;
            border-radius: 5px;

            font-family: var(--ipt-font-family);
            font-size: var(--ipt-font-root-size);
            color: rgb(0, 0, 0);
        }

        button.copyButton:hover {
            background: #000;
            color: #fff;
        }
    `);

    const button = document.createElement('BUTTON');
    button.className = 'copyButton';
    button.dataset.textDefault = 'Copy filename';
    button.dataset.textCopied = 'copied!';
    button.innerText = button.dataset.textDefault;
    button.style = '';

    document.body.appendChild(button);

    button.addEventListener('click', function(e){

        const title = document.querySelector('h1[data-testid="hero-title-block__title"]').innerText;
        const id = document.location.href.match(/imdb\.com\/title\/([t0-9]+)/)[1];

        copyStringToClipboard(`${title} [imdbid=${id}]`);
        this.innerText = button.dataset.textCopied;

        setTimeout(function(){
            button.innerText = button.dataset.textDefault;
        },3000);
    });

    const copyStringToClipboard = (str)=>{

        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

})();
