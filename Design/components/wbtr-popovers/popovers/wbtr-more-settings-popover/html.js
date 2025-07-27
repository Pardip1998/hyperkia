

const html = `
	<section data-id="wrapper">
		<header data-event-id="moveable-box" data-moveable-box-target="component" data-moveable-box-target-name="moreSettingsPopover">		
			<select data-id="more-settings-select">
          <option value="position-setting">Position</option>
          <option value="appearance-setting" selected>Appearance</option>
          <option value="fill-setting">Fill</option>
          <option value="border-setting">Stroke</option>
          <option value="effects-setting">Effects</option>
          <option value="layout-setting">Layout</option>
          <option value="text-setting">Text</option>
      </select>    
      <button class="close-popover-btn" data-event-id="popover-close" data-popover-name="moreSettingsPopover"></button>
		</header>

		<article data-id="more-settings">

			<div class="animation setting-wrapper hide" data-id="animation-settings" data-class="setting-wrapper">animation</div>
 
			<div class="fill setting-wrapper show" data-id="fill-settings" data-class="setting-wrapper">				
				<div class="prop-box">
					<div class="colorpick-box">
						<span class="colorpick-result" data-event-id="color-result" data-color-result="cssprop--background-color"></span>
						<input class="colorpick-input" type="text" placeholder="#00000000" data-prop="background-color">
					</div>
				</div>
				<span class="separator"></span>				

				<div class="prop-box">
					<div class="flexlist">

							<label class="w100 nowithin-focus">
								<div class="imginput-box">
									<span class="imginput-img">
										<img src="assets/images/image.svg" alt="">
									</span>
									<input class="imginput-input" type="text" placeholder="Image URL">
								</div>
							</label>
						
							<label for="prop-position-x">
								X
								<input type="number" id="prop-position-x" placeholder="123">
							</label>
										
							<label for="prop-position-y">
								Y
								<input type="number" id="prop-position-y" placeholder="123">
							</label>

							<label>								
								<select>									
                  <option value="auto">Auto</option>
                  <option value="contain">Contain</option>
                  <option value="cover">Cover</option>
                  <option value="custom">Custom</option>
                  <option value="inherit">Inherit</option>
                  <option value="initial">Initial</option>
                  <option value="round">Round</option>              
								</select>
							</label>
							<label class="bgimg-size">
								<input type="number" id="prop-position-y" placeholder="X-size">
								<input type="number" id="prop-position-y" placeholder="Y-size">
							</label>
							<label>
								<select>
                    <option value="repeat">Repeat</option>
                    <option value="no-repeat">No-repeat</option>
                    <option value="repeat-x">Repeat-x</option>
                    <option value="repeat-y">Repeat-y</option>
                    <option value="space">Space</option>
                    <option value="round">Round</option>
                </select>
							</label>	

							<label>
								<select>
                    <option value="border-box">Border Box</option>
                    <option value="padding-box">Padding Box</option>
                    <option value="content-box">Content Box</option>
                    <option value="text">Text</option>                                        
                </select>
							</label>

							<label>
								<select>
                    <option value="normal">Normal</option>
                    <option value="multiply">Multiply</option>
                    <option value="screen">Screen</option>
                    <option value="overlay">Overlay</option>
                    <option value="darken">Darken</option>
                    <option value="lighten">Lighten</option>
                    <option value="color-dodge">Color Dodge</option>
                    <option value="saturation">Saturation</option>
                    <option value="color">Color</option>
                    <option value="luminosity">Luminosity</option>
                </select>
							</label>
					</div>
				</div>
			</div>

			<div class="text setting-wrapper hide" data-id="text-settings" data-class="setting-wrapper">text</div>

			<div class="border setting-wrapper hide" data-id="border-settings" data-class="setting-wrapper">Stroke</div>

		</article>
	</section>
`;
  
export default html;