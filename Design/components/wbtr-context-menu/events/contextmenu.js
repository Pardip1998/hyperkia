
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Contextmenu {

	static _handler(e){
		e.preventDefault();		
		let layerEl = WBTR.layerSidebarLayers.shadowRoot.elementsFromPoint(e.clientX,e.clientY).find(el => el.matches('[data-layer]'));
		if(!layerEl) layerEl = WBTR.canvas.shadowRoot.elementsFromPoint(e.clientX,e.clientY).find(el => el.matches('[data-layer]'));
		if(!layerEl) {
			methods._closeActiveMenu();
			return;
		}
		WBTR.canvas._methods._updateClickToActiveLayer(layerEl.dataset.layer);
		const activeMenuId = WBTR.helper.underScoreToCamelCase(props._root.shadowRoot.querySelector('.menu.show').dataset.id);		
		methods._openMenu(e,activeMenuId,layerEl);
	} 

}

export default Contextmenu;