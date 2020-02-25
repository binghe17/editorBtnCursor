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



// $("#editor").on("keydown",function(e){if(e.which == 13) { e.preventDefault(); pasteHtmlAtCaret("<br/>");}});
// $('div[contenteditable]').keydown(function(e) {
//     // trap the return key being pressed
//     if (e.keyCode === 13) {
//         // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
//         document.execCommand('insertHTML', false, '<br/>');
//         // prevent the default behaviour of return key pressed
//         return false;
//     }
// });

//Enter키 입력시 div,p태그 내에서 다 br태그 생성
// $('div[contenteditable="true"]').keypress(function(event) {
// 	if (event.which != 13) return true;

// 	var docFragment = document.createDocumentFragment();
// 	//add a new line
// 	var newEle = document.createTextNode('\n');
// 	docFragment.appendChild(newEle);

// 	//add the br, or p, or something else
// 	newEle = document.createElement('br');
// 	docFragment.appendChild(newEle);

// 	//make the br replace selection
// 	var range = window.getSelection().getRangeAt(0);
// 	range.deleteContents();
// 	range.insertNode(docFragment);

// 	//create a new range
// 	range = document.createRange();
// 	range.setStartAfter(newEle);
// 	range.collapse(true);

// 	//make the cursor there
// 	var sel = window.getSelection();
// 	sel.removeAllRanges();
// 	sel.addRange(range);

// 	return false;
// });


//---------------------------------

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

$('#editor *').click(function(){
	event.stopPropagation();
	document.querySelector('#domPathBox').innerHTML= getDomPath(this).join(' > ');
	// console.log(this)
	if(isAccessTagName(this))
		showElementCursor(tagNameSelectDom(this));//this.parentNode
		
})




//===============================================================

//판단; 태그이름에 속할때
function isAccessTagName(elem, accessTagName='|IMG|IFRAME|A|'){
	if(accessTagName.indexOf('|'+ elem.tagName +'|') > -1) return true;
	else return false;
}
function tagNameSelectDom(elem, accessTagName='|IMG|IFRAME|'){
	if(accessTagName.indexOf('|'+ elem.tagName +'|') > -1) return elem.parentNode;
	else return elem;
}


//----------------------------best

//dom 위치에 커서를 가져가기. (isInFront: 0일때 dom선택, 1일때 dom앞에 커서, 2일때 dom뒤에 커서) //IE,Edge에서 안됨(커서가 앞에감)
function showElementCursor(elem, isInFront=2){
	range = window.getSelection().getRangeAt(0);
	range.selectNode(elem);
	if(isInFront === 1) range.collapse(true);
	else if(isInFront === 2) range.collapse(false);
	console.log(this)
}

//커서위치가 변할때




// ------------------------------
//dom path구하기.
function getDomPath(el) {
	var stack = [];
	while ( el.parentNode != null ) {
	//   console.log(el.nodeName);
	  var sibCount = 0;
	  var sibIndex = 0;
	  for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
		var sib = el.parentNode.childNodes[i];
		if ( sib.nodeName == el.nodeName ) {
		  if ( sib === el ) {
			sibIndex = sibCount;
		  }
		  sibCount++;
		}
	  }
	  if ( el.hasAttribute('id') && el.id != '' ) {
		stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
	  } else if ( sibCount > 1 ) {
		stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
	  } else {
		stack.unshift(el.nodeName.toLowerCase());
	  }
	  el = el.parentNode;
	}
	return stack.slice(1); // removes the html element
}
// var path = getDomPath(element);
// console.log(path)// [object Array]: ["body", "div#editor", "p:eq(3)", "img"]
// console.log(path.join(' > '));//body > div#editor > p:eq(3) > img


//jQuery방식: dom path 구하기.
(function( $ ){
    var getStringForElement = function (el) {
        var string = el.tagName.toLowerCase();
        if (el.id) {
            string += "#" + el.id;
        }
        if (el.className) {
            string += "." + el.className.replace(/ /g, '.');
        }
        return string;
    };

    $.fn.getDomPath = function(string) {
        if (typeof(string) == "undefined") {
            string = true;
        }
        var p = [],
            el = $(this).first();
        el.parents().not('html').each(function() {
            p.push(getStringForElement(this));
        });
        p.reverse();
        p.push(getStringForElement(el[0]));
        return string ? p.join(" > ") : p;
    };
})( jQuery );
// console.log($('img').getDomPath(false));//result (array): (4) ["body", "div#editor", "p", "img"]
// console.log($('img').getDomPath());//result (string): body > div#editor > p > img
