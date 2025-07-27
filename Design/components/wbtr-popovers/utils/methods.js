

import props from './props.js';


const Methods = {	

	_popoverOpen(){
		const popoverName = WBTR.eventTarget.closest('[data-event-id="popover-open"]')?.dataset.popoverName;			
		WBTR[popoverName]._methods._popoverShow();		
		WBTR[popoverName].classList.add('show');		
		WBTR[popoverName].setAttribute('data-popover-trigger-component', WBTR.eventTargetComponent.dataset.customElement);
		props._root.classList.add('popover-show'); 
	},

	_popoverClose(){		
		const popoverName = WBTR.eventTarget.closest('[data-event-id="popover-close"]')?.dataset.popoverName;
		WBTR[popoverName].classList.remove('show');
		WBTR[popoverName]._methods._popoverHide();		
		this._closePopoversIfAllClosed();
	},

	_closePopoversIfAllClosed(){
		let isAnyOpen = false;
		props._root.$class.popover.forEach((el)=>{
      if(el.matches('.show')) isAnyOpen = true;
    })
    if(isAnyOpen === false) props._root.classList.remove('popover-show');
	}

}

export default Methods;




