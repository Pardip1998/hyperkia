import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Pointermove {
    static _handler(e) {     
    
        switch(props._pointerDownPart) {
            case 'color-area':
                this._colorAreaPointerMove(e);
                break;

        }        
    }

    static _colorAreaPointerMove(e) {
        if (!props._root.hasPointerCapture(e.pointerId)) return false;
        let x = e.clientX - props._colorAreaElRect.left;
        let y = e.clientY - props._colorAreaElRect.top;
        if(x>props._colorAreaElRect.width) x = props._colorAreaElRect.width;
        if(y>props._colorAreaElRect.height) y = props._colorAreaElRect.height;
        if(x<0) x = 0;
        if(y<0) y = 0;        
        props._root.$id.colorAreaPoint.style.left = x + 'px';
        props._root.$id.colorAreaPoint.style.top = y + 'px';
        const rgb = methods._getColorAtPoint(x, y);
        props._cc.rgb = rgb;
        methods._setAlphaColor();
        methods._setColorCodeFields();
    }

}

export default Pointermove;

