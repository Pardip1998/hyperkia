
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Click {

	static _handler(e){
		if(props._eTarget.closest('[data-id="flip-sidebar-btn"]')) this.flipSidebar();
		if(props._eTarget.matches('nav.nav')) this._closeNav();
		if(props._eTarget.dataset.eventId === 'nav-menu-item') this._navMenuItemSelected();
	}

	static _closeNav(){
		props._root.$id.navVisibilityInput.checked = false;
		methods._handleNavVisibility();
	}

	static flipSidebar(){
		WBTR.layerSidebar.classList.toggle('flip-sidebar-active');
		WBTR.layerSidebarHeader.$id.wrapper.classList.toggle('flip-sidebar-active');
		WBTR.layerSidebarLayers.$id.wrapper.classList.toggle('flip-sidebar-active');	
		setTimeout(()=>{
			WBTR.canvas._methods._rectCalculate();
		},500);
	}

	static _navMenuItemSelected(){		
		this._closeNav();
		methods[props._eTarget.dataset.method]();
	}
	
}

export default Click;