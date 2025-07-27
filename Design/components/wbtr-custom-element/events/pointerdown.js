
import props from '../utils/props.js'; 
 
class Pointerdown {
	static _handler(e){
		
		
	}

	
	static _moveableBoxDown(e){
		props._mboxActive = true;
		props._mBoxdX = e.clientX;
		props._mBoxdY = e.clientY;

		if(WBTR.eventTarget.dataset.moveableBoxTarget === 'component'){
			props._mboxel = WBTR[WBTR.eventTarget.dataset.moveableBoxTargetName];			
		}

		props._mboxelX = +(window.getComputedStyle(props._mboxel)['left'].replace('px',''));
		props._mboxelY = +(window.getComputedStyle(props._mboxel)['top'].replace('px',''));
		WBTR.eventTarget.setPointerCapture(e.pointerId);
	}
}

export default Pointerdown;