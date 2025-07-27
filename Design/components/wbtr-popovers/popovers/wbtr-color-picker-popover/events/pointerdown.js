import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Pointerdown {
    static _handler(e) {
        if (props._eTarget.closest('[data-event-id="color-area"]')) this._colorAreaPointerDown(e);
    }

    static _colorAreaPointerDown(e) {        
        props._root.setPointerCapture(e.pointerId); 
        props._colorAreaElRect = props._root.$id.colorArea.getBoundingClientRect();
        props._pointerDownPart = 'color-area';       
        const x = e.clientX - props._colorAreaElRect.left;
        const y = e.clientY - props._colorAreaElRect.top;
        props._root.$id.colorAreaPoint.style.left = x + 'px';
        props._root.$id.colorAreaPoint.style.top = y + 'px';
        const rgb = methods._getColorAtPoint(x, y);
        props._cc.rgb = rgb;
        methods._setAlphaColor();
        methods._setColorCodeFields();        
    }

}

export default Pointerdown;