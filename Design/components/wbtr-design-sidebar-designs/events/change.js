
import props from '../utils/props.js';
import methods from '../utils/methods.js'; 
 
class Change {
	static _handler(e){
		const name = props._eTarget.dataset.name;

		switch(props._eTarget.dataset.name) {

			case 'font-family':
				this._fontFamilyChange();
				break;

			case 'switch-tag':
				WBTR.canvas._methods._switchActiveLayerTag();
				break;

			case 'border-sides':
				methods._manageBorderCSS();
				break;

			case 'border-style':
				methods._manageBorderCSS();
				break;
			
		}

		if(props._eTarget.dataset.prop) WBTR.canvas._methods._inputCSSPropsToCanvastarget(props._eTarget);
		
	}

	static _fontFamilyChange(){
		const valu = props._eTarget.getAttribute('value');
		methods._updateFontWeights(valu);
	}	
 
}

export default Change;