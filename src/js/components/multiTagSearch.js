import Vue from 'vue'

import multiTag from './multiTag.js'

const getSearchImgURL = () => {
  // eslint-disable-next-line no-undef
  return chrome.extension.getURL('./static/img/search.png');
}

const multiTagSearch = Vue.component('multi-tag-search', {
  data: function() {
    return {
      searchImg: getSearchImgURL(),
      tags: []
    }
  },
  components: {
    multiTag
  },
  methods: {
    deleteTag: function(index) {
      this.tags.splice(index, 1);
    },
    getLink: function() {
      return '/tag/' + this.tags.join(' ');
    },
    onDragOver: function(e) {
      e.preventDefault();
    },
    onDrop: function(e) {
      e.preventDefault();
      const data = e.dataTransfer.getData('text');
      const rawTag = data.match(/https:\/\/www.nicovideo.jp\/tag\/(.*)\??(.*)$/);
      if(rawTag && rawTag.length >= 2) {
        const tag = decodeURI(rawTag[1]);
        if(!this.tags.includes(tag)){
          this.tags.push(tag);
        }
      }
    }
  },
  template: `
    <div id="multi-tag-search"
      v-on:dragover="onDragOver"
      v-on:drop="onDrop">
      <multi-tag
        v-bind:tags="tags"
        v-bind:deleteTag="deleteTag"
      ></multi-tag>
      <span id="multi-tag-search-link">
        <a v-bind:href="getLink()" target="_brank" rel="noopener"><img v-bind:src="searchImg" alt="複合タグ検索"></a>
      </span>
    </div>`
});

export default multiTagSearch;
