
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Wheel {

	static _handler(e){
		this._loadMoreFontsIfEnd();
	}

	static _loadMoreFontsIfEnd(){		
		const lastChildElBottom = props._root.$id.libraryFontslist.querySelector('.fontlist-item:last-child').getBoundingClientRect().bottom;		

		if(lastChildElBottom>document.body.offsetHeight) return;
		if(props._root.$id.libraryFontslist.scrollWidth == 0) return;

		if(props._searchMatchedFonts.length === 0) methods._loadLibraryDefaultFonts();
		if(props._searchMatchedFonts.length > 0) this._loadMoreSearchFonts();
	}

	static _loadMoreSearchFonts(){
		const fonts = this.getSearchMatchedFonts();
		if(fonts.length === 0) return;
		const fontsData = methods._getLibraryFontFetchUrlTemplate(fonts);    
    this._setupFontsLinkHTML(fontsData);
	}

	static getSearchMatchedFonts(){
		const startToAddFonts = props._root.$id.libraryFontslist.children.length;
    let fonts7 = 6;
    const matchedFonts = [];
    props._searchMatchedFonts.forEach((f,i)=>{
      if(fonts7 === 0) return false;      
      if(i >= startToAddFonts) {
        matchedFonts.push(props._searchMatchedFonts[i]);
        fonts7--;
      }
    })
    return matchedFonts;
	}

}

export default Wheel;