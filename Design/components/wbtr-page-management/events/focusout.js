
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Focusout {
	static _handler(){
		if(props._eTarget.dataset.eventId === 'page-list-item') this._pageNameFocusOut();
	}

	static _pageNameFocusOut(){
		const pageLiEl = props._eTarget.closest('[data-page]');
		pageLiEl.contentEditable = false;
		
		if(pageLiEl.innerText.trim().length == 0){
			pageLiEl.innerText = pageLiEl.getAttribute('data-before-edit-page-name').trim();
			methods._pageNameChangedDone();				
		}
	}
} 

export default Focusout;