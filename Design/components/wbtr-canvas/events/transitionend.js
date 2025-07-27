
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Transitionend {

	static _handler(e){		
		if(props._eTarget.dataset.id === 'pages') methods._rectCalculate();
		if (e.propertyName === 'transform') {
			methods._pagenamePositionManage();
			props._isTransitioning = false;			
		}
	}

}

export default Transitionend;