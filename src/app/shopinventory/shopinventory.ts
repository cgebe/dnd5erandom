import {Component} from '@angular/core';

import item = require("../classes/item")

@Component({
  selector: 'shopinventory',
  styleUrls: ['./shopinventory.css'],
  templateUrl: './shopinventory.html'
})
export class ShopInventory {

    citySizes = 'Hamlet_Village_Small Town_Large Town_Small City_Large City'.split('_');
    selectedCitySize = 'small';

    shopkeeperTypes = 'Armorer_Merchant_Alchemist_Scribe_Fisher_Miner'.split('_');
    selectedShopkeeperType = 'weapon';

    inventory : item.Item[];

    onChangeCitySize(newValue) {
        console.log(newValue);
        this.selectedCitySize = newValue;
        let i : item.Item;
        i.name = "test";
        i.id = "0";
        this.inventory.push(i);
        // ... do other stuff here ...
    }

    onChangeShopkeeperType(newValue:string) {
        console.log(newValue);
        this.selectedShopkeeperType = newValue;
        // ... do other stuff here ...
    }



    pick() {
        let slots : number;
        switch(this.selectedCitySize) {
        case "Hamlet":
            slots = 3;
            break;
        case "Village":
            slots = 5;
            break;
        case "Small Town":
            slots = 7;
            break;
        case "Large Town":
            slots = 9;
            break;
        case "Small City":
            slots = 12;
            break;
        case "Large City":
            slots = 15;
            break;
        default:
            slots = 0;
        }

        switch(this.selectedShopkeeperType) {
        case "Armorer":
            this.pickArmorsAndWeapons(this.selectedCitySize);
            break;
        }
    }

    private pickArmorsAndWeapons(citySize:string) {

    }

    pickItem(items:item.Item[]){
        return items[Math.floor(Math.random() * items.length)];
    }

    generateShopInventory() {

    }

    newGoods() {

    }
}
