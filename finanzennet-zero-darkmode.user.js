// ==UserScript==
// @name         finanzen.net zero Dark Mode
// @description  Dark Mode for the Desktop version (relaunch 2026)
// @version      0.2.1
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://mein.finanzen-zero.net/*
// @run-at       document-start
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/finanzennet-zero-darkmode.user.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/finanzennet-zero-darkmode.user.js
// @icon         https://www.google.com/s2/favicons?domain=mein.finanzen-zero.net
// ==/UserScript==

(function() {

    'use strict';

    const enableTheme = () => {

        const root = document.documentElement;

        if (!root) {
            return false;
        }

        const apply = () => {
            if (root.dataset.theme !== 'dark') {
                root.dataset.theme = 'dark';
            }
        };

        apply();

        new MutationObserver(apply).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

        return true;
    };

    if (!enableTheme()) {

        const observer = new MutationObserver(() => {
            if (enableTheme()) {
                observer.disconnect();
            }
        });

        observer.observe(document, { childList: true });
    }

    GM_addStyle(`

        html:root.zero-rebrush-2026[data-theme="dark"] {
          color-scheme: dark;
        
          --surface-page: #0a0c0f;
          --surface-base: #0f1215;
          --surface-basetint: #11161c;
          --surface-raised: #161a1f;
          --surface-subtle: #1b2026;
          --surface-floating: #222831;
          --surface-input-field: #0f1215;
          --surface-input-field-input-field: #0f1215;
          --surface-overlay: rgba(0, 0, 0, .65);
          --surface-semi-transparent: rgba(22, 26, 31, .65);
          --surface-semi-transparent-blur: rgba(22, 26, 31, .88);
        
          --content-default: #e8ebee;
          --content-muted: #aab3bd;
          --content-subtle: #7f8a96;
        
          --color-partnership: #2a1d44;
        
          --border-default: #2a3038;
          --border-muted: #3a424c;
        
          --color-grey-50: #f2f4f6;
          --color-grey-100: #e8ebee;
          --color-grey-200: #d3d8de;
          --color-grey-300: #aab3bd;
          --color-grey-400: #8c96a2;
          --color-grey-500: #6a7480;
          --color-grey-600: #3a424c;
          --color-grey-700: #2a3038;
          --color-grey-800: #1b2026;
          --color-grey-900: #12161a;
        
          --shadow-card-shadow-1: rgba(0, 0, 0, .5);
          --shadow-modal-shadow: rgba(0, 0, 0, .7);
          --shadow-popover-shadow: rgba(0, 0, 0, .7);
        }
        
        html[data-theme="dark"] body,
        html[data-theme="dark"] body.zero-backdrop,
        html[data-theme="dark"] body.main-backdrop {
          background: var(--surface-page) !important;
          color: var(--content-default);
        }
        
        html[data-theme="dark"] .bg-white,
        html[data-theme="dark"] .zero-card.bg-white,
        html[data-theme="dark"] .tile,
        html[data-theme="dark"] .zero-backdrop.box-white,
        html[data-theme="dark"] .post-box-page__card,
        html[data-theme="dark"] .box-white.alert {
          background-color: var(--surface-raised) !important;
        }
        
        html[data-theme="dark"] img[src*="logo-invest-color"] {
          filter: invert(1) hue-rotate(180deg);
        }
        
        html[data-theme="dark"] .tv-lightweight-charts {
          filter: invert(.91) hue-rotate(180deg);
        }
        
        html[data-theme="dark"] a.link-primary,
        html[data-theme="dark"] a.link.link-primary {
          color: var(--content-info);
        }
        html[data-theme="dark"] .new-venue-hint {
          color: #0a0c0f;
        }
        html[data-theme="dark"] ::placeholder {
          color: var(--content-subtle);
          opacity: 1;
        }

        html[data-theme="dark"] .chart-container:not(:has(.tv-lightweight-charts)) canvas,
        html[data-theme="dark"] .suggestion-dot {
          filter: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f' color-interpolation-filters='sRGB'%3E%3CfeComponentTransfer%3E%3CfeFuncR type='gamma' exponent='.5'/%3E%3CfeFuncG type='gamma' exponent='.5'/%3E%3CfeFuncB type='gamma' exponent='.5'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3C/svg%3E#f");
        }
        html[data-theme="dark"] img[src*="extraetf-logo"] {
          filter: invert(1) hue-rotate(180deg);
        }

    `);
})();
