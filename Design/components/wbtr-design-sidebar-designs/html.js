const html = `
	<section class="wrapper" data-id="wrapper" data-current-tab="design" data-canvas-current-target="canvas">		
			<article class="tab tab-design">
 
				<div class="css_block tag_css_block">				
					<header class="css_block_header">
						<h5 class="css_block_title">Tag</h5>						
						<span class="more-settings" title="More settings"><input type="radio" name="more-settings" value="tag-settings">...</span>
					</header>
	 
					<div class="css_block_body">
						<div class="css_block_row">						

							<div class="css_block_column w98">

								<wbtr-select data-id="switchtag" data-event-id="dropdowntools" data-name="switch-tag" data-tagcategory="section">
									<details part="details" class="select-wrapper">
										<summary data-id="switchtag-summary" part="summary" class="select-trigger">SECTION</summary>
										<ul class="select-options scroll-design" style="width: 100%;top: calc(100% + 5px);transform: none;">					            
											<li part="section-tag" class="select-option selected" value="section">Section</li>
											<li part="section-tag" class="select-option" value="main">Main</li>
											<li part="section-tag" class="select-option" value="article">Article</li>
											<li part="section-tag" class="select-option" value="div">Div</li>
											<li part="section-tag" class="select-option" value="nav">Nav</li>
											<li part="section-tag" class="select-option" value="header">Header</li>
											<li part="section-tag" class="select-option" value="footer">Footer</li>
  
											<li part="text-tag" class="select-option" value="p">P</li>
											<li part="text-tag" class="select-option" value="a">A</li>
											<!--<li part="text-tag" class="select-option" value="input">Input</li>
											<li part="text-tag" class="select-option" value="textarea">Textarea</li>-->
										</ul>
									</details>
								</wbtr-select>								

								<textarea data-id="tag-innerhtml" class="tag-innerhtml" data-event-id="tag-innerhtml" placeholder="Type here..."></textarea>
								<input data-id="tag-src" class="tag-src" data-event-id="tag-src" type="text" placeholder="url">
							</div>														

						</div>
					</div>	
				</div>
					
				<span class="separator"></span>


				<div class="css_block position_css_block">				
					<header class="css_block_header">
						<h5 class="css_block_title">Position</h5>						
						<span class="more-settings" title="More settings"><input type="radio" name="more-settings" value="position-settings">...</span>
					</header>
	 
					<div class="css_block_body">
						<div class="css_block_row">

							<div class="css_block_column">
								<h6 class="css_block_column_title">Alignment</h6>
								<div class="formradio-wrapper">
									<button class="formradio-btn">								
										<svg class="formradio-svg" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#align_justify_flex_start-symbol"></use></svg>
										<input class="formradio-input" type="radio" data-name="flex-alignment" name="justify-content" value="flex-start" title="Horizontal Left" data-prop="justify-content" />
									</button>
									<button class="formradio-btn">								
										<svg class="formradio-svg" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#align_justify_center-symbol"></use></svg>
										<input class="formradio-input" type="radio" data-name="flex-alignment" name="justify-content" value="center" title="Horizontal center" data-prop="justify-content" />
									</button>
									<button class="formradio-btn">								
										<svg class="formradio-svg" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#align_justify_flex_end-symbol"></use></svg>
										<input class="formradio-input" type="radio" data-name="flex-alignment" name="justify-content" value="flex-end" title="Horizontal right" data-prop="justify-content" />
									</button>
								</div>
							</div>

							<div class="css_block_column">							
								<div class="formradio-wrapper">
									<button class="formradio-btn">								
										<svg class="formradio-svg" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#align_vertical_top-symbol"></use></svg>
										<input class="formradio-input" type="radio" data-name="flex-alignment" name="align-items" value="flex-start" title="Vertical top" data-prop="align-items" />
									</button>
									<button class="formradio-btn">								
										<svg class="formradio-svg" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#align_vertical_center-symbol"></use></svg>
										<input class="formradio-input" type="radio" data-name="flex-alignment" name="align-items" value="center" title="Vertical center" data-prop="align-items" />
									</button>
									<button class="formradio-btn">								
										<svg class="formradio-svg" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#align_vertical_bottom-symbol"></use></svg>
										<input class="formradio-input" type="radio" data-name="flex-alignment" name="align-items" value="flex-end" title="Vertical bottom" data-prop="align-items" />
									</button>
								</div>
							</div>

							<div class="css_block_column">
								<h6 class="css_block_column_title">Position</h6>								
								<wbtr-prop-input data-prop="left">
									<div class="forminput-wrapper">
										<label class="forminput-icon">X</label>
										<span class="forminput-input">
											<input type="number" data-id="input" data-prop="left" data-prop-unit="px">
										</span>
										<div class="forminput-variable">
<svg class="gear-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#gear-solid-full-symbol"></use></svg>
</div>
									</div>
								</wbtr-prop-input>
							</div>	
							
							<div class="css_block_column">							
								<wbtr-prop-input data-prop="top">
									<div class="forminput-wrapper">
										<label class="forminput-icon">Y</label>
										<span class="forminput-input">
											<input type="number" data-id="input" data-prop="top" data-prop-unit="px">
										</span>
										<div class="forminput-variable">
<svg class="gear-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#gear-solid-full-symbol"></use></svg>
</div>
									</div>
								</wbtr-prop-input>
							</div>

							<div class="css_block_column">
								<h6 class="css_block_column_title">Transform</h6>								
								<wbtr-prop-input data-prop="rotate">
									<div class="forminput-wrapper">
										<label class="forminput-icon"><svg class="rotate" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#rotate_auto-symbol"></use></svg></label>
										<span class="forminput-input">
											<input type="number" data-id="input" data-prop="rotate" data-prop-unit="deg">
										</span>
										<div class="forminput-variable">
<svg class="gear-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#gear-solid-full-symbol"></use></svg>
</div>
									</div>
								</wbtr-prop-input>
							</div>	
							
							<div class="css_block_column">							
								<div class="formradio-wrapper">						
									<button class="formradio-btn">						
										<svg class="formradio-svg rotate90" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#rotate_90_degrees_cw-symbol"></use></svg>
										<input class="formradio-input" type="radio" value="90" title="Rotate 90&#8304;" data-prop="rotate90" data-prop-unit="deg" />
									</button>
									<button class="formradio-btn">						
										<svg class="formradio-svg flip-horizontal" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#align-vertical-symbol"></use></svg>
										<input class="formradio-input" type="radio" value="-1 1" title="Flip horizontal" data-prop="scaleX" />
									</button>
									<button class="formradio-btn">						
										<svg class="formradio-svg flip-vertical" xmlns="http://www.w3.org/2000/svg" style="rotate: 90deg;transform-origin: 0 0;">
											<use href="assets/images/svg-icons.svg#align-vertical-symbol"></use>
										</svg>
										<input class="formradio-input" type="radio" value="1 -1" title="Flip vertical" data-prop="scaleY" />
									</button>

								</div>
							</div>

						</div>
					</div>	
				</div>
					
				<span class="separator"></span>

				<div class="css_block layout_css_block">
					<header class="css_block_header">
						<h5 class="css_block_title">Layout</h5>
						<span class="more-settings" title="More settings" data-id="layout-more-settings">
							<input type="radio" name="more-settings" value="layoutSettings" data-event-id="popover-open" data-popover-name="moreSettingsPopover">
							...
						</span>
					</header>
	 
					<div class="css_block_body">
						<div class="css_block_row">

							<div class="css_block_column">
								<h6 class="css_block_column_title">Dimensions</h6>								
								<wbtr-prop-input data-prop="width">
									<div class="forminput-wrapper">
										<label class="forminput-icon">W</label>
										<span class="forminput-input">
											<input type="number" data-id="input" data-prop="width" data-prop-unit="px">
										</span>
										<div class="forminput-variable">
<svg class="gear-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#gear-solid-full-symbol"></use></svg>
</div>
									</div>
								</wbtr-prop-input>
							</div>	
							
							<div class="css_block_column">							
								<wbtr-prop-input data-prop="height">
									<div class="forminput-wrapper">
										<label class="forminput-icon">H</label>
										<span class="forminput-input">
											<input type="number" data-id="input" data-prop="height" data-prop-unit="px">
										</span>
										<div class="forminput-variable">
<svg class="gear-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#gear-solid-full-symbol"></use></svg>
</div>
									</div>
								</wbtr-prop-input>
							</div>

							<div class="css_block_column w16 text-right">
								<button class="iconbtn">
									<svg class="proportional-dimension" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#proportional-dimension-symbol"></use></svg>								
								</button>
							</div>

							<div class="css_block_column w80 padding_css_block_column">
								<h6 class="css_block_column_title">Padding</h6>								
								<div class="padding-inputs">
									<input class="padding-top" type="number" data-prop="padding-top" data-prop-unit="px">
									<input class="padding-right" type="number" data-prop="padding-right" data-prop-unit="px">
									<input class="padding-bottom" type="number" data-prop="padding-bottom" data-prop-unit="px">
									<input class="padding-left" type="number" data-prop="padding-left" data-prop-unit="px">
								</div>
							</div>

							<div class="css_block_column w16 text-right padding_css_block_column">
								<button class="iconbtn">
									<svg class="proportional-dimension" xmlns="http://www.w3.org/2000/svg" style="width: 14px;"><use href="assets/images/svg-icons.svg#arrows-alt-symbol"></use></svg>								
								</button>
							</div>
											
						</div>
					</div>	
				</div>
				
				<span class="separator"></span>

				<div class="css_block appearance_css_block">				
					<header class="css_block_header">
						<h5 class="css_block_title">Appearance</h5>
						<span class="more-settings" title="More settings" data-id="appearance-more-settings"><input type="radio" name="more-settings" value="position-settings">...</span>
					</header>
	 
					<div class="css_block_body">
						<div class="css_block_row">

							<div class="css_block_column">
								<h6 class="css_block_column_title">Opacity</h6>								
								<wbtr-prop-input data-prop="opacity">
									<div class="forminput-wrapper">
										<label class="forminput-icon"><svg class="opacity" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#opacity-symbol"></use></svg></label>
										<span class="forminput-input">
											<input type="number" data-id="input" data-prop="opacity" min="0" max="1" step="0.01">
										</span>
										<div class="forminput-variable">
<svg class="gear-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#gear-solid-full-symbol"></use></svg>
</div>
									</div>
								</wbtr-prop-input>
							</div>	
							
							<div class="css_block_column">
								<h6 class="css_block_column_title">Corner radius</h6>													
								<wbtr-prop-input data-prop="border-radius">
									<div class="forminput-wrapper">
										<label class="forminput-icon"><svg class="corner-radius" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#rounded_corner-symbol"></use></svg></label>
										<span class="forminput-input">
											<input type="number" data-id="input" data-prop="border-radius" data-prop-unit="px">
										</span>
										<div class="forminput-variable">
<svg class="gear-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#gear-solid-full-symbol"></use></svg>
</div>
									</div>
								</wbtr-prop-input>
							</div>

							<div class="css_block_column w16 text-right">
								<button class="iconbtn">
									<svg class="corner-radius-all" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#corner-radius-all-symbol"></use></svg>								
								</button>
							</div>
											
						</div>
					</div>	
				</div>

				<span class="separator"></span>

				<div class="css_block typography_css_block">				
					<header class="css_block_header">
						<h5 class="css_block_title">Typography</h5>
						<span class="more-settings" title="More settings" data-id="fill-more-settings">
							<input type="radio" name="more-settings" value="fillSettings" data-event-id="popover-open" data-popover-name="moreSettingsPopover">
							...
						</span>
					</header>
	 
					<div class="css_block_body">
						<div class="css_block_row">
 
							<div class="css_block_column w55">							
								<wbtr-prop-input data-prop="color">
									<div class="forminput-wrapper">
										<label class="forminput-icon">
										<span class="color-result" data-event-id="open-color-picker" style="background-color: var(--canvas--target--color);"></span></label>
										<span class="forminput-input">
											<input type="text" data-id="input" data-prop="color" placeholder="#00000000">
										</span>
										<div class="forminput-variable">
<svg class="gear-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#gear-solid-full-symbol"></use></svg>
</div>
									</div>
								</wbtr-prop-input>
							</div>		
	 
							<div class="css_block_column w76">															
								<wbtr-prop-select data-prop="font-family" value="" data-id="font-family-select" data-name="font-family">
									<details class="select-wrapper">
								        <summary data-id="typofonts-selected" class="select-trigger">Add Font</summary>
								        <div data-id="typofonts" class="select-options scroll-design" data-closest-id="select-options" style="width:100%;">
											<span class="select-option" data-event-id="modal-open" data-modal-name="fontFamilyModal">Add Font</span>
								        </div>
								    </details>
								</wbtr-prop-select>								
							</div>

							<div class="css_block_column w16 text-right mlauto">
								<button class="iconbtn" data-event-id="open-modal-fontFamily">
									<svg class="plus-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#plus-solid-symbol"></use></svg>
								</button>
							</div>

							<div class="css_block_column">															
								<wbtr-prop-select data-prop="font-weight" value="400" data-id="font-weight-select">
									<details class="select-wrapper">
								        <summary class="select-trigger">Regular</summary>
								        <div class="select-options scroll-design" data-id="font-weights" style="width:145px;"></div>
								    </details>
								</wbtr-prop-select>		
							</div>	
							
							<div class="css_block_column">															
								<wbtr-prop-input data-prop="font-size">
									<div class="forminput-wrapper">
										<label class="forminput-icon">
											<svg class="plus-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#type-symbol"></use></svg>
										</label>
										<span class="forminput-input">
											<input type="number" data-id="input" data-prop="font-size" data-prop-unit="px">
										</span>
										<div class="forminput-variable">
<svg class="gear-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#gear-solid-full-symbol"></use></svg>
</div>
									</div>
								</wbtr-prop-input>
							</div>
											
						</div>
					</div>	
				</div>
 
				<span class="separator"></span>

				<div class="css_block fill_css_block">				
					<header class="css_block_header">
						<h5 class="css_block_title">Fill</h5>
						<span class="more-settings" title="More settings" data-id="fill-more-settings">
							<input type="radio" name="more-settings" value="fillSettings" data-event-id="popover-open" data-popover-name="moreSettingsPopover">
							...
						</span>
					</header>
	 
					<div class="css_block_body">
						<div class="css_block_row">
							<div class="css_block_column w55">								
								<wbtr-prop-input data-prop="background-color">
									<div class="forminput-wrapper">
										<label class="forminput-icon">
											<span class="color-result" data-event-id="open-color-picker" style="background-color: var(--canvas--target--background-color);"></span>
										</label>
										<span class="forminput-input">
											<input type="text" data-id="input" data-prop="background-color" placeholder="#00000000">
										</span>
										<div class="forminput-variable">
<svg class="gear-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#gear-solid-full-symbol"></use></svg>
</div>
									</div>
								</wbtr-prop-input>
							</div>																							
						</div>
					</div>	
				</div>

				<span class="separator"></span>

				<div class="css_block border_css_block">				
					<header class="css_block_header">
						<h5 class="css_block_title">Stroke</h5>
						<span class="more-settings" title="More settings" data-id="border-more-settings"><input type="radio" name="more-settings" value="position-settings">...</span>
					</header>
	 
					<div class="css_block_body">
						<div class="css_block_row">

							<div class="css_block_column w55">							
								<wbtr-prop-input data-prop="border-color">
									<div class="forminput-wrapper">
										<label class="forminput-icon"><span class="color-result" data-event-id="open-color-picker" style="background-color: var(--canvas--target--border-color);"></span></label>
										<span class="forminput-input">
											<input type="text" data-id="input" data-prop="border-color" placeholder="#00000000">
										</span>
										<div class="forminput-variable">
<svg class="gear-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#gear-solid-full-symbol"></use></svg>
</div>
									</div>
								</wbtr-prop-input>
							</div>
	 
							<div class="css_block_column"></div>

							<div class="css_block_column">
								<h6 class="css_block_column_title">Style</h6>
								<wbtr-prop-select data-prop="border-style" value="solid" data-name="border-style">
									<details class="select-wrapper">
										<summary class="select-trigger">Solid</summary>
										<div class="select-options scroll-design" style="width:120px;">					            
											<span class="select-option" value="dashed">Dashed</span>
											<span class="select-option" value="dotted">Dotted</span>
											<span class="select-option" value="double">Double</span>
											<span class="select-option" value="groove">Groove</span>
											<span class="select-option" value="hidden">Hidden</span>
											<span class="select-option" value="inherit">Inherit</span>
											<span class="select-option" value="inset">Inset</span>
											<span class="select-option" value="none">None</span>
											<span class="select-option" value="outset">Outset</span>
											<span class="select-option" value="rivert">Rivert</span>
											<span class="select-option" value="revert-layer">Rayert Layer</span>
											<span class="select-option" value="ridge">Ridge</span>
											<span class="select-option selected" value="solid">Solid</span>
										</div>
									</details>
								</wbtr-prop-select>								
							</div>

							<div class="css_block_column">
								<h6 class="css_block_column_title">Weight</h6>								
								<wbtr-prop-input data-prop="border-width">
									<div class="forminput-wrapper">
										<label class="forminput-icon"><svg class="border-width" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#line_weight-symbol"></use></svg></label>
										<span class="forminput-input">
											<input type="number" data-id="input" data-prop="border-width" data-prop-unit="px">
										</span>
										<div class="forminput-variable">
<svg class="gear-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#gear-solid-full-symbol"></use></svg>
</div>
									</div>
								</wbtr-prop-input>
							</div>	

							<div class="css_block_column w16 bordersides-colm">
								<wbtr-select data-name="border-sides" value="all" data-id="border-sides" data-prop="border-sides">
									<details part="border-details" class="select-wrapper">
										<summary part="border-summary" class="select-trigger border-allsides">Solid</summary>
										<ul class="select-options scroll-design" style="width:120px;left: inherit;right:0;top: -123px;transform: none;">					            
											<li class="select-option selected" value="all">All</li>
											<li class="select-option" value="top">Top</li>
											<li class="select-option" value="right">Right</li>
											<li class="select-option" value="bottom">Bottom</li>
											<li class="select-option" value="left">Left</li>											
										</ul>
									</details>
								</wbtr-select>
							</div>
						</div>
					</div>	
				</div>
			</article>
	</section>

`;

export default html;