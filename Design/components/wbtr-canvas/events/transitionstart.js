
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Transitionstart {

	static _handler(e){		
		if (e.propertyName === 'transform') {
			props._isTransitioning = true;
			methods._pagenamePositionManage();
		}
	}

}

export default Transitionstart;