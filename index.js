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

	// let img = document.createElement('img');
	// img.setAttribute('src', 'https://cdn.icon-icons.com/icons2/2151/PNG/128/map_map_marker_icon_132682.png');
	// // SM.insertElement(img);
	// range.deleteContents();
	// range.insertNode(img);
	// range.collapse(false);


	// let div = document.createElement('span');
	// // div.setAttribute('contenteditable','false');
	// div.className = 'imageWrapper';
	// div.innerHTML = '<img src="https://cdn.icon-icons.com/icons2/2151/PNG/128/map_map_marker_icon_132682.png">';
	// range.deleteContents();
	// range.insertNode(div);
	// range.collapse(false);


	// let code = `<br><img src="https://cdn.icon-icons.com/icons2/2151/PNG/128/map_map_marker_icon_132682.png"><br>`;
	let code = `<div class="imageWrapper" contenteditable="false"><img src="https://cdn.icon-icons.com/icons2/2151/PNG/128/map_map_marker_icon_132682.png"></div>`;
	//jquery사용
	$(code).each(function(i,elem){
		// SM.insertElement(elem);
		range.deleteContents();
		range.insertNode(elem);
		range.collapse(false);
	});
	ui.editor.focus();
	// console.log(focusDom())
	// showElementCursor(focusDom())
});





// function createCaretPlacer(atStart) {
//     return function(el) {
//         el.focus();
//         if (typeof window.getSelection != "undefined"  && typeof document.createRange != "undefined") {
// 			console.log('1111111')
//             var range = document.createRange();
//             range.selectNodeContents(el);
//             range.collapse(atStart);
//             var sel = window.getSelection();
//             sel.removeAllRanges();
//             sel.addRange(range);
//         } else if (typeof document.body.createTextRange != "undefined") {
// 			console.log('2222222')
//             var textRange = document.body.createTextRange();
//             textRange.moveToElementText(el);
//             textRange.collapse(atStart);
//             textRange.select();
//         }
//     };
// }

// var placeCaretAtStart = createCaretPlacer(true);
// var placeCaretAtEnd = createCaretPlacer(false);

// editor = document.querySelector('#editor');
// if (editor.exportSelection() == null) {
//     var placeCaretAtEnd = createCaretPlacer(false);
//     placeCaretAtEnd(document.getElementById(id));
// }
// editor.pasteHTML('<div>1111111</div>');



ui.insImage2.addEventListener('click', function(e){
	ui.editor.focus();

	// let code = `<img src="https://cdn.icon-icons.com/icons2/2151/PNG/128/propellers_icon_132704.png"><div>DIV</div>`;
	// let code = `<div><p>IFRAME유튜브</p><iframe width="560" height="315" src="https://www.youtube.com/embed/80za9zdZKzk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
	let code = `<div class="iframeWrapper" contenteditable="false"><div><iframe width="560" height="315" src="https://www.youtube.com/embed/80za9zdZKzk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div><br>`;
	//jquery사용
	$(code).each(function(i,elem){
		// SM.insertElement(elem);
		range.deleteContents();
		range.insertNode(elem);
		range.collapse(false);
	})
	ui.editor.focus();

	// var placeCaretAtEnd = createCaretPlacer(false);
	// placeCaretAtEnd(this);
	// console.log(event.target)



});





//Enter키 입력시 div,p태그 내에서 다 br태그 생성
// $('div[contenteditable="true"]').keypress(function(event) {
// 	if (event.which != 13) return true;
// 	var docFragment = document.createDocumentFragment();
// 	var newEle = document.createTextNode('\n');	//add a new line
// 	docFragment.appendChild(newEle);
// 	newEle = document.createElement('br');//add the br, or p, or something else
// 	docFragment.appendChild(newEle);
// 	var range = window.getSelection().getRangeAt(0);//make the br replace selection
// 	range.deleteContents();
// 	range.insertNode(docFragment);
// 	range = document.createRange();//create a new range
// 	range.setStartAfter(newEle);
// 	range.collapse(true);
// 	var sel = window.getSelection();//make the cursor there
// 	sel.removeAllRanges();
// 	sel.addRange(range);
// 	return false;
// });

