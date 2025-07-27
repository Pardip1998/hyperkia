import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Input {
    static _handler() {
        const eventId = props._eTarget.dataset.eventId;

        if (eventId === "hue-range") this._hueRange();
        if (eventId === "rgb")  this._rgbFields();
        if (eventId === "hex") this._hexField();
        if (eventId === "alpha-range") this._alphaRange();
        if (eventId === "alpha-code") this._alphaCodeField();
    }
 
    static _hueRange(){
        props._cc.pureRGB = methods._getHueGradientColorAt(props._eTarget.value);
        methods._setColorAreaColor();
        methods._setColorCodeFields();
    }

    static _rgbFields(){
        const labelId = props._eTarget.dataset.label;
        props._cc.rgb[labelId] = +props._eTarget.value;
        props._cc.pureRGB = methods._rgbToPureRGBColor();
        methods._setColorAreaColor();
        methods._setColorCodeFields('hex');
        console.log(3);
        methods._setColorAreaPointer();
    }

    static _hexField(){
        props._cc.hex = methods._fixHexColor(props._eTarget.value);
        props._cc.rgb = methods._hexToRGB(props._cc.hex);
        props._cc.pureRGB = methods._rgbToPureRGBColor();
        methods._setColorAreaColor();
        methods._setColorCodeFields('rgb');
        methods._setColorAreaPointer();
    }

    static _alphaRange(){
        props._root.$id.alphaCode.value = Math.trunc((+props._root.$id.alphaRange.value)*100);
        props._cc.alpha = props._root.$id.alphaRange.value;
        methods._setColorCodeFields();      
    }

    static _alphaCodeField(){
        props._root.$id.alphaRange.value = ((+props._root.$id.alphaCode.value)/100).toFixed(2);
        props._cc.alpha = props._root.$id.alphaRange.value;
        methods._setColorCodeFields();
    }

}

export default Input;