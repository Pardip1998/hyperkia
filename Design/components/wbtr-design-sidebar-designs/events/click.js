
import props from '../utils/props.js';
 
class Click {
	static _handler(e){
		if(props._eTarget.name == 'more-settings')  WBTR.moreSettingsPopover._methods._switchMoreSettings();
		if(props._eTarget.closest('[data-event-id="open-modal-fontFamily"]')) WBTR.modals._methods._modalOpen('fontFamilyModal');
	}	
}

export default Click;