
import props from '../utils/props.js';  
 
class Click {
	static _handler(e){		
		
		
		
		

		
		if(WBTR.eventTarget.closest('[data-event-id="modal-open"]')) WBTR.modals._methods._modalOpen();
		
		if(WBTR.eventTarget.closest('[data-event-id="modal-close"]')) WBTR.modals._methods._modalClose();

		
		if(WBTR.eventTarget.closest('[data-event-id="tabcontent-open"]')) this._activeCurrentTab();		

		
		if (WBTR.eventTarget.closest('[data-event-id="select-option"]')) this._detailsSelectOptionChange();

		
		if(WBTR.eventTarget.type == 'radio') WBTR.eventTargetComponent._changeHandler(e);		
	}

	static _detailsSelectOptionChange(){
		const selectedOption = WBTR.eventTarget.closest('[data-event-id="select-option"]');
		const detailsEl = selectedOption.closest('details');
		detailsEl.removeAttribute('open');		
		
    const activeOption = detailsEl.querySelector('[data-event-id="select-option"].selected');    
		activeOption?.classList.remove('selected');
		selectedOption.classList.add('selected');
    
    const valu = selectedOption.getAttribute('value');
    detailsEl.firstElementChild.innerText = valu;
    detailsEl.dataset.value = valu;

    
    const changeEvent = new Event('change', {
    	bubbles: true,
    	composed: true,
    })
    detailsEl.dispatchEvent(changeEvent);
	}

	static _activeCurrentTab(){
		const t = WBTR.eventTarget.closest('[data-event-id="tabcontent-open"]');

		
		WBTR.eventTargetComponent.$class.tabmenuItem.forEach((mEl)=>{
			mEl.classList.remove('active');
		})
		t.classList.add('active');

		
		WBTR.eventTargetComponent.$class.fontTabcontent.forEach((tEl)=>{
			tEl.setAttribute('hidden', true);
		})
		WBTR.eventTargetComponent.$id[t.dataset.target].removeAttribute('hidden');
	}

}

export default Click;