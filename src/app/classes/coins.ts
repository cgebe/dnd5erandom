

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

    inGold() {
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

    toString() {
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
        if (inWords.length > 0) {
            inWords += ".";
        }
        return inWords;
    }
}
