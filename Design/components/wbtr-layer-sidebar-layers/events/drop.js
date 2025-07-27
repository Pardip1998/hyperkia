
import props from '../utils/props.js';

class Drop {
	static _handler(e){		
		props._dropEl = props._eTarget.closest('.dropfree');
	}	
}

export default Drop;