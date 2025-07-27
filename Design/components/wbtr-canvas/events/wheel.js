
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Wheel {  

	static _handler(e){
		if(WBTR.canvasTools._props._activeTool === 'magnifying-glass') {
			this._magnifyingPointerWheel(e);
			methods._rectCalculate();
		}
	}

	static _magnifyingPointerWheel(e){  
    e.preventDefault();    
    let xs = (e.clientX-props._shadowRootRect.left+props._root.scrollLeft - props._magnifpX) / props._magnifScale,
    ys = (e.clientY - props._magnifpY-props._shadowRootRect.top+props._root.scrollTop) / props._magnifScale,
    delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
    (delta > 0) ? (props._magnifScale *= 1.2) : (props._magnifScale /= 1.2);
    if(props._magnifScale>10.7) props._magnifScale = 10.7;
    if(props._magnifScale<0.05) props._magnifScale = 0.05;

    props._magnifpX = +(e.clientX-props._shadowRootRect.left+props._root.scrollLeft - xs * props._magnifScale).toFixed(0);
    props._magnifpY = +(e.clientY-props._shadowRootRect.top+props._root.scrollTop - ys * props._magnifScale).toFixed(0);
    methods._magnifyingTransform();
    methods._pagenamePositionManage(); 
  }
}

export default Wheel;