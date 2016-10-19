var json = require("../data/spells/spells.json");
var request = require('sync-request');
var res = request('GET', 'http://google.com');
var cheerio = require('cheerio');



for (let i = 0; i < json.length; i++) {
    if (json[i]['range'].length < 2) {

        var finalurl = "https://www.dnd-spells.com/spell/" + json[i]['name'].replace(/\s/g, '-').replace(/\'/g, '');
        console.log(finalurl);
        var res = request('GET', finalurl);
        //console.log(res.body.toString('utf-8'));
        var $ = cheerio.load(res.body.toString('utf-8'));
        json[i]['school'] = clean($("p").eq(1).html());
        var stats = clean($("p").eq(2).html());
        json[i]['casting_time'] = clean($("td").eq(2).html());
        json[i]['range'] = clean($("td").eq(3).html());
        json[i]['components'] = clean($("td").eq(4).html());
        json[i]['duration'] = clean($("td").eq(5).html());
        var description = clean($("p").eq(1).html());
        var j = 2;
        while($("p").eq(j).html() != null && $("p").eq(j).html().length > 7) {
            description += ' ' + clean($("p").eq(j).html());
            j++;
        }
        json[i]['description'] = description;
    }
}


// write to file
var fs = require('fs');
fs.writeFile("result.json", JSON.stringify(json, null,'\t'), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
