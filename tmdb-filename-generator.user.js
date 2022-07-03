// ==UserScript==
// @name         TMDB Filename Generator
// @description  Generate a filename of the shown movie for use in Emby or Jellyfin
// @version      0.1
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://www.themoviedb.org/movie/*
// @match        https://www.themoviedb.org/tv/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/tmdb-filename-generator.user.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/tmdb-filename-generator.user.js
// ==/UserScript==

(function() {

	'use strict';

	const button = document.createElement('BUTTON');
	button.innerHTML = 'Copy filename';
	button.style = 'display: block;position: fixed;top: 10px;left: 10px;background: rgba(var(--tmdbLightBlue), 1);color: rgb(255, 255, 255);padding: 0.5em 2em;z-index: 10000;border: 0;border-radius: 2em;';

	button.addEventListener('click', function(e){

		const title = document.querySelector('div.title h2').innerText;
		const id = document.location.href.match(/themoviedb\.org\/(movie|tv)\/([0-9]+)/)[2];

		copyStringToClipboard(`${title} [tmdbid=${id}]`);
		this.innerText = 'copied!';
	});

	document.body.appendChild(button);

	function copyStringToClipboard(str) {

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
