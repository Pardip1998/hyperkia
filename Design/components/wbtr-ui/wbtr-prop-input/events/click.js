import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Click {
   
    static _handler() {        
       if(props._eTarget.dataset.eventId == 'open-color-picker') {
        if(WBTR.canvas._props._currentTargetCSSRules['background-image'].indexOf('-gradient(')>0) {
            WBTR.createGradientPopover._methods._openCreateGradient(props._eRootNode);
            WBTR.element._showElementPositionAvailableX(props._eRootNode.getRootNode().host, WBTR.createGradientPopover);
        } else {
            WBTR.colorPickerPopover._methods._openColorPicker(props._eRootNode);            
            WBTR.element._showElementPositionAvailableX(props._eRootNode.getRootNode().host, WBTR.colorPickerPopover);
        }
          
       }
    }

}

export default Click;