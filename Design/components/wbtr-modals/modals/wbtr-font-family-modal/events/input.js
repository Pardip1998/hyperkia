
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Input {

	static _handler(e){

		if(props._eTarget.dataset.eventId === "search-font-family") this._searchFonts();

	}

	static _searchFonts(){

		props._searchMatchedFonts = [];

		const inputValu = props._eTarget.value.trim().toLowerCase();

		if(inputValu.length === 0) {
			props._root.$id.libraryFontslist.innerHTML = '';
			methods._removeAllFontLinkTagsHead();
			methods._loadLibraryDefaultFonts();
			return false;
		}

		if(inputValu.length < 2) return false;	
		
		props._fonts.forEach((f)=>{			
			if(f.toLowerCase().indexOf(inputValu)>=0) props._searchMatchedFonts.push(f);			
		})
		
		const fontsData = methods._getLibraryFontFetchUrlTemplate(props._searchMatchedFonts.slice(0, 6));
		fontsData.alter = 'replace';
    	methods._setupFontsLinkHTML(fontsData);
	}

	

}

export default Input;