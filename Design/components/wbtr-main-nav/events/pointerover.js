
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Pointerover {

	static _handler(e){
		if(props._eTarget.closest('.nav-menu-item')) this._activeCurrentNavMenuItem();
	}

	static _activeCurrentNavMenuItem(){
		const oldActiveItem = props._root.shadowRoot.querySelector('.nav-menu-item.hover');
		const currentActiveItem = props._eTarget.closest('.nav-menu-item');

		props._root.shadowRoot.querySelectorAll(`[data-nav-menu-lavel="${currentActiveItem.dataset.navMenuLavel}"]`).forEach((el)=>{
			el.classList.remove('hover');
		})

		currentActiveItem.classList.add('hover');
		
	}
}

export default Pointerover;