
import props from '../utils/props.js';
import methods from '../utils/methods.js'; 
 
class Input { 
	static _handler(e){		
		if(props._eTarget.dataset.name === 'flex-alignment') WBTR.canvas._methods._inputCSSPropsToCanvastarget(props._eTarget);
		if(props._eTarget.dataset.prop === 'border-width') methods._manageBorderCSS();
		if(e.target.matches('[data-prop]')) WBTR.canvas._methods._inputCSSPropsToCanvastarget(e.target);
	}
} 

export default Input;