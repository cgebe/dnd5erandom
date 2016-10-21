

export class Random {

    public static rolld100():number {
        return Random.roll(100);
    }

    public static rolld20():number {
        return Random.roll(20);
    }

    public static rolld12():number {
        return Random.roll(12);
    }

    public static rolld10():number {
        return Random.roll(10);
    }

    public static rolld8():number {
        return Random.roll(8);
    }

    public static rolld6():number {
        return Random.roll(6);
    }

    public static rolld4():number {
        return Random.roll(4);
    }

    public static rollXdY(count:number, pips:number):number {
        let result : number = 0;
        for (let i = 0; i < count; i++) {
            result += Random.roll(pips);
        }
        return result;
    }

    public static roll(pips:number):number {
        return Math.ceil(Math.random() * pips);
    }
}
