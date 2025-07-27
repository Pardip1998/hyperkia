
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Wheel {

	static _handler(e){		
		if(props._root.$id.searchFontawesomeIcon.value.length > 0) return;		
  		methods.scrollEndFetchMoreIcons();
	}

}

export default Wheel;