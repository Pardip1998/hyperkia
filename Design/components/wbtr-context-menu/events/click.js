
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Click {

	static _handler(e){		
		if(props._eTarget === props._root.$id.wrapper) methods._closeActiveMenu();
		if(props._eTarget.closest('[data-menu-action]')) this._menuActionClicked();
	}

	static _menuActionClicked(){
		if(props._eTarget.closest('[data-id="layersmenu"]')) methods._layerMenuClicked();
		methods._closeActiveMenu();
	} 
}

export default Click;