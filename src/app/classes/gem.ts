import coins = require("./coins");

export class Gem {
    public name : string;
    public cost : coins.Coins = new coins.Coins();
}
