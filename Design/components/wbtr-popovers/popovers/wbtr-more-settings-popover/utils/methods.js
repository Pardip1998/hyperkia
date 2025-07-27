
import props from './props.js';


const Methods = {

  _switchMoreSettings() {
      if (!WBTR.moreSettingsPopover.matches('show')) {
          WBTR.moreSettingsPopover.classList.add('show');
          this._handleComponentPosition();
      }

      props._root.$class.settingWrapper.forEach((el) => {
          el.classList.add('hide');
          el.classList.remove('show');
      });
      const currentTool = WBTR.eventTarget.value;
      
      props._root.$id.moreSettingsSelect.value = currentTool;
      props._root.$id[currentTool].classList.add('show');
  },

  _handleComponentPosition() {
      props._root.style.top = '10px';
      props._root.style.left = WBTR.canvas.getBoundingClientRect().right - this.offsetWidth - 20 + 'px';
  },

  _popoverShow(){
  	
  },

}

export default Methods;