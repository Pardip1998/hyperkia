import * as Events from './events/index.js';

import methods from './utils/methods.js';
import props from './utils/props.js';

import WBTRCustomElement from '../wbtr-custom-element/index.js';
import html from './html.js';



class WBTR_Layer_Sidebar_Header extends WBTRCustomElement{

	_methods = methods;
	_props = props;

	constructor(){
		super();
		this.html = html;
		this.moduleURL = import.meta.url;
	}

	connectedCallback(){
		this.attachShadow({mode: 'open'});
		this._defaultSetup();
		this._props._root = this;
		this._eventsSetup(Events);
	}	

	_handleEvents(e){		
		props._eTarget = e.composedPath()[0];

		
		if(['pointermove','input', 'wheel', 'scroll'].includes(e.type)) {
			if (Date.now() - this.lastThrottle < 30) return; 
			this.lastThrottle = Date.now();
			Events[e.type]?._handler?.(e);
			return;
		}

		
		if(['keyup'].includes(e.type)) {			
			clearTimeout(this.debounceTimeout);
			this.debounceTimeout = setTimeout(() => {
				Events[e.type]?._handler?.(e);
			}, 100);			
			return;
		}

		Events[e.type]?._handler?.(e);		
	}

	_init(){
		props._layerDropTop = document.createElement('span');
        props._layerDropTop.classList.add('dropfree', 'dropfree-top');
        props._layerDropBottom = document.createElement('span');
        props._layerDropBottom.classList.add('dropfree', 'dropfree-bottom');
	}

}

if(!customElements.get('wbtr-layer-sidebar-layers')){
	customElements.define('wbtr-layer-sidebar-layers',WBTR_Layer_Sidebar_Header);	
}
