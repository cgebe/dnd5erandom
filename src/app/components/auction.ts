import { Component } from '@angular/core';

import { Bid, Bidder, Coins, AuctionItem} from  '../classes/DTO';
import { Random } from  '../classes/Random';
import { BidderFormComponent } from  './bidderform';

@Component({
  selector: 'auction',
  styleUrls: ['../css/main.css', '../css/auction.css'],
  templateUrl: '../templates/auction.html'
})
export class AuctionComponent {
    arr = new Array();
    bidders : Bidder[] = [];
    offers : AuctionItem[] = [];
    players : Bidder = new Bidder();

    cpChecked : boolean;
    spChecked : boolean;
    epChecked : boolean;
    gpChecked : boolean = true;
    ppChecked : boolean;

    constructor() {
        this.players.id = -1;
    }

    onAddBidder(newBidder : Bidder) {
        newBidder.id = this.bidders.length;
        this.bidders.push(newBidder);
        for (let i = 0; i < this.offers.length; i++) {
            newBidder.bids[i] = new Bid();
        }
    }

    onAddItem(newItem : AuctionItem) {
        newItem.highestBidder = this.players;
        this.offers.push(newItem);
        console.log(newItem.startPrice);
        this.players.bids.push(new Bid());
        for (let i = 0; i < this.bidders.length; i++) {
            this.bidders[i].bids.push(new Bid());
        }
    }


    knockGavel(index : number) {
        console.log("index " + index);
        // adjust start price if set
        if (this.offers[index].startPrice.compare(this.offers[index].currentPrice) > 0) {
            this.offers[index].currentPrice = this.offers[index].startPrice;
            console.log(this.offers[index].currentPrice);
        }

        if (!this.offers[index].hasMinimumRaise || this.offers[index].minimumRaise.isZero()) {
            if (this.ppChecked) {

            }
            this.offers[index].minimumRaise = this.offers[index].startPrice;
            console.log(this.offers[index].currentPrice);
        }



        let minimumBid : Coins = this.offers[index].currentPrice.plus(this.offers[index].minimumRaise);
        console.log("mb " + minimumBid);
        // player bidding
        if (this.offers[index].highestBidder == undefined || this.offers[index].highestBidder.id != this.players.id && this.players.bids[index].current.compare(minimumBid) > 0) {
            // player is now highest bidder
            this.offers[index].highestBidder = this.players;
            this.offers[index].currentPrice = this.players.bids[index].current;
            console.log("bb" +  this.offers[index].highestBidder.name);
        }

        // npc bidding
        let currentFails : number;
        let isUsingWholeBudget : boolean;
        let budget : Coins;
        let limit : Coins;
        for (let i = 0; i < this.bidders.length; i++) {
                currentFails = this.bidders[i].bids[index].fails;
                isUsingWholeBudget = this.bidders[i].bids[index].wholeBudget;
                if (isUsingWholeBudget) {
                    limit = this.bidders[i].budget;
                } else {
                    limit = this.bidders[i].bids[index].max;
                }
                if (this.offers[index].highestBidder == undefined || this.offers[index].highestBidder.id != this.bidders[i].id) {
                    if (currentFails < 3) {
                        if (limit.compare(minimumBid) > 0) {
                            if (this.isNPCBidding(limit, minimumBid)) {
                                console.log("cp " + i + " " + this.offers[index].currentPrice);
                                this.bidders[i].bids[index].current = this.getNPCBid(limit, this.offers[index].currentPrice, this.offers[index].minimumRaise);
                                console.log("c " + i + " " + this.bidders[i].bids[index].current);
                                //if (this.bidders[i].bids[index].current.compare(this.offers[index].currentPrice) <= 0) {
                                    //this.bidders[i].bids[index].fails++;
                                //}
                            } else {
                                this.bidders[i].bids[index].fails++;
                                console.log("fails2 " + this.bidders[i].bids[index].fails++);
                            }
                        }
                        // npc is still in the mood to bid and his budget/limit for this item is not reached yet
                    }
                }
        }

        for (let i = 0; i < this.bidders.length; i++) {
            if (this.bidders[i].bids[index].current.compare(this.offers[index].currentPrice) > 0) {
                this.offers[index].highestBidder = this.bidders[i];
                this.offers[index].currentPrice = this.bidders[i].bids[index].current;
            }
        }
    }

    private isNPCBidding(limit : Coins, minimumBid : Coins) : boolean {
        let d100 = Random.rolld100() / 100;
        let relation = minimumBid.inCopper() / limit.inCopper();
        return d100 / 100 > 1 - relation;
    }

    private getNPCBid(limit : Coins, currentPrize : Coins, minimumRaise : Coins) : Coins {
        let d6 = Random.rolld20();
        let difference = limit.inCopper() - currentPrize.inCopper();
        if (difference > d6 * minimumRaise.inCopper()) {
            return currentPrize.plus(minimumRaise.multiply(d6));
        } else {
            return currentPrize.plus(limit.minus(currentPrize));
        }
    }

}
