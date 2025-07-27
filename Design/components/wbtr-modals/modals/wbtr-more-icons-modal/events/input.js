
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Input {
	static _handler(e){		
		if(props._eTarget.dataset.eventId === 'search-fontawesome-icon') methods.searchIcons();
	}

}

export default Input;