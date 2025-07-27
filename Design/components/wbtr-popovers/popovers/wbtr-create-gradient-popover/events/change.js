import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Change {
    static _handler() {
        if(props._eTarget.dataset.name === 'gradient-types') this._gradientTypeModify();
    }

    static _gradientTypeModify(){
        props._root.$id.wrapper.setAttribute('current-gradient-types', props._eTarget.value);
        props._gradientData.type = props._eTarget.value;
        methods._callComponentMethods(['_updateGradientValueToCanvasTarget']);
        WBTR.canvas._methods._saveCanvasCurrentTargetToIndexedDB();
    }

    

}

export default Change;

