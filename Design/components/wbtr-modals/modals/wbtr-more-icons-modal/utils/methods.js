import props from './props.js';



const Index = {

    loadSvgIcons(){


        let index = props._root.$id.iconsLists.children.length;                
        if (index === props._icons.fontawesome.length - 1) return;
        let html = '';

        for (index; index <= props._icons.fontawesome.length - 1; index++) {

            if (!props._icons.fontawesome[index]) return;
            const iconName = props._icons.fontawesome[index];
            html += `
             <div class="icons-list" data-icon-name="${iconName}" data-event-id="icons-list">
                <svg><use href="assets/icons/fontawesome-svg-sprits.svg#${iconName}"></use></svg>
             </div>
           `;

            if (index !== 0 && index % 99 === 0) break;
            if (props._icons.fontawesome.length - 1 === index) break;

        }

        props._root.$id.iconsLists.insertAdjacentHTML('beforeend', html);
    },

    scrollEndFetchMoreIcons(){        
        const lastChild = props._root.$id.iconsLists.children[props._root.$id.iconsLists.children.length - 1];
        if (!lastChild) return;
        const lastChildRect = lastChild.getBoundingClientRect();

        if (document.body.offsetHeight > lastChildRect.top) this.loadSvgIcons();
    },

    searchIcons(){

        const matched = [];
        const valu = props._eTarget.value.trim();
        
        if (valu.length === 1) return;
        if(valu.length === 0) {
            this.loadSvgIcons();
            return;
        }

        for (let i = 0; i < props._icons.fontawesome.length; i++) {
            if (props._icons.fontawesome[i].includes(valu)) matched.push(props._icons.fontawesome[i]);
        }

        let html = '';
        
        matched.forEach((f) => {
            html += `
          <div class="icons-list" data-icon-name="${f}" data-event-id="icons-list">
             <svg><use href="assets/icons/fontawesome-svg-sprits.svg#${f}"></use></svg>
          </div>
        `;
        })

        props._root.$id.iconsLists.innerHTML = html;

    },

    _modalShow() {

    },

    _modalHide() {

    },

}

export default Index;