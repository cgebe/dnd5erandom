import coins = require("./Coins");
import clock = require("./Clock");

export class Item {
    public id : string;
    public name : string;
    public cost : coins.Coins;
}


export class MagicItem {
    public name : string;
    public rarity : string;
    public creator : string;
    public creatorDescription : string;
    public history : string;
    public historyDescription : string;
    public property : string;
    public propertyDescription : string;
    public quirk : string;
    public quirkDescription : string;
}


export class ShopItem extends Item {
    public amount : number;
    public restock : clock.Clock;
}
