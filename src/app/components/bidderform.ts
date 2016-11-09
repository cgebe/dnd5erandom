import { Component, EventEmitter, Output } from '@angular/core';
import { Bidder }    from '../classes/DTO';

@Component({
    selector: 'bidder-form',
    styleUrls: ['../css/bidderform.css'],
    templateUrl: '../templates/bidderform.html'
})
export class BidderFormComponent {
    model : Bidder = new Bidder("player"); // default to player
    @Output() onAddBidder = new EventEmitter<Bidder>();

    addBidder() {
        this.onAddBidder.emit(this.model);
        this.model = new Bidder(this.model.type);
    }

}
