var Xray = require('x-ray');
var x = Xray();

module.exports = {
    items_to_json : function(url, props, path) {
	var prop_to_css_sel = {};
	props.forEach(function(e, i) {
	    prop_to_css_sel[e] = 'td:nth-child(' + (i + 1) + ')';
	});
	x(url, '.5e > tr', [prop_to_css_sel]).write('test.json').write(path);
    }
}

