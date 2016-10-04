import {Component} from '@angular/core';

import item = require("../classes/item")

@Component({
  selector: 'shopkeeper',
  styleUrls: ['./shopkeeper.css'],
  templateUrl: './shopkeeper.html'
})
export class Shopkeeper {

    citySizes = 'Hamlet_Village_Small Town_Large Town_Small City_Large City'.split('_');
    selectedCitySize = 'small';

    shopkeeperTypes = 'Armorer_Merchant_Alchemist_Scribe_Fisher_Miner'.split('_');
    selectedShopkeeperType = 'weapon';

    onChangeCitySize(newValue) {
        console.log(newValue);
        this.selectedCitySize = newValue;
        // ... do other stuff here ...
    }

    onChangeShopkeeperType(newValue:string) {
        console.log(newValue);
        this.selectedShopkeeperType = newValue;
        // ... do other stuff here ...
    }

    pick() {
        switch(this.selectedShopkeeperType) {
        case "weapon":
            this.pickWeapons(this.selectedCitySize);
            break;
        }
    }

    private pickWeapons(citySize:string) {

    }

    pickItem(item:item.Item[]){

    }


}