//--------enter br
var div=document.querySelector('[contenteditable="true"]');
div.onkeypress=function(e){
	if( e.keyCode==13 ){
		var selection=window.getSelection(),
		range=selection.getRangeAt(0),
		br=document.createElement("br");
		range.deleteContents();
		range.insertNode(br);
		range.setStartAfter(br);
		range.setEndAfter(br);
		range.collapse(false);
		selection.removeAllRanges();
		selection.addRange(range);
		return false;
	}
};
div.onkeyup=function(){
  var a=document.activeElement;
  if( a.lastChild && a.lastChild.nodeName!="BR" ){
    a.appendChild(document.createElement("br"));
  }
};






//---------------------------------이벤트

let cursorPoint;
//저장버튼  
ui.saveCursorPoint.addEventListener('click', function(e){//保存焦点1 及 失去焦点
	cursorPoint = window.getSelection().getRangeAt(0);
	console.log('save',cursorPoint)
});
//복구버튼
ui.loadCursorPoint.addEventListener('click', function(e){//还原焦点1
	console.log('load',cursorPoint)
	if(cursorPoint !== undefined){
		cursorPoint.setStart(cursorPoint.startContainer, cursorPoint.startOffset);
		cursorPoint.setEnd(cursorPoint.endContainer, cursorPoint.endOffset);
		sel = window.getSelection()
		sel.removeAllRanges();
		sel.addRange(cursorPoint);
	}
});
//에디터의 모든 요소를 클릭할떄
$('#editor').on('click','*',function(){
	event.stopPropagation();
	console.log(this, this.parentNode)
	if(this.className.indexOf('imageWrapper') > -1){//이미지 영역을 클릭시
		console.log(showElementCursor(focusDom()))
	}else if(this.tagName == 'IMG'){
		console.log(111111, this.parentNode, showElementCursor(this.parentNode))

	}
	else{
		document.querySelector('#domPathBox').innerHTML= getDomPath(this).join(' > ');
		if(isAccessTagName(this)){
			showElementCursor(tagNameSelectDom(this));//this.parentNode
		}
	}
})

//버튼
$('#left').click(function(){
	console.log(focusDom())
	// console.log(rangeText())
	// console.log(rangeTextLength())
	
})
$('#center').click(function(){
	console.log(focusDom());
})









//===============================================================

//판단; 태그이름에 속할때만 실행용
function isAccessTagName(elem, accessTagName='|IMG|IFRAME|A|'){
	if(accessTagName.indexOf('|'+ elem.tagName +'|') > -1) return true;
	else return false;
}
//태그넴에 속한자의 부모를 반환
function tagNameSelectDom(elem, accessTagName='|IMG|IFRAME|'){
	// console.log(elem)
	//contenteditable=false일떄 안에 img가 선택안 되고 상위의 span이 선택된다. 
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
	elem.focus();
	// console.log(this)
}



//커서위치에 있는 dom 반환
function focusDom(type=1){
	range = window.getSelection().getRangeAt(0);
	if(type === 1) return range.endContainer;
	else return range.startContainer;

	//선택한 DOM내용바꾸기
	// if(range.endContainer.nodeType === 1){//1일때 DOM
	// 	range.endContainer.innerHTML =555
	// }else {//3일때 TEXT
	// 	range.endContainer.nodeValue = 333
	// }
}

//선택한 텍스트
function rangeText(){
	range = window.getSelection().getRangeAt(0);
	return range.toString();
}
//선택한 텍스트의 글자수
function rangeTextLength(){
	range = window.getSelection().getRangeAt(0);
	return range.toString().length;
}

//앞으로 몇번째인지 넣으면 뒤로 몇번째인지 계산해준다.
function getTextEndIndex(str, startIndex){
	return - str.slice(startIndex).length ;
}
// console.log(getTextEndIndex('asdfasdf', 3))









// =====================================================
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
