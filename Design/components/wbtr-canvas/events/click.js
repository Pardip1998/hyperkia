
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Click {

	static _clickLayerEl = null;

	static _handler(e){	

		this._clickLayerEl = props._eTarget.closest('[data-layer]');

		if(this._clickLayerEl && WBTR.canvasTools._props._activeTool=='text') {
			WBTR.element._makeElementEditableWithFocus(props._eTarget.closest('[data-layer]'));
		}
		if(this._clickLayerEl) methods._updateClickToActiveLayer(this._clickLayerEl.dataset.layer);		
		if(!this._clickLayerEl) this._nonLayerClicked();
	}

	static _nonLayerClicked(){
		props._root.shadowRoot.querySelector('[data-layer].active')?.classList.remove('active');
	}

	

}

export default Click;