import {Component} from '@angular/core';

import database = require("../classes/ShopInventoryDB");
import dispatcher = require("../classes/CEventDispatcher");
import dto = require("../classes/DTO");
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

    inventory : dto.ShopItem[] = [];
    supplies : dto.ShopItem[] = database.ShopInventoryDB.getInstance().getShopInventory(this.selectedShopkeeperType);

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

    public generateShopInventory() {
        this.inventory = [];
        this.supplies = [];
        let allShopItems = database.ShopInventoryDB.getInstance().getShopInventory(this.selectedShopkeeperType);
        this.pickItems(allShopItems, this.slots);
    }

    public newGoods() {
        if (this.supplies.length >= this.slots) {
            for (let i = 0; i < this.slots; i++) {
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
        this.sortSupply();
    }

    private pickItems(shopItems:dto.ShopItem[], slots) {
        let availableItems : dto.ShopItem[] = [];
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

    pickItem(items:dto.Item[]):dto.Item {
        return items[Math.floor(Math.random() * items.length)];
    }

    public startRestock(hours:number, minutes:number) {

    }

    public incrementItemAmount(item:dto.ShopItem) {
        item.amount++;
    }

    public decrementItemAmount(item:dto.ShopItem) {
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

    public removeItem(item:dto.ShopItem) {
        var index = this.inventory.indexOf(item);
        if (index > -1) {
           this.inventory.splice(index, 1);
        }
        item.amount = 0;
        this.supplies.push(item);
    }

    public addItem(item:dto.ShopItem) {
        var index = this.supplies.indexOf(item);
        if (index > -1) {
           this.supplies.splice(index, 1);
        }
        item.amount = 1;
        this.inventory.push(item);
    }

    public exchangeItem(item:dto.ShopItem) {
        // remove old item
        var index1 = this.inventory.indexOf(item);
        if (index1 > -1) {
           this.inventory.splice(index1, 1);
        }
        item.amount = 0;

        // choose random new item
        let index2 = Math.floor(Math.random() * this.supplies.length);
        let randomItem = this.supplies[index2];

        this.supplies.splice(index2, 1); // remove from supply
        let higher = random.Random.rolld4();
        let amount = 0;
        if (higher == 4) {
            amount = random.Random.rolld4();
        } else {
            amount = 1;
        }
        randomItem.amount = amount;
        this.inventory.splice(index1, 0, randomItem); // insert
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
