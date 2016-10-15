
var miners_exchange = require("json!../data/shop/minersexchange.json");
var trading_post = require("json!../data/shop/tradingpost.json");
var weapons_and_armor = require("json!../data/shop/weaponsarmor.json");

import coins = require("../classes/Coins");
import items = require("../classes/Items");

export class ShopInventoryDB {
    private static instance:ShopInventoryDB = new ShopInventoryDB();

    constructor() {
        if (ShopInventoryDB.instance) {
            throw new Error("Instantiation failed!");
        }
        ShopInventoryDB.instance = this;
    }

    public static getInstance() : ShopInventoryDB {
        return ShopInventoryDB.instance;
    }

    public getShopInventory(shopType:string) : items.ShopItem[] {
        switch(shopType) {
        case "Weapons & Armor":
            return this.getShopItems(weapons_and_armor);
        case "Trading Post":
            return this.getShopItems(trading_post);
        case "Miner's Exchange":
            return this.getShopItems(miners_exchange);


        }
    }

    private getShopItems(shopJson) : items.ShopItem[] {
        let inventory : items.ShopItem[] = [];
        for (let i = 0; i < shopJson.length; i++) {
            let item : items.ShopItem = new items.ShopItem();
            //item.id = shopJson[i].id;
            item.name = shopJson[i].name;
            item.cost = coins.Coins.parse(shopJson[i].cost);
            item.amount = 0;
            inventory.push(item);
        }
        return inventory;
    }




}
