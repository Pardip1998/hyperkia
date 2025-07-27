const html = `
	<section class="block_section">
		<header class="block_header">
			<button class="iconbtn nav-visibility-btn" data-event-id="nav-visibility-control">
				<svg xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#bars-solid-full-symbol"></use></svg>
				<input type="checkbox" data-id="nav-visibility-input">
			</button>
			<nav class="nav">
				<ul class="nav-menu">
					<li class="nav-menu-item" data-nav-menu-lavel="1">
						File
						<ul class="nav-submenu">
							<li class="nav-menu-item" data-nav-menu-lavel="2" data-event-id="nav-menu-item" data-method="navMenuItemImportDB">
								Import
								<input class="nav-menu-item-import-input" type="file" data-id="nav-menu-item-import-input" data-event-id="nav-menu-item-import-input">
							</li>
							<li class="nav-menu-item" data-nav-menu-lavel="2" data-event-id="nav-menu-item" data-method="navMenuItemExportDB">Export</li>
						</ul>	
					</li>
					<li class="nav-menu-item" data-nav-menu-lavel="1">Themes</li>
					<li class="nav-menu-item" data-nav-menu-lavel="1">Plugins</li>
					<li class="nav-menu-item" data-nav-menu-lavel="1">Settings</li>
					<li class="nav-menu-item" data-nav-menu-lavel="1">Help</li>
				</ul>	
			</nav>
			<button class="iconbtn" data-id="flip-sidebar-btn">				
				<svg class="flip-sidebar" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2">
					<use href="assets/images/svg-icons.svg#sidebar-symbol"></use>
				</svg>
			</button>
		</header>		
	</section>
`;

export default html;