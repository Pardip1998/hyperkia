
import props from './props.js';


const Methods = {
	_handleNavVisibility(){
		if(!props._root.$id.navVisibilityInput.checked) {
			props._root.shadowRoot.querySelectorAll('.hover').forEach((el)=>{
				el.classList.remove('hover');				
			})
		}
		
	},

	navMenuItemImportDB(){		
		props._root.$id.navMenuItemImportInput.click();
	},

	navMenuItemExportDB(){
		requestAnimationFrame(()=>{
			WBTR.db.downloadDB();
		});
	},

}

export default Methods;