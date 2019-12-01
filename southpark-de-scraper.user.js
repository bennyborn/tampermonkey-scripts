// ==UserScript==
// @name         Episode Scraper
// @version      0.1
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://*.southpark.de/*
// @run-at       document-start
// @grant        none
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/southpark-de-scraper.user.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/southpark-de-scraper.user.js
// ==/UserScript==

(function() {

	var button = document.createElement('BUTTON');
	button.innerHTML = 'Copy links';
	button.style = 'display: block; position: fixed; top: 10px; left: 10px;';

	button.addEventListener('click', function(e){

		var episodes = document.querySelectorAll('#carouselMain li > a');
		var all = [];

		for( var i=0; i<episodes.length; i++ ) {

			var ep = episodes[i].querySelector('.video-detail').innerHTML.toUpperCase();
			var name = episodes[i].querySelector('.title').innerHTML;

			var title = `${ep} - ${name}`;
			title = title.replace(/"|:|\?|!/g,'');
			title = title.replace(/&amp;/g,'&');
			title = title.replace(/ö/g,'oe');
			title = title.replace(/ä/g,'ae');
			title = title.replace(/ü/g,'ue');
			title = title.replace(/Ö/g,'Oe');
			title = title.replace(/Ä/g,'ae');
			title = title.replace(/Ü/g,'ue');
			title = title.replace(/\s+/g,' ');

			var link = episodes[i].href;
			link = link.substring(0,link.indexOf('#'));

			var cmds = [];

			cmds.push(`youtube-dl -f best --output "tmp/%(autonumber)1d.mkv" "${link}"`);
			cmds.push(`find "tmp" -path "*.mkv" | sed 's:\ :\\\ :g'| sed 's/^/file /' > "fl.txt"`);
			cmds.push(`sleep 3`);
			cmds.push(`ffmpeg -f concat -i "fl.txt" -c copy "${title}.mkv"`);
			cmds.push(`rm fl.txt`);
			cmds.push(`rm -rf tmp`);

			all.push( cmds.join(" ; ") );
			//copyStringToClipboard( cmds.join("\n") );

		}

		copyStringToClipboard( all.join(" ; ") );
		alert('copied');
	});

	document.body.appendChild(button);


	function copyStringToClipboard (str) {
	   var el = document.createElement('textarea');
	   el.value = str;
	   el.setAttribute('readonly', '');
	   el.style = {position: 'absolute', left: '-9999px'};
	   document.body.appendChild(el);
	   el.select();
	   document.execCommand('copy');
	   document.body.removeChild(el);
	}

})();
