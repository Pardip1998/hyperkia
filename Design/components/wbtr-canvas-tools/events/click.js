
import props from '../utils/props.js';
import methods from '../utils/methods.js';  
 
class Click {
	static _handler(e){	
		if (props._eTarget.closest('[data-tool]')) this._switchTool();
		
	}
 
	static _switchTool(){
		props.activeToolEl = props._eTarget.closest('[data-tool]');
		props._root.shadowRoot.querySelector('.activetool[data-tool]')?.classList.remove('activetool');
		props.activeToolEl.classList.add('activetool');

		props._activeTool = props.activeToolEl.dataset.tool;
		WBTR.canvas.dataset.currentTool = props._activeTool;

		methods._specificToolHandle(props._activeTool);
	}
}

export default Click;