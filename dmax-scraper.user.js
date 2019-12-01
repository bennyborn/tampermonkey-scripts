// ==UserScript==
// @name         DMAX Episode Scraper
// @version      0.2
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://www.dmax.de/programme/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/dmax-scraper.user.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/dmax-scraper.user.js
// ==/UserScript==

(function() {

	'use strict';

	const scrapeButton = document.createElement('BUTTON');
	scrapeButton.innerHTML = 'Copy links';
	scrapeButton.style = 'display: block;position: fixed;top: 10px;left: 10px;background: #dc5014;color: #fff;padding: 0.5em 2em;z-index: 10000;box-shadow: 0 0 4px rgba(0,0,0,0.5);';

    const cmds = [];

	scrapeButton.addEventListener('click', function(e){

        const season = /Staffel ([0-9]+) \|/g.exec(document.querySelector('h2.section-title__title').innerText)[1].padStart(2,'0');
        const episodes = document.querySelectorAll('li.vertical-list-item');

        episodes.forEach((episode) => {

            const link = episode.querySelector('a').href;
            const headline = /F([0-9]+): (.*?)$/g.exec(episode.querySelector('h3').innerText);
            const num = headline[1];
            const name = headline[2];

            let title = `S${season}E${num} - ${name}`;
            title = title.replace('?','');
            title = title.replace('!','');

            cmds.push(`youtube-dl --format bestvideo+bestaudio/best --output "${title}.%(ext)s" "${link}"`);
        });

        copyStringToClipboard( cmds.join("\n") );
        alert('copied');
	});


	document.body.appendChild(scrapeButton);


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
