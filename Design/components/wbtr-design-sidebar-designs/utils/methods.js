
import props from './props.js';


const Methods = {
	_flipSidebar(){
		props._root.$id.wrapper.classList.toggle('flip-sidebar-active');
		if(props._root.$id.wrapper.matches('.flip-sidebar-active')){
			WBTR.designSidebarDesigns.$id.fillMoreSettings.title = "Fill";			
			WBTR.designSidebarDesigns.$id.strokeMoreSettings.title = "Stroke";
		} else {
			WBTR.designSidebarDesigns.$id.fillMoreSettings.title = "More";			
			WBTR.designSidebarDesigns.$id.strokeMoreSettings.title = "More";
		}
	},

	_updateFontWeights(font){
		const weights = WBTR.data.options['font-family'][font];
		if(!weights) return false;
		

		
		let activeIndex = weights.indexOf('400-Regular');
		if(activeIndex == -1) activeIndex = WBTR.data.options['font-family'][font].indexOf('500-Medium');
		if(activeIndex == -1) activeIndex = WBTR.data.options['font-family'][font].indexOf('400-Medium-italic');
		if(activeIndex == -1) activeIndex = WBTR.data.options['font-family'][font].indexOf('500-Medium-italic');
		if(activeIndex == -1) activeIndex = 0;	

		let str = `
			<summary class="select-trigger">Regular</summary>
			<div class="select-options scroll-design" data-id="font-weights" style="width:145px;">
		`;
		weights.forEach((w,i)=>{
			const [fw, ft, fi] = w.split('-');			
			str += `<span class="select-option ${activeIndex==i?'selected':''}" data-event-id="select-option" value="${fw}${fi?'-italic':''}" data-italic="${fi ? true : false}">${ft + (fi ? ' Italic' : '')}</span>`;
		})
		str += '</div>';

		WBTR.designSidebarDesigns.$id.fontWeightSelect._updateHTML(str);		
	},

	_updateAvailableFonts(){
		const fonts = Object.keys(WBTR.data.options['font-family']);
		if(fonts.length === 0) return;
		
		let str = `
			<summary data-id="typofonts-selected" class="select-trigger">${fonts[0]}</summary>
    	<div data-id="typofonts" class="select-options scroll-design" data-closest-id="select-options" style="width:100%;">
		`;
		fonts.forEach((f,i)=>{
			str += `<span class="select-option ${i==0?'selected':''}" value="${f}">${f}</span>`;
		})
		str += '</div>';

		WBTR.designSidebarDesigns.$id.fontFamilySelect._updateHTML(str);
 
		this._updateFontWeights(fonts[0]);

		WBTR.element.$id.canvasAvailableFontFamily.remove();
		const fontLink = document.createElement("link");
	    fontLink.type = "text/css";	    
	    fontLink.rel = "stylesheet";      
	    fontLink.href = WBTR.data.options['available-fonts-href'];
	   
	    document.head.appendChild(fontLink);
	    WBTR.element.$id.canvasAvailableFontFamily = fontLink;
	    console.log('Update Fonts');

	},

	_activeTagBasedCSSPropFields(activeTag){
		
		const tagName = (activeTag.nodeName || activeTag).toLowerCase();
		let tagCategory = '';
		
		if(typeof activeTag === 'object') {
			if (['section', 'main', 'article', 'div', 'nav', 'header', 'footer'].includes(activeTag.nodeName.toLowerCase())) {
				tagCategory = 'section';
			} else if(['p', 'a', 'input', 'textarea'].includes(tagName)){
				tagCategory = 'text';
			} else if(['img', 'video', 'iframe', 'iframewrap'].includes(tagName)){
				tagCategory = 'src';
			} else if (['path', 'circle', 'rect', 'line','ellipse'].includes(tagName)){
				tagCategory = 'svg';
			}			
		}

		
		props._root.$id.switchtag.dataset.tagcategory = tagCategory;		

		
		if(tagCategory === 'section') {
			props._root.$id.switchtag.value = tagName;
		} else if(tagCategory === 'text') {
			props._root.$id.switchtag.value = tagName;
		} else if(tagCategory === 'src') {
			let newTagName = tagName;
			switch(tagName) {
				case 'img':
					newTagName = 'Image';
					break;
				case 'iframewrap':
					newTagName = 'Iframe';
					break;				
			}
			props._root.$id.switchtag.$id.details.firstElementChild.innerText = newTagName;
		} else if(tagCategory === 'svg') {
			props._root.$id.switchtag.$id.details.firstElementChild.innerText = 'SVG';
		}
	},

	_manageBorderCSS(){
		const cssRules = {border: 'none'};
		
		const borderWidth = WBTR.designSidebarDesigns.$propElements.borderWidth.value;
		const borderStyle = WBTR.designSidebarDesigns.$propElements.borderStyle.value;
		const borderColor = WBTR.designSidebarDesigns.$propElements.borderColor.value;

		const borderSide = WBTR.designSidebarDesigns.$id.borderSides.value;
		let borderProp = '';
		if(borderSide === 'all') {
			delete cssRules.border;
			borderProp = 'border';
		}
		if(borderSide === 'top') borderProp = 'border-top';
		if(borderSide === 'right') borderProp = 'border-right';
		if(borderSide === 'bottom') borderProp = 'border-bottom';
		if(borderSide === 'left') borderProp = 'border-left';

		cssRules[borderProp+'-width'] = borderWidth+'px';
		cssRules[borderProp+'-style'] = borderStyle;
		cssRules[borderProp+'-color'] = borderColor;

		WBTR.canvas._methods._inputCSSPropsToCanvastarget(cssRules);		
	}
}
 
export default Methods;