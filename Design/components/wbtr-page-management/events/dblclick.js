
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class dblclick {
	static _handler(){
		if(props._eTarget.dataset.eventId === "page-list-item") this._makePageNameEditable();
	}

	static _makePageNameEditable(){
		props._eTarget.setAttribute('data-before-edit-page-name', props._eTarget.innerText);
		WBTR.element._makeElementEditableWithFocus(props._eTarget);
	}
}

export default dblclick;