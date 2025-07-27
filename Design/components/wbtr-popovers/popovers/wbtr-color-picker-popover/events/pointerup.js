import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Pointerup {
    static _handler(e) {
        if (props._eTarget.closest('[data-event-id="color-area"]')) this._colorAreaPointerUp(e);
        
    }

    static _colorAreaPointerUp(e){
        props._root.releasePointerCapture(e.pointerId); 
        props._colorAreaPointerDown = false;
    }

}

export default Pointerup;
