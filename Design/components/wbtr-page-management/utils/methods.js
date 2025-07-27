
import props from './props.js';


const Index = {	

	_pageNameChangedDone(){
		const pageLiEl = props._eTarget.closest('[data-page]');
		const pageIndex = +(pageLiEl.dataset.page);
		WBTR.data.pages.forEach((p)=>{
           if(p.index == pageIndex) {
			 p.name = pageLiEl.innerText.trim();
			 WBTR.db.updateObject('pages', pageIndex, p).catch((error)=>{
		     	console.log(error);
		     })
		   }
		})
	}, 
 
	_appendPagesHTML(pagesParam, addPageArg){		
			const pages = Array.isArray(pagesParam) ? pagesParam : [pagesParam];
			let str = '';

			pages.forEach((page, i)=>{
				
				str += `<li class="${props._activePageId == page.index ? 'active-item':''}" data-before-edit-page-name="${page.name}" data-event-id="page-list-item" data-page="${page.index}">${page.name}</li>`;
			});
			props._root.$id.pageList.insertAdjacentHTML('beforeend',str);

			if(addPageArg === 'add-page') {
				props._root.$id.pageList.children[props._root.$id.pageList.children.length-1].scrollIntoView();
			}
	},

	_showPagesList(){
		if(!WBTR.data.pages.length) return;
		props._activePageId = WBTR.data.pages[0].index;
		this._appendPagesHTML(WBTR.data.pages);
	},

}

export default Index;