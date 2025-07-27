
import props from '../utils/props.js';
 
class Pointerout {

	static _handler(e){
		if(props._eTarget.closest('[data-layer]')) this._canvasLayerHoverSelected();
	}

	static _canvasLayerHoverSelected(){
		const index = props._eTarget.closest('[data-layer]').dataset.layer;		
		WBTR.canvas.shadowRoot.querySelector(`[data-layer="${index}"]`)?.classList.remove('overlayer');
	}

}

export default Pointerout;