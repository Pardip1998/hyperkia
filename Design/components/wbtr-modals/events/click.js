
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Click {

	static _handler(e){		
		if(props._eTarget.closest('[data-event-id="modal-close"]')) methods._modalClose();
		if(props._eTarget.nodeName === 'WBTR-MODALS') this._closedAllModals();
	}

	
    static _closedAllModals(){
        props._root.classList.remove('show');        
        props._root.$class.modal.forEach((mEl)=>{
            mEl.classList.remove('show');
        });
    }

}

export default Click;