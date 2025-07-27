
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Keyup {
	
	static _handler(){
		if(props._eTarget.dataset.eventId === 'page-list-item') {
			methods._pageNameChangedDone();
			WBTR.canvas.$id['pageName'+props._eTarget.dataset.page].innerText = props._eTarget.innerText; 
		}
	}

}

export default Keyup;