var Xray = require('x-ray');
var x = Xray({
  filters: {
    trim: function (value) {
      return typeof value === 'string' ? value.trim() : value
    }
  }
});

/*
module.exports = {
    items_to_json : function(url, props, path) {
	var prop_to_css_sel = {};
	props.forEach(function(e, i) {
	    prop_to_css_sel[e] = 'td:nth-child(' + (i + 1) + ')' + ' | trim';
	});
	x(url, '.5e > tr', [prop_to_css_sel]).write(path);
    }
}

*/
module.exports = {
    items_to_json : function(url, props, path) {
	var prop_to_css_sel = {};
    /*
	props.forEach(function(e, i) {
	    prop_to_css_sel[e] = 'td:nth-child(' + (8 + 1) + ')' + ' | trim';
	});
    */
    prop_to_css_sel['name'] = 'td:nth-child(2) > a:nth-child(1) | trim';
    prop_to_css_sel['source'] = 'td:nth-child(9) | trim';
	x(url, '#example > tbody > tr', [prop_to_css_sel]).write(path);
    }
}
