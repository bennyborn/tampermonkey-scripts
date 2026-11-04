// ==UserScript==
// @name         TMDB Dark Mode
// @namespace    https://www.themoviedb.org/
// @version      1.0.0
// @description  Dark Mode for The Movie Database (themoviedb.org)
// @author       @bennyborn
// @namespace    https://github.com/bennyborn
// @match        https://www.themoviedb.org/*
// @match        https://themoviedb.org/*
// @run-at       document-start
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/tmdb-dark-mode.user.js
// @downloadURL  https://raw.githubusercontent.com/bennyborn/tampermonkey-scripts/master/tmdb-dark-mode.user.js
// ==/UserScript==

(function () {
  'use strict';

  const CSS = `
  :root {
    --d-bg:        #0f1419;
    --d-bg-2:      #161c24;
    --d-bg-3:      #1d252f;
    --d-border:    #2a3441;
    --d-text:      #e4e8ee;
    --d-text-dim:  #9aa6b5;
    --d-link:      #5ab0f0;
    --d-accent:    #01b4e4;
    color-scheme: dark;
  }

  html, body { background: var(--d-bg) !important; color: var(--d-text) !important; }

  /* Haupt-Container / weiße Flächen */
  .content_wrapper, .column, .column_wrapper, .content, .inner_content,
  .white_column, .media_items, .results, .search_results, .main_content,
  .filter_panel, .panel, .sub_media, .scroller_wrap, #main, main, section,
  .full_wrapper, .media, .item, .details, .comment, .card:not(.style_1),
  .menu_wrapper, .sub_menu, .k-modal, .modal, .popup, .tooltip, .ui-tooltip,
  .account_menu, .dropdown_menu, .ui-menu, .select2-dropdown, .select2-results {
    background-color: transparent;
    color: var(--d-text);
  }

  .filter_panel, .panel, .card.style_1, .card.style_2, .card.style_3, .card.style_4,
  .search_results .card, .results .card, .comment, .review, .discussion,
  .k-modal, .modal, .popup, .tooltip, .ui-tooltip, .dropdown_menu, .ui-menu,
  .account_menu, .select2-dropdown, .sub_menu, .ui-autocomplete {
    background-color: var(--d-bg-2) !important;
    border-color: var(--d-border) !important;
    color: var(--d-text) !important;
  }

  /* Karten auf Listen / Suche */
  .card.v4, .card.v4.tight, .card .wrapper, .card .content, .results .card {
    background: var(--d-bg-2) !important;
    border-color: var(--d-border) !important;
  }
  .card { box-shadow: 0 1px 4px rgba(0,0,0,.5) !important; }

  /* Header / Navigation bleiben dunkel, Untermenüs anpassen */
  header, nav.header { background: #0a1520 !important; }
  header .sub_media, .sub_media { background: #0a1520 !important; }
  .sub_media a, .menu li a { color: var(--d-text) !important; }
  .sub_menu, .navigation .sub_menu { background: var(--d-bg-2) !important; }
  .navigation .sub_menu li a:hover, .dropdown_menu li a:hover,
  .ui-menu .ui-state-active, .ui-menu-item:hover { background: var(--d-bg-3) !important; color: #fff !important; }

  /* Footer */
  footer, .k-footer { background: #0a1520 !important; }

  /* Texte */
  h1, h2, h3, h4, h5, h6, p, span, li, td, th, label, dt, dd, strong, b, em, small,
  .title, .title a, .overview, .facts, .release, .release_date, .character, .credits,
  .info, .name, .item_name, .gender, .known_for, .sort_by, .section_header {
    color: var(--d-text);
  }
  .release_date, .release, .character, .known_for, .meta, .tagline, small, .subtle,
  .sub_title, .date, .count, .runtime, .certification_text, .credits .job {
    color: var(--d-text-dim) !important;
  }
  /* Header-Banner (Film-Detailseite) behält weißen Text */
  .header.large *, .header.poster *, .header_poster_wrapper *, section.inner_content.header * ,
  .title.ott_false *, .banner *, .hero * { color: inherit; }
  .header.large, .header.poster, .header_poster_wrapper { color: #fff; }

  a { color: var(--d-link); }
  a:hover { color: #8fd0ff; }
  .title a, .card .content h2 a, .card .wrapper a { color: var(--d-text) !important; }
  .title a:hover, .card .content h2 a:hover { color: var(--d-accent) !important; }

  /* Trennlinien */
  hr, .border, .bordered, .line, .divider, table, th, td, ul, li, .filter_panel li,
  .panel > .name, .panel > .filter, .item_hr, section > header, .pagination, .results .card {
    border-color: var(--d-border) !important;
  }

  /* Formulare */
  input, textarea, select, .select2-selection, .k-input, .search input,
  .select2-container--default .select2-selection--single,
  .select2-container--default .select2-selection--multiple {
    background-color: var(--d-bg-3) !important;
    color: var(--d-text) !important;
    border-color: var(--d-border) !important;
  }
  input::placeholder, textarea::placeholder { color: var(--d-text-dim) !important; }
  select option { background: var(--d-bg-2); color: var(--d-text); }
  .search input { background: transparent !important; color: #fff !important; }
  .search_results .search_bar input, #search_v4 input, .search_bar input {
    background: var(--d-bg-3) !important; color: var(--d-text) !important;
  }
  .select2-container--default .select2-selection--single .select2-selection__rendered { color: var(--d-text) !important; }
  .select2-container--default .select2-results__option--highlighted { background: var(--d-accent) !important; color: #000 !important; }
  .select2-container--default .select2-results__option { background: var(--d-bg-2); color: var(--d-text); }

  /* Buttons */
  .k-button, .button, button, .btn, .load_more a, a.button, .pill, .search_by_button,
  .k-btn, .pagination a, .pagination span, .filter_panel .search_btn, .load_more {
    border-color: var(--d-border);
  }
  .filter_panel .panel .filter_btn, .load_more a, .load_more .load_more_btn,
  .results_footer, .pagination a, .pagination span {
    background-color: var(--d-bg-3) !important;
    color: var(--d-text) !important;
  }
  .load_more a:hover, .pagination a:hover { background-color: var(--d-accent) !important; color: #000 !important; }
  .pagination .current, .pagination span.current { background-color: var(--d-accent) !important; color: #000 !important; }

  /* Tabs / Filterchips */
  .tabs, .tabs li, .tabs a, .menu_wrapper li, .filter_tabs, .pill, .tag, .tags li,
  .genres a, .keywords li, .keyword_list li a {
    background-color: var(--d-bg-3) !important;
    color: var(--d-text) !important;
    border-color: var(--d-border) !important;
  }
  .tabs li.selected a, .tabs a.selected, .filter_tabs .selected { color: var(--d-accent) !important; border-color: var(--d-accent) !important; }

  /* Tabellen */
  table, tr, td, th { background: transparent; color: var(--d-text); }
  tr:nth-child(even) td { background: rgba(255,255,255,.03); }

  /* Scroller-Fade (weiße Verläufe am Rand der Karussells) */
  .scroller_wrap::after, .scroller_wrap .fade, .fade, .fade.after, .fade.before,
  .scroller_wrap .fade_after, .media_items .fade, .slider .fade {
    background: linear-gradient(to right, rgba(15,20,25,0) 0%, var(--d-bg) 100%) !important;
  }
  .fade.before, .scroller_wrap .fade_before {
    background: linear-gradient(to left, rgba(15,20,25,0) 0%, var(--d-bg) 100%) !important;
  }

  /* Bewertungs-Kreis: Hintergrund passend dunkel */
  .consensus .outer_ring, .score_wrapper .outer_ring { background-color: #081c22 !important; }
  .user_score_chart, .percent, .circle { background-color: transparent !important; }

  /* Hero-Bereich (Detailseiten): keine eckigen Kästen hinter Tags, Jahr, Genres, Aktionsbuttons */
  .header .tag, .header .release_date, .header .genres a,
  .title .tag, .title .release_date, .title .genres a,
  .facts .tag, .facts .genres a, .facts .release {
    background-color: transparent !important;
    border-color: transparent !important;
  }
  .header .tooltip, ul.actions li.tooltip, ul.actions li .tooltip,
  .header .k-button, .header .button {
    background-color: transparent !important;
    box-shadow: none !important;
  }

  /* Cast-/Personen-Karten */
  .people.scroller .card, .scroller .card, .credits .card, .cast_list .card {
    background: var(--d-bg-2) !important;
    border: 1px solid var(--d-border) !important;
  }
  .scroller .card .info, .scroller .card p { color: var(--d-text) !important; }
  .scroller .card .info .character, .scroller .card p.character { color: var(--d-text-dim) !important; }

  /* Reviews / Diskussionen */
  .review_container, .review_container .content, .discussion_row, .discussion .row,
  .forum_row, .forums .row, .post_container, .comment, .info_wrapper, .reply, .reply_body {
    background: var(--d-bg-2) !important;
    border-color: var(--d-border) !important;
    color: var(--d-text) !important;
  }
  .teaser, .content p, .content div { color: var(--d-text); }

  /* Cookie / Privacy-Banner, Dialoge */
  .ui-dialog, .ui-widget-content, .k-modal .content, #consent-banner {
    background: var(--d-bg-2) !important; color: var(--d-text) !important; border-color: var(--d-border) !important;
  }

  /* Bilder leicht abdunkeln (optional, dezent) */
  img { filter: brightness(.92); }
  img:hover { filter: none; }
  .logo img, header img, footer img, .poster img[src*="logo"], svg { filter: none !important; }

  /* Kendo UI (Bearbeiten-Masken, Filter, Dropdowns) */
  .k-picker, .k-dropdownlist, .k-multiselect, .k-combobox, .k-autocomplete, .k-dateinput,
  .k-datepicker, .k-numerictextbox, .k-input, .k-input-solid {
    background-color: var(--d-bg-3) !important;
    color: var(--d-text) !important;
    border-color: var(--d-border) !important;
  }
  .k-input-inner, .k-input-value-text, .k-input-button {
    background-color: transparent !important;
    color: var(--d-text) !important;
  }
  .k-chip, .k-chip-solid, .k-chip-filled {
    background-color: #33414f !important;
    color: #f2f5f8 !important;
    border-color: var(--d-border) !important;
  }
  .k-chip * { color: #f2f5f8 !important; }
  .k-disabled { opacity: .85 !important; }
  .k-picker.k-disabled, .k-input.k-disabled { background-color: #151b22 !important; }
  .k-picker.k-disabled *, .k-input.k-disabled * { color: var(--d-text-dim) !important; }
  .k-popup, .k-list-container, .k-list, .k-list-content, .k-window, .k-dialog, .k-calendar {
    background-color: var(--d-bg-2) !important;
    color: var(--d-text) !important;
    border-color: var(--d-border) !important;
  }
  .k-list-item, .k-item { background-color: transparent !important; color: var(--d-text) !important; }
  .k-list-item:hover { background-color: var(--d-bg-3) !important; }
  .k-list-item.k-selected, .k-list-item.k-focus { background-color: var(--d-accent) !important; color: #000 !important; }
  .k-button, .k-button-solid, .k-button-solid-base {
    background-color: var(--d-bg-3) !important;
    color: var(--d-text) !important;
    border-color: var(--d-border) !important;
  }
  .k-button:hover { background-color: var(--d-border) !important; }
  .k-button-solid-primary { background-color: var(--d-accent) !important; color: #000 !important; }

  /* Kendo Grid / Toolbar (z.B. "Nach einer Idee von", Crew-, Besetzungs-Tabellen) */
  .k-grid, .k-grid-header, .k-grid-content, .k-grid-container, .k-grid-footer, .k-grid-toolbar,
  .k-toolbar, .k-pager, .k-table, .k-table-thead, .k-table-tbody, .k-table-row, .k-table-td,
  .k-table-th, .k-grid td, .k-grid th, .k-listview, .k-filter-row, .k-grid-pager, .k-splitter, .k-drawer {
    background-color: var(--d-bg-2) !important;
    color: var(--d-text) !important;
    border-color: var(--d-border) !important;
  }
  .k-grid-toolbar, .k-toolbar, .k-grid-header, .k-table-thead, .k-table-th, .k-grid th { background-color: var(--d-bg-3) !important; }
  .k-table-alt-row, .k-alt { background-color: #1a212a !important; }
  .k-table-row:hover, .k-grid tr:hover td { background-color: #222c38 !important; }
  .k-grid * { color: inherit; }
  .k-grid a { color: var(--d-link) !important; }
  .k-grid .k-button { background-color: var(--d-bg-3) !important; color: var(--d-text) !important; }
  .k-grid-norecords, .k-no-data { background: var(--d-bg-2) !important; color: var(--d-text-dim) !important; }
  .k-grid input, .k-grid .k-input { background-color: var(--d-bg) !important; color: var(--d-text) !important; }

  /* Änderungsverlauf (diff2html) */
  .d2h-wrapper, .d2h-file-wrapper, .d2h-file-diff, .d2h-diff-table, .d2h-diff-tbody, .d2h-code-wrapper,
  .d2h-files-diff, .d2h-file-side-diff, .d2h-code-side-line, .d2h-code-line, .d2h-diff-table tr,
  .d2h-diff-table td, .d2h-emptyplaceholder, .d2h-code-side-emptyplaceholder {
    background-color: var(--d-bg-2) !important;
    color: var(--d-text) !important;
    border-color: var(--d-border) !important;
  }
  .d2h-file-header, .d2h-file-header.d2h-sticky-header, .d2h-file-name-wrapper {
    background-color: var(--d-bg-3) !important;
    color: var(--d-text) !important;
    border-color: var(--d-border) !important;
  }
  .d2h-file-name, .d2h-tag { color: var(--d-text) !important; }
  .d2h-code-linenumber, .d2h-code-side-linenumber {
    background-color: #11161d !important; color: #6f7d8f !important; border-color: var(--d-border) !important;
  }
  .d2h-info, td.d2h-info, .d2h-info .d2h-code-line, .d2h-info .d2h-code-linenumber {
    background-color: var(--d-bg-3) !important; color: var(--d-text-dim) !important; border-color: var(--d-border) !important;
  }
  .d2h-ins, .d2h-ins .d2h-code-line, .d2h-ins.d2h-change, td.d2h-ins {
    background-color: #12301f !important; color: #d6f5e0 !important; border-color: #1f5a35 !important;
  }
  .d2h-ins .d2h-code-linenumber { background-color: #173d28 !important; color: #9fd8b3 !important; }
  .d2h-del, .d2h-del .d2h-code-line, td.d2h-del {
    background-color: #3a1a1f !important; color: #ffd9de !important; border-color: #6a2a33 !important;
  }
  .d2h-del .d2h-code-linenumber { background-color: #4a2128 !important; color: #e6a8b0 !important; }
  .d2h-code-line ins, .d2h-code-side-line ins { background-color: #1e6b3c !important; color: #fff !important; }
  .d2h-code-line del, .d2h-code-side-line del { background-color: #8a2f3b !important; color: #fff !important; }
  .d2h-cntx, .d2h-cntx .d2h-code-line { background-color: var(--d-bg-2) !important; color: var(--d-text) !important; }
  .d2h-code-line-ctn, .d2h-code-line-prefix, .d2h-code-side-line .d2h-code-line-ctn {
    background-color: transparent !important; color: inherit !important;
  }

  /* Scrollbars */
  * { scrollbar-color: #3a4656 var(--d-bg); }
  ::-webkit-scrollbar { background: var(--d-bg); width: 12px; height: 12px; }
  ::-webkit-scrollbar-thumb { background: #3a4656; border-radius: 6px; border: 2px solid var(--d-bg); }

  ::selection { background: var(--d-accent); color: #000; }
  `;

  // Style früh einfügen (document-start), Fallback ohne GM_addStyle
  const inject = () => {
    if (typeof GM_addStyle === 'function') {
      GM_addStyle(CSS);
    } else {
      const s = document.createElement('style');
      s.id = 'tmdb-dark-mode';
      s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  };
  inject();

  // Inline-Weiß (z.B. per JS gesetzte Hintergründe) abfangen
  const fixInline = (root) => {
    root.querySelectorAll('[style*="background-color: rgb(255, 255, 255)"], [style*="background: rgb(255, 255, 255)"], [style*="background-color:#fff"], [style*="background:#fff"]')
      .forEach(el => { el.style.setProperty('background-color', 'var(--d-bg-2)', 'important'); });
  };
  document.addEventListener('DOMContentLoaded', () => {
    fixInline(document);
    new MutationObserver(muts => muts.forEach(m => m.addedNodes.forEach(n => n.nodeType === 1 && fixInline(n))))
      .observe(document.body, { childList: true, subtree: true });
  });
})();
