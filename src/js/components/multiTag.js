import Vue from 'vue'

const multiTag = Vue.component('multi-tag', {
  props: {
    tags: Array,
    deleteTag: Function
  },
  template: `
    <ul id="multi-tag-search-tags">
      <li class="multi-tag-search-tags-item"
          v-for="(tag, index) in tags"
          v-on:click="deleteTag(index)">
        <span class="multi-tag-search-tags-text">{{tag}}</span>
        <span class="multi-tag-search-tags-delete">×</span>
      </li>
    </ul>`
});

export default multiTag;
