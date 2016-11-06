import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bidder }    from '../classes/DTO';

@Component({
    selector: 'bidder-form',
    styleUrls: ['../css/bidderform.css'],
    templateUrl: '../templates/bidderform.html'
})
export class BidderFormComponent {
    model = new Bidder();
    @Input() cpChecked : boolean;
    @Input() spChecked : boolean;
    @Input() epChecked : boolean;
    @Input() gpChecked : boolean;
    @Input() ppChecked : boolean;
    @Output() onAddBidder = new EventEmitter<Bidder>();

    addBidder() {
        this.onAddBidder.emit(this.model);
        this.model = new Bidder();
    }

}
