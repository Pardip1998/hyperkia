

import {
    Click,
} from './events/index.js';
 

import methods from './utils/methods.js';
import props from './utils/props.js';

import WBTRCustomElement from '../../wbtr-custom-element/index.js';
import html from './html.js';



class WBTR_Select extends WBTRCustomElement{

	

	_detailsEl = null;
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
		methods._markupSetup(this);
		this._events();		
	}	

	_updateHTML(html){		
		this._detailsEl.replaceChildren();
		this._detailsEl.innerHTML = html;
	}

	_events(){
		this.shadowRoot.addEventListener('click', this._handleEvents);
	}

	_handleEvents(e){
		props._eTarget = e.composedPath()[0];	
		props._eRootNode = props._eTarget.getRootNode().host;	
		if(e.type == 'click') Click._handler(e);
	}

	get value(){
		return this.getAttribute('value');
	}

	set value(valu){		
		methods._selectedValueOption(this, valu);
	}
 
	get selectedOption(){		
		return this.shadowRoot.querySelector('.select-option.selected');
	}


}

if(!customElements.get('wbtr-select')){
	customElements.define('wbtr-select',WBTR_Select);	
}
