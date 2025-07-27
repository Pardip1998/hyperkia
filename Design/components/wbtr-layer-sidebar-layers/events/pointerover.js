
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Pointerover {

	static _overLayerEl = null;

	static _handler(e){
		this._overLayerEl = props._eTarget.closest('[data-layer]');
		if(this._overLayerEl) this._canvasLayerHoverSelected();
	}

	static _canvasLayerHoverSelected(){
		const index = this._overLayerEl.dataset.layer;
		WBTR.canvas.shadowRoot.querySelector('[data-layer].overlayer')?.classList.remove('overlayer');		
		WBTR.canvas.shadowRoot.querySelector(`[data-layer="${index}"]`).classList.add('overlayer');
	}
}

export default Pointerover;