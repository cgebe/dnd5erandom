
/*
var items = require("json!../data/items.json");
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

var gems = require("json!../data/gems.json");

import gem = require("./gem");

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

    public initShopItems() {

    }

    public getShopItems(shopkeeperType:string) {

    }

    public getGems() : gem.Gem[] {
        return null;
    }

}
