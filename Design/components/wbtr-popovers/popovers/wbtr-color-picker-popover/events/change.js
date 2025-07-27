
import props from '../utils/props.js';

class Change {
	static _handler(){
		if(props._eTarget.dataset.name === 'colorcode-type') this._switchColorCode();
	}

	static _switchColorCode(){
		const valu = props._eTarget.value;
		props._root.$class.colorcodeField.forEach((el)=>{
			el.classList.remove('show');
		})
		const targetEl = props._root.shadowRoot.querySelector(`[data-field-label="${valu}"]`);
		targetEl.classList.add('show');

	}
}

export default Change;