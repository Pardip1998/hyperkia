
import props from '../utils/props.js';
 
class Change {
	static _handler(e){		
		if( WBTR.eventTarget.dataset.prop )  {
			if(['justify-content','align-items'].includes(WBTR.eventTarget.dataset.prop)) WBTR.canvas._props._currentTarget.style.display = 'flex';
			WBTR.canvas._methods._inputToCanvasCurrentTarget();
			WBTR.canvas._methods._saveCanvasCurrentTargetToIndexedDB();
		}
	}
}

export default Change;