
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Click {

	static clickLiEl = null;

	static _handler(e){		
		this.clickLiEl = props._eTarget.closest('[data-layer]');

		if(props._eTarget.dataset.eventId === 'layer-visibility') this._layerVisibilityChange(); 
		if(props._eTarget.dataset.eventId === 'layer-access') this._layerAccessAction(); 
		if(this.clickLiEl) WBTR.canvas._methods._updateClickToActiveLayer(this.clickLiEl.dataset.layer);
	} 

	static _layerVisibilityChange(){
		const actionEl = props._eTarget.closest('[data-event-id="layer-visibility"]');		
		const index = this.clickLiEl.dataset.layer;		
		
		if(actionEl.matches('.visible')){		
			WBTR.db.updateObject('layers', index, {visibility: 'hidden'}).then(()=>{
				actionEl.classList.replace('visible','hidden');
				actionEl.title = 'Show layer';
				WBTR.canvas._methods._setCSSRulesToLayerByIndex(index, {visibility: 'hidden'});
			})
		} else {
			WBTR.db.updateObject('layers', index, {visibility: 'visible'}).then(()=>{
				actionEl.classList.replace('hidden','visible');
				actionEl.title = 'Hide layer';
				WBTR.canvas._methods._setCSSRulesToLayerByIndex(index, {visibility: 'visible'});
			})
		}
	}
 
	static _layerAccessAction(){		
		const actionEl = props._eTarget.closest('[data-event-id="layer-access"]');
		const index = this.clickLiEl.dataset.layer;		
		
		if(actionEl.matches('.lock')){		
			WBTR.db.updateObject('layers', index, {'pointer-events': 'auto'}).then(()=>{
				actionEl.classList.replace('lock','unlock');
				actionEl.title = 'Unlock layer';
				WBTR.canvas._methods._setCSSRulesToLayerByIndex(index, {'pointer-events': 'auto'});
			})
		} else {
			WBTR.db.updateObject('layers', index, {'pointer-events': 'none'}).then(()=>{
				actionEl.classList.replace('unlock','lock');
				actionEl.title = 'Lock layer';
				WBTR.canvas._methods._setCSSRulesToLayerByIndex(index, {'pointer-events': 'none'});
			})
		}
	}


}

export default Click;