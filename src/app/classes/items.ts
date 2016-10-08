import coins = require("./coins")

export class Item {
    public id : string;
    public name : string;
    public coins : coins.Coins;
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
