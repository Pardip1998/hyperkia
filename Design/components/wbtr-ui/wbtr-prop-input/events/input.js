import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Input {
  
    static _handler() {    	
      WBTR.canvas._methods._inputCSSPropsToCanvastarget(props._eTarget);
    }

}

export default Input;