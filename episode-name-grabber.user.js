// ==UserScript==
// @name         Episode Name Grabber
// @description  Copies the german episode names into you clipboard for renaming your local files
// @version      0.0.2
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://www.fernsehserien.de/*/episodenguide
// @match        https://www.serienjunkies.de/*/alle-serien-staffeln.html
// @match        https://www.themoviedb.org/*/*/season/*
// @run-at       document-end
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/episode-name-grabber.user.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/episode-name-grabber.user.js
// ==/UserScript==

(function() {

    'use strict';

    GM_addStyle(`

        #episode-name-grabber {

            position: fixed;
            z-index: 100;
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

        #episode-name-grabber:hover {
            background: #000;
            color: #fff;
        }
    `);

    const button = document.createElement('BUTTON');
    button.id = 'episode-name-grabber';
    button.dataset.textDefault = 'Copy episodes';
    button.dataset.textCopied = '👏 copied!';
    button.innerText = button.dataset.textDefault;
    button.style = '';

    document.body.appendChild(button);

    button.addEventListener('click', function(e){

        let filenames = [];

        // fernsehserien.de
        if( document.location.hostname.indexOf('fernsehserien.de') !== -1 ) {

            const episodes = document.querySelectorAll('section[itemprop="containsSeason"] a[role="row"]');

            for( const episode of episodes ) {

                const season = episode.querySelector('div:nth-child(4)').textContent.trim().slice(0, -1);
                const number = episode.querySelector('div[itemprop="episodeNumber"]').textContent;
                const title = episode.querySelector('div:nth-child(7) span').textContent.trim();

                filenames.push(`S${season.padStart(2, '0')}E${number.padStart(2, '0')} - ${title}`);
            }

        // serienjunkies.de
        } else if( document.location.hostname.indexOf('serienjunkies.de') !== -1 ) {

            const episodes = document.querySelectorAll('table[id^="season"] tr:nth-child(n+2)');

            for( const episode of episodes ) {

                const seasonEpisode = episode.querySelector('td:nth-child(2)').textContent;
                const season = seasonEpisode.split('x')[0];
                const number = seasonEpisode.split('x')[1];
                const title = episode.querySelector('td:nth-child(5)').textContent.trim();

                filenames.push(`S${season.padStart(2, '0')}E${number.padStart(2, '0')} - ${title}`);
            }

        // serienjthemoviedb.org
        } else if( document.location.hostname.indexOf('themoviedb.org') !== -1 ) {

            const episodes = document.querySelectorAll('.episode_list .card');
            const season = document.location.href.split('/').pop().match(/[0-9]+/)[0];

            for( const episode of episodes ) {

                const number = episode.querySelector('span.episode_number').textContent.trim();
                const title = episode.querySelector('h3').textContent.trim();

                filenames.push(`S${season.padStart(2, '0')}E${number.padStart(2, '0')} - ${title}`);
            }
        }

        copyStringToClipboard(filenames.join("\n"));
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
