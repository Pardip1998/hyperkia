import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Click {
  
    static _handler() {            
       if(!props._eRootNode.$id.details.open) {
            methods._setDropdownPosition();
       } else if(props._eTarget.closest('.select-option')) {
            methods._dropDownItemSelected();
       }
    }

}

export default Click;