 
import props from '../utils/props.js'; 

class Pointermove {
	static _handler(e){
		
		if(props._mboxActive && WBTR.eventTarget.dataset.eventId === 'moveable-box') this._moveableBoxMove(e);
	}

	
	static _moveableBoxMove(e){
		if(!WBTR.eventTarget.hasPointerCapture(e.pointerId)) return false;
		props._mBoxmX = e.clientX;
		props._mBoxmY = e.clientY;
		props._mboxel.style.left = (props._mboxelX+props._mBoxmX-props._mBoxdX)+'px';
		props._mboxel.style.top = (props._mboxelY+props._mBoxmY-props._mBoxdY)+'px';

	    if((props._mboxelX+props._mBoxmX-props._mBoxdX) < 10) props._mboxel.style.left = '10px';
	    if((props._mboxelY+props._mBoxmY-props._mBoxdY) < 10) props._mboxel.style.top = '10px';
	    if((props._mboxelY+props._mBoxmY-props._mBoxdY) > document.body.offsetHeight-100) props._mboxel.style.top = document.body.offsetHeight-100+'px';
	    if((props._mboxelX+props._mBoxmX-props._mBoxdX) > document.body.offsetWidth-200) props._mboxel.style.left = document.body.offsetWidth-200+'px';
	}
}

export default Pointermove;