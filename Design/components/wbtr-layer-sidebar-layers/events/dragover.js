
import props from '../utils/props.js';

class Dragover {
	static _handler(e){		
		e.preventDefault();
        if (e.clientX == props._dmX && e.clientY == props._dmY) return false;
        props._dmX = e.clientX;
        props._dmY = e.clientY;
 
        props._dropOverEl?.classList.remove('active');
        props._dropOverEl = props._eTarget.closest('.dropfree');
        const layerLiEl = props._eTarget.closest('[data-layer]');

        if(layerLiEl) {
            layerLiEl.appendChild(props._layerDropTop);
            layerLiEl.appendChild(props._layerDropBottom);
        }

        if(props._dropOverEl) props._dropOverEl.classList.add('active');
	}	
}

export default Dragover;