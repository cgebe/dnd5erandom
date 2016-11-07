export class NPC {
    public name : string;
    public character : string;
    public ideal : string;
    public bond : string;
    public flaw : string;

    public sex : string;

}

export class Item {
    public id : number;
    public name : string;
}


export class ArtObject extends Item {
    public cost : string;

    public toString() : string {
        return this.name + " (" + this.cost + ")";
    }

    public fill(json) : ArtObject {
        this.id = json.id;
        this.name = json.name;
        this.cost = json.cost;
        return this;
    }

}

export class Gem extends Item {
    public color : string;
    public cost : string;

    public toString() : string {
        return this.name + " (" + this.color + ", " + this.cost + ")";
    }

    public fill(json) : Gem {
        this.id = json.id;
        this.name = json.name.charAt(0).toUpperCase() + json.name.slice(1).toLowerCase();
        this.color = json.colors[Math.floor(Math.random() * json.colors.length)]; // random color, only used for loot anyways
        this.cost = json.cost;
        return this;
    }
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
    public cost : Coins;
    //public restock : clock.Clock;
}

export class Coins {
    public gp : number = 0;
    public sp : number = 0;
    public cp : number = 0;
    public ep : number = 0;
    public pp : number = 0;

    normalize() {
        // normalize cp to sp
        this.sp += Math.floor(this.cp / 10);
        this.cp = this.cp % 10;

        // normalize ep to sp
        this.sp += this.ep * 5;
        this.ep = 0;

        // normalize cp to sp
        this.gp += Math.floor(this.sp / 10);
        this.sp = this.sp % 10;

        // normalize pp to gp
        this.gp += this.pp * 10;
        this.pp = 0;
    }

    truncate(places : number) {
        this.cp = this.truncateCurrency(this.cp, places);
        this.sp = this.truncateCurrency(this.sp, places);
        this.ep = this.truncateCurrency(this.ep, places);
        this.gp = this.truncateCurrency(this.gp, places);
        this.pp = this.truncateCurrency(this.pp, places);
    }

    private truncateCurrency(amount : number, places : number) {
        if (amount.toString().length > places) {
            let result : string = amount.toString().substring(0, amount.toString().length - places);
            for (let i = 0; i < places; i++) {
                result += '0';
            }
            return parseInt(result);
        } else {
            let result : string = amount.toString().substring(0, 1);
            for (let i = 0; i < amount.toString().length - 1; i++) {
                result += '0';
            }
            return parseInt(result);
        }
    }

    isZero() : boolean {
        return this.cp <= 0 && this.sp <= 0 && this.ep <= 0 && this.gp <= 0 && this.pp <= 0;
    }

    inCopper() : number {
        return this.cp + this.sp * 10 + this.ep * 50 + this.gp * 100 + this.pp * 1000;
    }

    inGold() : number {
        let sps : number;
        let gps : number;

        sps = this.sp;
        sps += Math.floor(this.cp / 10);
        if (this.cp % 10 > 0) {
            sps += 1;
        }
        gps = this.gp;
        gps += Math.floor(sps / 10);
        if (gps % 10 > 0) {
            this.gp += 1;
        }
        gps += this.pp * 10;
        return gps;
    }

    plus(other : Coins) : Coins {
        let sum : Coins = new Coins();
        sum.cp = this.cp + other.cp;
        sum.sp = this.sp + other.sp;
        sum.ep = this.ep + other.ep;
        sum.gp = this.gp + other.gp;
        sum.pp = this.pp + other.pp;
        return sum;
    }

    minus(other : Coins) : Coins {
        let difference : Coins = new Coins();
        difference.cp = this.cp - other.cp;
        difference.sp = this.sp - other.sp;
        difference.ep = this.ep - other.ep;
        difference.gp = this.gp - other.gp;
        difference.pp = this.pp - other.pp;
        return difference;
    }

    multiply(factor : number) : Coins {
        let product : Coins = new Coins();
        product.cp = this.cp * factor;
        product.sp = this.sp * factor;
        product.ep = this.ep * factor;
        product.gp = this.gp * factor;
        product.pp = this.pp * factor;
        return product;
    }

    compare(other : Coins) : number {
        return this.inCopper() - other.inCopper();
    }

    toString() : string {
        let inWords : string = "";
        if (this.pp > 0) {
            inWords += " " + this.pp + " pp,";
        }
        if (this.gp > 0) {
            inWords += " " + this.gp + " gp,";
        }
        if (this.ep > 0) {
            inWords += " " + this.ep + " ep,";
        }
        if (this.sp > 0) {
            inWords += " " + this.sp + " sp,";
        }
        if (this.cp > 0) {
            inWords += " " + this.cp + " cp,";
        }
        inWords = inWords.substring(1, inWords.length - 1);
        if (inWords.length <= 0) {
            return "0";
        }
        /*
        if (inWords.length > 0) {
            inWords += ".";
        }
        */
        return inWords;
    }


    public static parse(coins:string) : Coins {
        let parts : string[] = coins.split(",");
        let parsed : Coins = new Coins();
        for (let i = 0; i < parts.length; i++) {
            let part : string[] = parts[i].split(" ");
            if (part.length != 2) {
                return null; //new Coins();
            } else {
                let value = parseInt(part[0]);
                if (part[1].toLowerCase() == "cp") {
                    parsed.cp = value;
                }
                if (part[1].toLowerCase() == "sp") {
                    parsed.sp = value;
                }
                if (part[1].toLowerCase() == "ep") {
                    parsed.ep = value;
                }
                if (part[1].toLowerCase() == "gp") {
                    parsed.gp = value;
                }
                if (part[1].toLowerCase() == "pp") {
                    parsed.pp = value;
                }
            }
        }
        return parsed;
    }
}



export class Rolls {
    public rolls : Roll[];

    public rolled(roll:Roll) {
        this.rolls.push(roll);
    }

    public getLatestRoll() : Roll {
        return this.rolls[this.rolls.length];
    }
}

export class Roll {
    public description : string;
    public result : number;
}


export class Spell {
    public name : string;
    public id : number;
    public level : number;
    public source : string;
    public castingTime : string;
    public range: string;
    public components : string;
    public duration : string;
    public description : string;
    public school : string;

    public fill(json) : Spell {
        this.name = json.name;
        this.id = json.id;
        this.level = json.level;
        this.source = json.source;
        this.castingTime = json.casting_time;
        this.range = json.range;
        this.components = json.components;
        this.duration = json.duration;
        this.description = json.description;
        this.school = json.school;
        return this;
    }
}


export class AuctionItem extends Item {
    public currentPrice : Coins;
    public hasStartPrize : boolean;
    public startPrice : Coins;
    public hasMinimumRaise : boolean;
    public minimumRaise : Coins;
    public highestBidder : Bidder;

    constructor() {
        super();
        this.currentPrice = new Coins();
        this.hasStartPrize = false;
        this.startPrice = new Coins();
        this.hasMinimumRaise = false;
        this.minimumRaise = new Coins();
    }
}

export class Bidstate {
    public max : Coins;
    public fails : number;
    public current : Coins;
    public useWholeBudget : boolean;

    constructor() {
        this.max = new Coins();
        this.current = new Coins();
        this.fails = 0;
        this.useWholeBudget = true;
    }
}

export class Bidder {
    public id : number;
    public name : string;
    public budget : Coins;
    public bidstates : Bidstate[];

    constructor() {
        this.budget = new Coins();
        this.bidstates = [];
    }
}
