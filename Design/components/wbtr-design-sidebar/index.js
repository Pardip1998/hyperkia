import WBTRCustomElement from '../wbtr-custom-element/index.js';
import html from './html.js';

 

class WBTR_Design_Sidebar extends WBTRCustomElement{

	constructor(){
		super();
		this.html = html;
		this.moduleURL = import.meta.url;
	}

	connectedCallback(){
		this.attachShadow({mode: 'open'});		
		this._defaultSetup();
	}
}

if(!customElements.get('wbtr-design-sidebar')){
	customElements.define('wbtr-design-sidebar',WBTR_Design_Sidebar);	
}
