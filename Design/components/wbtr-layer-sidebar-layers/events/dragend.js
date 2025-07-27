
import props from '../utils/props.js';

class Dragend {
	static _handler(e){        
		
        if(props._dropEl) {
            if(props._dropEl.matches('.dropfree-top')) {
                props._dropEl.parentElement.before(props._dragEl);
            } else if (props._dropEl.matches('.dropfree-bottom')) {
                props._dropEl.parentElement.after(props._dragEl);
            }
        }
        props._dropOverEl?.classList.remove('active');

        this._layerZIndexOrderManage();        
	}

    static _layerZIndexOrderManage(){
        const index = props._dragEl.dataset.layer;
        const layerEl = WBTR.canvas.shadowRoot.querySelector(`[data-layer="${index}"]`);
        let order = 0;

        if(props._dragEl.previousElementSibling) {
            order = +(props._dragEl.previousElementSibling.style.order) + 1;
        } else if (props._dragEl.nextElementSibling) {
            order = +(props._dragEl.nextElementSibling.style.order) - 1;
        }

        props._dragEl.style.order = order;
        layerEl.style.zIndex = order;

        WBTR.canvas._methods._saveCanvasCurrentTargetToIndexedDB(layerEl);
    }
}

export default Dragend;