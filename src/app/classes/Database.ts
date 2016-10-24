
/*
var items = require("json!../data/dto.json");
var gear = require("json!../data/gear.json");
var tools = require("json!../data/tools.json")
var weapons = require("json!../data/weapons.json");
var armors = require("json!../data/armors.json");
var potions = require("json!../data/potions.json");
var watervehicles = require("json!../data/watervehicles.json");
var mounts = require("json!../data/mounts.json");
var animals = require("json!../data/animals.json");
var tradegoods = require("json!../data/tradegoods.json");
var trinkets = require("json!../data/trinkets.json");
*/

var magic_items_json = require("json!../data/magicitems.json");
var spells_json = require("json!../data/spells.json");
var gems_json = require("json!../data/gems.json");
var art_objects_json = require("json!../data/artobjects.json");

var weapons = require("json!../data/loot/weapons.json");
var ammunition = require("json!../data/loot/ammunition.json");
var figurines = require("json!../data/loot/figurines.json");
var magicarmors = require("json!../data/loot/magicarmors.json");

import dto = require("./DTO");
import random = require("./Random");
import util = require("./Util");

export class Database {
    private static instance:Database = new Database();

    constructor() {
        if (Database.instance) {
            throw new Error("Instantiation failed!");
        }
        Database.instance = this;
    }

    public static getInstance():Database {
        return Database.instance;
    }


}

export class MagicItemDatabase {
    private static instance:MagicItemDatabase = new MagicItemDatabase();
    private magicItemsByTables : {[key : string] : Array<Object>};

    constructor() {
        if (MagicItemDatabase.instance) {
            throw new Error("Instantiation failed!");
        }
        this.magicItemsByTables = {};
        for (let i = 0; i < magic_items_json.length; i++) {
            if (this.magicItemsByTables[magic_items_json[i]['table']] == undefined) {
                this.magicItemsByTables[magic_items_json[i]['table']] = [];
            }
            this.magicItemsByTables[magic_items_json[i]['table']].push(magic_items_json[i]);
        }
        MagicItemDatabase.instance = this;
    }

    public static getInstance() : MagicItemDatabase {
        return MagicItemDatabase.instance;
    }

    public getRandomMagicItemsByTable(count:number, table:string) : dto.MagicItem[] {
        let mitems : dto.MagicItem[] = [];
        for (let i = 0; i < count; i++) {
            mitems.push(this.getRandomMagicItemByTable(table));
        }
        return mitems;
    }

    public getRandomMagicItemByTable(table:string) : dto.MagicItem {
        let mi : dto.MagicItem;
        let d100 = random.Random.rolld100();
        if (d100 <= 70) { // heuristic for search optimization
            mi = this.searchMagicItemFromBeginning(this.magicItemsByTables[table], d100);
        } else {
            mi = this.searchMagicItemFromEnd(this.magicItemsByTables[table], d100);
        }
        if (mi.rarity == "very rare" || mi.rarity == "legendary") {
            //mi.creator = this.getRandomMagicItemCreator();
            //mi.history = this.getRandomMagicItemHistory();
            //mi.property = this.getRandomMagicItemProperty();
            //mi.quirk = this.getRandomMagicItemQuirk();
        }
        return mi;
    }

    private searchMagicItemFromBeginning(magicJson, d100:number) : dto.MagicItem {
        for (let i = 0; i < magicJson.length; i++) {
            if (parseInt(magicJson[i].min) <= d100 && d100 <= parseInt(magicJson[i].max)) {
                return this.determineFinalMagicItem(magicJson[i]);
            }
        }
    }

    private searchMagicItemFromEnd(magicJson, d100:number) : dto.MagicItem {
        for (let i = magicJson.length - 1; i >= 0; i--) {
            if (parseInt(magicJson[i].min) <= d100 && d100 <= parseInt(magicJson[i].max)) {
                return this.determineFinalMagicItem(magicJson[i]);
            }
        }
    }

