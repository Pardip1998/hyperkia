
import props from '../utils/props.js';

class Keyup {

	static _handler(e){
		if(props._eTarget.matches('[data-layer]')) WBTR.canvas._methods._saveCanvasCurrentTargetToIndexedDB();
	}	
	
}

export default Keyup;