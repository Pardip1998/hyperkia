
import props from './props.js';


const Methods = {

	_specificToolHandle(tool){		
		if(tool != 'text') this._noTextTool();
		if(tool != 'pathsvg') this._noPathSVGTool();

		const callBack = `_${WBTR.helper.underScoreToCamelCase(tool)}ToolHandle`;
		
		if(this[callBack]) this[callBack]();
	},
 
	
	_noTextTool(){
		WBTR.canvas._methods._removeContentEditableFromLayer();
	},

	_noPathSVGTool(){		
		WBTR.canvas._methods._pathCreatedSuccessFully();
	},

	_switchThisTool(tool='triangle'){
		props._root.shadowRoot.querySelector(`.tool-item.${tool}`).click();
	},


	
	_specificSubToolHandle(subToolValue){
		if(this['_'+subToolValue+'SubToolHandle']) this['_'+subToolValue+'SubToolHandle']();
	},
	
	_moresvgSubToolHandle(){
		WBTR.modals._methods._modalOpen('moreIconsModal');
		WBTR.moreIconsModal.$id.iconsLists.scrollTo(0,0);
	},

}

export default Methods;