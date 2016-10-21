var json = require("../data/loot/items.json");
var fs = require('fs');

var common = fs.readFileSync('../data/loot/rarity/common.txt').toString().toLowerCase().split('\n');
var uncommon = fs.readFileSync('../data/loot/rarity/uncommon.txt').toString().toLowerCase().split('\n');
var rare = fs.readFileSync('../data/loot/rarity/rare.txt').toString().toLowerCase().split('\n');
var veryrare = fs.readFileSync('../data/loot/rarity/veryrare.txt').toString().toLowerCase().split('\n');
var legendary = fs.readFileSync('../data/loot/rarity/legendary.txt').toString().toLowerCase().split('\n');

for (let i = 0; i < json.length; i++) {
    /*
    json[i]['rarity'] = "";
    json[i]['table'] = "i";

    if (common.indexOf(json[i]['name']) > -1) {
        json[i]['rarity'] = "common";
    }

    if (uncommon.indexOf(json[i]['name']) > -1) {
        json[i]['rarity'] = "uncommon";
    }

    if (rare.indexOf(json[i]['name']) > -1) {
        json[i]['rarity'] = "rare";
    }

    if (veryrare.indexOf(json[i]['name']) > -1) {
        json[i]['rarity'] = "very rare";
    }

    if (legendary.indexOf(json[i]['name']) > -1) {
        json[i]['rarity'] = "legendary";
    }
    */
    if (json[i]['rarity'].length < 2) {

        console.log(json[i]['name']);
        console.log(json[i]['rarity']);

        if (common.indexOf(json[i]['name'].toLowerCase()) > -1) {
            json[i]['rarity'] = "common";
        }

        if (uncommon.indexOf(json[i]['name'].toLowerCase()) > -1) {
            json[i]['rarity'] = "uncommon";
        }

        if (rare.indexOf(json[i]['name'].toLowerCase()) > -1) {
            json[i]['rarity'] = "rare";
        }

        if (veryrare.indexOf(json[i]['name'].toLowerCase()) > -1) {
            json[i]['rarity'] = "very rare";
        }

        if (legendary.indexOf(json[i]['name'].toLowerCase()) > -1) {
            json[i]['rarity'] = "legendary";
        }

        if ((json[i]['name'].toLowerCase()).indexOf("armor of resistance") > -1) {
            json[i]['rarity'] = "rare";
        }


        if (json[i]['rarity'].length > 0) {
            console.log(json[i]['name']);
            console.log(json[i]['rarity']);
        }
    }
}
console.log(json.length);

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
