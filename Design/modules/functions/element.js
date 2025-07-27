
const WBTR_Element = {

	$id: {},

	_storeIdElements(){		
		document.querySelectorAll('[id]').forEach((el)=>{			
			this.$id[WBTR.helper.underScoreToCamelCase(el.id)] = el;
		})
	},

	_makeElementEditableWithFocus(editElement){		
		if( editElement.contentEditable == 'true' ) return;
		editElement.contentEditable = true;
		editElement.focus();
		
		const range = document.createRange();
		const selection = window.getSelection();
		range.selectNodeContents(editElement);
		range.collapse(false);
		selection.removeAllRanges();
		selection.addRange(range);			
	},

	getRect(element){
		const rect = element.getBoundingClientRect();
		return {
			y: +((rect.y).toFixed(0)),
			right: +((rect.right).toFixed(0)),
			bottom: +((rect.bottom).toFixed(0)),
			x: +((rect.x).toFixed(0)),
			width: +((rect.width).toFixed(0)),
			height: +((rect.height).toFixed(0)),
		}
	},

	getSvgRect(element){
		const rect = element.getBBox();
		return {
			x: +((rect.x).toFixed(0)),
			y: +((rect.y).toFixed(0)),
			width: +((rect.width).toFixed(0)),
			height: +((rect.height).toFixed(0)),
		}
	},

	getCSS(element, prop){
		if(Array.isArray(prop)) {
			const props = {};
			const cssProps = window.getComputedStyle(element);
			prop.forEach((p)=>{
				props[p] = cssProps[p];
			})
			return props;
		}
		return window.getComputedStyle(element)[prop];
	},

	_selectedOptionValueToDetailsValue(element){
		const detailsEl = element.closest('details');
		const valu = detailsEl.querySelector('.select-option.selected').getAttribute('value');
		detailsEl.setAttribute('value', valu);
	},

	_showElementPositionAvailableX(spaceEl, positionEl){
		const rect = spaceEl.getBoundingClientRect();
	    const leftSpace = rect.x;
	    const rightSpace = document.body.offsetWidth-rect.right;
	  
	    let leftValu = '';
	    if(leftSpace>rightSpace) leftValu = (leftSpace-positionEl.offsetWidth-10);
	    if(leftSpace<=rightSpace) leftValu = (rect.right+10);
	    positionEl.style.left = leftValu+'px';
	},
}

export default WBTR_Element;

