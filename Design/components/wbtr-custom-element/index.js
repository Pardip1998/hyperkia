
class WBTRCustomElement extends HTMLElement{

	$propElements = {};	

	_defaultSetup(customize){
		this._setComponentHTMLCSS();
		this._storeElements();
		this._storePropElements();
		if(customize){
			customize.id && (WBTR[customize.id] = this);
		} else {
			const tagName = WBTR.helper.underScoreToCamelCase(this.tagName.replace('WBTR-','').toLowerCase());
			WBTR[tagName] = this;
			this.setAttribute('data-custom-element', tagName);			
		}		
	}

	_setComponentHTMLCSS(){
		this.shadowRoot.innerHTML = `
			<link rel="stylesheet" href="${new URL('.', import.meta.url).href}style.css">
			<link rel="stylesheet" href="${new URL('./style.css',this.moduleURL).href}">
			${this.html}
		`;		
	}

	_storeElements(){		
		this.$id = {};
		this.shadowRoot.querySelectorAll('[data-id]').forEach((el)=>{			
			this.$id[WBTR.helper.underScoreToCamelCase(el.dataset.id)] = el;
		})

		this.$class = {};
		this.shadowRoot.querySelectorAll('[data-class]').forEach((el)=>{			
			this.$class[WBTR.helper.underScoreToCamelCase(el.dataset.class)] = this.shadowRoot.querySelectorAll(`[data-class="${el.dataset.class}"]`);
		})
	}
 
	_storePropElements(){
		this.shadowRoot.querySelectorAll('[data-prop]').forEach((el)=>{
			this.$propElements[WBTR.helper.underScoreToCamelCase(el.dataset.prop)] = el;
		})
	}

	_eventsSetup(Events) {		
		for(const event in Events) {			
			if(['pointerover','pointerout','transitionstart','transitionend','change','input','click'].includes(event)) {
				this.shadowRoot.addEventListener(event, this._handleEvents);
			} else {
				this.addEventListener(event, this._handleEvents);

			}
		}	    
	}
}

export default WBTRCustomElement;