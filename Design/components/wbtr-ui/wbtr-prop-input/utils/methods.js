

import props from './props.js';


const Methods = {

	_markupSetup(thisEl){

		const tempEl = document.createElement('div');
		thisEl.shadowRoot.appendChild(tempEl);
		tempEl.insertAdjacentHTML('afterend', thisEl.innerHTML)
		thisEl.innerHTML = '';
		tempEl.remove();
		thisEl.$id.wrapperEl = thisEl.shadowRoot.querySelector('.forminput-wrapper');
		thisEl.$id.input = thisEl.shadowRoot.querySelector('input');
		thisEl.dataset.propUnit = thisEl.$id.input.dataset.propUnit || '';
	},



}

export default Methods;




