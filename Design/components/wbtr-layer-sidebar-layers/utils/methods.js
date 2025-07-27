
import props from './props.js';


const Index = {
	_getLayerHTMLTemplate(){
			return `
				<li data-layer="@@layer--index@@" draggable="true" style="order:@@layer--order@@;">
					<span class="nodeicon @@layer--icon@@-icon"></span>			
					<span class="nodedesc">@@layer--tagname@@</span>			
					<span class="action-btn @@layer--visibility@@" data-event-id="layer-visibility" title="@@visibility--title@@ layer"></span>	
					<span class="action-btn @@layer--access@@" data-event-id="layer-access" title="@@access--title@@ layer"></span>
				</li>
			`; 
	},
 
	_showLayerHTMLTemplate(temp, isAppend){
		if(isAppend) {
			props._root.$id.layers.insertAdjacentHTML('beforeend',temp);
		} else {
			props._root.$id.layers.innerHTML = temp;
		}		
	},

	_layerClickToActive(index){
        props._root.shadowRoot.querySelectorAll('[data-layer].active').forEach((l)=>{
            l.classList.remove('active');
        })
        props._root.shadowRoot.querySelector(`[data-layer="${index}"]`).classList.add('active');              
    }
}

export default Index;