import {Component} from '@angular/core';

import { Bidder, Item} from  '../classes/DTO';
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

    onAddBidder(newBidder : Bidder) {
        this.bidders.push(newBidder);
    }

    onAddItem(newItem : Item) {
        this.offers.push(newItem);
    }

}
