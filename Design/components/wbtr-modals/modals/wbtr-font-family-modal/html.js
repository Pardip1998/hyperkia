
const html = `
	<section part="wrapper" data-id="wrapper">
		<header part="modal-header">
			<h4 part="modal-title">Font Family</h4>
			<button class="iconbtn" data-event-id="modal-close" data-modal-name="fontFamilyModal">
				<svg class="plus-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#cut-symbol"></use></svg>
			</button>
		</header>
		<article part="modal-body">
			<div part="tabmenu" class="tabmenu">													
				<span part="tabmenu-item" data-event-id="switchtab" data-target="tabcontentAvailable" data-class="tabmenu-item" class="available-font tabmenu-item active">Available Fonts</span>
				<span part="tabmenu-item" data-event-id="switchtab" data-target="tabcontentLibrary" data-class="tabmenu-item" class="library-font tabmenu-item" data-id="library-font-menuitem">Library Fonts</span>
				<input part="search-font-family" type="search" placeholder="Search..." data-event-id="search-font-family" data-id="search-font-family" class="search-font-family">
			</div> 
			<div part="tabcontents">
				<div part="tabcontent" class="tabcontent-available" data-class="font-tabcontent" data-id="tabcontent-available">
					<ul class="fontslist scroll-design" data-id="available-fontslist"></ul>
					<strong class="nofont-text">No Fonts Available, <br> To add fonts click on <u data-event-id="open-tabcontent-available">"Library Fonts"</u>.</strong>
				</div>				
				<div part="tabcontent" class="tabcontent-library" data-class="font-tabcontent" data-id="tabcontent-library" hidden>
					<ul class="fontslist scroll-design" data-id="library-fontslist"></ul>
				</div>				
			</div>
		</article>
	</section>
`;

export default html;