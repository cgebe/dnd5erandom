import {Component} from '@angular/core';

@Component({
  selector: 'merchant',
  styleUrls: ['./merchant.css'],
  templateUrl: './merchant.html'
})
export class Merchant {
    citySizes = 'tiny small medium large big'.split(' ');
    selectedCitySize = 'small';

    merchantTypes = 'weapon armor trader alchemist scribe wandwright'.split(' ');
    selectedMerchantType = 'weapon';

    onChangeCitySize(newValue) {
        console.log(newValue);
        this.selectedCitySize = newValue;
        // ... do other stuff here ...
    }

    onChangeMerchantType(newValue) {
        console.log(newValue);
        this.selectedMerchantType = newValue;
        // ... do other stuff here ...
    }
}
