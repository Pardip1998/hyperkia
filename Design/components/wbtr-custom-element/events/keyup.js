
import props from '../utils/props.js'; 
 
class Keyup {
	static _handler(){
		if(WBTR.eventTarget.dataset.prop) WBTR.canvas._methods._saveCanvasCurrentTargetToIndexedDB();
	}	
}

export default Keyup;