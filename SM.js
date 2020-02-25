let SelectionManager = {
	s: window.getSelection(),
	// get s() {
	// 	return window.getSelection()
	// },
	get range() {
		return this.s.getRangeAt(0)
	},
	set range(v) {
		if (v instanceof Range) {
			this.s.removeAllRanges()
			this.s.addRange(v)
		}
	},
	get text() { return this.range.toString() },
	set text(v) {
		this.range.deleteContents()
		this.range.insertNode(document.createTextNode(v))
		this.range.collapse()
	},
	insert(v, isHtml = false) {
		this.set(v, isHtml)
		this.range.collapse()
	},
	set(v, isHtml = false) {
		this.range.deleteContents()
		if (isHtml) {
			let div = document.createElement('div')
			div.innerHTML = v
			div.childNodes.forEach(node => this.range.insertNode(node))
		} else {
			this.range.insertNode(document.createTextNode(v))
		}
	},
	insertElement(element) {
		// this.range.deleteContents();
		this.range.insertNode(element);
		this.range.collapse(false);
	},
	select(e) {
		if (e instanceof Node) {
			this.s.selectAllChildren(e)
		} else if (e && typeof e === 'string') {
			e = document.querySelector(e)
			this.s.selectAllChildren(e)
		}
	},
	delete() {
		this.s.deleteFromDocument()
		// this.range.deleteContents()
	},
	blur() {
		this.s.removeAllRanges()
	},
};


// export default SelectionManager; //export는 file:///방식으로 안됨
self.SM = SelectionManager; 