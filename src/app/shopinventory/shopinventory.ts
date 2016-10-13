import {Component} from '@angular/core';

import database = require("../classes/ShopInventoryDB");
import dispatcher = require("../classes/CEventDispatcher");
import items = require("../classes/Items");

@Component({
  selector: 'shopinventory',
  styleUrls: ['../css/main.css', './shopinventory.css'],
  templateUrl: './shopinventory.html'
})
export class ShopInventory {

    slots = 0;

    shopkeeperTypes = 'Weapons & Armor_Trading Post_Alchemist\'s Workshop_Magic Academy_Temple_Tackle Shop_Miner\'s Exchange_Blackmarket'.split('_');
    selectedShopkeeperType = 'Weapons & Armor';

    inventory : items.ShopItem[] = [];
    supplies : items.ShopItem[] = [];

    onChangeSlots(newValue) {
        console.log(newValue);
        this.slots = newValue;
        // ... do other stuff here ...
    }

    onChangeShopkeeperType(newValue:string) {
        console.log(newValue);
        this.selectedShopkeeperType = newValue;
        // ... do other stuff here ...
    }

    public fillShop() {
        this.inventory = database.ShopInventoryDB.getInstance().getShopInventory(this.selectedShopkeeperType);
        this.inventory = this.pickItems(this.inventory, this.slots);
    }


    private pickItems(inventory:items.ShopItem[], defaultSlots):items.ShopItem[] {
        return inventory;
    }

    pickItem(items:items.Item[]):items.Item {
        return items[Math.floor(Math.random() * items.length)];
    }

    public startRestock(hours:number, minutes:number) {

    }

    public incrementItemAmount(item:items.ShopItem) {
        item.amount++;
    }

    public decrementItemAmount(item:items.ShopItem) {
        if (item.amount > 0) {
            item.amount--;
        }
        if (item.amount == 0) {
            let index : number = this.inventory.indexOf(item);
            if (index > -1) {
                this.inventory.splice(index, 1);
            }
            this.supplies.push(item);
        }
    }

    public removeItem(item:items.ShopItem) {
        console.log("clicked2");
    }

    public addItem(item:items.ShopItem) {

    }

    newGoods() {

    }
}
