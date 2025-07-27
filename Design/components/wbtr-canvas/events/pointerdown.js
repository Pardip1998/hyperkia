
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Pointerdown {

	static _handler(e) {
		this._storeCanvasCurrentTargetAndPage(e); 
		props._currentTargetCSSRules = window.getComputedStyle(props._currentTarget); 
		methods._updateFormFieldsOfCurrentTarget(props._currentTargetCSSRules); 
		
		switch (WBTR.canvasTools._props._activeTool) {
			case 'triangle':
				this._handlePointerDownTriangle(e);
				break;

			case 'htmltag':
				this._handlePointerDownHtmlTag(e);
				break;

			case 'hand':
				this._handleToolPointerDownHand(e);
				break;

			case 'rectsvg':
				this._handlePointerDownRectTag(e);
				break;

			case 'linesvg':
				this._handlePointerDownLineTag(e);
				break;

			case 'circlesvg':
				this._handlePointerDownCircleTag(e);
				break;

			case 'ellipsesvg':
				this._handlePointerDownEllipseTag(e);
				break;

			case 'pathsvg':
				this._handlePointerDownPathTag(e);
				break;

			case 'moresvg':
				this._handlePointerDownMoreSvgTag(e);
				break;
		}
	}

	static _handlePointerDownTriangle(e) {
		
		props._root.setPointerCapture(e.pointerId);

		if (props._currentTarget.matches('[data-layer]')) {
			props._trianP = 'moving';
		} else {
			props._trianP = 'selection';
		}

		if (props._trianP === 'moving') this._handlePointerDownTriangleMoveItem(e);
		if (props._trianP === 'selection') this._handlePointerDownTriangleSelection(e);
	}

	static _handlePointerDownTriangleMoveItem(e) {
		props._trianT = props._eTarget.closest('[data-trian-move="true"]');
		if (!props._trianT) return;
		props._trianTcss = props._trianT ? window.getComputedStyle(props._trianT) : null;
 
		props._actvdX = ((e.clientX * 1) / props._magnifScale);
		props._actvdY = ((e.clientY * 1) / props._magnifScale);		
	}

	static _handlePointerDownTriangleSelection(e) {
		props._root.setPointerCapture(e.pointerId);
		props._actvdX = Math.abs(e.clientX - props._shadowRootRect.x) + WBTR.canvas.scrollLeft;
		props._actvdY = Math.abs(e.clientY - props._shadowRootRect.y) + WBTR.canvas.scrollTop;
		props._root.$id.canvasSelection.style = '';
		props._root.$id.canvasSelection.classList.add('show');
	}

	static _handleToolPointerDownHand(e) {
		props._root.setPointerCapture(e.pointerId);
		props._magnifsX = e.clientX - props._magnifpX;
		props._magnifsY = e.clientY - props._magnifpY;
		props._magnifdX = e.clientX;
		props._magnifdY = e.clientY;
		props._magnifPanning = true;

		props._root.$id.pages.setAttribute('data-current-tool', 'hand');
		props._isTransitioning = true;
	}

	static _handlePointerDownHtmlTag(e) {		
				
		props._root.setPointerCapture(e.pointerId);
		if (!props._actvPage) return;

		if(props._createHTMLTag === 'iframe') {
			props._actvtag = document.createElement('iframewrap');
			const iframeEl = document.createElement(props._createHTMLTag);
			iframeEl.src = 'https://www.google.com/';
			props._actvtag.appendChild(iframeEl);
		} else {
			props._actvtag = document.createElement(props._createHTMLTag);
		}
		
		props._actvtag.classList.add('canvas-layer');
		props._actvtag.setAttribute('data-trian-move', true);
		props._actvtag.setAttribute('draggable', false);
		props._actvPage.append(props._actvtag);
		props._actvtag.style.zIndex = methods._getZIndexOfNewCreatedLayer();

		methods._updatePropFormFieldsOfCanvasTarget({
			left: props._actvdX,
			top: props._actvdY,
		});
	}

	static _handlePointerDownRectTag(e) {
		props._root.setPointerCapture(e.pointerId);
		if (!props._actvPage) return;

		props._actvtag = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		props._actvtag.classList.add('canvas-layer');
		props._root.$id[`page${props._actvPage.dataset.page}svg`].appendChild(props._actvtag);

		methods._updatePropFormFieldsOfCanvasTarget();
	}

	static _handlePointerDownLineTag(e) {
		props._root.setPointerCapture(e.pointerId);
		if (!props._actvPage) return;

		props._actvtag = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		props._actvtag.classList.add('canvas-layer');
		props._root.$id[`page${props._actvPage.dataset.page}svg`].appendChild(props._actvtag);

		props._actvtag.setAttribute('x1', props._actvdX);
		props._actvtag.setAttribute('y1', props._actvdY);
		props._actvtag.setAttribute('x2', props._actvdX);
		props._actvtag.setAttribute('y2', props._actvdY);

		methods._updatePropFormFieldsOfCanvasTarget();
	}

	static _handlePointerDownCircleTag(e) {
		props._root.setPointerCapture(e.pointerId);
		if (!props._actvPage) return;

		props._actvtag = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		props._actvtag.classList.add('canvas-layer');
		props._root.$id[`page${props._actvPage.dataset.page}svg`].appendChild(props._actvtag);

		props._actvtag.cx.baseVal.value = props._actvdX;
		props._actvtag.cy.baseVal.value = props._actvdY;

		methods._updatePropFormFieldsOfCanvasTarget();
	}

	static _handlePointerDownEllipseTag(e) {
		console.log(e);
		props._root.setPointerCapture(e.pointerId);
		if (!props._actvPage) return;

		props._actvtag = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
		props._actvtag.classList.add('canvas-layer');
		props._root.$id[`page${props._actvPage.dataset.page}svg`].appendChild(props._actvtag);

		props._actvtag.cx.baseVal.value = props._actvdX;
		props._actvtag.cy.baseVal.value = props._actvdY;

		methods._updatePropFormFieldsOfCanvasTarget();
	}

	static _handlePointerDownPathTag(e) {
		props._root.setPointerCapture(e.pointerId);
		const pathFirstPoint = props._eTarget.closest('[data-id="canvas-create-path-firstpoint"]');

		if (pathFirstPoint && !props._actvPage) props._actvPage = props._actvtag.closest('[data-common-closest="page"]');

		if (props._actvPage || pathFirstPoint) {

			if (!props._actvtag) {
				props._pathPoints.length = 0;
				props._actvtag = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				props._actvtag.classList.add('canvas-layer');
				props._root.$id[`page${props._actvPage.dataset.page}svg`].appendChild(props._actvtag);
			}

			props._actvdX = Math.abs(e.clientX - props._actvPageRect.x) / props._magnifScale;
			props._actvdY = Math.abs(e.clientY - props._actvPageRect.y) / props._magnifScale;

			if (props._pathPoints.length == 0) {
				props._root.$id.canvasCreatePathFirstpoint.style.left = (Math.abs(e.clientX - props._shadowRootRect.x) + WBTR.canvas.scrollLeft) - 4 + 'px';
				props._root.$id.canvasCreatePathFirstpoint.style.top = (Math.abs(e.clientY - props._shadowRootRect.y) + WBTR.canvas.scrollTop) - 4 + 'px';
				props._root.$id.canvasCreatePathFirstpoint.classList.add('show');
			}

			if (pathFirstPoint) {
				methods._pathCreatedSuccessFully();
				WBTR.canvasTools._methods._switchThisTool();
				return;
			} else {
				props._pathPoints.push(`${props._actvdX.toFixed(0)}, ${props._actvdY.toFixed(0)}`);
			}
			props._actvtag.setAttribute('d', 'M ' + props._pathPoints.join(' '));
		}
	}

	static _handlePointerDownMoreSvgTag(e){
		props._root.setPointerCapture(e.pointerId);
		if (!props._actvPage) return;

		
		props._actvtag = WBTR.canvasTools.$id.svgshape.children[0].children[0].cloneNode(true);			
		props._actvtag.children[0].classList.add('canvas-layer');
		props._actvPage.append(props._actvtag);
		props._actvtag.setAttribute('data-trian-move', true);
		props._actvtag.style.zIndex = methods._getZIndexOfNewCreatedLayer();
		props._actvtag.classList.add('moresvg-layer');
		props._actvtag.setAttribute('preserveAspectRatio', 'none');

		methods._updatePropFormFieldsOfCanvasTarget({
			left: props._actvdX,
			top: props._actvdY,
		});
	}

	static _storeCanvasCurrentTargetAndPage(e) {

		props._currentTargetId = 'canvas';

		if (props._eTarget.closest('[data-layer]')) {
			props._currentTarget = props._eTarget.closest('[data-layer]');
			props._currentTargetId = 'layer';
		} else if (props._eTarget.closest('[data-class="page"]')) {
			props._currentTarget = props._eTarget.closest('[data-class="page"]');
			props._currentTargetId = 'page';
		} else if (props._eTarget.closest('[data-id="pages"]')) {
			props._currentTarget = WBTR.canvas;
		}  else if (props._eTarget.closest('wbtr-canvas')) {
			props._currentTarget = WBTR.canvas;
		} 

		methods._uiBasedOnCanvasCurrentTarget();		

		props._actvPage = props._currentTarget.closest('[data-page]'); 
		props._actvPageRect = props._actvPage ? (WBTR.element.getRect(props._actvPage)) : false; 
		props._actvdX = Math.trunc(Math.abs(e.clientX - props._actvPageRect.x) / props._magnifScale); 
		props._actvdY = Math.trunc(Math.abs(e.clientY - props._actvPageRect.y) / props._magnifScale); 
		
		WBTR.designSidebarDesigns._methods._activeTagBasedCSSPropFields(props._currentTarget);		
	}
}

export default Pointerdown;