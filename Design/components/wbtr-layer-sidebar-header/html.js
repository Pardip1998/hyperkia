const html = `
<section class="block_section" data-id="wrapper">
	<header class="block_header">
		<div class="menu-items" exportparts="title" part="title">
			<a class="active menu-item-file" href="#">
				File				
				<svg xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#file-symbol"></use></svg>
			</a>
			<a class="menu-item-image" href="#">
				Assets				
				<svg xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#image-symbol"></use></svg>
			</a>
		</div>
		<div class="search-box">
			<button class="iconbtn">				
				<svg class="magnifying-glass" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#magnifying-glass-solid-full-symbol"></use></svg>				
				<svg class="cut" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#x-solid-symbol"></use></svg>
				<input type="checkbox">				
			</button>
			<input type="search" placeholder="Search..." />
		</div>
	</header>
</section>
`;
    
export default html;