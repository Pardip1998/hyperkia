

import props from '../utils/props.js'; 

class Input {
	static _handler(e){		
		if( WBTR.eventTarget.dataset.prop )  {			
			WBTR.canvas._methods._inputToCanvasCurrentTarget();			
		} 
	}	
}

export default Input;