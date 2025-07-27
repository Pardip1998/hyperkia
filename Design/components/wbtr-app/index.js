
import WBTRCustomElement from '../wbtr-custom-element/index.js';
import html from './html.js';


class WBTR_App extends WBTRCustomElement{	

	constructor(){
		super();
		this.html = html;
		this.moduleURL = import.meta.url;				
	}

	connectedCallback(){
		this.attachShadow({mode: 'open'});
		this._defaultSetup();		
		this._events();
		console.log(WBTR);		
	}

	_init(){
		document.body.classList.remove('loading');
	}

	_events(){
		window.addEventListener('load', ()=>{
			WBTR.db.init();
			WBTR.element._storeIdElements();
		});	

		window.addEventListener('error', (e)=>{
			console.log(e);
		})			
		
	}

	

	_componentsInitAfterDB(){		
		for(let component in WBTR){				
			if(WBTR[component]._init) {
				WBTR[component]._init();				
			}			
		}
	}

}

if(!customElements.get('wbtr-app')){
	customElements.define('wbtr-app',WBTR_App);	
}
