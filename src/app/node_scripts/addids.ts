var json = require("../data/spells/spells.json");
var request = require('sync-request');
var res = request('GET', 'http://google.com');
var cheerio = require('cheerio');



for (let i = 0; i < json.length; i++) {
    json[i]['description'] = cleanHTMLTags(json[i]['description']);

    /*
        var finalurl = "https://www.dnd-spells.com/spell/" + json[i]['name'].replace(/\s/g, '-').replace(/\'/g, '').replace(/\//g, '') + "-ritual";
        console.log(finalurl);
        var res = request('GET', finalurl);
        //console.log(res.body.toString('utf-8'));
        var $ = cheerio.load(res.getBody().toString('utf-8'));

        console.log($("title").html());
        if ($("title").html().indexOf("Spell index") !== -1) {
            continue;
        } else {
            if ($("title").html().indexOf("Ritual")) {
                json[i]['name'] = json[i]['name'] + " (Ritual)";
            }

            if (json[i]['range'].length < 2) {

                json[i]['school'] = clean($("p").eq(1).html());
                //console.log(json[i]['school']);
                var stats = clean($("p").eq(2).html());
                var lines = stats.split("<br>");
                // casting time
                json[i]['casting_time'] = clean(cleanHTMLTags(lines[1].split(':')[1]));
                // range
                json[i]['range'] = clean(cleanHTMLTags(lines[2].split(':')[1]));
                // components
                json[i]['components'] = clean(cleanHTMLTags(lines[3].split(':')[1]));
                // duration
                json[i]['duration'] = clean(cleanHTMLTags(lines[4].split(':')[1]));
                // description
                json[i]['description'] = clean(cleanHTMLTags($("p").eq(3).html()));

                var higher = "At higher level";
                var h = false;
                $("h4").each(function() {
                  if ($(this).html().indexOf(higher) !== -1) {
                      //json[i]['description'] += ' ' + clean($("p").eq(4).html())
                      json[i]['source'] = "phb p. " + clean($("p").eq(5).html()).replace(/\D/g, '');
                      h = true;
                  }
                });

                if (!h) {
                    json[i]['source'] = "phb p. " + clean($("p").eq(4).html()).replace(/\D/g, '');
                }

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
        }

*/
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
