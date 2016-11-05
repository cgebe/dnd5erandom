import { Component, EventEmitter, Output } from '@angular/core';
import { Item }    from '../classes/DTO';

@Component({
    selector: 'offer-form',
    templateUrl: '../templates/offerform.html'
})
export class OfferFormComponent {
    model = new Item();

    @Output() onAddItem = new EventEmitter<Item>();

    addItem() {
        this.onAddItem.emit(this.model);
        this.model = new Item();
    }

}
