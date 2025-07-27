
import props from '../utils/props.js';

class Click {

	static _handler(e){		
		if(props._eTarget.closest('[data-id="flip-sidebar"]')) this._flipSidebar();
		if(props._eTarget.closest('[data-tab-target]')) this._headerTabChanged();
	}

	static _flipSidebar(){		
		WBTR.designSidebar.classList.toggle('flip-sidebar-active');		
		props._root.$id.wrapper.classList.toggle('flip-sidebar-active');
		WBTR.designSidebarDesigns._methods._flipSidebar();		
	}
 
	static _headerTabChanged(){
		props._root.$class.tabLink.forEach((el)=>{
			el.classList.remove('active');
		})
		const tabTargetEl = props._eTarget.closest('[data-tab-target]');
		tabTargetEl.classList.add('active');
		WBTR.designSidebarDesigns.$id.wrapper.setAttribute('data-current-tab',tabTargetEl.dataset.tabTarget);
	}
}

export default Click;