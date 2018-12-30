setTimeout(function(){
	const tagContainer = $('.TagContainer');
	tagContainer.after(`
<div id="multi-tag-search">
	<ul id="multi-tag-search-tags"></ul>
	<span id="multi-tag-search-link">
		<a href="/tag/hoge" target="_brank"><img src="" width="24px" height="24px" alt="複合タグ検索"></a>
	</span>
</div>
`);

	$("#multi-tag-search").on('dragover', onDragOver);
	$("#multi-tag-search").on('drop', onDrop);

	const searchImageURL = chrome.extension.getURL('./src/img/search.png');
	$('#multi-tag-search-link > a > img').attr('src', searchImageURL);
	updateLink();
}, 1000);

function onDragOver(e) {
	e.preventDefault();
}

function onDrop(e) {
  e.preventDefault();
	const data = e.originalEvent.dataTransfer.getData('text');
	const tag = data.match(/https:\/\/www.nicovideo.jp\/tag\/(.*)\??(.*)$/);
	if(tag && tag.length >= 2) {
		addTag(decodeURI(tag[1]));
	}
}

function updateLink(){
	const tags = [];
	$.each($('#multi-tag-search-tags > li > span.multi-tag-search-tags-text'), function(index, tag){
		tags.push($(tag)[0].innerText);
	});
	$('#multi-tag-search-link > a').attr('href', `/tag/${tags.join(' ')}`);
}

function addTag(text){
	$('#multi-tag-search-tags').append(`<li class="multi-tag-search-tags-item" onclick="deleteTag(this)"><span class="multi-tag-search-tags-text">${text}</span><span class="multi-tag-search-tags-delete">×</span></li>`);
	updateLink();
}

function deleteTag(dom){
	$(dom).remove();
	updateLink();
}
