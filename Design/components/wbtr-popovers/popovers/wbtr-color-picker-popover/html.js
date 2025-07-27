const html = `
<section class="wrapper">
  <header part="popover-header" data-event-id="moveable-box" data-moveable-box-target="component" data-moveable-box-target-name="colorPickerPopover">   
    <h5 part="popover-title">Color Picker</h5>
    <button part="popover-close-btn" data-event-id="popover-close"></button>
  </header>
  <div part="clrstyle" class="clrstyle">
    <span class="clrstyle-item clrstyle-solid" data-clrstyle="solid" data-event-id="clrstyle"></span>
    <span class="clrstyle-item clrstyle-gradient" data-clrstyle="gradient" data-event-id="clrstyle"></span>
  </div>
  <div class="color-area" data-id="color-area" data-event-id="color-area">
      <span data-id="colorAreaPoint" class="color-area-point"></span>
  </div>
  <div class="hue" data-id="hue">
      <input type="range" class="hue-range" data-id="hueInput" data-event-id="hue-range">
  </div>
  <div class="alpha" data-id="alpha">
      <div class="alphabg" data-id="alphaBg"></div>
      <input type="range" class="alpha-range" data-id="alphaRange" data-event-id="alpha-range" min="0" max="1" step="0.01">
  </div>

  <div class="colorcode-box">
    <wbtr-select class="colorcode-type" data-name="colorcode-type" value="all" data-id="colorcode-type">
      <details part="details" class="select-wrapper">
        <summary part="summary" class="select-trigger">RGBA</summary>
        <ul class="select-options scroll-design" style="width:95px;left: 0;">                     
          <li class="select-option selected" value="rgba">RGBA</li>                              
          <li class="select-option" value="hex">HEX</li>                              
          <li class="select-option" value="css">css</li>                              
        </ul>
      </details>      
    </wbtr-select>

    <div class="colorcode-fields">
      <div class="colorcode-rgba colorcode-field show" data-field-label="rgba" data-class="colorcode-field">
        <input class="input" type="number" data-id="coder" data-input-id="rgb" data-event-id="rgb" data-label="r" min="0" max="255">
        <input class="input" type="number" data-id="codeg" data-input-id="rgb" data-event-id="rgb" data-label="g" min="0" max="255">
        <input class="input" type="number" data-id="codeb" data-input-id="rgb" data-event-id="rgb" data-label="b" min="0" max="255">        
      </div>
      <div class="colorcode-hex colorcode-field" data-field-label="hex" data-class="colorcode-field">
        <input class="input" type="text" data-id="codehex" data-input-id="hex" data-event-id="hex">
      </div>
      <div class="colorcode-css colorcode-field" data-field-label="css" data-class="colorcode-field">
        <input class="input" type="text" data-id="codecss" data-input-id="css" data-event-id="css">
      </div>
      <input class="input alpha-input" type="number" data-id="alphaCode" data-input-id="alpha" data-event-id="alpha-code" min="0" max="100" step="1">
    </div>
  </div>

  <span part="separator" class="separator"></span>

  <div class="colorpalate">
    <div class="colorpalate-header">
      <h5 class="css_block_title">Color Palate</h5>
      <button class="iconbtn" data-event-id="add-page">
        <svg class="plus-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#plus-solid-symbol"></use></svg>
      </button>
    </div>
    <div class="colorpalate-items scroll-design">
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
      <span class="colorpalate-item" title="CSS Variable Apple"></span>
    </div>
  </div>
</section>
`;

export default html;