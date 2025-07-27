
import '../wbtr-layer-sidebar/index.js';
import '../wbtr-canvas/index.js';
import '../wbtr-design-sidebar/index.js';
import '../wbtr-popovers/index.js';
import '../wbtr-modals/index.js';
import '../wbtr-context-menu/index.js';


const html = `
	<wbtr-layer-sidebar></wbtr-layer-sidebar>
	<wbtr-canvas class="scroll-design active" data-current-tool="triangle"></wbtr-canvas>
	<wbtr-canvas-tools class="show"></wbtr-canvas-tools>
	<wbtr-design-sidebar></wbtr-design-sidebar>
	<wbtr-popovers data-canvas-current-target="canvas"></wbtr-popovers>	
	<wbtr-modals></wbtr-modals>	
	<wbtr-context-menu></wbtr-context-menu>
`;

export default html;