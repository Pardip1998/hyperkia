import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Click {
  
    static _handler(e) {        
        if(props._eTarget.closest('.gradientpoint-point')) this._activeGradientPoint();
        if(props._eTarget.closest('.gradientpoint-addbtn')) this._addGradientPoint();
        if(props._eTarget.closest('.gradientpoint-subtractbtn')) this._removeGradientPoint();
        if(props._eTarget.dataset.eventId === 'clrstyle') this._switchColorStyle();
        if(props._eTarget.dataset.eventId === 'gppoint-color') this._openColorPickerForGradientColor();        
    }
 
    static _activeGradientPoint(){     
        props._root.shadowRoot.querySelector('.active-point.gradientpoint-point')?.classList.remove('active-point');
        props._eTarget.closest('.gradientpoint-point').classList.add('active-point');
    }
 
    static _addGradientPoint(){
        const gradientPointsLength = props._root.$id.gradientpoints.children.length;
        const lastGradientPoint = props._root.$id.gradientpoints.children[gradientPointsLength-1];
        const activeGradient = props._root.shadowRoot.querySelector('.active-point.gradientpoint-point') || lastGradientPoint;
        const firstPoint = activeGradient.nextElementSibling ? activeGradient : activeGradient.previousElementSibling;
        const secondPoint = activeGradient.nextElementSibling ? activeGradient.nextElementSibling : activeGradient;
        let gradientStop = (((+firstPoint.querySelector('.gradientpoint-stop-input').value.trim())+(+secondPoint.querySelector('.gradientpoint-stop-input').value.trim()))/2).toFixed(0);               
 
        const str = `
            <li class="gradientpoint-point" data-gradient-point="">
                <label class="gradientpoint-stop">
                    <input class="gradientpoint-stop-input" data-event-id="gradientpoint-stop-input" type="number" min="0" max="100" step="1" placeholder="123" value="${gradientStop}">
                    %
                </label>
                <div class="gradientpoint-color">
                    <span class="color-result" data-event-id="gppoint-color" style="background-color:#008000ff;"></span>
                    <input class="gppoint-input" type="text" data-event-id="gppoint-input" placeholder="#00000000" value="#008000ff">
                </div>
                <span class="gradientpoint-subtractbtn-wrapper">
                    <button class="gradientpoint-subtractbtn">-</button>
                </span> 
            </li>
        `;
 
        if(activeGradient.nextElementSibling) activeGradient.insertAdjacentHTML('afterend', str);
        if(!activeGradient.nextElementSibling) activeGradient.insertAdjacentHTML('beforebegin', str);

        this._updateColorStopsData();
    }

    static _removeGradientPoint(){
        props._eTarget.closest('.gradientpoint-point').remove();                
        this._updateColorStopsData();
    }
  

    static _openColorPickerForGradientColor(){        
        const inputEl = props._eTarget.nextElementSibling;
        WBTR.colorPickerPopover._methods._openColorPicker(inputEl);
        WBTR.element._showElementPositionAvailableX(inputEl.getRootNode().host, WBTR.colorPickerPopover);
    }
  
    static _updateColorStopsData(){
        props._gradientData.colorStops.length = 0;
        [...props._root.$id.gradientpoints.children].forEach((p,i)=>{
            const percentage = p.querySelector('.gradientpoint-stop-input').value+'%';
            const color = p.querySelector('.gppoint-input').value;
            props._gradientData.colorStops.push({color, percentage});
        })

        methods._updateGradientTracks();
        methods._updateGradientPointIndex();  
        methods._updateGradientValueToCanvasTarget();        
    }
 
    static _switchColorStyle(){
        WBTR.colorPickerPopover._methods._openColorPicker();        
        WBTR.colorPickerPopover.style.top = WBTR.createGradientPopover.style.top;
        WBTR.colorPickerPopover.style.left = WBTR.createGradientPopover.style.left;        
        WBTR.createGradientPopover._methods._popoverHide();
    }

}

export default Click;