import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Change {

    static _eTarget = null;
    static _eRootNode = null;
    static selectedOption = null;

    static _handler(e) {
        this._eTarget = e.target;
        this._eRootNode = e.target.getRootNode().host;
        this.selectedOption = e.target.selectedOption;

        if (this._eTarget.dataset.eventId === 'dropdowntools') this._dropdownToolSwitch();
    }

    static _dropdownToolSwitch() {

        const subToolValue = this.selectedOption.getAttribute('value');

        switch (this._eTarget.dataset.name) {

            case 'switchtag':
                this._eTarget.previousElementSibling.dataset.tool = 'htmltag';
                WBTR.canvas._props._createHTMLTag = subToolValue;
                WBTR.designSidebarDesigns._methods._activeTagBasedCSSPropFields(subToolValue);
                break;

            case 'svgtools':
                props._root.$id.svgshape.dataset.tool = subToolValue;
                WBTR.canvasTools._props._activeTool = subToolValue;
                this._eTarget.previousElementSibling.innerHTML = this.selectedOption.innerHTML;
                break;
        }

        methods._specificSubToolHandle(subToolValue);
        this._eTarget.previousElementSibling.click();
    }
}

export default Change;