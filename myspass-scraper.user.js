// ==UserScript==
// @name         MySpass Episode Scraper
// @version      0.2
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://www.myspass.de/shows/tvshows/*/
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/myspass-scraper.user.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/myspass-scraper.user.js
// ==/UserScript==

(function() {

	'use strict';

	const scrapeButton = document.createElement('BUTTON');
	scrapeButton.innerHTML = 'Copy links';
	scrapeButton.style = 'display: none; position: fixed; top: 10px; left: 10px; color: #ffffff; background: #404055; padding: 0.5em 2em; z-index: 10000; border: 2px solid #0cf; cursor: pointer;';

    document.body.appendChild(scrapeButton);

    const episodeListSelector = '.videoPanel__overlay-content--listView:not([style*="display"]) table tbody tr';

    // set up an observer to check for changes in dom
    const observer = new MutationObserver(function(mutations) {

        if( document.querySelectorAll(episodeListSelector).length ) {
            scrapeButton.style.display = 'block';
        } else {
            scrapeButton.style.display = 'none';
        }
    });

    // observe all available listings
    document.querySelectorAll('.videoPanel__overlay-content--listView').forEach((list)=>{

        observer.observe(list, {
	        attributes: true,
	        childList: true,
	        characterData: true
        });
    });

    // button handling
	scrapeButton.addEventListener('click', function(e){

        const episodes = document.querySelectorAll(episodeListSelector);
        const cmds = [];

		episodes.forEach((episode, index) => {

            const link = episode.querySelector('td:nth-child(1) a').href;

            let name = episode.querySelector('td:nth-child(1) a').innerText;
            const numLen = /^(.*?) -/g.exec(name)[1].length;

            if( /^(.*?) -/g.exec(name)[1].length == 1 ) {
                name = '0'+name;
            }

            const season = episode.querySelector('td:nth-child(2)').innerText.padStart(2,'0');

		    let title = `S${season}E${name}`;
		    title = title.replace('?','');
		    title = title.replace('!','');

            cmds.push(`youtube-dl --format bestvideo+bestaudio/best --output "${title}.%(ext)s" "${link}"`);

            if( index == (episodes.length-1) ) {

                copyStringToClipboard( cmds.join("\n") );
                alert('copied');
            }
		});
	});

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
