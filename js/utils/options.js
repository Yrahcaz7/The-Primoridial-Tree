let options = {};

function getStartOptions() { return {
	autosave: true,
	msDisplay: 'always',
	theme: 'default',
	hqTree: false,
	offlineProd: true,
	hideChallenges: false,
	showStory: true,
	forceOneTab: false,
	tooltipForcing: true,
	colorDisplayMode: 0,
	colorDisplay: 0,
	extendplaces: false,
	css: '',
}};

function toggleOpt(name) {
	// toggle option
	options[name] = !options[name];
	// special
	if (name == 'hqTree') changeTreeQuality();
	// update canvas
	if (name == 'forceOneTab' || name == 'forceTooltips') needsCanvasUpdate = true;
};

function changeTreeQuality() {
	var on = options.hqTree;
	document.body.style.setProperty('--hqProperty1', on ? '2px solid' : '4px solid');
	document.body.style.setProperty('--hqProperty2a', on ? '-4px -4px 4px #00000040 inset' : '-4px -4px 4px #00000000 inset');
	document.body.style.setProperty('--hqProperty2b', on ? '0px 0px 20px var(--background)' : '');
	document.body.style.setProperty('--hqProperty3', on ? '2px 2px 4px #00000040' : 'none');
};

function toggleAuto(toggle) {
	Vue.set(player[toggle[0]], [toggle[1]], !player[toggle[0]][toggle[1]]);
	needCanvasUpdate = true;
};

const MS_DISPLAYS = ['ALL', 'LAST, AUTO, INCOMPLETE', 'AUTOMATION, INCOMPLETE (recommended)', 'INCOMPLETE', 'NONE'];

const MS_SETTINGS = ['always', 'last', 'automation', 'incomplete', 'never'];

function adjustMSDisp() {
	options.msDisplay = MS_SETTINGS[(MS_SETTINGS.indexOf(options.msDisplay) + 1) % MS_SETTINGS.length];
};

function milestoneShown(layer, id) {
	if (layers[layer].milestones[id] === undefined) return false;
	complete = player[layer].milestones.includes(id);
	auto = layers[layer].milestones[id].toggles;
	switch (options.msDisplay) {
		case 'always':
			return true;
		case 'last':
			return (auto) || !complete || player[layer].lastMilestone === id;
		case 'automation':
			return (auto) || !complete;
		case 'incomplete':
			return !complete;
		case 'never':
			return false;
	};
	return false;
};

const DISPLAY_MODES = ['ALL (recommended)', 'ONLY SPECIAL', 'SPECIAL AND TITLES', 'SPECIAL AND REFRENCES'];

const COLOR_DISPLAYS = ['ON - NORMAL (recommended)', 'ON - ALWAYS DARK', 'OFF (recommended for colorblind)'];

var colorvalue = [[true, true, true], 'normal'];

function display_mode() {
	options.colorDisplayMode += 1;
	if (options.colorDisplayMode >= 4) options.colorDisplayMode = 0;
};

function color_display() {
	options.colorDisplay += 1;
	if (options.colorDisplay >= 3) options.colorDisplay = 0;
};

function fullcolordisplay() {
	switch (options.colorDisplayMode) {
		case 0:
			colorvalue[0] = [true, true, true];
			break;
		case 1:
			colorvalue[0] = [true, false, false];
			break;
		case 2:
			colorvalue[0] = [true, true, false];
			break;
		case 3:
			colorvalue[0] = [true, false, true];
			break;
	};
	switch (options.colorDisplay) {
		case 0:
			colorvalue[1] = 'normal';
			break;
		case 1:
			colorvalue[1] = 'dark';
			break;
		case 2:
			colorvalue[1] = 'none';
			break;
	};
};

const CSS_SETTINGS = ['', '-webkit-', '-moz-', '-ms-', '-o-'];

const CSS_DISPLAYS = ['no specific browser', 'Chrome, Safari, and Android', 'Firefox', 'Internet Explorer and Edge', 'Opera and Opera Mini'];

function shiftCSS() {
	options.css = CSS_SETTINGS[(CSS_SETTINGS.indexOf(options.css) + 1) % CSS_SETTINGS.length];
	document.body.style.setProperty('--chaos-gradient', options.css + 'radial-gradient(#4CED13, #D2D237, #DB5196, #710CC4, #E36409, #BA0035, #4D2FE0, #FDBBFF, #AAFF00, #B9A975, #00CCCC, #08FF87, #FF4400, #A0A0A0, #008800, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF)');
	needsCanvasUpdate = true;
};
