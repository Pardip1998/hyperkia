
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Click {
	static _handler(e){		
		if(props._eTarget.dataset.eventId === "add-page") this._addPage();
		
	}

	static _addPage(){
		const pageData = {
			name: `Page ${WBTR.data.pages.length+1}`,
			'background-color': '#ffffffff',
			width: '1920px',
  		height: '6000px',
		}
		WBTR.db.addObject('pages',pageData).then((success)=>{	
			pageData.index = success[0].index;
			WBTR.data.pages.push(pageData);
			methods._appendPagesHTML(pageData, 'add-page');
			
			WBTR.element._makeElementEditableWithFocus(props._root.$id.pageList.children[props._root.$id.pageList.children.length-1]);
			WBTR.canvas._methods._createPages(pageData);
			
		}).catch((error)=>{
			console.log(error);
		})
	}

	
	
	
	
	
	
	
	
}

export default Click;