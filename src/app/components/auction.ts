import {Component} from '@angular/core';

import { Bid, Bidder, Item} from  '../classes/DTO';
import { Random } from  '../classes/Random';
import { BidderFormComponent } from  './bidderform';

@Component({
  selector: 'auction',
  styleUrls: ['../css/main.css', '../css/auction.css'],
  templateUrl: '../templates/auction.html'
})
export class AuctionComponent {

    bidders : Bidder[] = [];
    offers : Item[] = [];

    cpChecked : boolean;
    spChecked : boolean;
    epChecked : boolean;
    gpChecked : boolean;
    ppChecked : boolean;

    onAddBidder(newBidder : Bidder) {
        this.bidders.push(newBidder);
        for (let i = 0; i < this.offers.length; i++) {
            newBidder.bids[i] = new Bid();
        }
    }

    onAddItem(newItem : Item) {
        this.offers.push(newItem);
        for (let i = 0; i < this.bidders.length; i++) {
            this.bidders[i].bids.push(new Bid());
        }
    }

}
