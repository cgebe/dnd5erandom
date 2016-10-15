import {Component} from '@angular/core';

import database = require("../classes/ShopInventoryDB");
import dispatcher = require("../classes/CEventDispatcher");
import items = require("../classes/Items");
import random = require("../classes/Random");

@Component({
  selector: 'shopinventory',
  styleUrls: ['../css/main.css', './shopinventory.css'],
  templateUrl: './shopinventory.html'
})
export class ShopInventory {

    slots = 4 + random.Random.rolld4();

    shopkeeperTypes = 'Alchemist\'s Workshop_Blackmarket_Magic Academy_Miner\'s Exchange_Tackle Shop_Temple_Trading Post_Weapons & Armor'.split('_');
    selectedShopkeeperType = "Alchemist's Workshop";

    inventory : items.ShopItem[] = [];
    supplies : items.ShopItem[] = database.ShopInventoryDB.getInstance().getShopInventory(this.selectedShopkeeperType);

    onChangeSlots(newValue) {
        console.log(newValue);
        this.slots = newValue;
        // ... do other stuff here ...
    }

    onChangeShopkeeperType(newValue:string) {
        console.log(newValue);
        this.selectedShopkeeperType = newValue;
        this.supplies = database.ShopInventoryDB.getInstance().getShopInventory(this.selectedShopkeeperType);
    }

    public fillShop() {
        this.inventory = [];
        this.supplies = [];
        let allShopItems = database.ShopInventoryDB.getInstance().getShopInventory(this.selectedShopkeeperType);
        this.pickItems(allShopItems, this.slots, this.inventory, this.supplies);
    }

    newGoods() {
        if (this.supplies.length >= 5) {
            for (let i = 0; i < 5; i++) {
                let index = Math.floor(Math.random() * this.supplies.length);
                let randomItem = this.supplies[index];
                let amount = random.Random.rolld4();

                if (index > -1) {
                   this.supplies.splice(index, 1);
                }
                randomItem.amount = amount;
                this.inventory.push(randomItem);
            }
        } else {
            for (let i = 0; i < this.supplies.length; i++) {
                let index = Math.floor(Math.random() * this.supplies.length);
                let randomItem = this.supplies[index];
                let amount = random.Random.rolld4();

                if (index > -1) {
                   this.supplies.splice(index, 1);
                }
                randomItem.amount = amount;
                this.inventory.push(randomItem);
            }
        }
    this.sortInventory();
    this.sortSupply();
    }

    private pickItems(shopItems:items.ShopItem[], slots, inventory:items.ShopItem[], supplies:items.ShopItem[]) {
        let availableItems : items.ShopItem[] = [];
        for (let i = 0; i < slots; i++) {
            let index = Math.floor(Math.random() * shopItems.length);
            let randomItem = shopItems[index];
            let higher = random.Random.rolld4();
            let amount = 0;
            if (higher == 4) {
                amount = random.Random.rolld4();
            } else {
                amount = 1;
            }

            if (index > -1) {
               shopItems.splice(index, 1);
            }
            randomItem.amount = amount;
            this.inventory.push(randomItem);
        }
        this.supplies = shopItems;
        this.sortInventory();
        this.sortSupply();
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
        var index = this.inventory.indexOf(item);
        if (index > -1) {
           this.inventory.splice(index, 1);
        }
        item.amount = 0;
        this.supplies.push(item);
    }

    public addItem(item:items.ShopItem) {
        var index = this.supplies.indexOf(item);
        if (index > -1) {
           this.supplies.splice(index, 1);
        }
        item.amount = 1;
        this.inventory.push(item);
    }

    private sortInventory() {
        this.inventory.sort((n1,n2) => {
            if (n1.name > n2.name) {
                return 1;
            }

            if (n1.name < n2.name) {
                return -1;
            }

            return 0;
        });
    }

    private sortSupply() {
        this.supplies.sort((n1,n2) => {
            if (n1.name > n2.name) {
                return 1;
            }

            if (n1.name < n2.name) {
                return -1;
            }

            return 0;
        });
    }


}
