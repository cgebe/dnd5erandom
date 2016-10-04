import {Component} from '@angular/core';

import database = require("../classes/database");
import item = require("../classes/item");
import coins = require("../classes/coins");
import gem = require("../classes/gem");
import random = require("../classes/random");

@Component({
  selector: 'treasure',
  styleUrls: ['./treasure.css'],
  templateUrl: './treasure.html'
})
export class Treasure {
    criticalRatings = '0-4_5-10_11-16_17+'.split('_');
    selectedCriticalRating = '0-4';

    treasureTypes = 'Individual_Hoard'.split('_');
    selectedTreasureType = 'Individual';

    treasure : item.Item[];
    reward : string;

    onChangeCriticalRating(newValue) {
        console.log(newValue);
        this.selectedCriticalRating = newValue;
        // ... do other stuff here ...
    }

    onChangeTreasureType(newValue:string) {
        console.log(newValue);
        this.selectedTreasureType = newValue;
        // ... do other stuff here ...
    }

    generateCoins() {
        let c : coins.Coins = this.rollCoins(this.selectedCriticalRating, this.selectedTreasureType);
        this.reward = c.toString();
    }

    rollCoins(criticalRating:string, type:string):coins.Coins {
        let d100 : number = random.Random.rolld100();
        switch(type) {
        case "Individual":
            switch(criticalRating) {
            case "0-4":
                return this.generateIndividualCR04Coins(d100);
            case "5-10":
                return this.generateIndividualCR510Coins(d100);
            case "11-16":
                return this.generateIndividualCR1116Coins(d100);
            case "17+":
                return this.generateIndividualCR17Coins(d100);
            }
        case "Hoard":
            switch(criticalRating) {
            case "0-4":
                return this.generateHoardCR04Coins();
            case "5-10":
                return this.generateHoardCR510Coins();
            case "11-16":
                return this.generateHoardCR1116Coins();
            case "17+":
                return this.generateHoardCR17Coins();
            }
            break;
        }
    }

    generateGems(criticalRating:string) : gem.Gem[] {
        return null;
        /*
        switch(criticalRating) {
        case "0-4":
            return this.generateGemsCR04(d100);
        case "5-10":
            return this.generateGemsCR511(d100);
        case "11-16":
            return this.generateGemsCR1116(d100);
        case "17+":
            return this.generateGemsCR17(d100);
        }
        */
    }

    generateIndividualCR04Coins(d100:number) : coins.Coins {
        let reward : coins.Coins = new coins.Coins();
        if (1 <= d100 && d100 <= 30) {
            reward.cp = random.Random.rollXtimesY(5, 6);
        }
        if (31 <= d100 && d100 <= 60) {
            reward.sp = random.Random.rollXtimesY(4, 6);
        }
        if (61 <= d100 && d100 <= 70) {
            reward.ep = random.Random.rollXtimesY(3, 6);
        }
        if (71 <= d100 && d100 <= 95) {
            reward.gp = random.Random.rollXtimesY(3, 6);
        }
        if (96 <= d100 && d100 <= 100) {
            reward.pp = random.Random.rollXtimesY(1, 6);
        }
        return reward;
    }

    generateIndividualCR510Coins(d100:number) : coins.Coins {
        let reward : coins.Coins = new coins.Coins();
        if (1 <= d100 && d100 <= 30) {
            reward.cp = random.Random.rollXtimesY(4, 6) * 100;
            reward.ep = random.Random.rollXtimesY(1, 6) * 10;
        }
        if (31 <= d100 && d100 <= 60) {
            reward.sp = random.Random.rollXtimesY(6, 6) * 10;
            reward.gp = random.Random.rollXtimesY(2, 6) * 10;
        }
        if (61 <= d100 && d100 <= 70) {
            reward.ep = random.Random.rollXtimesY(3, 6) * 10;
            reward.gp = random.Random.rollXtimesY(2, 6) * 10;
        }
        if (71 <= d100 && d100 <= 95) {
            reward.gp = random.Random.rollXtimesY(4, 6) * 10;
        }
        if (96 <= d100 && d100 <= 100) {
            reward.gp = random.Random.rollXtimesY(2, 6) * 10;
            reward.pp = random.Random.rollXtimesY(3, 6);
        }
        return reward;
    }

    generateIndividualCR1116Coins(d100:number) : coins.Coins {
        let reward : coins.Coins = new coins.Coins();
        if (1 <= d100 && d100 <= 20) {
            reward.sp = random.Random.rollXtimesY(4, 6) * 100;
            reward.gp = random.Random.rollXtimesY(1, 6) * 100;
        }
        if (21 <= d100 && d100 <= 35) {
            reward.ep = random.Random.rollXtimesY(1, 6) * 100;
            reward.gp = random.Random.rollXtimesY(1, 6) * 100;
        }
        if (36 <= d100 && d100 <= 75) {
            reward.gp = random.Random.rollXtimesY(2, 6) * 100;
            reward.pp = random.Random.rollXtimesY(1, 6) * 10;
        }
        if (76 <= d100 && d100 <= 100) {
            reward.gp = random.Random.rollXtimesY(2, 6) * 100;
            reward.pp = random.Random.rollXtimesY(2, 6) * 10;
        }
        return reward;
    }

    generateIndividualCR17Coins(d100:number) : coins.Coins {
        let reward : coins.Coins = new coins.Coins();
        if (1 <= d100 && d100 <= 15) {
            reward.ep = random.Random.rollXtimesY(2, 6) * 1000;
            reward.gp = random.Random.rollXtimesY(8, 6) * 100;
        }
        if (16 <= d100 && d100 <= 55) {
            reward.gp = random.Random.rollXtimesY(1, 6) * 1000;
            reward.pp = random.Random.rollXtimesY(1, 6) * 100;
        }
        if (56 <= d100 && d100 <= 100) {
            reward.gp = random.Random.rollXtimesY(1, 6) * 1000;
            reward.pp = random.Random.rollXtimesY(2, 6) * 100;
        }
        return reward;
    }

    generateHoardCR04Coins() : coins.Coins {
        let reward : coins.Coins = new coins.Coins();
        reward.cp = random.Random.rollXtimesY(6, 6) * 100;
        reward.sp = random.Random.rollXtimesY(3, 6) * 100;
        reward.gp = random.Random.rollXtimesY(2, 6) * 10;
        return reward;
    }

    generateHoardCR510Coins() : coins.Coins {
        let reward : coins.Coins = new coins.Coins();
        reward.cp = random.Random.rollXtimesY(2, 6) * 100;
        reward.sp = random.Random.rollXtimesY(2, 6) * 1000;
        reward.gp = random.Random.rollXtimesY(6, 6) * 100;
        reward.pp = random.Random.rollXtimesY(3, 6) * 10;
        return reward;
    }

    generateHoardCR1116Coins() : coins.Coins {
        let reward : coins.Coins = new coins.Coins();
        reward.gp = random.Random.rollXtimesY(4, 6) * 1000;
        reward.pp = random.Random.rollXtimesY(5, 6) * 100;
        return reward;
    }

    generateHoardCR17Coins() : coins.Coins {
        let reward : coins.Coins = new coins.Coins();
        reward.gp = random.Random.rollXtimesY(12, 6) * 1000;
        reward.pp = random.Random.rollXtimesY(8, 6) * 1000;
        return reward;
    }
}
