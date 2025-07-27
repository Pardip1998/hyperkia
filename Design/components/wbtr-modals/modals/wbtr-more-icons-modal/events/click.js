

import props from '../utils/props.js';

class Click {
	static _handler(e){		
		if(props._eTarget.closest('[data-event-id="icons-list"]')) this.iconSelected();
	}

	static iconSelected(e){		
		const iconName = props._eTarget.closest('[data-event-id="icons-list"]').dataset.iconName;
		console.log(`/app/design/assets/icons/fontawesome/${iconName}.svg`);		
	    fetch(`/app/design/assets/icons/fontawesome/${iconName}.svg`)
	        .then(res => res.text())
	            .then(svg => {
	                WBTR.canvasTools.$id.svgshape.children[0].innerHTML = svg;
	                props._root.classList.remove('show');
	                WBTR.modals.classList.remove('show');
        }); 
	}

}

export default Click;