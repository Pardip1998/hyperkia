

import props from './props.js';
const Index = {	

	_modalOpen(modalName){
		WBTR.modals.classList.add('show');
		WBTR[modalName]._methods._modalShow();
		WBTR[modalName].classList.add('show');		
	},

	_modalClose(){
		WBTR.modals.classList.remove('show');
		props._eTarget.getRootNode().host.classList.remove('show');
		props._eTarget.getRootNode().host._methods._modalHide();		
	}

}

export default Index;




