import { Component } from '@angular/core';

import { Bidstate, Bidder, Coins, AuctionItem} from  '../classes/DTO';
import { Random } from  '../classes/Random';
import { BidderFormComponent } from  './bidderform';

@Component({
  selector: 'auction',
  styleUrls: ['../css/main.css', '../css/auction.css'],
  templateUrl: '../templates/auction.html'
})
export class AuctionComponent {

    bidders : Bidder[] = [];
    offers : AuctionItem[] = [];
    players : Bidder = new Bidder();
    truncateDigits : number = 1;

    cpChecked : boolean;
    spChecked : boolean;
    epChecked : boolean;
    gpChecked : boolean = true;
    ppChecked : boolean;

    constructor() {
        this.players.id = -1;
        this.players.name = "Players"
    }

    onAddBidder(newBidder : Bidder) {
        newBidder.id = this.bidders.length;
        this.bidders.push(newBidder);
        for (let i = 0; i < this.offers.length; i++) {
            newBidder.bidstates[i] = new Bidstate();
        }
    }

    onAddItem(newItem : AuctionItem) {
        newItem.id = this.offers.length;
        this.offers.push(newItem);
        this.players.bidstates.push(new Bidstate());
        for (let i = 0; i < this.bidders.length; i++) {
            this.bidders[i].bidstates.push(new Bidstate());
        }
    }

    onChangeTruncate() {
        for (let i = 0; this.bidders.length; i++) {
            for (let j = 0; this.bidders[i].bidstates.length; j++) {
                if (this.bidders[i].bidstates[j].current != undefined) {
                    this.bidders[i].bidstates[j].current.truncate(this.truncateDigits);
                }
            }
        }
        for (let i = 0; this.offers.length; i++) {
            if (this.offers[i].currentPrice != undefined) {
                this.offers[i].currentPrice.truncate(this.truncateDigits);
            }
        }
    }


    knockGavel(index : number) {
        console.log("index " + index);
        // adjust start price if set
        if (this.offers[index].startPrice.compare(this.offers[index].currentPrice) > 0) {
            this.offers[index].currentPrice = this.offers[index].startPrice;
        }

        // player bid
        if (this.players.bidstates[index].current.inCopper() > this.offers[index].currentPrice.inCopper() + this.offers[index].minimumRaise.inCopper()) {
            console.log("f " + this.players.bidstates[index].current);
            console.log("cp1 " + this.offers[index].currentPrice);
            this.offers[index].currentPrice = this.players.bidstates[index].current;
            this.offers[index].highestBidder = this.players;
            console.log("cp2 " + this.offers[index].currentPrice);
        }

        let tempHighestPrice : Coins = this.offers[index].currentPrice;
        let tempHighestBidder : Bidder = this.offers[index].highestBidder;
        for (let i = 0; i < this.bidders.length; i++) {
            // check if highest already bidder
            if (this.offers[index].highestBidder == undefined || this.offers[index].highestBidder.id != this.bidders[i].id) {
                // check if bidder can bid (has enough money, probability that npc is in the mood to bid)
                if (this.canBid(this.bidders[i], this.offers[index])) {
                    let bid : Coins = this.makeBid(this.bidders[i], this.offers[index]);
                    console.log(bid);
                    if (bid.inCopper() > this.offers[index].currentPrice.inCopper()) {
                        // bids above current price
                        if (bid.inCopper() > tempHighestPrice.inCopper()) {
                            // new highest bidder
                            tempHighestPrice = bid;
                            tempHighestBidder = this.bidders[i];
                        }
                    }
                    this.bidders[i].bidstates[index].current = bid;
                } else {
                    this.bidders[i].bidstates[index].fails++;
                }
            }
        }

        // set new highest bidder
        this.offers[index].currentPrice = tempHighestPrice;
        this.offers[index].highestBidder = tempHighestBidder;


        // TODO: check if fails exceed fails count close auction

    }

    private canBid(bidder : Bidder, item : AuctionItem) {
        // already 3 fails
        if (bidder.bidstates[item.id].fails >= 3) {
            return false;
        }
        // budget too small
        if (bidder.budget.inCopper() <= item.currentPrice.inCopper()) {
            return false;
        }
        // limit too small if used
        if (!bidder.bidstates[item.id].useWholeBudget && bidder.bidstates[item.id].max.inCopper() <= item.currentPrice.inCopper()) {
            return false;
        }

        let d100 = Random.rolld100();
        // roll d100, if result higher than relation between budget and currentprize then bid.
        if (bidder.bidstates[item.id].useWholeBudget && (d100 / 100) <= (item.currentPrice.inCopper() / bidder.budget.inCopper())) {
            return false;
        }
        // roll d100, if result higher than relation between limit and currentprize then bid.
        if (!bidder.bidstates[item.id].useWholeBudget && (d100 / 100) <= (item.currentPrice.inCopper() / bidder.bidstates[item.id].max.inCopper())) {
            return false;
        }
        return true;
    }

    private makeBid(bidder : Bidder, item : AuctionItem) : Coins {
        let minFactor = 0.1;
        let maxFactor = 0.2;
        let minimumRaise : number;
        if (item.hasMinimumRaise) {
            minimumRaise = item.minimumRaise.inCopper();
        } else {
            minimumRaise = minFactor * item.currentPrice.inCopper();
        }

        let maximumRaise : number;
        if (bidder.bidstates[item.id].useWholeBudget) {
            maximumRaise = maxFactor * bidder.budget.inCopper();
        } else {
            maximumRaise = maxFactor * bidder.bidstates[item.id].max.inCopper();
        }

        console.log(minimumRaise);
        console.log(maximumRaise);
        console.log(item.currentPrice);
        console.log(bidder.bidstates[item.id].max);

        let d100 = Random.rolld100();
        let raise =  minimumRaise + ((maximumRaise - minimumRaise) * (d100 / 100));
        let coins = new Coins();
        coins.cp = raise;
        coins.normalize();

        if (this.ppChecked && coins.pp > 0) {
            coins.cp = 0;
            coins.sp = 0;
            coins.ep = 0;
            coins.gp = 0;
        }
        if (this.gpChecked && coins.gp > 0) {
            coins.cp = 0;
            coins.sp = 0;
            coins.ep = 0;
        }
        if (this.epChecked && coins.ep > 0) {
            coins.cp = 0;
            coins.sp = 0;
        }
        if (this.spChecked && coins.sp > 0) {
            coins.cp = 0;
        }
        console.log(coins);
        coins.truncate(this.truncateDigits);
        console.log(coins);

        if (bidder.bidstates[item.id].useWholeBudget && item.currentPrice.inCopper() + raise > bidder.budget.inCopper()) {
            return bidder.budget;
        }
        if (!bidder.bidstates[item.id].useWholeBudget && item.currentPrice.inCopper() + raise > bidder.bidstates[item.id].max.inCopper()) {
            return bidder.bidstates[item.id].max;
        }
        console.log(item.currentPrice);
        console.log(coins);
        return item.currentPrice.plus(coins);
    }

}
