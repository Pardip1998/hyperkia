import * as Events from './events/index.js';
 

import methods from './utils/methods.js';
import props from './utils/props.js';

import WBTRCustomElement from '../../wbtr-custom-element/index.js';
import html from './html.js';


class WBTR_Prop_Input extends WBTRCustomElement{

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
		this._methods._markupSetup(this);		
		this._eventsSetup(Events);
	}

	_handleEvents(e){		
		if (Date.now() - this.lastThrottle < 30) return; 
		props._eTarget = e.composedPath()[0];
		props._eRootNode = props._eTarget.getRootNode().host;
        this.lastThrottle = Date.now();
        Events[e.type]?._handler?.(e);
        return;
	}

	get value() {
		return this.$id.input.value;
	}

	set value(valu) {
		this.$id.input.value = valu;
		if(this.$id.colorResult) {
			this.$id.colorResult.style.backgroundColor = valu;			
		}
	}
} 

if(!customElements.get('wbtr-prop-input')){
	customElements.define('wbtr-prop-input',WBTR_Prop_Input);	
}
 