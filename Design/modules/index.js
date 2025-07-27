
import Data from './database/data.js';

import database from './database/index.js';
import layertb from './database/layers.js';
import optionstb from './database/options.js';
import pagestb from './database/pages.js';

import helper from './functions/helper.js';
import element from './functions/element.js';



if(window.WBTR){
	document.body.innerHTML = '<h1>WBTR is reserve keyword, please use different identifier</h1>';
	throw new Error('WBTR is reserve keyword, please use different identifier');
} else {
	window.WBTR = {
		db: database,
		data: Data,
		layertb,
		optionstb,
		pagestb, 		
	    helper,
	    element,
	};
}