
export class Gem {
    public name : string;
    public color : string;
    public cost : string;

    public toString() : string {
        return this.name + " (" + this.color + ", " + this.cost + ")";
    }

}
