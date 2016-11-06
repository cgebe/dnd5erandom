import { Component, EventEmitter, Output } from '@angular/core';
import { AuctionItem } from '../classes/DTO';

@Component({
    selector: 'offer-form',
    templateUrl: '../templates/offerform.html'
})
export class OfferFormComponent {
    model = new AuctionItem();

    @Output() onAddItem = new EventEmitter<AuctionItem>();

    addItem() {
        this.onAddItem.emit(this.model);
        this.model = new AuctionItem();
    }

}
