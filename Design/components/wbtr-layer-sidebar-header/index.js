import WBTRCustomElement from '../wbtr-custom-element/index.js';
import html from './html.js';



class WBTR_Layer_Sidebar_Layers extends WBTRCustomElement{

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

if(!customElements.get('wbtr-layer-sidebar-header')){
	customElements.define('wbtr-layer-sidebar-header',WBTR_Layer_Sidebar_Layers);	
}
