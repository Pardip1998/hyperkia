 
import props from '../utils/props.js'; 
 
class Pointerup {
	static _handler(e){
		
		if(props._mboxActive && WBTR.eventTarget.dataset.eventId === 'moveable-box') this._moveableBoxUp(e);
	}

	
	static _moveableBoxUp(e){
		props._mboxActive = false;        
    WBTR.eventTarget.releasePointerCapture(e.pointerId);    
	}
}

export default Pointerup;