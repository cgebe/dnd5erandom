
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
