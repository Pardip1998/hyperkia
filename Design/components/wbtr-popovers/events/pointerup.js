import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Pointerup {
  
    static _handler(e) {                               
        if(props._mboxActive && props._eTarget.dataset.eventId === 'moveable-box') this._moveableBoxUp(e); 
    }

    
    static _moveableBoxUp(e){
        props._mboxActive = false;        
        props._eTarget.releasePointerCapture(e.pointerId);    
    }

}

export default Pointerup;