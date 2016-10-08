var gems10 = require("json!../data/loot/gems10.json");
var gems50 = require("json!../data/loot/gems50.json");
var gems100 = require("json!../data/loot/gems100.json")
var gems500 = require("json!../data/loot/gems500.json");
var gems1000 = require("json!../data/loot/gems1000.json");
var gems5000 = require("json!../data/loot/gems5000.json");

var artobjects25 = require("json!../data/loot/artobjects25.json");
var artobjects250 = require("json!../data/loot/artobjects250.json");
var artobjects750 = require("json!../data/loot/artobjects750.json");
var artobjects2500 = require("json!../data/loot/artobjects2500.json");
var artobjects7500 = require("json!../data/loot/artobjects7500.json");

var magica = require("json!../data/loot/magica.json");
var magicb = require("json!../data/loot/magicb.json");
var magicc = require("json!../data/loot/magicc.json");
var magicd = require("json!../data/loot/magicd.json");
var magice = require("json!../data/loot/magice.json");
var magicf = require("json!../data/loot/magicf.json");
var magicg = require("json!../data/loot/magicg.json");
var magich = require("json!../data/loot/magich.json");
var magici = require("json!../data/loot/magici.json");

import gem = require("./gem");
import artobject = require("./artobject");
import items = require("./items");
import random = require("./random");
import roll = require("./roll");

export class TreasureDB {
    private static instance:TreasureDB = new TreasureDB();

    constructor() {
        if (TreasureDB.instance) {
            throw new Error("Instantiation failed!");
        }
        TreasureDB.instance = this;
    }

    public static getInstance():TreasureDB {
        return TreasureDB.instance;
    }

    public getGems10(count:number) : gem.Gem[] {
        return this.getRandomGems(gems10, count);
    }

    public getGems50(count:number) : gem.Gem[] {
        return this.getRandomGems(gems50, count);
    }

    public getGems100(count:number) : gem.Gem[] {
        return this.getRandomGems(gems100, count);
    }

    public getGems500(count:number) : gem.Gem[] {
        return this.getRandomGems(gems500, count);
    }

    public getGems1000(count:number) : gem.Gem[] {
        return this.getRandomGems(gems1000, count);
    }

    public getGems5000(count:number) : gem.Gem[] {
        return this.getRandomGems(gems5000, count);
    }

    private getRandomGems(gemsJson, count:number) : gem.Gem[] {
        let gems : gem.Gem[] = [];
        for (let i = 0; i < count; i++) {
            gems.push(this.getRandomGem(gemsJson));
        }
        return gems;
    }

    private getRandomGem(gemsJson) : gem.Gem {
        var gJson = gemsJson[Math.floor(Math.random() * gemsJson.length)];
        let g = new gem.Gem();
        g.name = gJson.name;
        g.color = gJson.colors[Math.floor(Math.random() * gJson.colors.length)];
        g.cost = gJson.cost;
        return g;
    }

    public getArtObjects25(count:number) : artobject.ArtObject[] {
        return this.getRandomArtObjects(artobjects25, count);
    }

    public getArtObjects250(count:number) : artobject.ArtObject[] {
        return this.getRandomArtObjects(artobjects250, count);
    }

    public getArtObjects750(count:number) : artobject.ArtObject[] {
        return this.getRandomArtObjects(artobjects750, count);
    }

    public getArtObjects2500(count:number) : artobject.ArtObject[] {
        return this.getRandomArtObjects(artobjects2500, count);
    }

    public getArtObjects7500(count:number) : artobject.ArtObject[] {
        return this.getRandomArtObjects(artobjects7500, count);
    }

    private getRandomArtObjects(artobjectsJson, count:number) : artobject.ArtObject[] {
        let artobjects : artobject.ArtObject[] = [];
        for (let i = 0; i < count; i++) {
            artobjects.push(this.getRandomArtObject(artobjectsJson));
        }
        return artobjects;
    }

    private getRandomArtObject(artobjectsJson) {
        var aoJson = artobjectsJson[Math.floor(Math.random() * artobjectsJson.length)];
        let ao = new artobject.ArtObject();
        ao.name = aoJson.name;
        ao.cost = aoJson.cost;
        return ao;
    }

    public getMagicItemsA(count:number) : items.MagicItem[] {
        return this.getRandomMagicItems(magica, count);
    }

    public getMagicItemsB(count:number) : items.MagicItem[] {
        return this.getRandomMagicItems(magicb, count);
    }

    public getMagicItemsC(count:number) : items.MagicItem[] {
        return this.getRandomMagicItems(magicc, count);
    }

    public getMagicItemsD(count:number) : items.MagicItem[] {
        return this.getRandomMagicItems(magicd, count);
    }

    public getMagicItemsE(count:number) : items.MagicItem[] {
        return this.getRandomMagicItems(magice, count);
    }

    public getMagicItemsF(count:number) : items.MagicItem[] {
        return this.getRandomMagicItems(magicf, count);
    }

    public getMagicItemsG(count:number) : items.MagicItem[] {
        return this.getRandomMagicItems(magicg, count);
    }

    public getMagicItemsH(count:number) : items.MagicItem[] {
        return this.getRandomMagicItems(magich, count);
    }

    public getMagicItemsI(count:number) : items.MagicItem[] {
        return this.getRandomMagicItems(magici, count);
    }

    private getRandomMagicItems(magicJson, count:number) : items.MagicItem[] {
        let mitems : items.MagicItem[] = [];
        let d100 = 0;
        for (let i = 0; i < count; i++) {
            d100 = random.Random.rolld100();
            mitems.push(this.getMagicItem(magicJson, d100));
        }
        return mitems;
    }

    private getMagicItem(magicJson, d100:number) : items.MagicItem {
        if (d100 <= 70) { // heuristic for search optimization
            for (let i = 0; i < magicJson.length; i++) {
                if (parseInt(magicJson[i].min) <= d100 && d100 <= parseInt(magicJson[i].max)) {
                    let mi = new items.MagicItem();
                    mi.name = magicJson[i].name;
                    mi.rarity = magicJson[i].rarity;
                    if (mi.rarity == "very rare" || mi.rarity == "legendary") {
                        //mi.creator = this.getRandomMagicItemCreator();
                        //mi.history = this.getRandomMagicItemHistory();
                        //mi.property = this.getRandomMagicItemProperty();
                        //mi.quirk = this.getRandomMagicItemQuirk();
                    }
                    return mi;
                }
            }
        } else {
            for (let i = magicJson.length - 1; i >= 0; i--) {
                if (parseInt(magicJson[i].min) <= d100 && d100 <= parseInt(magicJson[i].max)) {
                    let mi = new items.MagicItem();
                    mi.name = magicJson[i].name;
                    mi.rarity = magicJson[i].rarity;
                    return mi;
                }
            }
        }
        return null;
    }



}
