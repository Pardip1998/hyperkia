import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Input {

    static debounceTimeout = '';

    static _handler(e) {       
        if(props._eTarget.dataset.eventId === 'gradient-degree-input') this._gradientDegreeModify();
        if(props._eTarget.dataset.id === 'gradient-tracks-range' && props.activeGradientTrack) this._detectingGradientTrackRange();
        if(props._eTarget.dataset.eventId === 'gradientpoint-stop-input') this._gradientPointStopModify();
        if(e.target.dataset.eventId === 'gppoint-input') this._updateGradientFromGradientPointColor();
    }

    static _detectingGradientTrackRange(){        
        const colorStop = props._eTarget.value;
        const gradientTrackId = +props.activeGradientTrack.dataset.gradientTrack;
        props._root.$id.gradientpoints.children[gradientTrackId].querySelector('.gradientpoint-stop-input').value = colorStop;
        props._gradientData.colorStops[gradientTrackId].percentage = colorStop+'%';
        props.activeGradientTrack.style.left = colorStop+'%';
        methods._callComponentMethods(['_updateGradientValueToCanvasTarget']); 

    }

    static _gradientDegreeModify(){        
        props._gradientData.angle = props._eTarget.value+'deg';
        methods._callComponentMethods(['_updateGradientValueToCanvasTarget']);
    }

    static _gradientPointStopModify(){
        const index = props._eTarget.closest('[data-gradient-point]').dataset.gradientPoint;
        const percentage = props._eTarget.value+'%';
        props._gradientData.colorStops[index].percentage = percentage;
        props._root.$id.gradientTracks.children[index].style.left = percentage;
        methods._callComponentMethods(['_updateGradientValueToCanvasTarget']);
    }

    static _updateGradientFromGradientPointColor(){
        const color = props._eTarget.value;
        const index = props._eTarget.closest('[data-gradient-point]').dataset.gradientPoint;
        props._root.$id.gradientTracks.children[index].style.color = color;
        props._gradientData.colorStops[index].color = color;
        props._eTarget.previousElementSibling.style.backgroundColor = color;
        methods._callComponentMethods(['_updateGradientValueToCanvasTarget']);

    }

}

export default Input;

