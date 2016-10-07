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

import gem = require("./gem");
import artobject = require("./artobject");

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
        let gems : gem.Gem[] = [];
        for (let i = 0; i < count; i++) {
            gems.push(this.getRandomGem(gems10));
        }
        return gems;
    }

    public getGems50(count:number) : gem.Gem[] {
        let gems : gem.Gem[] = [];
        for (let i = 0; i < count; i++) {
            gems.push(this.getRandomGem(gems50));
        }
        return gems;
    }

    public getGems100(count:number) : gem.Gem[] {
        let gems : gem.Gem[] = [];
        for (let i = 0; i < count; i++) {
            gems.push(this.getRandomGem(gems100));
        }
        return gems;
    }

    public getGems500(count:number) : gem.Gem[] {
        let gems : gem.Gem[] = [];
        for (let i = 0; i < count; i++) {
            gems.push(this.getRandomGem(gems500));
        }
        return gems;
    }

    public getGems1000(count:number) : gem.Gem[] {
        let gems : gem.Gem[] = [];
        for (let i = 0; i < count; i++) {
            gems.push(this.getRandomGem(gems1000));
        }
        return gems;
    }

    public getGems5000(count:number) : gem.Gem[] {
        let gems : gem.Gem[] = [];
        for (let i = 0; i < count; i++) {
            gems.push(this.getRandomGem(gems5000));
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
        let artobjects : artobject.ArtObject[] = [];
        for (let i = 0; i < count; i++) {
            artobjects.push(this.getRandomArtObject(artobjects25));
        }
        return artobjects;
    }

    public getArtObjects250(count:number) : artobject.ArtObject[] {
        let artobjects : artobject.ArtObject[] = [];
        for (let i = 0; i < count; i++) {
            artobjects.push(this.getRandomArtObject(artobjects250));
        }
        return artobjects;
    }

    public getArtObjects750(count:number) : artobject.ArtObject[] {
        let artobjects : artobject.ArtObject[] = [];
        for (let i = 0; i < count; i++) {
            artobjects.push(this.getRandomArtObject(artobjects750));
        }
        return artobjects;
    }

    public getArtObjects2500(count:number) : artobject.ArtObject[] {
        let artobjects : artobject.ArtObject[] = [];
        for (let i = 0; i < count; i++) {
            artobjects.push(this.getRandomArtObject(artobjects2500));
        }
        return artobjects;
    }

    public getArtObjects7500(count:number) : artobject.ArtObject[] {
        let artobjects : artobject.ArtObject[] = [];
        for (let i = 0; i < count; i++) {
            artobjects.push(this.getRandomArtObject(artobjects7500));
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

}
