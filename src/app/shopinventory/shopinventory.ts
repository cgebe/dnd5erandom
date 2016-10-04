import {Component} from '@angular/core';

import database = require("../classes/database");
import item = require("../classes/item");

@Component({
  selector: 'shopinventory',
  styleUrls: ['./shopinventory.css'],
  templateUrl: './shopinventory.html'
})
export class ShopInventory {

    citySizes = 'Hamlet_Village_Small Town_Large Town_Small City_Large City'.split('_');
    selectedCitySize = 'small';

    shopkeeperTypes = 'Armorer_Merchant_Alchemist_Scholar_Fisher_Miner'.split('_');
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
        let items : item.Item[];
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

        items = this.getShopItems(this.selectedShopkeeperType);
        items = this.pickItems(items, slots);
    }

    private getShopItems(shopkeeperType:string):item.Item[] {
        return null;
        /*
        switch(shopkeeperType) {
        case "Armorer":
            return database.Database.getShopItems("armorer");
        case "Merchant":
            return database.Database.getShopItems("merchant");
        case "Alchemist":
            return database.Database.getShopItems("alchemist");
        case "Scholar":
            return database.Database.getShopItems("scholar");
        case "Fisher":
            return database.Database.getShopItems("fisher");
        case "Miner":
            return database.Database.getShopItems("miner");
        }
        */
    }

    private pickItems(items:item.Item[], slots):item.Item[] {
        return null;
    }

    pickItem(items:item.Item[]):item.Item {
        return items[Math.floor(Math.random() * items.length)];
    }

    generateShopInventory() {

    }

    newGoods() {

    }
}
