
const html = `
	<section class="wrapper">		
		<div class="tools" data-id="tools">
			<span class="tool-item triangle activetool" data-tool="triangle">
				<svg xmlns="http://www.w3.org/2000/svg" style="rotate: -80deg;"><use href="assets/images/svg-icons.svg#location-arrow-solid-full-symbol"></use></svg>
			</span>
			<span class="tool-item htmltag" data-tool="htmltag">
				<svg xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#code-solid-full-symbol"></use></svg>
			</span>
			<wbtr-select data-event-id="dropdowntools" data-name="switchtag">
				<details part="details" class="select-wrapper">
					<summary part="summary" class="select-trigger">SECTION</summary>
					<ul class="select-options scroll-design" style="width: 120px;top: -180px;transform: none;max-height: 220px;left: -37px;">					            
						<li class="select-option selected" value="section">Section</li>
						<li class="select-option" value="p">Text</li>
						<li class="select-option" value="img">Image</li>
						<li class="select-option" value="audio">Audio</li>
						<li class="select-option" value="video">Video</li>											
						<li class="select-option" value="iframe">IFrame</li>																			
					</ul>
				</details>
			</wbtr-select>
			<span class="tool-item text" data-tool="text">
				<svg xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#type-symbol"></use></svg>
			</span>	
			<span class="tool-item svgshape" data-tool="rectsvg" data-id="svgshape">
				<i>SVG</i>
			</span>
			<wbtr-select data-event-id="dropdowntools" data-name="svgtools">
				<details part="details" class="select-wrapper">
					<summary part="summary" class="select-trigger"></summary>
					<ul part="select-options" class="select-options scroll-design" style="left: -37px;">
						<li part="select-option" class="select-option selected" value="rectsvg">
							<svg part="select-option-svg rectangle-svg" xmlns="http://www.w3.org/2000/svg">
								<use href="assets/images/svg-icons.svg#rectangle-symbol"></use>
							</svg>
							Rectangle
						</li>
						<li part="select-option" class="select-option" value="linesvg">
							<i part="line-icon select-option-i"></i>
							Line
						</li>
						<li part="select-option" class="select-option" value="circlesvg">
							<i part="circle-icon select-option-i"></i>
							Circle
						</li>
						<li part="select-option" class="select-option" value="ellipsesvg">
							<i part="ellipse-icon select-option-i"></i>
							Ellipse
						</li>
						<li part="select-option" class="select-option" value="pathsvg">
							<svg part="select-option-svg" xmlns="http://www.w3.org/2000/svg">
								<use href="assets/images/svg-icons.svg#conversion_path-symbol"></use>
							</svg>
							Path
						</li>
						<li part="select-option" class="select-option" value="moresvg">
							<i part="moresvg-icon">...</i>
							More
						</li>
					</ul>
				</details>
			</wbtr-select>
			<span class="tool-item magnifying-glass" data-tool="magnifying-glass">
				<svg xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#magnifying-glass-solid-full-symbol"></use></svg>
			</span>	
			<span class="tool-item hand" data-tool="hand">
				<svg xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#hand-solid-full-symbol"></use></svg>
			</span>			
		</div>
	</section>
`;


export default html;