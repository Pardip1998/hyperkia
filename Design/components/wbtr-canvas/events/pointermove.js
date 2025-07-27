import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Pointermove {

    static _handler(e) {

        switch (WBTR.canvasTools._props._activeTool) {
            case 'triangle':
                this._handlePointerMoveTriangle(e);
                break;

            case 'htmltag':
                this._handlePointerMoveHtmlTag(e);
                break;

            case 'hand':
                this._handToolPointerMove(e);
                break;

            case 'rectsvg':
                this._handlePointerMoveRectTag(e);
                break;

            case 'linesvg':
                this._handlePointerMoveLineTag(e);
                break;

            case 'circlesvg':
                this._handlePointerMoveCircleTag(e);
                break;

            case 'ellipsesvg':
                this._handlePointerMoveellipseTag(e);
                break;

            case 'pathsvg':
                this._handlePointerMovePathTag(e);
                break;

            case 'moresvg':
				this._handlePointerMoveMoreSvgTag(e);
				break;
        }
    }

    static _handlePointerMoveTriangle(e) {
        if (!props._root.hasPointerCapture(e.pointerId)) return false;
        if (props._trianP === 'moving') this._handlePointerMoveTriangleMoveItem(e);
        if (props._trianP === 'selection') this._handlePointerMoveTriangleSelection(e);
    }

    static _handlePointerMoveTriangleMoveItem(e) {

        if (!props._trianT) return;
        props._actvmX = ((e.clientX * 1) / props._magnifScale);
        props._actvmY = ((e.clientY * 1) / props._magnifScale);

        const tX = Math.floor(props._actvmX - props._actvdX);
        const tY = Math.floor(props._actvmY - props._actvdY);

        props._trianT.style.translate = `${tX}px ${tY}px`;
 
        methods._updatePropFormFieldsOfCanvasTarget({
            left: (+props._trianTcss.left.replace('px', '')) + tX,
            top: (+props._trianTcss.top.replace('px', '')) + tY,
        });
    }

    static _handlePointerMoveTriangleSelection(e) {
        props._actvmX = Math.abs(e.clientX - props._shadowRootRect.x) + WBTR.canvas.scrollLeft; 
        props._actvmY = Math.abs(e.clientY - props._shadowRootRect.y) + WBTR.canvas.scrollTop;
        const left = Math.min(props._actvdX, props._actvmX);
        const top = Math.min(props._actvdY, props._actvmY);
        const width = Math.abs(props._actvmX - props._actvdX);
        const height = Math.abs(props._actvmY - props._actvdY);
        props._root.$id.canvasSelection.style = `left: ${left}px;top: ${top}px;width: ${width}px;height:${height}px;`;

        methods._highlightElementsInSelection();
    }

    static _handToolPointerMove(e) {
        if (!props._root.hasPointerCapture(e.pointerId)) return false;
        if (!props._magnifPanning) return;
        props._magnifpX = +(e.clientX - props._magnifsX).toFixed(0);
        props._magnifpY = +(e.clientY - props._magnifsY).toFixed(0);
        methods._magnifyingTransform();
        methods._pagenamePositionManage();
    }

    static _handlePointerMoveHtmlTag(e) {
        if (!props._root.hasPointerCapture(e.pointerId)) return false;
        if ((!props._actvtag)) return false;

        props._actvmX = Math.trunc(Math.abs(e.clientX - props._actvPageRect.x) / props._magnifScale); 
        props._actvmY = Math.trunc(Math.abs(e.clientY - props._actvPageRect.y) / props._magnifScale);

        const left = Math.min(props._actvdX, props._actvmX);
        const top = Math.min(props._actvdY, props._actvmY);
        const width = Math.abs(props._actvmX - props._actvdX);
        const height = Math.abs(props._actvmY - props._actvdY);

        props._actvtag.style.left = left+'px';
        props._actvtag.style.top = top+'px';
        props._actvtag.style.width = width+'px';
        props._actvtag.style.height = height+'px';
        methods._updatePropFormFieldsOfCanvasTarget({ width, height, left, top });
    }

    static _handlePointerMoveRectTag(e) {
        if (!props._root.hasPointerCapture(e.pointerId)) return false;
        if ((!props._actvtag)) return false;

        props._actvmX = Math.abs(e.clientX - props._actvPageRect.x) / props._magnifScale;
        props._actvmY = Math.abs(e.clientY - props._actvPageRect.y) / props._magnifScale;

        const left = Math.min(props._actvdX, props._actvmX);
        const top = Math.min(props._actvdY, props._actvmY);
        const width = Math.abs(props._actvmX - props._actvdX);
        const height = Math.abs(props._actvmY - props._actvdY);

        props._actvtag.setAttribute('x', left);
        props._actvtag.setAttribute('y', top);
        props._actvtag.setAttribute('width', width);
        props._actvtag.setAttribute('height', height);
        methods._updatePropFormFieldsOfCanvasTarget({ width, height, });
    }

    static _handlePointerMoveLineTag(e) {
        if (!props._root.hasPointerCapture(e.pointerId)) return false;
        if ((!props._actvtag)) return false;

        props._actvmX = Math.abs(e.clientX - props._actvPageRect.x) / props._magnifScale;
        props._actvmY = Math.abs(e.clientY - props._actvPageRect.y) / props._magnifScale;

        const left = Math.min(props._actvdX, props._actvmX);
        const top = Math.min(props._actvdY, props._actvmY);
        const width = Math.abs(props._actvmX - props._actvdX);

        props._actvtag.setAttribute('x2', props._actvmX);
        props._actvtag.setAttribute('y2', props._actvmY);
        methods._updatePropFormFieldsOfCanvasTarget({ width, height: 1, });
    }

    static _handlePointerMoveCircleTag(e) {
        if (!props._root.hasPointerCapture(e.pointerId)) return false;
        if ((!props._actvtag)) return false;

        props._actvmX = Math.abs(e.clientX - props._actvPageRect.x) / props._magnifScale;
        props._actvmY = Math.abs(e.clientY - props._actvPageRect.y) / props._magnifScale;

        const r = Math.abs(props._actvmY - props._actvdY);
        props._actvtag.r.baseVal.value = r;
        methods._updatePropFormFieldsOfCanvasTarget({ width: r + r, height: r + r, });
    }

    static _handlePointerMoveellipseTag(e) {
        if (!props._root.hasPointerCapture(e.pointerId)) return false;
        if ((!props._actvtag)) return false;

        props._actvmX = Math.abs(e.clientX - props._actvPageRect.x) / props._magnifScale;
        props._actvmY = Math.abs(e.clientY - props._actvPageRect.y) / props._magnifScale;

        const rx = Math.abs(props._actvmX - props._actvdX);
        const ry = Math.abs(props._actvmY - props._actvdY);

        props._actvtag.rx.baseVal.value = rx;
        props._actvtag.ry.baseVal.value = ry;
        methods._updatePropFormFieldsOfCanvasTarget({ width: rx, height: ry, });
    }

    static _handlePointerMovePathTag(e) {}

	static _handlePointerMoveMoreSvgTag(e){		
		if(!props._root.hasPointerCapture(e.pointerId)) return false;
		if((!props._actvtag)) return false;

		props._actvmX = Math.abs(e.clientX - props._actvPageRect.x)/props._magnifScale; 
		props._actvmY = Math.abs(e.clientY - props._actvPageRect.y)/props._magnifScale;

		const left = Math.min(props._actvdX, props._actvmX);
		const top = Math.min(props._actvdY, props._actvmY);
		const width = Math.abs(props._actvmX - props._actvdX);
		const height = Math.abs(props._actvmY - props._actvdY);	
		
        props._actvtag.style.left = left+'px';
        props._actvtag.style.top = top+'px';
        props._actvtag.style.width = width+'px';
        props._actvtag.style.height = height+'px';
        methods._updatePropFormFieldsOfCanvasTarget({width,height,left,top});
	}

}

export default Pointermove;