import {Component} from '@angular/core';

import item = require("../classes/item")

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

    onChangeMerchantType(newValue:string) {
        console.log(newValue);
        this.selectedMerchantType = newValue;
        // ... do other stuff here ...
    }

    pick() {
        switch(this.selectedCitySize) {

        }

        switch(this.selectedMerchantType) {
        case "weapon":

            break;
        }
    }

    pickItem(item:item.Item[]){

    }


}
