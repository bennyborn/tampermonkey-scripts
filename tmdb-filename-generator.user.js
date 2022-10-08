// ==UserScript==
// @name         TMDB Filename Generator
// @description  Generate a filename of the shown movie for use in Emby or Jellyfin
// @version      0.2
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://www.themoviedb.org/movie/*
// @match        https://www.themoviedb.org/tv/*
// @run-at       document-end
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/tmdb-filename-generator.user.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/tmdb-filename-generator.user.js
// ==/UserScript==

(function() {

	'use strict';

    GM_addStyle(`

        button.copyButton {
            display: block;
            width: 100%;
            background: rgba(var(--tmdbLightBlue), 1);
            color: rgb(255, 255, 255);
            padding: 1.25em 2em;
            border: 0;
        }

        button.copyButton:hover {
            background: rgba(var(--tmdbDarkBlue), 1);
        }

        button.copyButton:last-child {
            border-bottom-left-radius: var(--imageBorderRadius);
            border-bottom-right-radius: var(--imageBorderRadius);
        }

        section.inner_content section.images>div.poster_wrapper {
            height: auto;
        }
    `);

    const button = document.createElement('BUTTON');
    button.className = 'copyButton';
    button.dataset.textDefault = 'Copy filename';
    button.dataset.textCopied = 'copied!';
    button.innerText = button.dataset.textDefault;
    button.style = '';

    const wrapper = document.querySelector('.poster_wrapper .poster');
    wrapper.parentNode.insertBefore(button, wrapper.nextSibling);

    button.addEventListener('click', function(e){

        const title = document.querySelector('div.title h2').innerText;
        const id = document.location.href.match(/themoviedb\.org\/(movie|tv)\/([0-9]+)/)[2];

        copyStringToClipboard(`${title} [tmdbid=${id}]`);
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
