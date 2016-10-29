

export class Random {
    static a = ['', '', '', '', 'A', 'Be', 'De', 'El', 'Fa', 'Jo', 'Ki', 'La', 'Ma', 'Na', 'O', 'Pa', 'Re', 'Si', 'Ta', 'Va'];
    static b = ['bar', 'ched', 'dell', 'far', 'gran', 'hal', 'jen', 'kel', 'lim', 'mor', 'net', 'penn', 'quil', 'rond', 'sark', 'shen', 'tur', 'vash', 'yor', 'zen', 'pip', 'cap'];
    static c = ['', 'a', 'ac', 'ai', 'al', 'am', 'an', 'ar', 'ea', 'el', 'er', 'ess', 'ett', 'ic', 'id', 'il', 'in', 'is', 'or', 'us'];
    static characters = ['Absentminded', 'Arrogant', 'Boorish', 'Calm', 'Chews something', 'Clumsy', 'Curious', 'Dim-witted', 'Fiddles and fidges nervously', 'Frequently uses the wrong word', 'Friendly', 'Furious', 'Haphazard', 'Hillbilly', 'Hysterical', 'Impulsive', 'Irritable',
                        'Prone to predictions of certain doom', 'Pronounced scar', 'Slurs words', 'Speaks loudly', 'Whispers', 'Stutters', 'Squiffy', 'Squints', 'Stares into distance', 'Stubborn', 'Suspicious', 'Uses colorful oaths and exclamations', 'Uses flowery speech', 'Unstable', 'Uses long words'];
    static bonds = ['Personal goal or achievement', 'Family members', 'Colleagues or compatriots', 'Benefactor, patron or employer', 'Romantic interest', 'Special place', 'Keepsake', 'Valuable possession', 'Revenge'];
    static ideals = ['Aspiration (any)', 'Charity (good)', 'Community (lawful)', 'Creativity (chaotic)', 'Discovery (any)', 'Fairness (lawful)', 'Freedom (chaotic)', 'Glory (any)', 'Greater good (good)', 'Greed (evil)', 'Honor (lawful)', 'Independence (chaotic)', 'Knowledge (neutral)', 'Life (good)', 'Live and let live (neutral)', 'Might (evil)', 'Nation (any)', 'People (neutral)', 'Power (evil)', 'Redemption (any)'];
    static flaws = ['Forbidden love or romantic susceptibility', 'Decadence', 'Arrogance', 'Envy of another person\'s possessions or station', 'Overpowering greed', 'Prone to rage', 'Powerful enemy', 'Specific phobia', 'Shameful or scandalous history', 'Secret crime or misdeed', 'Possession for forbidden lore', 'Foolhardy bravery'];

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


    public static randomName() : string {
        let name : string = (Random.a[Math.floor(Math.random() * Random.a.length)] + Random.b[Math.floor(Math.random() * Random.b.length)] + Random.c[Math.floor(Math.random() * Random.c.length)]);
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    public static randomCharacter() : string {
        return Random.characters[Math.floor(Math.random() * Random.characters.length)];
    }

    public static randomBond() : string {
        return Random.bonds[Math.floor(Math.random() * Random.bonds.length)];
    }

    public static randomIdeal() : string {
        return Random.ideals[Math.floor(Math.random() * Random.ideals.length)];
    }

    public static randomFlaw() : string {
        return Random.flaws[Math.floor(Math.random() * Random.flaws.length)];
    }
}