    private determineFinalMagicItem(magicItemJson) : dto.MagicItem {
        let mi = new dto.MagicItem();
        mi.name = magicItemJson.name;
        mi.rarity = magicItemJson.rarity;

        if (mi.name.match(/Figurine of wondrous power \(roll d8\)/i)) {
            let d8 : number = random.Random.rolld8();
            if (figurines.length >= d8) {
                mi.name = figurines[d8 - 1].name;
                mi.rarity = figurines[d8 - 1].rarity;
            }
        }

        if (mi.name.match(/Magic armor \(roll d12\)/i)) {
            let d12 : number = random.Random.rolld12();
            if (magicarmors.length >= d12) {
                mi.name = magicarmors[d12 - 1].name;
                mi.rarity = magicarmors[d12 - 1].rarity;
            }
        }

        if (mi.name.match(/weapon,/i)) {
            mi.name = mi.name.replace(/weapon,/i, this.getRandomName(weapons) + ",");
        }

        if (mi.name.match(/armor,/i)) {
            let armor = mi.name.split(",");
            if (armor.length == 3) {
                mi.name = armor[2].trim() + ", " + armor[1].trim();
            }
        }

        if (mi.name.match(/ammunition,/i)) {
            let s : string = mi.name.replace(/[^0-9]+/g, "");
            let lvl : number = parseInt(s);
            let count : number = 0;
            count = random.Random.rollXdY(4 - lvl, 6); // +1 = 3d6, +2 = 2d6, +3 = 1d6
            mi.name = mi.name.replace(/ammunition,/i, this.getRandomName(ammunition) + ",") + " (" + count + ")";
        }

        if (mi.name.match(/spell scroll/i)) {
            let s : string = mi.name.match(/\((.*?)\)/)[0];
            if (s) {
                if (s.match(/cantrip/i)) {
                    mi.name = mi.name.replace(/\((.*?)\)/, "(" + SpellDatabase.getInstance().getRandomSpellByLevel(0).name + ")");
                } else {
                    s = s.replace(/[^0-9]+/g, "");
                    mi.name = mi.name.replace(/\((.*?)\)/, "(" + SpellDatabase.getInstance().getRandomSpellByLevel(parseInt(s)).name + ")");
                }
            }
        }
        mi.name = util.capitalizeFirstLetter(mi.name);
        mi.rarity = util.capitalizeFirstLetter(mi.rarity);
        return mi;
    }

    private getRandomName(json) : string {
        return json[Math.floor(Math.random() * json.length)].name.toLowerCase();
    }

    private getRandomItem(json) : string {
        return json[Math.floor(Math.random() * json.length)].name.toLowerCase();
    }

}

export class SpellDatabase {
    private static instance:SpellDatabase = new SpellDatabase();
    private spellsByLevel : {[key : number] : Array<Object>};

    constructor() {
        if (SpellDatabase.instance) {
            throw new Error("Instantiation failed!");
        }
        this.spellsByLevel = {};
        for (let i = 0; i < spells_json.length; i++) {
            if (this.spellsByLevel[parseInt(spells_json[i]['level'])] == undefined) {
                this.spellsByLevel[parseInt(spells_json[i]['level'])] = [];
            }
            this.spellsByLevel[parseInt(spells_json[i]['level'])].push(spells_json[i]);
        }
        SpellDatabase.instance = this;
    }

    public static getInstance() : SpellDatabase {
        return SpellDatabase.instance;
    }

    public getRandomSpellByLevel(level:number) : dto.Spell {
        return new dto.Spell().fill(spells_json[Math.floor(Math.random() * spells_json.length)])
    }

}

export class GemDatabase {
    private static instance:GemDatabase = new GemDatabase();
    private gemsByCost : {[key : number] : Array<Object>};

    constructor() {
        if (GemDatabase.instance) {
            throw new Error("Instantiation failed!");
        }
        this.gemsByCost = {};
        for (let i = 0; i < gems_json.length; i++) {
            if (this.gemsByCost[parseInt(gems_json[i]['cost'])] == undefined) {
                this.gemsByCost[parseInt(gems_json[i]['cost'])] = [];
            }
            this.gemsByCost[parseInt(gems_json[i]['cost'])].push(gems_json[i]);
        }
        GemDatabase.instance = this;
    }

    public static getInstance() : GemDatabase {
        return GemDatabase.instance;
    }

    public getRandomGemsByCost(count:number, cost:number) : dto.Gem[] {
        let gems : dto.Gem[] = [];
        for (let i = 0; i < count; i++) {
            gems.push(this.getRandomGem(this.gemsByCost[cost]));
        }
        return gems;
    }

    private getRandomGem(gemsJson) : dto.Gem {
        return new dto.Gem().fill(gemsJson[Math.floor(Math.random() * gemsJson.length)]);
    }
}

export class ArtObjectDatabase {
    private static instance:ArtObjectDatabase = new ArtObjectDatabase();
    private artObjectsByCost : {[key : number] : Array<Object>};

    constructor() {
        if (ArtObjectDatabase.instance) {
            throw new Error("Instantiation failed!");
        }
        this.artObjectsByCost = {};
        for (let i = 0; i < art_objects_json.length; i++) {
            if (this.artObjectsByCost[parseInt(art_objects_json[i]['cost'])] == undefined) {
                this.artObjectsByCost[parseInt(art_objects_json[i]['cost'])] = [];
            }
            this.artObjectsByCost[parseInt(art_objects_json[i]['cost'])].push(art_objects_json[i]);
        }
        ArtObjectDatabase.instance = this;
    }

    public static getInstance() : ArtObjectDatabase {
        return ArtObjectDatabase.instance;
    }

    public getRandomArtObjectsByCost(count:number, cost:number) : dto.ArtObject[] {
        let artobjects : dto.ArtObject[] = [];
        for (let i = 0; i < count; i++) {
            artobjects.push(this.getRandomArtObject(this.artObjectsByCost[cost]));
        }
        return artobjects;
    }

    private getRandomArtObject(artobjectsJson) {
        return new dto.ArtObject().fill(artobjectsJson[Math.floor(Math.random() * artobjectsJson.length)]);
    }

}
