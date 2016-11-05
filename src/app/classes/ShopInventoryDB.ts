
var alchemists_workshop = require("json!../data/shop/alchemistsworkshop.json");

var miners_exchange = require("json!../data/shop/minersexchange.json");
var trading_post = require("json!../data/shop/tradingpost.json");
var weapons_and_armor = require("json!../data/shop/weaponsarmor.json");

import { Coins, ShopItem } from '../classes/DTO';

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

    public getShopInventory(shopType:string) : ShopItem[] {
        switch(shopType) {
        case "Alchemist's Workshop":
            return this.getShopItems(alchemists_workshop);
        case "Blackmarket":
            return this.getShopItems(miners_exchange);
        case "Magic Academy":
            return this.getShopItems(miners_exchange);
        case "Miner's Exchange":
            return this.getShopItems(miners_exchange);
        case "Tackle Shop":
            return this.getShopItems(trading_post);
        case "Temple":
            return this.getShopItems(weapons_and_armor);
        case "Trading Post":
            return this.getShopItems(trading_post);
        case "Weapons & Armor":
            return this.getShopItems(weapons_and_armor);
        default:
            return [];
        }
    }

    private getShopItems(shopJson) : ShopItem[] {
        let inventory : ShopItem[] = [];
        for (let i = 0; i < shopJson.length; i++) {
            let item : ShopItem = new ShopItem();
            //item.id = shopJson[i].id;
            item.name = shopJson[i].name;
            item.cost = Coins.parse(shopJson[i].cost);
            item.amount = 0;
            inventory.push(item);
        }
        return inventory;
    }




}
