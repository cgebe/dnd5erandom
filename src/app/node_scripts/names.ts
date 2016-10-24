
var fs = require('fs');

var names = fs.readFileSync('../data/femalenames.txt').toString().split('\n');

let r = [];

for (let i = 0; i < names.length; i++) {
    let namesa = names[i].split(/(\s+)/);

    for (let j = 0; j < namesa.length; j++) {
        let e = {};
        e['name'] = namesa[j];
        if (e['name'].length > 2) {
            r.push(e);
        }
    }


}


// write to file
var fs = require('fs');
fs.writeFile("result.json", JSON.stringify(r, null,'\t'), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
