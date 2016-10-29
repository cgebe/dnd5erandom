var json = require("../data/artobjects.json");
var fs = require('fs');


for (let i = 0; i < json.length; i++) {

    json[i]['id'] = i + 1;

}

// write to file
var fs = require('fs');
fs.writeFile("result.json", JSON.stringify(json, null,'\t'), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

function cleanHTMLTags(string) {
    return string.replace(/(<([^>]+)>)/ig,'');
}

function clean(string) {
    if (string == null) {
        return "";
    }
    return string.replace(/^\s+|\s+$/g, '').replace(/&#x2019;/g, '\'');
}
