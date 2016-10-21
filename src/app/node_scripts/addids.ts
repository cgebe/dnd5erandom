var json = require("../data/spells/spellsscag.json");
var request = require('sync-request');
var res = request('GET', 'http://google.com');
var cheerio = require('cheerio');



for (let i = 0; i < json.length; i++) {
    json[i]['id'] = i + 1;
    json[i]['table'] = "a";


    console.log(json[i]['id']);
    console.log(json[i]['name']);
    console.log(json[i]['casting_time']);
    console.log(json[i]['range']);
    console.log(json[i]['components']);
    console.log(json[i]['duration']);
    console.log(json[i]['description']);
    console.log(json[i]['source']);
    console.log(json[i]['school']);



}


// write to file
var fs = require('fs');
fs.writeFile("result.json", JSON.stringify(json, null,'\t'), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
