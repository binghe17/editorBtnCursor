// import {} from 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js'; // import는 file:///방식으로 안됨.
// import SM from './SM.js';


let ui = {
	editor: document.querySelector('#editor'),
	insImage: document.querySelector('#insImage'),
	insImage2: document.querySelector('#insImage2'),
	saveCursorPoint: document.querySelector('#saveCursorPoint'),
	loadCursorPoint: document.querySelector('#loadCursorPoint'),

	
};

let range;
ui.editor.focus();

ui.editor.addEventListener('blur', function(e){
	// range = SM.range;
	range = window.getSelection().getRangeAt(0)
	// console.log(range);
});


ui.insImage.addEventListener('click', function(e){

	ui.editor.focus();


	// let img = new Image();
	// img.src= '/favicon.ico';

	let img = document.createElement('img');
	img.setAttribute('src', 'https://cdn.icon-icons.com/icons2/2151/PNG/128/map_map_marker_icon_132682.png');

	// SM.insertElement(img);
	range.deleteContents();
	range.insertNode(img);
	range.collapse(false);
	
	ui.editor.focus();
	
});



ui.insImage2.addEventListener('click', function(e){
	ui.editor.focus();


	// let code = `<img src="https://cdn.icon-icons.com/icons2/2151/PNG/128/propellers_icon_132704.png"><div>DIV</div>`;
	let code = `<div><p>IFRAME유튜브</p><iframe width="560" height="315" src="https://www.youtube.com/embed/80za9zdZKzk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;

	//jquery사용
	$(code).each(function(i,elem){
		// SM.insertElement(elem);
		range.deleteContents();
		range.insertNode(elem);
		range.collapse(false);
	})

	
	ui.editor.focus();
	
});

let cursorPoint;
ui.saveCursorPoint.addEventListener('click', function(e){//保存焦点1 及 失去焦点
	cursorPoint = window.getSelection().getRangeAt(0);
	console.log('save',cursorPoint)
});
ui.loadCursorPoint.addEventListener('click', function(e){//还原焦点1
	console.log('load',cursorPoint)
	cursorPoint.setStart(cursorPoint.startContainer, cursorPoint.startOffset);
	cursorPoint.setEnd(cursorPoint.endContainer, cursorPoint.endOffset);
	sel = window.getSelection()
	sel.removeAllRanges();
	sel.addRange(cursorPoint);

});

