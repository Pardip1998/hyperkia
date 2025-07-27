import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Pointerdown {
  
    static _handler(e) {       
        if(props._eTarget.dataset.eventId === 'popover-close') this._closeThisPopup();
        if(props._eTarget.nodeName === 'WBTR-POPOVERS') this._closedAllPopovers();
        if(props._eTarget.dataset.eventId === 'moveable-box') this._moveableBoxDown(e);
    }

    
    static _closedAllPopovers(){
        props._root.classList.remove('popover-show');        
        props._root.$class.popover.forEach((pEl)=>{
            pEl.classList.remove('show');
        });
    }

    
    static _closeThisPopup(){
        props._eTarget.getRootNode().host.classList.remove('show');
        props._root.classList.remove('popover-show');  
    }

    
    static _moveableBoxDown(e){
        props._eTarget.setPointerCapture(e.pointerId);
        props._mboxActive = true;
        props._mBoxdX = e.clientX;
        props._mBoxdY = e.clientY;

        if(props._eTarget.dataset.moveableBoxTarget === 'component'){
            props._mboxel = WBTR[props._eTarget.dataset.moveableBoxTargetName];           
        }

        props._mboxelX = +(window.getComputedStyle(props._mboxel)['left'].replace('px',''));
        props._mboxelY = +(window.getComputedStyle(props._mboxel)['top'].replace('px',''));        
    }

}

export default Pointerdown;