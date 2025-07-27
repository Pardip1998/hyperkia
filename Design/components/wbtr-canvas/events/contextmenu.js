
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Contextmenu {

	static _handler(e){
		e.preventDefault();
		const layerEl = props._eTarget.closest('[data-layer]');
		if(!layerEl) return;
		WBTR.canvas._methods._updateClickToActiveLayer(layerEl.dataset.layer);		
		WBTR.contextMenu._methods._openMenu(e, 'layersmenu', layerEl);
	} 

}

export default Contextmenu;