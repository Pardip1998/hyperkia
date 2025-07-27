
import props from '../utils/props.js'; 
 
class Keyup {
	static _handler(){
	    if(props._eTarget.dataset.eventId === 'tag-innerhtml') WBTR.canvas._methods._updateCurrentTargetInnerHTML();
	    if(props._eTarget.dataset.eventId === 'tag-src') WBTR.canvas._methods._updateCurrentTargetSrc();
	}
	
}

export default Keyup;