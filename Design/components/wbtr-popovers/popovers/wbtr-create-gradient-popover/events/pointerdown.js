import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Pointerdown {

    static _handler(e) {
        
        if(props._eTarget.dataset.id === 'gradient-tracks-range'){
            this._detectActiveGradientTrack(e);         
        }
    }

    static _detectActiveGradientTrack(e){      
        const xPos = e.clientX-props._root.getBoundingClientRect().left;
        const yPos = e.clientY-props._root.getBoundingClientRect().top;
        const pointElements = props._root.shadowRoot.elementsFromPoint(e.clientX,e.clientY);
        props.activeGradientTrack = null;
        pointElements.forEach((el)=>{
            if(el.closest('.gradient-track')) props.activeGradientTrack = el.closest('.gradient-track');           
        })
    }
 
}

export default Pointerdown;