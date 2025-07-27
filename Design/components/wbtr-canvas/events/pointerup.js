import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Pointerup {

    static _handler(e) {

        switch (WBTR.canvasTools._props._activeTool) {
            case 'triangle':
                this._handlePointerUpTriangle(e);
                break;

            case 'htmltag':
                this._handlePointerUpHtmlTag(e);
                break;

            case 'hand':
                this._handToolPointerUp(e);
                break;

            case 'rectsvg':
                this._handlePointerUpRectTag(e);
                break;

            case 'linesvg':
                this._handlePointerUpLineTag(e);
                break;

            case 'circlesvg':
                this._handlePointerUpCircleTag(e);
                break;

            case 'ellipsesvg':
                this._handlePointerUpellipseTag(e);
                break;

            case 'pathsvg':
                this._handlePointerUpPathTag(e);
                break;

            case 'moresvg':
                this._handlePointerUpMoreSvgTag(e);
                break;
        }

        
        const clickEvent = new Event('click', {bubbles: true, cancelable: true, composed: true});        
        props._currentTarget.dispatchEvent(clickEvent);        
    }

    static _handlePointerUpTriangle(e) {
        props._root.releasePointerCapture(e.pointerId);
        if (props._trianP === 'moving') this._handlePointerUpTriangleMoveItem();
        if (props._trianP === 'selection') this._handlePointerUpTriangleSelection(e);

        props._actvtag = null;
        props._actvmX = 0;
    }

    static _handlePointerUpTriangleMoveItem() {

        if (!props._trianT) return;
        if (props._actvmY === 0) return false;

        const activeLayerRect = WBTR.element.getRect(props._trianT);
        const left = ((activeLayerRect.x - props._actvPageRect.x) / props._magnifScale).toFixed(0) + 'px';
        const top = ((activeLayerRect.y - props._actvPageRect.y) / props._magnifScale).toFixed(0) + 'px';

        props._trianT.style.left = left;
        props._trianT.style.top = top;
        props._trianT.style.translate = 'none';

        
        if (props._trianT.nodeName == 'svg') {
            WBTR.db.updateObject('layers', props._currentTarget.dataset.layer, {
                'stop': top,
                'sleft': left,
            }).catch((error) => {
                console.log(error);
            })
        } else {
            
            WBTR.db.updateObject('layers', props._currentTarget.dataset.layer, { left, top, }).catch((error) => {
                console.log(error);
            })
        }
    }

    static _handlePointerUpTriangleSelection() {
        props._root.$id.canvasSelection.classList.remove('show');
    }

    static _handlePointerUpHtmlTag(e) {

        props._root.releasePointerCapture(e.pointerId);

        if (props._actvtag && props._actvmY) {

            
            const newLayerObj = {
                pId: props._actvPage.dataset.page,
                nodeName: props._actvtag.tagName,
                visibility: 'visible',
                top: props._actvtag.style.top,
                left: props._actvtag.style.left,
                width: props._actvtag.style.width,
                height: props._actvtag.style.height,
                translate: 'none',
                'z-index': props._actvtag.style.zIndex,
            };
 
            
            WBTR.db.addObject('layers', newLayerObj).then((addedObjects) => {
                newLayerObj.index = addedObjects[0].index;
                props._actvtag.setAttribute('data-layer', newLayerObj.index);                

                const sidebarLayerStr = WBTR.layerSidebarLayers._methods._getLayerHTMLTemplate()
                    .replace('@@layer--index@@', newLayerObj.index)
                    .replace('@@layer--visibility@@', 'visible')
                    .replace('@@visibility--title@@', 'Hide')
                    .replace('@@layer--access@@', 'unlock')
                    .replace('@@access--title@@', 'Unlock')
                    .replace('@@layer--tagname@@', methods._getLayerTagName(newLayerObj.nodeName))
                    .replace('@@layer--order@@', newLayerObj['z-index']);
                WBTR.layerSidebarLayers._methods._showLayerHTMLTemplate(sidebarLayerStr, true);

                WBTR.data.layers.push(newLayerObj); 
                props._actvtag.click();                                
                this._resetProps();
                WBTR.canvasTools._methods._switchThisTool();


            }).catch((error) => {
                
                console.log(error)
            })
        } else {
            props._actvtag?.remove();
            props._actvtag = null;
        }
    }

    static _handToolPointerUp(e) {
        props._root.releasePointerCapture(e.pointerId);
        props._magnifPanning = false;
        props._root.$id.pages.removeAttribute('data-current-tool');
        props._isTransitioning = false;
    }

    static _handlePointerUpRectTag(e) {

        props._root.releasePointerCapture(e.pointerId);

        if (props._actvtag && props._actvmY) {

            const svgData = methods._createSvgWrapper();
            const attributeString = methods._getSvgShapeAttributes(props._actvtag);

            
            const newLayerObj = {
                pId: props._actvPage.dataset.page,
                nodeName: props._actvtag.tagName,
                visibility: 'visible',
                attributes: attributeString,
                translate: 'none',
                'z-index': methods._getZIndexOfNewCreatedLayer(),
                ...svgData,
            };

            
            WBTR.db.addObject('layers', newLayerObj).then((addedObjects) => {
                newLayerObj.index = addedObjects[0].index;
                props._actvtag.setAttribute('data-layer', newLayerObj.index);

                const sidebarLayerStr = WBTR.layerSidebarLayers._methods._getLayerHTMLTemplate()
                    .replace('@@layer--index@@', newLayerObj.index)
                    .replace('@@layer--visibility@@', 'visible')
                    .replace('@@visibility--title@@', 'Hide')
                    .replace('@@layer--access@@', 'unlock')
                    .replace('@@access--title@@', 'Unlock')
                    .replace('@@layer--tagname@@', methods._getLayerTagName(newLayerObj.nodeName))
                    .replace('@@layer--icon@@', 'rect')
                    .replace('@@layer--order@@', newLayerObj['z-index']);;
                WBTR.layerSidebarLayers._methods._showLayerHTMLTemplate(sidebarLayerStr, true);

                WBTR.data.layers.push(newLayerObj);
                this._resetProps();
                WBTR.canvasTools._methods._switchThisTool();

            }).catch((error) => {
                
                console.log(error)
            })
        } else {
            props._actvtag?.remove(); 
            props._actvtag = null;
        }
    }

    static _handlePointerUpLineTag(e) {

        props._root.releasePointerCapture(e.pointerId);

        if (props._actvtag && props._actvmY) {

            const svgData = methods._createSvgWrapper();

            const attributeString = methods._getSvgShapeAttributes(props._actvtag);

            
            const newLayerObj = {
                pId: props._actvPage.dataset.page,
                nodeName: props._actvtag.tagName,
                visibility: 'visible',
                attributes: attributeString,
                translate: 'none',
                'z-index': methods._getZIndexOfNewCreatedLayer(),
                ...svgData,
            };

            
            WBTR.db.addObject('layers', newLayerObj).then((addedObjects) => {
                newLayerObj.index = addedObjects[0].index;
                props._actvtag.setAttribute('data-layer', newLayerObj.index);

                const sidebarLayerStr = WBTR.layerSidebarLayers._methods._getLayerHTMLTemplate().
                replace('@@layer--index@@', newLayerObj.index)
                    .replace('@@layer--visibility@@', 'visible')
                    .replace('@@visibility--title@@', 'Hide')
                    .replace('@@layer--tagname@@', methods._getLayerTagName(newLayerObj.nodeName))
                    .replace('@@layer--icon@@', 'line')
                    .replace('@@layer--order@@', newLayerObj['z-index']);;
                WBTR.layerSidebarLayers._methods._showLayerHTMLTemplate(sidebarLayerStr, true);

                WBTR.data.layers.push(newLayerObj);
                this._resetProps();
                WBTR.canvasTools._methods._switchThisTool();

            }).catch((error) => {
                
                console.log(error)
            })
        } else {
            props._actvtag?.remove();
            props._actvtag = null;
        }
    }

    static _handlePointerUpCircleTag(e) {
        props._root.releasePointerCapture(e.pointerId);

        if (props._actvtag && props._actvmY) {

            const svgData = methods._createSvgWrapper();

            const attributeString = methods._getSvgShapeAttributes(props._actvtag);

            
            const newLayerObj = {
                pId: props._actvPage.dataset.page,
                nodeName: props._actvtag.tagName,
                visibility: 'visible',
                attributes: attributeString,
                translate: 'none',
                'z-index': methods._getZIndexOfNewCreatedLayer(),
                ...svgData,
            };



            
            WBTR.db.addObject('layers', newLayerObj).then((addedObjects) => {
                newLayerObj.index = addedObjects[0].index;
                props._actvtag.setAttribute('data-layer', newLayerObj.index);

                const sidebarLayerStr = WBTR.layerSidebarLayers._methods._getLayerHTMLTemplate()
                .replace('@@layer--index@@', newLayerObj.index)
                .replace('@@layer--visibility@@', 'visible')
                .replace('@@visibility--title@@', 'Hide')
                .replace('@@layer--access@@', 'unlock')
                .replace('@@access--title@@', 'Unlock')
                .replace('@@layer--tagname@@', methods._getLayerTagName(newLayerObj.nodeName))
                .replace('@@layer--icon@@', 'circle')
                .replace('@@layer--order@@', newLayerObj['z-index']);
                WBTR.layerSidebarLayers._methods._showLayerHTMLTemplate(sidebarLayerStr, true);

                WBTR.data.layers.push(newLayerObj);
                this._resetProps();
                WBTR.canvasTools._methods._switchThisTool();

            }).catch((error) => {
                
                console.log(error)
            })
        } else {
            props._actvtag?.remove();
            props._actvtag = null;
        }
    }

    static _handlePointerUpellipseTag(e) {
        props._root.releasePointerCapture(e.pointerId);

        if (props._actvtag && props._actvmY) {

            const svgData = methods._createSvgWrapper();

            const attributeString = methods._getSvgShapeAttributes(props._actvtag);

            
            const newLayerObj = {
                pId: props._actvPage.dataset.page,
                nodeName: props._actvtag.tagName,
                visibility: 'visible',
                attributes: attributeString,
                translate: 'none',
                'z-index': methods._getZIndexOfNewCreatedLayer(),
                ...svgData,
            };

            
            WBTR.db.addObject('layers', newLayerObj).then((addedObjects) => {
                newLayerObj.index = addedObjects[0].index;
                props._actvtag.setAttribute('data-layer', newLayerObj.index);

                const sidebarLayerStr = WBTR.layerSidebarLayers._methods._getLayerHTMLTemplate()
                .replace('@@layer--index@@', newLayerObj.index)
                .replace('@@layer--visibility@@', 'visible')
                .replace('@@visibility--title@@', 'Hide')
                .replace('@@layer--access@@', 'unlock')
                .replace('@@access--title@@', 'Unlock')
                .replace('@@layer--tagname@@', methods._getLayerTagName(newLayerObj.nodeName))
                .replace('@@layer--icon@@', 'ellipse')
                .replace('@@layer--order@@', newLayerObj['z-index']);;
                WBTR.layerSidebarLayers._methods._showLayerHTMLTemplate(sidebarLayerStr, true);

                WBTR.data.layers.push(newLayerObj);
                this._resetProps();
                WBTR.canvasTools._methods._switchThisTool();

            }).catch((error) => {
                
                console.log(error)
            })
        } else {
            props._actvtag?.remove();
            props._actvtag = null;
        }
    }

    static _handlePointerUpPathTag(e) {

        props._root.releasePointerCapture(e.pointerId);

        if (!props._actvtag || props._pathPoints.length <= 1) return;

        const attributeString = methods._getSvgShapeAttributes(props._actvtag.children[0]);

        
        const newLayerObj = {
            pId: props._actvPage.dataset.page,
            nodeName: props._actvtag.tagName,
            visibility: 'visible',
            attributes: attributeString,
            translate: 'none',
            'z-index': methods._getZIndexOfNewCreatedLayer(),
        };
        if (props._actvtag.dataset.layer) newLayerObj.index = props._actvtag.dataset.layer;

        if (newLayerObj.index) {
            WBTR.db.updateObject('layers', newLayerObj.index, {
                attributes: attributeString,
            }).catch((error) => {
                console.log(error);
            })
        } else {
            
            WBTR.db.addObject('layers', newLayerObj).then((addedObjects) => {
                newLayerObj.index = addedObjects[0].index;
                props._actvtag.setAttribute('data-layer', newLayerObj.index);

                const sidebarLayerStr = WBTR.layerSidebarLayers._methods._getLayerHTMLTemplate()
                .replace('@@layer--index@@', newLayerObj.index)
                .replace('@@layer--visibility@@', 'visible')
                .replace('@@visibility--title@@', 'Hide')
                .replace('@@layer--access@@', 'unlock')
                .replace('@@access--title@@', 'Unlock')
                .replace('@@layer--tagname@@', methods._getLayerTagName(newLayerObj.nodeName))
                .replace('@@layer--icon@@', 'path')
                .replace('@@layer--order@@', newLayerObj['z-index']);;
                WBTR.layerSidebarLayers._methods._showLayerHTMLTemplate(sidebarLayerStr, true);

                WBTR.data.layers.push(newLayerObj);

            }).catch((error) => {
                
                console.log(error)
            })
        }
    }

    static _handlePointerUpMoreSvgTag(e) {

        props._root.releasePointerCapture(e.pointerId);

        if (props._actvtag && props._actvmY) {            

            const attributeString = methods._getSvgShapeAttributes(props._actvtag.children[0]);

            
            const newLayerObj = {
                pId: props._actvPage.dataset.page,
                nodeName: props._actvtag.children[0].tagName,
                visibility: 'visible',
                attributes: attributeString,
                translate: 'none',
                'z-index': props._actvtag.style.zIndex,
                stop: props._actvtag.style.top,
                sleft: props._actvtag.style.left,
                swidth: props._actvtag.style.width,
                sheight: props._actvtag.style.height,
                sviewBox: props._actvtag.getAttribute('viewBox'),
            }; 



            
            WBTR.db.addObject('layers', newLayerObj).then((addedObjects) => {
                newLayerObj.index = addedObjects[0].index;
                props._actvtag.children[0].setAttribute('data-layer', newLayerObj.index);

                const sidebarLayerStr = WBTR.layerSidebarLayers._methods._getLayerHTMLTemplate()
                .replace('@@layer--index@@', newLayerObj.index)
                .replace('@@layer--visibility@@', 'visible')
                .replace('@@visibility--title@@', 'Hide')
                .replace('@@layer--access@@', 'unlock')
                .replace('@@access--title@@', 'Unlock')
                .replace('@@layer--tagname@@', methods._getLayerTagName(newLayerObj.nodeName))
                .replace('@@layer--icon@@', 'path')
                .replace('@@layer--order@@', newLayerObj['z-index']);;
                WBTR.layerSidebarLayers._methods._showLayerHTMLTemplate(sidebarLayerStr, true);

                WBTR.data.layers.push(newLayerObj);
                this._resetProps();
                WBTR.canvasTools._methods._switchThisTool();

            }).catch((error) => {
                
                console.error(error)
            })
        } else {
            props._actvtag?.remove();
            props._actvtag = null;
        }
    }

    static _resetProps() {
        props._actvdX = props._actvdY = props._actvmX = props._actvmY = 0;
        props._actvPageRect = props._actvtag = props._trianT = null;
    }

}

export default Pointerup;