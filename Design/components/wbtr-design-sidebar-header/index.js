import * as Events from './events/index.js';

import methods from './utils/methods.js';
import props from './utils/props.js';

import WBTRCustomElement from '../wbtr-custom-element/index.js';
import html from './html.js';

 

class WBTR_Design_Sidebar_Header extends WBTRCustomElement{

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

}

if(!customElements.get('wbtr-design-sidebar-header')){
	customElements.define('wbtr-design-sidebar-header',WBTR_Design_Sidebar_Header);	
}
