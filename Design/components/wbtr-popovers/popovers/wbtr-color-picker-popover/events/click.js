import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Click {
  
    static _handler(e) {       
       if(props._eTarget.dataset.eventId === 'clrstyle') this._switchColorStyle();
    } 

    static _switchColorStyle(){
        WBTR.createGradientPopover._methods._openCreateGradient();        
        WBTR.createGradientPopover.style.top = WBTR.colorPickerPopover.style.top;
        WBTR.createGradientPopover.style.left = WBTR.colorPickerPopover.style.left;        
        WBTR.colorPickerPopover._methods._popoverHide();
    }
}

export default Click;