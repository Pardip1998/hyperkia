
import props from './props.js';


const Methods = {

	_openMenu(e,id,targetEl){		
		this._closeActiveMenu();
		const rootNodeName = targetEl.getRootNode().host.nodeName;		
		
		if(rootNodeName === 'WBTR-LAYER-SIDEBAR-LAYERS' || rootNodeName === 'WBTR-CANVAS') {
			props._layerIndex = targetEl.dataset.layer;
		}
		
		this._setContextMenuPosition(e,id);

		props._root.$id[id].classList.add('show');
		props._root.classList.add('show');
	},

	_closeActiveMenu(){
		props._root.shadowRoot.querySelector('.menu.show')?.classList.remove('show');
		props._root.classList.remove('show');
	},

	_setContextMenuPosition(e,id){	
		props._root.$id[id].style = `left:${e.clientX}px;top:${e.clientY}px;`;		
	},

	_layerMenuClicked(){
		const action = props._eTarget.closest('[data-menu-action]').dataset.menuAction;

		if(action === 'delete') {
			WBTR.canvas._methods._setCSSRulesToLayerByIndex(props._layerIndex, {display: 'none'});
		} else if(action === 'access') {
			WBTR.layerSidebarLayers.shadowRoot.querySelector(`[data-layer="${props._layerIndex}"] [data-event-id="layer-access"]`).click();
		} else if(action === 'visibility') {
			WBTR.layerSidebarLayers.shadowRoot.querySelector(`[data-layer="${props._layerIndex}"] [data-event-id="layer-visibility"]`).click();
		} else if(action === 'duplicate') {
			
		}
	},
	
}

export default Methods;