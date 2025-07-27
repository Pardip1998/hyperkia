

import props from './props.js';


const Methods = {

	_markupSetup(thisEl){
		const tempEl = document.createElement('div');
		thisEl.shadowRoot.appendChild(tempEl);
		tempEl.insertAdjacentHTML('afterend', thisEl.innerHTML)
		thisEl.innerHTML = '';
		tempEl.remove();
		thisEl.$id.details = thisEl.shadowRoot.querySelector('details');
	},

	_setDropdownPosition(){}, 
 
	_dropDownItemSelected(){
		const dEl = props._eRootNode.$id.details;
		dEl.querySelector('.select-option.selected').classList.remove('selected');
		const currentSelected = props._eTarget.closest('.select-option');
		currentSelected.classList.add('selected');		
		props._eRootNode.setAttribute('value', currentSelected.getAttribute('value'));
		dEl.removeAttribute('open');
		dEl.children[0].innerHTML = props._eTarget.innerHTML;
		
		const changeEvent = new Event('change', {bubbles: true, cancelable: true, composed: true});
		props._eRootNode.dispatchEvent(changeEvent);
	},

	_selectedValueOption(thisEl, valu){		
		const dEl = thisEl.$id.details;
		dEl.querySelector('.select-option.selected')?.classList.remove('selected');
		const optionEl = dEl.querySelector(`.select-option[value="${valu}"]`);
		if(!optionEl) return;
		optionEl.classList.add('selected');
		dEl.querySelector('.select-trigger').innerHTML = optionEl.innerHTML;		
	}


 
}

export default Methods;




