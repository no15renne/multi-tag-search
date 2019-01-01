import Vue from 'vue'

setTimeout(function(){
  const tagContainer = $('.TagContainer');
  tagContainer.after(`<div id="multi-tag-search-app"><multi-tag-search></multi-tag-search></div>`);
  new Vue({ el: '#multi-tag-search-app' });
}, 1000);

const getSearchImgURL = () => {
  const searchImg = document.getElementById('multi-tag-search-link');
  return chrome.extension.getURL('./static/img/search.png');
}

Vue.component('multi-tag-search', {
  data: function() {
    return {
      searchImg: getSearchImgURL(),
      tags: []
    }
  },
  methods: {
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
    },
    deleteTag: function(index) {
      this.tags.splice(index, 1);
    }
  },
  template: `
    <div id="multi-tag-search"
      v-on:dragover="onDragOver"
      v-on:drop="onDrop">
      <ul id="multi-tag-search-tags">
        <li class="multi-tag-search-tags-item"
            v-for="(tag, index) in tags"
            v-on:click="deleteTag(index)">
          <span class="multi-tag-search-tags-text">{{tag}}</span>
          <span class="multi-tag-search-tags-delete">×</span>
        </li>
      </ul>
      <span id="multi-tag-search-link">
        <a v-bind:href="getLink()" target="_brank" rel="noopener"><img v-bind:src="searchImg" alt="複合タグ検索"></a>
      </span>
    </div>`
});
