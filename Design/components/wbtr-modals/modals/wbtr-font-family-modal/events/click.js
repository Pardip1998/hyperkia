
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Click {

	static _handler(e){
		if(props._eTarget.closest('[data-event-id="add-font"]')) this._updateFontsData('add');
		if(props._eTarget.closest('[data-event-id="delete-font"]')) this._updateFontsData('delete');
		if(props._eTarget.closest('[data-event-id="open-tabcontent-available"]')) props._root.$id.libraryFontMenuitem.click();
		if(props._eTarget.closest('[data-event-id="switchtab"]')) this._activeCurrentTab();	
	}

	static _updateFontsData(purpose){		
		const selectedFont = props._eTarget.closest('[data-font-family-name]').dataset.fontFamilyName;		

		if(purpose == 'add') {
			WBTR.data.options['font-family'][selectedFont] = [];
		} else if (purpose == 'delete') {
			delete WBTR.data.options['font-family'][selectedFont];
		}

		if(Object.keys(WBTR.data.options['font-family']).length){
			const fontsData = methods.getFontsData(WBTR.data.options['font-family']);
	    fontsData.then((success)=>{
	        const {fontsURL, fontWeights} = success;
	        for(let font in fontWeights) {
	        	WBTR.data.options['font-family'][font] = [...fontWeights[font]];
	        }	       
	        WBTR.db.updateKeyValueObject({
	        	'font-family': WBTR.data.options['font-family'],
	        	'available-fonts-href': fontsURL,
	        }).then((success)=>{        	
						if(purpose == 'add') this._fontAdded();
						if(purpose == 'delete') this._fontDeleted();
					})
	    })
		} else {
			WBTR.db.updateKeyValueObject({'font-family': WBTR.data.options['font-family']}).then((success)=>{        	
				if(purpose == 'add') this._fontAdded();
				if(purpose == 'delete') this._fontDeleted();
			})
		}    
	}
 
	static _fontAdded(){
		props._eTarget.closest('[data-font-family-name]').classList.add('added');
		methods._loadAvailableFonts();		
	}

	static _fontDeleted(){		
		const fontFamily = props._eTarget.closest('[data-font-family-name]');
		fontFamily.classList.add('deleting');
		setTimeout(()=>{			
			fontFamily.remove();
		},500);
	}

	static _activeCurrentTab(){		
		const t = props._eTarget.closest('[data-event-id="switchtab"]');
 
		
		props._root.$class.tabmenuItem.forEach((mEl)=>{
			mEl.classList.remove('active');
		})
		t.classList.add('active');

		
		props._root.$class.fontTabcontent.forEach((tEl)=>{
			tEl.setAttribute('hidden', true);
		})
		props._root.$id[t.dataset.target].removeAttribute('hidden');
	}

}

export default Click;