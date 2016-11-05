import {Component} from '@angular/core';

import { ShopInventoryDB } from  '../classes/ShopInventoryDB';
import { Item, ShopItem } from  '../classes/DTO';
import { Random } from  '../classes/Random';

@Component({
  selector: 'shopinventory',
  styleUrls: ['../css/main.css', '../css/shopinventory.css'],
  templateUrl: '../templates/shopinventory.html'
})
export class ShopInventoryComponent {

    slots = 10;

    shopkeeperTypes = 'Alchemist\'s Workshop_Blackmarket_Magic Academy_Miner\'s Exchange_Tackle Shop_Temple_Trading Post_Weapons & Armor'.split('_');
    selectedShopkeeperType = "Alchemist's Workshop";

    inventory : ShopItem[] = [];
    supplies : ShopItem[] = ShopInventoryDB.getInstance().getShopInventory(this.selectedShopkeeperType);

    onChangeSlots(newValue) {
        console.log(newValue);
        this.slots = newValue;
        // ... do other stuff here ...
    }

    onChangeShopkeeperType(newValue:string) {
        console.log(newValue);
        this.selectedShopkeeperType = newValue;
        this.inventory = [];
        this.supplies = ShopInventoryDB.getInstance().getShopInventory(this.selectedShopkeeperType);
    }

    public generateShopInventory() {
        this.inventory = [];
        this.supplies = [];
        let allShopItems = ShopInventoryDB.getInstance().getShopInventory(this.selectedShopkeeperType);
        this.pickItems(allShopItems, this.slots);
    }

    public newGoods() {
        if (this.supplies.length >= this.slots) {
            for (let i = 0; i < this.slots; i++) {
                let index = Math.floor(Math.random() * this.supplies.length);
                let randomItem = this.supplies[index];
                let amount = Random.rolld4();

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
                let amount = Random.rolld4();

                if (index > -1) {
                   this.supplies.splice(index, 1);
                }
                randomItem.amount = amount;
                this.inventory.push(randomItem);
            }
        }
        this.sortSupply();
    }

    private pickItems(shopItems:ShopItem[], slots) {
        let availableItems : ShopItem[] = [];
        for (let i = 0; i < slots; i++) {
            let index = Math.floor(Math.random() * shopItems.length);
            let randomItem = shopItems[index];
            let higher = Random.rolld4();
            let amount = 0;
            if (higher == 4) {
                amount = Random.rolld4();
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

    pickItem(items:Item[]):Item {
        return items[Math.floor(Math.random() * items.length)];
    }

    public startRestock(hours:number, minutes:number) {

    }

    public incrementItemAmount(item:ShopItem) {
        item.amount++;
    }

    public decrementItemAmount(item:ShopItem) {
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

    public removeItem(item:ShopItem) {
        var index = this.inventory.indexOf(item);
        if (index > -1) {
           this.inventory.splice(index, 1);
        }
        item.amount = 0;
        this.supplies.push(item);
    }

    public addItem(item:ShopItem) {
        var index = this.supplies.indexOf(item);
        if (index > -1) {
           this.supplies.splice(index, 1);
        }
        item.amount = 1;
        this.inventory.push(item);
    }

    public exchangeItem(item:ShopItem) {
        // remove old item
        var index1 = this.inventory.indexOf(item);
        if (index1 > -1) {
           this.inventory.splice(index1, 1);
        }
        item.amount = 0;
        this.supplies.push(item);

        // choose random new item
        let index2 = Math.floor(Math.random() * this.supplies.length);
        let randomItem = this.supplies[index2];

        this.supplies.splice(index2, 1); // remove from supply
        let higher = Random.rolld4();
        let amount = 0;
        if (higher == 4) {
            amount = Random.rolld4();
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
