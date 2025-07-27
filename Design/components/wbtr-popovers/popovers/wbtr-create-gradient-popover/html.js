const html = `
	<section data-id="wrapper" class="wrapper" current-gradient-types="linear-gradient">
		<header part="popover-header" data-event-id="moveable-box" data-moveable-box-target="component" data-moveable-box-target-name="createGradientPopover">   
			<h5 part="popover-title">Gradient</h5>
			<button part="popover-close-btn" data-event-id="popover-close"></button>
		</header>

		<div part="clrstyle" class="clrstyle">
			<span class="clrstyle-item clrstyle-solid" data-clrstyle="solid" data-event-id="clrstyle"></span>
			<span class="clrstyle-item clrstyle-gradient" data-clrstyle="gradient" data-event-id="clrstyle"></span>
		</div>
 
		<div class="content-wrapper">						
			<wbtr-select class="gradient-types" data-event-id="dropdowntools" data-id="gradient-types" data-name="gradient-types">
				<details part="details" class="select-wrapper">
					<summary part="summary" class="select-trigger">Linear</summary>
					<ul class="select-options scroll-design" style="">
						<li class="select-option selected" value="linear-gradient">Linear</li>
						<li class="select-option" value="radial-gradient">Radial</li>
						<li class="select-option" value="conic-gradient">Conic</li>																
						<li class="select-option" value="custom-gradient">Custom</li>																			
					</ul>
				</details>
			</wbtr-select>
			<label class="gradient-degree">
				<span>&#8635;</span>
				<input data-id="gradient-degree-input" data-event-id="gradient-degree-input" type="number" placeholder="123" value="90">
			</label>

			<div class="gradient-tracks-wrapper">
		      <div class="gradient-tranparent">
		      	<input class="gradient-tracks-range" data-id="gradient-tracks-range" type="range" min="0" max="100" step="1">
		      	<div class="gradient-tracks" data-id="gradient-tracks"></div>
		      </div>
			</div>

			<div class="gradientpoint-wrapper">
				<div class="gradientpoint-header">
					<span>Stop</span>
					<button class="gradientpoint-addbtn">
						<img src="assets/images/plus-solid.svg" alt="">
					</button>
				</div>				
			</div>           
		</div>

		<ul class="gradientpoints scroll-design" data-id="gradientpoints"></ul>  

	</section>
`;

export default html;

