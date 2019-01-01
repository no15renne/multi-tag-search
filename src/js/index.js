import Vue from 'vue'

import multiTagSearch from './components/multiTagSearch.js'

setTimeout(() => {
  const tagContainer = $('.TagContainer');
  tagContainer.after(`<div id="multi-tag-search-app"><multi-tag-search></multi-tag-search></div>`);
  new Vue({ el: '#multi-tag-search-app' });
}, 1000);
