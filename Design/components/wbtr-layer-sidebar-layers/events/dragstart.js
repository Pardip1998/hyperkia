
import props from '../utils/props.js';

class Dragstart {
	static _handler(e){		
		props._dragEl = props._eTarget.closest('[data-layer]');		
	}	
}

export default Dragstart;