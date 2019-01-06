import Vue from 'vue';

// eslint-disable-next-line no-unused-vars
import multiTagSearch from './components/multiTagSearch.js'

setTimeout(() => {
  const tagContainer = document.querySelectorAll('.TagContainer')[0];
  tagContainer.insertAdjacentHTML("afterend",'<div id="multi-tag-search-app"><multi-tag-search></multi-tag-search></div>');
  new Vue({ el: '#multi-tag-search-app' });
}, 1000);
