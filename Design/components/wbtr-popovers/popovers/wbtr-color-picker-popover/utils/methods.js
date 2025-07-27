import props from './props.js';


const Methods = {

    
    _defaultUI() {        
        this._setColorAreaColor();
        this._setColorAreaPointer();
        this._setHueGradientPointerPosition();
        this._setAlphaColor();
        this._setAlphaPointerPosition();
        this._setColorCodeFields();
    },

    _openColorPicker(inputEl) {
        props._colorPickerTarget = inputEl || props._colorPickerTarget || WBTR.createGradientPopover._props._gradientPickertarget;
        this._colorToColorPicker(props._colorPickerTarget.value);        
        this._existingValuePropTocanvasTarget();
        this._popoverShow();        
    },

    _existingValuePropTocanvasTarget(){        
        const prop = props._colorPickerTarget.dataset.prop;
        if(!prop) return;

        const tEl = WBTR.canvas._props._currentTarget;
       
        if(tEl instanceof HTMLElement) {
            if(prop === 'background-color'){
                
                tEl.style.backgroundColor = props._cc.hex;                
                tEl.style.backgroundImage = 'none';                            
            } else if(prop === 'border-color') {                
                
                tEl.style.borderColor = props._cc.hex;
            } else if(prop === 'color') {                
                
                tEl.style.color = props._cc.hex;
                tEl.style.backgroundImage = 'none';                            
                tEl.style.webkitBackgroundClip = 'border-box';                                            
                tEl.style['-webkit-text-fill-color'] = 'unset' 
            }
        } else {            
            if(prop === 'background-color'){
                
                tEl.style.fill = props._cc.hex;                
            } else if(prop === 'border-color') {                
                
                tEl.style.stroke = props._cc.hex;
            }
        }
    },
 
    _colorPickerTargetInputEventDispatch(){
        if(!props._colorPickerTarget) return;
        const alphaHex = this._alphaToHex(props._root.$id.alphaCode.value);   
        props._colorPickerTarget.value = props._root.$id.codehex.value+alphaHex;
        console.log(props._colorPickerTarget.value);
        const inputEvent = new Event('input', {bubbles: true, cancelable: true, composed: true});
        props._colorPickerTarget.dispatchEvent(inputEvent);
    },

    _colorToColorPicker(colorHex){        
        props._cc.hex = colorHex;        
        props._cc.rgb = this._hexToRGB(props._cc.hex);        
        props._cc.pureRGB = this._rgbToPureRGBColor();
        this._setColorAreaColor();
        this._setColorAreaPointer();
        this._setColorCodeFields();
        this._setColorAreaPointer();
        this._setHueGradientPointerPosition();
        this._setAlphaColor();
        this._updatePropAlphaValue();
        this._setAlphaPointerPosition();
    },

    _popoverShow(element) {
        WBTR.popovers.classList.add('popover-show');
        props._root.classList.add('show');
    },

    _popoverHide() {
        props._root.classList.remove('show');
    },

    
    _setColorCodeFields(codename = 'all') {
        if (codename === 'hex' || codename === 'all') { 
            props._root.$id.codehex.value = this._RGBtoHex(props._cc.rgb);
            
        }

        if (codename === 'rgb' || codename === 'all') {
            props._root.$id.coder.value = props._cc.rgb.r;
            props._root.$id.codeg.value = props._cc.rgb.g;
            props._root.$id.codeb.value = props._cc.rgb.b;
        }

        if (codename === 'alpha' || codename === 'all') {            
            props._root.$id.alphaCode.value = Math.trunc(props._cc.alpha*100);
        }

        this._colorPickerTargetInputEventDispatch();
    },

    
    _getColorAtPoint: function(x, y) {
        
        const s = Math.max(0, Math.min(1, x / props._colorAreaElRect.width)); 
        const v = 1 - Math.max(0, Math.min(1, y / props._colorAreaElRect.height)); 

        const c = v * s;
        const hPrime = props._cc.baseHue / 60;
        const xVal = c * (1 - Math.abs(hPrime % 2 - 1));
        let r = 0,
            g = 0,
            b = 0;

        if (hPrime >= 0 && hPrime < 1) {
            r = c;
            g = xVal;
            b = 0;
        } else if (hPrime < 2) {
            r = xVal;
            g = c;
            b = 0;
        } else if (hPrime < 3) {
            r = 0;
            g = c;
            b = xVal;
        } else if (hPrime < 4) {
            r = 0;
            g = xVal;
            b = c;
        } else if (hPrime < 5) {
            r = xVal;
            g = 0;
            b = c;
        } else if (hPrime <= 6) {
            r = c;
            g = 0;
            b = xVal;
        }

        const m = v - c;
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return { r, g, b };
    },

    _getPickerCoordinatesFrom() {
        const { r, g, b } = props._cc.rgb;
        const { s, v } = this._rgbToHsv(r, g, b);        
        const x = Math.round(s * props._colorAreaElRect.width); 
        const y = Math.round((1 - v) * props._colorAreaElRect.height); 
        return { x, y };
    },

    _setColorAreaColor() {
        props._root.$id.colorArea.style.backgroundColor = `rgb(${props._cc.pureRGB.r},${props._cc.pureRGB.g},${props._cc.pureRGB.b})`;
        props._cc.baseHue = this._getHueFromRGB();
    },

    _setColorAreaPointer() {
        const { x, y } = this._getPickerCoordinatesFrom();        
        props._root.$id.colorAreaPoint.style.left = ((100 * x) / 200) + '%';
        props._root.$id.colorAreaPoint.style.top = ((100 * y) / 200) + '%';
    },

    
    _getHueGradientColorAt(percent) {
        const stops = [
            { pct: 0, color: [255, 0, 0] }, 
            { pct: 16.66, color: [255, 255, 0] }, 
            { pct: 33.33, color: [0, 255, 0] }, 
            { pct: 50.00, color: [0, 255, 255] }, 
            { pct: 66.66, color: [0, 0, 255] }, 
            { pct: 83.33, color: [255, 0, 255] }, 
            { pct: 100.0, color: [255, 0, 0] } 
        ];

        
        percent = Math.max(0, Math.min(100, percent));

        
        for (let i = 0; i < stops.length - 1; i++) {
            const stop1 = stops[i];
            const stop2 = stops[i + 1];

            if (percent >= stop1.pct && percent <= stop2.pct) {
                const range = stop2.pct - stop1.pct;
                const ratio = (percent - stop1.pct) / range;

                const r = Math.round(stop1.color[0] + (stop2.color[0] - stop1.color[0]) * ratio);
                const g = Math.round(stop1.color[1] + (stop2.color[1] - stop1.color[1]) * ratio);
                const b = Math.round(stop1.color[2] + (stop2.color[2] - stop1.color[2]) * ratio);

                return props._cc.rgb = { r, g, b };
            }
        }

        
        return props._cc.rgb = { r, g, b };
    },

    _setHueGradientPointerPosition() {
        const valu = this._getHuePosition();
        props._root.$id.hueInput.value = valu;
    },

    
    _setAlphaColor() {
        props._root.$id.alphaBg.style.background = `linear-gradient(to right, rgba(${props._cc.rgb.r},${props._cc.rgb.g},${props._cc.rgb.b}, 0) 0%, rgb(${props._cc.rgb.r},${props._cc.rgb.g},${props._cc.rgb.b},${props._cc.alpha}) 100%)`;
    },

    _setAlphaPointerPosition() {
        props._root.$id.alphaRange.value = props._cc.alpha;
    },

    _updatePropAlphaValue(){
        let hex = props._cc.hex.replace('#','');        
        if(hex.length <= 6) {
            props._root.$id.alphaRange.value = 1;
        } else if( hex.length > 6) {
            const alphaHex = (hex+'ff').slice(7,9);
            props._cc.alpha = parseInt(alphaHex,16)/255;
        }
    },

    

    _hexaToAlpha(hexa){
        console.log(hexa);
    },

    _rgbaStringToHexa(rgbaString){
        const rgba = this._rgbaStringToRGBA(rgbaString);
        return this._RGBAtoHexa(rgba);
    },

    _rgbaStringToRGBA(rgbaString) {
        const rgbaArr = rgbaString.replace('rgba(', '').replace('rgb(', '').replace(')', '').split(',');
        const r = rgbaArr[0]?.trim();
        const g = rgbaArr[1]?.trim();
        const b = rgbaArr[2]?.trim();
        const a = rgbaArr[3] ? rgbaArr[3].trim() : 1;        
        return { r, g, b, a };
    },

    _RGBAtoHexa(rgba) {
        return '#' + this._toHex(parseInt(rgba.r)) + this._toHex(parseInt(rgba.g)) + this._toHex(parseInt(rgba.b)) + this._toHex(Number(Math.round(rgba.a*255)));
    },

    _parseCssColorToRGBA(rgbaCSS) {
        const match = rgbaCSS.trim().match(/^rgba?\s*\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s\/]+([\d.]+))?\s*\)$/i);
        if (!match) return null;

        const [, r, g, b, a] = match;
        props._cc.rgb = {
            r: parseInt(r),
            g: parseInt(g),
            b: parseInt(b),
            a: a !== undefined ? parseFloat(a) : 1
        };
    },

    _getHueFromRGB() {
        const { r, g, b, a } = props._cc.rgb;
        const r1 = r / 255,
            g1 = g / 255,
            b1 = b / 255;
        const max = Math.max(r1, g1, b1);
        const min = Math.min(r1, g1, b1);
        const delta = max - min;

        let h = 0;
        if (delta !== 0) {
            if (max === r1) {
                h = ((g1 - b1) / delta) % 6;
            } else if (max === g1) {
                h = (b1 - r1) / delta + 2;
            } else {
                h = (r1 - g1) / delta + 4;
            }

            h *= 60;
            if (h < 0) h += 360;
        }

        return Math.round(h);
    },

    _getHuePosition() {
        const { r, g, b } = props._cc.rgb;
        
        const r1 = r / 255,
            g1 = g / 255,
            b1 = b / 255;
        const max = Math.max(r1, g1, b1);
        const min = Math.min(r1, g1, b1);
        const delta = max - min;

        let hue = 0;
        if (delta !== 0) {
            if (max === r1) {
                hue = ((g1 - b1) / delta) % 6;
            } else if (max === g1) {
                hue = (b1 - r1) / delta + 2;
            } else {
                hue = (r1 - g1) / delta + 4;
            }
            hue *= 60;
            if (hue < 0) hue += 360;
        }

        
        const percentage = parseFloat((hue / 360 * 100).toFixed(2));
        return percentage;
    },

    _rgbToPureRGBColor() {

        const { r, g, b } = props._cc.rgb;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;

        let h = 0;

        
        if (delta !== 0) {
            if (max === r) {
                h = ((g - b) / delta) % 6;
            } else if (max === g) {
                h = (b - r) / delta + 2;
            } else {
                h = (r - g) / delta + 4;
            }
            h = Math.round(h * 60);
            if (h < 0) h += 360;
        }

        
        const [_r, _g, _b] = this._hslToRgb(h, 100, 50);
        return { r: _r, g: _g, b: _b };
    },

    _hslToRgb(h, s, l) {
        s /= 100;
        l /= 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;

        let r = 0,
            g = 0,
            b = 0;
        if (h < 60)[r, g, b] = [c, x, 0];
        else if (h < 120)[r, g, b] = [x, c, 0];
        else if (h < 180)[r, g, b] = [0, c, x];
        else if (h < 240)[r, g, b] = [0, x, c];
        else if (h < 300)[r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];

        return [
            Math.round((r + m) * 255),
            Math.round((g + m) * 255),
            Math.round((b + m) * 255),
        ];
    },

    _HSVtoRGB(H, S, V) {
        let R, G, B, var_h, var_i, var_1, var_2, var_3, var_r, var_g, var_b;
        if (S === 0) {
            R = V * 255;
            G = V * 255;
            B = V * 255;
        } else {
            var_h = H * 6;
            if (var_h === 6) { var_h = 0; } 
            var_i = parseInt(var_h); 
            var_1 = V * (1 - S);
            var_2 = V * (1 - S * (var_h - var_i));
            var_3 = V * (1 - S * (1 - (var_h - var_i)));

            if (var_i === 0) {
                var_r = V;
                var_g = var_3;
                var_b = var_1
            } else if (var_i === 1) {
                var_r = var_2;
                var_g = V;
                var_b = var_1
            } else if (var_i === 2) {
                var_r = var_1;
                var_g = V;
                var_b = var_3
            } else if (var_i === 3) {
                var_r = var_1;
                var_g = var_2;
                var_b = V
            } else if (var_i === 4) {
                var_r = var_3;
                var_g = var_1;
                var_b = V
            } else {
                var_r = V;
                var_g = var_1;
                var_b = var_2
            }

            R = parseInt(var_r * 255);
            G = parseInt(var_g * 255);
            B = parseInt(var_b * 255);
        }
        return { r: R, g: G, b: B };
    },

    _rgbToHsv(r, g, b) {
        
        
        const var_R = (r / 255);
        const var_G = (g / 255);
        const var_B = (b / 255);

        const var_Min = Math.min(var_R, var_G, var_B); 
        const var_Max = Math.max(var_R, var_G, var_B); 
        const del_Max = var_Max - var_Min; 

        let V = var_Max;
        let H, S;

        if (del_Max === 0) 
        {
            H = 0;
            S = 0;
        } else 
        {
            S = del_Max / var_Max;

            const del_R = (((var_Max - var_R) / 6) + (del_Max / 2)) / del_Max;
            const del_G = (((var_Max - var_G) / 6) + (del_Max / 2)) / del_Max;
            const del_B = (((var_Max - var_B) / 6) + (del_Max / 2)) / del_Max;

            if (var_R === var_Max) { H = del_B - del_G; } else if (var_G === var_Max) { H = (1 / 3) + del_R - del_B; } else if (var_B === var_Max) { H = (2 / 3) + del_G - del_R; }

            if (H < 0) { H += 1; }
            if (H > 1) { H -= 1; }
        }

        return { h: H, s: S, v: V };
    },

    _RGBtoHex(r, g, b) {
        if (typeof r === 'object') {
            g = r.g;
            b = r.b;
            r = r.r;
        }
        return '#' + this._toHex(parseInt(r)) + this._toHex(parseInt(g)) + this._toHex(parseInt(b));
    },

    _hexToRGB(hexCode) {

        let hex = '';
        if(hexCode.length > 6) hex = hexCode.slice(0,7)

        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });        

        let target;
        if (hex.charAt(0) === '#') {
            target = 7;
        } else if (hex.charAt(0) !== '#') {
            target = 6;
        }

        while (hex.length < target) {
            hex += '0';
        }

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    _formatHex(val) {
        if (val.charAt(0) !== '#') {
            val = '#' + val;
        }
        while (val.length < 7) {
            val += '0';
        }
        return val;
    },

    _toHex(val) {
        let hex = Number(val).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    },

    _alphaToHex(opacityPercent) {
      return Math.round(opacityPercent / 100 * 255).toString(16).padStart(2, '0').toUpperCase();
    },

    _fixHexColor(valu) {
        
        const cleaned = valu.trim().replace(/[^a-fA-F0-9]/g, '')._toLowerCase();

        
        if (cleaned.length === 3) {
            return '#' + cleaned.split('').map(c => c + c).join('');
        }

        
        if (cleaned.length === 6) {
            return '#' + cleaned;
        }

        
        const padded = (cleaned + '000000').slice(0, 6);
        return '#' + padded;
    },

}

export default Methods;