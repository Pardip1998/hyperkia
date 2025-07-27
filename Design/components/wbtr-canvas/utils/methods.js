import props from './props.js';


const Index = {
    _rectCalculate() {
        props._shadowRootRect = props._root.getBoundingClientRect(); 
        props._pagesRect = props._root.$id.pages.getBoundingClientRect();
    },

    _canvasContentSetup() {        
        this._drawCanvasHTMLAndCSS();
        if (props._deleterLayersIndex.length) this._deleteDisplayNoneLayers();
    },

    
    _drawCanvasHTMLAndCSS(pId) {

        const sidebarLayerHTMLTemplate = WBTR.layerSidebarLayers._methods._getLayerHTMLTemplate();
        const pagesData = {
            fullCSS: '',
            sidebarLayerStr: '',
        };

        
        WBTR.data.pages.forEach((p) => {
            pagesData['html' + p.index] = '';
            pagesData['svg' + p.index] = '';
        })

        
        const options = WBTR.data.options;
        pagesData.fullCSS += ':host {';
        for (let o in options) {
            if (o.indexOf('canvas-') == 0) pagesData.fullCSS += `${o.replace('canvas-', '')}: ${options[o]};`;
        }
        pagesData.fullCSS += '}';


        
        WBTR.data.layers.forEach((l, i) => {

            
            if (l.display === "none") {
                props._deleterLayersIndex.push(l.index);
                return false;
            }

            
            if (['line', 'rect', 'circle', 'ellipse', 'path'].includes(l.nodeName)) {
                pagesData['html' + l.pId] += `
					<svg viewBox="${l.sviewBox}" preserveAspectRatio="none" data-trian-move="true" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:${l.stop};left:${l.sleft};width:${l.swidth};height:${l.sheight};opacity:${l.sopacity};z-index:${l['z-index']};">
						<${l.nodeName} class="canvas-layer" data-layer="${l.index}" ${l.attributes}></${l.nodeName}>
					</svg> 
				`;                
            } else {
                
                pagesData['html' + l.pId] += `<${l.nodeName} draggable="false" ${l.src?`src="${l.src}"`:''} data-trian-move="true" class="canvas-layer" data-layer="${l.index}" style="z-index:${l['z-index']};">${l.innerText || ''}${l.nodeName==='IFRAMEWRAP'?`<iframe src="${l.src}"></iframe>`:''}</${l.nodeName}>`;                
            }

            pagesData.fullCSS += `[data-layer="${l.index}"]{`;
            
            for (const [prop, valu] of Object.entries(l)) {
                
                if (['nodeName', 'index', 'pId', 'attributes', 'sviewBox', 'stop', 'sleft', 'swidth', 'sheight', 'sopacity', 'src', 'innerText','z-index'].includes(prop)) continue;
                pagesData.fullCSS += `${prop}:${valu};`; 
            }
            pagesData.fullCSS += '}';

            
            

            pagesData.sidebarLayerStr += sidebarLayerHTMLTemplate.replace('@@layer--index@@', l.index)
                .replace('@@layer--visibility@@', l.visibility)
                .replace('@@visibility--title@@', (l.visibility == 'visible' ? 'Hide' : 'Show'))
                .replace('@@layer--access@@', (l['pointer-events'] == 'none' ? 'lock' : 'unlock'))
                .replace('@@access--title@@', (l['pointer-events'] == 'none' ? 'Lock' : 'Unlock'))
                .replace('@@layer--tagname@@', this._getLayerTagName(l.nodeName))
                .replace('@@layer--order@@', (l['z-index']))
                .replace('@@layer--icon@@', l.nodeName.toLowerCase());
        })

        
        WBTR.data.pages.forEach((p) => {
            
            props._root.$id['page' + p.index].innerHTML = pagesData['html' + p.index];

            
            const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgEl.classList.add('svg-canvas-layers')
            svgEl.innerHTML = pagesData['svg' + p.index];

            
            props._root.$id['page' + p.index].appendChild(svgEl);
            props._root.$id['page' + p.index + 'svg'] = svgEl;

            
            pagesData.fullCSS += `[data-page="${p.index}"]{`;
            for (let pProp in p) {
                if (['name', 'index','nodeName'].includes(pProp)) continue;
                pagesData.fullCSS += `${pProp}:${p[pProp]};`;
            }
            pagesData.fullCSS += '}';
        })

        props._root.$id.style.innerHTML = pagesData.fullCSS;

        WBTR.layerSidebarLayers._methods._showLayerHTMLTemplate(pagesData.sidebarLayerStr);
    },

    _magnifyingTransform() {
        props._magnifScale = +((props._magnifScale).toFixed(2));
        props._root.$id.pages.style.transform = `translate(${props._magnifpX}px, ${props._magnifpY}px) scale(${props._magnifScale})`;
        requestAnimationFrame(this._rectCalculate);
    },

    _canvasZoomLevelOnLoad() {
        for (let i = 0; i < 50; i++) {
            const layersElWidth = parseInt((props._magnifScale * props._root.$id.pages.offsetWidth) / 1);

            if (props._shadowRootRect.width < layersElWidth + 100) {
                props._magnifScale = props._magnifScale /= 1.2;
                props._root.$id.pages.style.transform = `translate(${props._magnifpX}px,${props._magnifpY}px) scale(${props._magnifScale})`;

                props._magnifpX = parseInt((props._shadowRootRect.width - layersElWidth + 135) / 2);
                props._magnifpY = 70;
                props._root.$id.pages.style.transform = `translate(${props._magnifpX}px,${props._magnifpY}px) scale(${props._magnifScale})`;
            }
        }
    }, 

    _setCSSRulesToLayerByIndex(index, cssRules) {        
        const canvasLayerEl = props._root.shadowRoot.querySelector(`[data-layer="${index}"]`);
        const sidebarLayerEl = WBTR.layerSidebarLayers.shadowRoot.querySelector(`[data-layer="${index}"]`);
        if(!canvasLayerEl) return;
        
        
        if(cssRules.visibility) canvasLayerEl.style.visibility = cssRules.visibility;

        
        if(cssRules['pointer-events']) canvasLayerEl.style.pointerEvents = cssRules['pointer-events'];

        
        if(cssRules.display) {
            canvasLayerEl.style.display = cssRules.display;
            sidebarLayerEl.style.display = cssRules.display;
        }

        this._saveCanvasCurrentTargetToIndexedDB(canvasLayerEl);

    },

    
    _setActiveLayerStyles(cssRules) {
        for (const [prop, valu] of Object.entries(cssRules)) {
            props._actvtag.style[prop] = valu;
        }
    },

    
    _deleteDisplayNoneLayers() {
        WBTR.db.deleteObject('layers', props._deleterLayersIndex).then((success) => {
            console.info(success);
        }).catch((error) => {
            console._resetRadioPropInputs(error);
        })
    },

    
    _updateFormFieldsOfCurrentTarget() {       
        this._updateFormFieldsOfActiveLayerAttrs();
        this._updatePropFormFieldsOfCanvasTarget(props._currentTargetCSSRules);
        if (props._currentTargetId !== 'canvas') WBTR.createGradientPopover._methods._callComponentMethods(['_canvasCurrentTargetToGradientUI']);
        
    },

    
    _updateFormFieldsOfActiveLayerAttrs() {
        if ('innerText' in props._currentTarget) WBTR.designSidebarDesigns.$id.tagInnerhtml.value = props._currentTarget.innerText;
        if ('src' in props._currentTarget) WBTR.designSidebarDesigns.$id.tagSrc.value = props._currentTarget.src;        
    },

    
    _updatePropFormFieldsOfCanvasTarget(cssRules){
        const cssProps = {};
 
        if (cssRules instanceof CSSStyleDeclaration) {
            Object.assign(cssProps, this._getPropFormFieldsFromCSSRules(cssRules));
        } else {
            Object.assign(cssProps, cssRules);
        }

        this._updateCSSPropsToFormFieldsProps(cssProps);
        this._updateCanvasTargetCSSVariable(cssProps);
    },

    
    _saveCanvasCurrentTargetToIndexedDB(element) {

        
        const tEl = element || props._currentTarget;
        const styles = {
            nodeName: tEl.nodeName
        };

        
        if (tEl.src) styles.src = tEl.src;
        if (tEl.innerText?.trim().length) styles.innerText = tEl.innerText.replaceAll(' ', '&nbsp;');

        
        tEl.getAttribute('style')?.split(';').forEach((cssRule) => {
            if (!cssRule?.trim()) return;
            const [prop, valu] = cssRule.split(':');
            styles[prop.trim()] = valu.trim();
        })
        if (Object.keys(styles).length == 0) return false;

        
        if(tEl.parentElement?.nodeName === 'svg') {
            Object.assign(styles, this._getSVGLayerStylesForDB(tEl));
        }

        
        if (tEl.matches('[data-layer]')) {
            WBTR.db.updateObject('layers', tEl.dataset.layer, styles).catch((error) => {
                console.error(error);
            })
            return;
        }

        
        if (tEl.matches('[data-page]')) {
            const tElIndex = tEl.dataset.page;
            let pageObject = null;
            WBTR.data.pages.forEach((p)=>{                
                if(p.index == tElIndex) pageObject = p;
            })
            
            Object.assign(pageObject, styles);
            WBTR.db.updateObject('pages', tElIndex, pageObject).catch((error) => {
                console.error(error);
            })
            return;
        }

        
        const canvasStyle = {};
        for (let prop in styles) {
            canvasStyle['canvas-' + prop] = styles[prop];
        }
        if (tEl.closest('[data-id="pages"]') || tEl.dataset.customElement == 'canvas') {
            WBTR.db.updateKeyValueObject(canvasStyle).catch((error) => {
                console.error(error);
            })
        }
    },

    _getSVGLayerStylesForDB(svgShapeEl){
        const styles = {};
        const svgEl = svgShapeEl.parentElement;
        const svgElCSS = window.getComputedStyle(svgEl);
        
        styles.stop = svgElCSS.top;
        styles.sleft = svgElCSS.left;
        styles.swidth = svgElCSS.width;
        styles.sheight = svgElCSS.height;
        styles.sopacity = svgElCSS.opacity;
        return styles;
    },

    _createPages(page) {
        const pages = page ? [page] : WBTR.data.pages;

        pages.forEach((p) => {
            const divEl = document.createElement('div');
            divEl.classList.add('page');
            divEl.setAttribute('data-name', p.name);
            divEl.setAttribute('data-class', 'page');
            divEl.setAttribute('data-page', p.index);
            divEl.setAttribute('data-common-closest', 'page');
            props._root.$id.pages.insertAdjacentElement('beforeend', divEl);
            props._root.$id['page' + p.index] = divEl;

            
            const spanEl = document.createElement('span');
            spanEl.classList.add('page-name');
            spanEl.setAttribute('data-page-id', p.index);
            spanEl.innerText = p.name;
            props._root.$id['pageName' + p.index] = spanEl;
            props._root.$id.pageNames.appendChild(spanEl);

            if (page) {
                divEl.style.cssText = `width: ${p.width};height: ${p.height}; background-color: ${p['background-color']}`;
            }
        });
    },

    _removeContentEditableFromLayer() {
        const els = props._root.shadowRoot.querySelectorAll('[contenteditable="true"]');
        els.forEach((el) => {
            el.removeAttribute('contenteditable');
        })
    },

    
    _uiBasedOnCanvasCurrentTarget() {
        WBTR.designSidebarDesigns.$id.wrapper.setAttribute('data-canvas-current-target', props._currentTargetId);
        WBTR.popovers.setAttribute('data-canvas-current-target', props._currentTargetId);

        
        
        
        

        
        
        
        

        
        
        
        

    },

    _pagenamePositionManage() {
        if (!props._isTransitioning) return;

        [...props._root.$id.pages.children].forEach((p) => {
            const index = p.dataset.page;
            const pagesRect = WBTR.element.getRect(p);
            const pnEl = props._root.$id['pageName' + index];
            pnEl.style.left = (pagesRect.x - WBTR.layerSidebar.offsetWidth) + 'px';
            pnEl.style.top = (pagesRect.y - (pnEl.offsetHeight) - 2) + 'px';
            pnEl.style.maxWidth = pagesRect.width + 'px';
        })

        props._root.$id.pages.style.setProperty('--canvas--scale', props._magnifScale);

        requestAnimationFrame(Index._pagenamePositionManage);
    },

    _pathCreatedSuccessFully() {
        if (props._actvtag?.nodeName == 'path') {
            const pathRect = WBTR.element.getSvgRect(props._actvtag);
            WBTR.canvas.$id.canvasCreatePathFirstpoint.classList.remove('show');
            if (pathRect.width < 1 && pathRect.height < 1) {
                props._actvtag.remove();
                return;
            }
            props._pathPoints.push(props._pathPoints[0] + ' Z');
            props._actvtag.setAttribute('d', 'M ' + props._pathPoints.join(' '));

            const svgData = this._createSvgWrapper();
            svgData.attributes = this._getSvgShapeAttributes(props._actvtag);
            WBTR.db.updateObject('layers', props._actvtag.dataset.layer, svgData).catch((error) => {
                console.error(error);
            })

        }
    },

    _createSvgWrapper() {
        const aRect = WBTR.element.getSvgRect(props._actvtag);
        const sviewBox = `${aRect.x} ${aRect.y} ${aRect.width} ${aRect.height}`;
        const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgEl.setAttribute('viewBox', sviewBox);
        svgEl.setAttribute('data-trian-move', true);
        svgEl.style.cssText = `position:absolute;top:${aRect.y}px;left:${aRect.x}px;width:${aRect.width}px;height:${aRect.height}px;`;
        props._actvtag.closest('[data-page]').appendChild(svgEl);
        svgEl.appendChild(props._actvtag);

        return {
            'stop': aRect.y + 'px',
            'sleft': aRect.x + 'px',
            'swidth': aRect.width + 'px',
            'sheight': aRect.height + 'px',
            sviewBox,
        };
    },

    _getSvgShapeAttributes(element, skipAttrs = ['class', 'data-layer']) {        
        const attributeString = Array.from(element.attributes).map((attr) => {
            if (!skipAttrs.includes(attr.name)) return `${attr.name}="${attr.value}"`;
        }).join(' ');        
        return attributeString;
    },

    _switchActiveLayerTag() {

        
        let innerHTML = '';
        if(['INPUT','TEXTAREA','SELECT'].includes(props._currentTarget.nodeName)) {
            innerHTML = props._currentTarget.value;
        } else {
            innerHTML = props._currentTarget.innerHTML;
        }

        
        const selectedTag = WBTR.designSidebarDesigns.$id.switchtag.value;
        const tagEl = document.createElement(selectedTag);
        if(['input','textarea','select'].includes(selectedTag)) {
            tagEl.placeholder = innerHTML;
        } else {
            tagEl.innerHTML = innerHTML;
        }
        
        for (const attr of props._currentTarget.attributes) {
            tagEl.setAttribute(attr.name, attr.value);
        }

        props._currentTarget.insertAdjacentElement('afterend', tagEl);
        props._currentTarget.remove();
        props._currentTarget = tagEl;
        this._saveCanvasCurrentTargetToIndexedDB();
    },

    _updateCurrentTargetInnerHTML() {
        props._currentTarget.innerText = WBTR.designSidebarDesigns.$id.tagInnerhtml.value;
        this._saveCanvasCurrentTargetToIndexedDB();
    },

    _updateCurrentTargetSrc() {        
        const inputSrc = new URL(WBTR.designSidebarDesigns.$id.tagSrc.value);
        const hostname = inputSrc.hostname;
        let src = inputSrc;

        
        const validYouTubeHosts = [
            "youtube.com",
            "www.youtube.com",
            "youtu.be",
            "m.youtube.com",
            "music.youtube.com",
            "www.youtube-nocookie.com"
        ];
        if (validYouTubeHosts.includes(hostname)) {
            src = this._getYouTubeEmbedUrl(inputSrc);
        }
        

        if (props._currentTarget.nodeName === 'IFRAMEWRAP') {
            props._currentTarget.src = src;
            props._currentTarget.firstElementChild.src = src;
        } else {
            props._currentTarget.src = src;
        }

        this._saveCanvasCurrentTargetToIndexedDB();
    },

    _getYouTubeEmbedUrl(url) {
        try {
            const parsedUrl = new URL(url);
            let videoId = "";

            if (parsedUrl.hostname === "youtu.be") {
                
                videoId = parsedUrl.pathname.slice(1);
            } else if (
                parsedUrl.hostname.includes("youtube.com")
            ) {
                if (parsedUrl.pathname === "/watch") {
                    
                    videoId = parsedUrl.searchParams.get("v");
                } else if (parsedUrl.pathname.startsWith("/embed/")) {
                    
                    return url;
                } else if (parsedUrl.pathname.startsWith("/shorts/")) {
                    
                    videoId = parsedUrl.pathname.split("/")[2];
                }
            }

            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        } catch (e) {
            
            return url;
        }

        return null;
    },

    _getZIndexOfNewCreatedLayer() {
        if (WBTR.data.layers.length === 0) return 1000;
        return +(WBTR.data.layers.at(-1)['z-index']) + 1000;
    },    

    _highlightElementsInSelection() {
        props._selectionAreaElements.forEach(el => el.classList.remove('selected'));
        props._selectionAreaElements = [];

        props._root.shadowRoot.querySelectorAll('[data-layer]').forEach(el => {

            const rectEl = el.getBoundingClientRect();
            const selectionAreaElRect = props._root.$id.canvasSelection.getBoundingClientRect();

            if (
                rectEl.right >= selectionAreaElRect.left &&
                rectEl.left <= selectionAreaElRect.left + selectionAreaElRect.width &&
                rectEl.bottom >= selectionAreaElRect.top &&
                rectEl.top <= selectionAreaElRect.top + selectionAreaElRect.height
            ) {
                el.classList.add('selected');
                props._selectionAreaElements.push(el);
            }
        });
    },

    
    _inputCSSPropsToCanvastarget(inputCSSProps){                                    
        clearTimeout(props._inputSetTimeout);

        const tEl = WBTR.canvas._props._currentTarget; 

        
        const cssRules = {};    
        if(inputCSSProps.dataset?.prop) {
            cssRules[inputCSSProps.dataset.prop] = inputCSSProps.value+(inputCSSProps.dataset.propUnit || '');            
        } else {
            Object.assign(cssRules, inputCSSProps);
        }

        
        this._modifySpecialCSSProps(cssRules);    

        
        if(tEl instanceof HTMLElement) {
            for(let cssRule in cssRules) {
                WBTR.canvas._props._currentTarget.style[cssRule] = cssRules[cssRule];                
            } 
        } 

        
        if(tEl instanceof SVGElement) {           
            cssRules.left && (tEl.parentElement.style.left = cssRules.left);
            cssRules.top && (tEl.parentElement.style.top = cssRules.top);
            cssRules.width && (tEl.parentElement.style.width = cssRules.width);
            cssRules.height && (tEl.parentElement.style.height = cssRules.height);
            cssRules.opacity && (tEl.parentElement.style.opacity = cssRules.opacity);
            cssRules['background-color'] && (tEl.style.fill = cssRules['background-color']);               
            if(Object.keys(cssRules).join().indexOf('border')>=0) {
                let borderColor = '', borderWidth = '';
                for(let cssRule in cssRules) {
                    if(cssRule.indexOf('width') > 0) borderWidth = cssRules[cssRule];
                    if(cssRule.indexOf('color')> 0) borderColor = cssRules[cssRule];
                }
                if(Object.keys(cssRules).includes('border-color')) tEl.style.stroke = cssRules['border-color'];
                if(Object.keys(cssRules).includes('border-width')) tEl.style.strokeWidth = cssRules['border-width'];
               
            }


            
            
        }

        this._updateCanvasTargetCSSVariable(cssRules);

        
        props._inputSetTimeout = setTimeout(() => {              
            WBTR.canvas._methods._saveCanvasCurrentTargetToIndexedDB();
        }, 100);

        this._resetRadioPropInputs(inputCSSProps);
    },

    _getPropFormFieldsFromCSSRules(cssRules){        
        const cssProps = {};        

        

        if(props._currentTarget instanceof HTMLElement) {
            

            
            cssProps.left = cssRules.left.replace('px','').split('.')[0];

            
            cssProps.top = cssRules.top.replace('px','').split('.')[0];

            
            cssProps.rotate = cssRules.rotate === 'none' ? 0 : cssRules.rotate.replace('deg','');

            
            cssProps.width = cssRules.width.replace('px','').split('.')[0];

            
            cssProps.height = cssRules.height.replace('px','').split('.')[0];

            
            cssProps.paddingTop = cssRules['padding-top'];
            cssProps.paddingRight = cssRules['padding-right'];
            cssProps.paddingBottom = cssRules['padding-bottom'];
            cssProps.paddingLeft = cssRules['padding-left'];

            
            const textColor = cssRules['color'];
            cssProps.color = WBTR.colorPickerPopover._methods._rgbaStringToHexa(textColor);

            
            cssProps.fontFamily = cssRules.fontFamily.replaceAll('"','').replaceAll(',','').replaceAll(' sans-serif','');

            
            cssProps.fontWeight = cssRules.fontWeight;

            
            cssProps.fontSize = cssRules.fontSize;

            
            cssProps.opacity = cssRules.opacity;

            
            cssProps.borderRadius = cssRules.borderTopLeftRadius.replace('px','');            

            
            const bgColor = cssRules['background-color'];
            cssProps.backgroundColor = WBTR.colorPickerPopover._methods._rgbaStringToHexa(bgColor);
                        
            
            cssProps.borderWidth = cssRules['border-top-width'];
            if(cssProps.borderWidth === '0px') cssProps.borderWidth = cssRules['border-right-width'];
            if(cssProps.borderWidth === '0px') cssProps.borderWidth = cssRules['border-bottom-width'];
            if(cssProps.borderWidth === '0px') cssProps.borderWidth = cssRules['border-left-width'];
            cssProps.borderWidth = cssProps.borderWidth === '0px' ? 0 : cssProps.borderWidth.replace('px','');

            
            cssProps.borderStyle = cssRules['border-top-style'];
            if(cssProps.borderStyle === 'none') cssProps.borderStyle = cssRules['border-right-style'];
            if(cssProps.borderStyle === 'none') cssProps.borderStyle = cssRules['border-bottom-style'];
            if(cssProps.borderStyle === 'none') cssProps.borderStyle = cssRules['border-left-style'];

            
            cssProps.borderColor = cssRules['border-top-color'];
            if(cssProps.borderColor === cssRules.color) cssProps.borderColor = cssRules['border-right-color'];
            if(cssProps.borderColor === cssRules.color) cssProps.borderColor = cssRules['border-bottom-color'];
            if(cssProps.borderColor === cssRules.color) cssProps.borderColor = cssRules['border-left-color'];
            cssProps.borderColor = WBTR.colorPickerPopover._methods._rgbaStringToHexa(cssProps.borderColor);

            
            let borderSides = [];
            if(cssRules['border-top-style'] !== 'none') borderSides.push('top');
            if(cssRules['border-right-style'] !== 'none') borderSides.push('right');
            if(cssRules['border-bottom-style'] !== 'none') borderSides.push('bottom');
            if(cssRules['border-left-style'] !== 'none') borderSides.push('left');
            if(borderSides.length === 4) cssProps.borderSides = 'all';
            if(borderSides.length==1) cssProps.borderSides = borderSides[0];
        } else {
            
            const svgEl = props._currentTarget.parentElement;
            const svgElCSS = window.getComputedStyle(svgEl);

            
            cssProps.left = Math.trunc(svgElCSS.left.replace('px',''));

            
            cssProps.top = Math.trunc(svgElCSS.top.replace('px',''));

            
            cssProps.rotate = cssRules.rotate === 'none' ? 0 : cssRules.rotate.replace('deg','');

            
            cssProps.width = Math.trunc(svgElCSS.width.replace('px',''));


            
            cssProps.height = Math.trunc(svgElCSS.height.replace('px',''));

            
            cssProps.opacity = svgElCSS.opacity;          

            
            const bgColor = cssRules['fill'];
            cssProps.backgroundColor = WBTR.colorPickerPopover._methods._rgbaStringToHexa(bgColor);
        }

        return cssProps;        
    },

    
    _getLayerTagName(nodeName){
        if(['SECTION','MAIN','ARTICLE','DIV','NAV','HEADER','FOOTER'].includes(nodeName)) {
            return 'SECTION';
        } else if(['P','A','INPUT','TEXTAREA'].includes(nodeName)) {
            return 'TEXT';
        } else if(['path','circle','rect','line','ellipse'].includes(nodeName)) {
            return 'SVG';
        } else if(['IFRAMEWRAP','IFRAME'].includes(nodeName)) {
            return 'IFRAME';
        }
        return nodeName;
    },

    
    _updateCanvasTargetCSSVariable(cssProps){       
        if (cssProps.backgroundColor) document.documentElement.style.setProperty('--canvas--target--background-color', cssProps.backgroundColor);
        if (cssProps.color) document.documentElement.style.setProperty('--canvas--target--color', cssProps.color);
        if (cssProps.borderColor) document.documentElement.style.setProperty('--canvas--target--border-color', cssProps.borderColor);
    },

    _updateCSSPropsToFormFieldsProps(cssProps){      
        for (let component in WBTR) {
            if (!WBTR[component].dataset?.customElement) continue;
            for (let prop in WBTR[component].$propElements) {
                if (typeof cssProps[prop] === 'undefined') continue;                
                WBTR[component].$propElements[prop].value = (cssProps[prop] + '').replace('px', '');
            }
        } 
    },

    _modifySpecialCSSProps(cssRules){  
        if(cssRules.scaleX) {            
            
            const scaleValu = props._currentTargetCSSRules.scale;                      
            switch(scaleValu) {
                case '-1':
                    cssRules.scale = '1 -1';
                    break;

                case '1':
                    cssRules.scale = '-1 1';
                    break;

                case '-1 1':
                    cssRules.scale = '1';                    
                    break;

                case '1 -1':
                    cssRules.scale = '-1';
                    break;

                default:
                    cssRules.scale = '-1 1';
            }

            delete cssRules.scaleX;
        } else if(cssRules.scaleY) {
            
            const scaleValu = props._currentTargetCSSRules.scale;            
            switch(scaleValu) {
                case '-1':
                    cssRules.scale = '-1 1';
                    break;

                case '1':
                    cssRules.scale = '1 -1';
                    break;

                case '-1 1':
                    cssRules.scale = '-1';
                    break;

                case '1 -1':
                    cssRules.scale = '1';
                    break;

                default:
                    cssRules.scale = '1 -1';                             
            }

            delete cssRules.scaleY;
        } else if(cssRules.rotate90) {           
           let valu = (+props._currentTargetCSSRules.rotate.replace('deg',''))+90;
           if(valu>360) valu -= 360;
           cssRules.rotate = valu;

           delete cssRules.rotate90;
        } else if(cssRules.color) {
            cssRules['-webkit-text-fill-color'] = cssRules.color;
        } else if(cssRules['font-weight']) {
            const valu = cssRules['font-weight'];
            if(valu.indexOf('-italic')>0) {
                const [weight, style] = valu.split('-');
                cssRules['font-weight'] = weight;
                cssRules['font-style'] = style;
            } else {
                cssRules['font-style'] = 'normal';
            }
        }        
    },

    _resetRadioPropInputs(inputEl){
        if(inputEl.nodeName !== 'INPUT') return;
        if(inputEl.type === 'radio') inputEl.checked = false;
    },

    _layerClickToActive(index){        
        props._root.shadowRoot.querySelectorAll('[data-layer].active').forEach((l)=>{
            l.classList.remove('active');
        })
        props._root.shadowRoot.querySelector(`[data-layer="${index}"]`).classList.add('active');        
    },

    _updateClickToActiveLayer(index){
        this._layerClickToActive(index);
        WBTR.layerSidebarLayers._methods._layerClickToActive(index);
    }

}

export default Index;