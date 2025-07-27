import props from './props.js';


const Methods = {

    _openCreateGradient(inputEl){        
        props._gradientPickertarget = inputEl || props._gradientPickertarget || WBTR.colorPickerPopover._props._colorPickerTarget;
        this._existingValuePropTocanvasTarget();
        this._popoverShow(); 
    },

    _existingValuePropTocanvasTarget(){        
        const prop = props._gradientPickertarget.dataset.prop;
        if(!prop) return;

        const tEl = WBTR.canvas._props._currentTarget;
       
        if(tEl instanceof HTMLElement) {
            if(prop === 'background-color'){                
                tEl.style.backgroundColor = 'transparent';                
                tEl.style.backgroundImage = props._gradientValue;                                           
            } else if (prop === 'color'){                
                tEl.style.backgroundImage = props._gradientValue;                            
                tEl.style.webkitBackgroundClip = 'text';                            
                tEl.style.webkitTextFillColor = 'transparent';    
            }
        } else {            
            
        }

        WBTR.canvas._methods._saveCanvasCurrentTargetToIndexedDB();
    },

    _popoverShow(element) {
        WBTR.popovers.classList.add('popover-show');
        props._root.classList.add('show');        
    },
 
    _popoverHide() {
        props._root.classList.remove('show');
    },

    _updateGradientPointIndex() {
        [...props._root.$id.gradientTracks.children].forEach((t, i) => {
            t.dataset.gradientTrack = i;
            props._root.$id.gradientpoints.children[i].dataset.gradientPoint = i;
        })
    },

    _canvasCurrentTargetToGradientUI() {
        const gradient = WBTR.canvas._props._currentTargetCSSRules['background-image'];
        props._gradientValue = gradient.indexOf('-gradient(') > 0 ? gradient : 'linear-gradient(90deg, rgb(29, 174, 55) 0%, rgb(248, 224, 22) 100%)';
        props._gradientData = this._parseGradient(props._gradientValue);


        
        props._root.$id.wrapper.setAttribute('current-gradient-types', props._gradientData.type);
        props._root.$id.gradientTracks.style.background = props._gradientValue;
        this._callComponentMethods([
            '_updateGradientType',
            '_updateGradientDegree',
            '_updateGradientTracks',
            '_updateGradientPoints',
        ]);

    },

    _callComponentMethods(methods, args) {
        methods.forEach((m) => this[m](args));
    },

    _updateGradientType() {
        props._root.$id.gradientTypes.value = props._gradientData.type;
    },

    _updateGradientDegree() {
        props._root.$id.gradientDegreeInput.value = props._gradientData.angle?.replace('deg', '');
    },

    _updateGradientTracks() {
        let html = '';
        props._gradientData.colorStops.forEach((cs, i) => {
            html += `<span class="gradient-track" data-gradient-track="${i}" style="color:${cs.color};left:${cs.percentage};"></span>`;
        })
        props._root.$id.gradientTracks.innerHTML = html;
    },

    _updateGradientPoints() {
        let html = '';
        props._gradientData.colorStops.forEach((cs, i) => {            
            html += `
                <li class="gradientpoint-point" data-gradient-point="${i}">
                    <label class="gradientpoint-stop">
                        <input class="gradientpoint-stop-input" data-event-id="gradientpoint-stop-input" type="number" min="0" max="100" step="1" placeholder="123" value="${cs.percentage.replace('%','')}">
                        %
                    </label>
                    <div class="gradientpoint-color">
                        <span class="color-result" data-event-id="gppoint-color" style="background:${cs.color};"></span>                
                        <input class="gppoint-input" data-event-id="gppoint-input" type="text" placeholder="#1dae37" value="${cs.color}">
                    </div>
                    <span class="gradientpoint-subtractbtn-wrapper">
                        <button class="gradientpoint-subtractbtn">-</button>
                    </span> 
                </li>
            `;
        })
        props._root.$id.gradientpoints.innerHTML = html;
    },

    _updateGradientValueToCanvasTarget() {

        if (props._gradientData.type === 'linear-gradient') {
            props._gradientValue = `${props._gradientData.type}(${props._gradientData.angle || props._root.$id.gradientDegreeInput.value || '0deg'},`;
        } else if (props._gradientData.type === 'radial-gradient') {
            props._gradientValue = `${props._gradientData.type}(`;
        }        

        props._gradientData.colorStops.forEach((cs, i) => {
            props._gradientValue += `${cs.color} ${cs.percentage}`;
            if (props._gradientData.colorStops.length != i + 1) props._gradientValue += ',';
        })
        props._gradientValue += ')';



        WBTR.canvas._props._currentTarget.style.backgroundImage = props._gradientValue;
        props._root.$id.gradientTracks.style.background = props._gradientValue;
        WBTR.canvas._methods._saveCanvasCurrentTargetToIndexedDB();
    },

    _parseGradient(gradientStr) {
        const result = {
            type: null,
            angle: null,
            colorStops: []
        };

        if (gradientStr.indexOf('linear-gradient') >= 0) {
            result.type = gradientStr.split('-gradient(')[0] + '-gradient';
            result.angle = gradientStr.split('-gradient')[1].split('deg')[0].replace('(', '')+'deg';
            const gradientPoints = gradientStr.match(/(rgba?\([^)]+\)\s*\d+%?)/g);
            
            gradientPoints.forEach((gp) => {
                const stopIndex = gp.indexOf(')');
                const color = WBTR.colorPickerPopover._methods._rgbaStringToHexa(gp.slice(0, stopIndex + 1).trim());
                const percentage = gp.slice(stopIndex + 1).trim().replace('%','')+'%';                
                result.colorStops.push({ color, percentage });
            })
        } else {
            console.error('Another Gradient');
        }
        return result;
    },

    _gradientStopColorModify(inputEl) {
        const color = inputEl.value;
        const index = inputEl.closest('[data-gradient-point]').dataset.gradientPoint;
        props._gradientData.colorStops[index].color = color;
        inputEl.previousElementSibling.style.backgroundColor = color;
        props._root.$id.gradientTracks.children[index].style.color = color;
        this._updateGradientValueToCanvasTarget();
    },

}

export default Methods;