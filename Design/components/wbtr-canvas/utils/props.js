
const props = {
	eTarget: null,

	_deleterLayersIndex: [],
	_root: null,

	_currentTarget: null,
	_currentTargetId: '',

	_selectionAreaElements: [],

	
	_pagesRect: null,
	_rectActivePage: null,
	_rectActivePageRect: null,
	_shadowRootRect: null,

	_actvPage: null,
	_actvPageRect: null,
	_actvtag: null,
	_actvtagTx: 0,
	_actvtagTy: 0,
	_currentTargetCSSRules: null,
	_actvdX: 0,
	_actvdY: 0,
	_actvmX: 0,
	_actvmY: 0,

	_trianP: null,
	_trianT: null,
	_trianTcss: null,

	
	_createHTMLTag: 'section',

	
	_pathPoints: [],

	
	_polylinePoints: '',

	
	_isTransitioning: false,
	_magnifPanning: false,
	_magnifsX: 0,
	_magnifsY: 0,
	_magnifdX: 0,
	_magnifdY: 0,
	_magnifScale: 1,
	_magnifpX: 0,
	_magnifpY: 0,

	_inputSetTimeout: null,
}



export default props;