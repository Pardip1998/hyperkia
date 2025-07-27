import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Pointerdown {

    static _handler(e) {
        
        if(props._eTarget.dataset.id === 'gradient-tracks-range'){
            this._detectActiveGradientTrack(e);         
        }
    }

    
 
}

export default Pointerdown;