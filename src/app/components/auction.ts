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
    truncateDigits : number = 1;
    maxFails : number = 3;

    cpChecked : boolean;
    spChecked : boolean;
    epChecked : boolean;
    gpChecked : boolean = true;
    ppChecked : boolean;

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
        for (let i = 0; i < this.bidders.length; i++) {
            this.bidders[i].bidstates.push(new Bidstate());
        }
    }

    onChangeTruncate() {
        for (let i = 0; i < this.bidders.length; i++) {
            for (let j = 0; j < this.bidders[i].bidstates.length; j++) {
                if (this.bidders[i].bidstates[j].current != undefined) {
                    this.bidders[i].bidstates[j].current.truncate(this.truncateDigits);
                }
            }
        }
        for (let i = 0; i < this.offers.length; i++) {
            if (this.offers[i].currentPrice != undefined) {
                this.offers[i].currentPrice.truncate(this.truncateDigits);
            }
        }
    }


    knockGavel(index : number) {
        // dont compute bids if gavel knocked already the third time
        if (this.offers[index].gavelKnocks < 3) {
            this.offers[index].gavelKnocks++;
            // adjust start price if set
            this.setStartPrice(this.offers[index]);

            let playerRaised = false;
            // player bidding
            playerRaised = this.playerBidding(this.bidders, index, this.offers[index]);

            // npc bidding
            if (!playerRaised)
                this.npcBidding(this.bidders, index, this.offers[index], this.maxFails);
        }
    }

    private setStartPrice(item : AuctionItem) {
        if (item.startPrice.compare(item.currentPrice) > 0) {
            item.currentPrice = item.startPrice;
        }
    }

    private playerBidding(bidders : Bidder[], index : number, item : AuctionItem) : boolean {
        let playerRaised = false;
        for (let i = 0; i < bidders.length; i++) {
            if (item.highestBidder == undefined || item.highestBidder.id != bidders[i].id) {
                if (bidders[i].type == "player") {
                    if (bidders[i].bidstates[index].current.inCopper() > item.currentPrice.inCopper() + item.minimumRaise.inCopper()) {
                        item.currentPrice = bidders[i].bidstates[index].current;
                        item.highestBidder = bidders[i];
                        item.gavelKnocks = 0;
                        playerRaised = true;
                    }
                }
            }
        }
        return playerRaised;
    }

    private npcBidding(bidders : Bidder[], index : number, item : AuctionItem, maxFails : number) {
        let tempHighestPrice : Coins = item.currentPrice;
        let tempHighestBidder : Bidder = item.highestBidder;
        for (let i = 0; i < bidders.length; i++) {
            // check if highest already bidder
            if (item.highestBidder == undefined || item.highestBidder.id != bidders[i].id) {
                if (bidders[i].type == "npc") {
                    // check if bidder can bid (has enough money, probability that npc is in the mood to bid)
                    if (this.canBid(bidders[i], item)) {
                        let bid : Coins = this.makeBid(bidders[i], item);
                        if (bid.inCopper() > item.currentPrice.inCopper()) {
                            // bids above current price
                            if (bid.inCopper() > tempHighestPrice.inCopper()) {
                                // new highest bidder
                                tempHighestPrice = bid;
                                tempHighestBidder = bidders[i];
                                item.gavelKnocks = 0;
                            }
                        }
                        bidders[i].bidstates[index].current = bid;
                    } else {
                        bidders[i].bidstates[index].fails++;
                        if (bidders[i].bidstates[index].fails >= maxFails) {
                            bidders[i].bidstates[index].inRace = false;
                        }
                    }
                }
            }
        }
        // set new highest bidder
        item.currentPrice = tempHighestPrice;
        item.highestBidder = tempHighestBidder;
    }

    private canBid(bidder : Bidder, item : AuctionItem) {
        // already maxFails?
        if (bidder.bidstates[item.id].fails >= this.maxFails) {
            return false;
        }
        console.log(item.minimumRaise.inCopper());
        console.log(item.currentPrice.inCopper() + item.minimumRaise.inCopper());
        console.log(bidder.budget.inCopper());

        // budget too small
        if (!item.hasMinimumRaise && bidder.budget.inCopper() <= item.currentPrice.inCopper()) {
            return false;
        }
        if (item.hasMinimumRaise && bidder.budget.inCopper() <= item.currentPrice.inCopper() + item.minimumRaise.inCopper()) {
            return false;
        }

        // limit too small if used
        if (!item.hasMinimumRaise && !bidder.bidstates[item.id].useWholeBudget && bidder.bidstates[item.id].max.inCopper() <= item.currentPrice.inCopper()) {
            return false;
        }
        if (item.hasMinimumRaise && !bidder.bidstates[item.id].useWholeBudget && bidder.bidstates[item.id].max.inCopper() <= item.currentPrice.inCopper() + item.minimumRaise.inCopper()) {
            return false;
        }
        // TODO: if truncated, values are changed/rounded
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

        let d100 : number = Random.rolld100();
        let coins : Coins = new Coins();
        let raise : number;
        if (minimumRaise > maximumRaise) {
            raise = minimumRaise;
        } else {
            raise = minimumRaise + ((maximumRaise - minimumRaise) * (d100 / 100));
        }

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

        coins.truncate(this.truncateDigits);

        if (bidder.bidstates[item.id].useWholeBudget && item.currentPrice.inCopper() + raise > bidder.budget.inCopper()) {
            return bidder.budget;
        }
        if (!bidder.bidstates[item.id].useWholeBudget && item.currentPrice.inCopper() + raise > bidder.bidstates[item.id].max.inCopper()) {
            return bidder.bidstates[item.id].max;
        }

        return item.currentPrice.plus(coins);
    }

}
