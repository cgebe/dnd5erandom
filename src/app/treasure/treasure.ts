import {Component} from '@angular/core';

import treasuredb = require("../classes/treasuredb");
import item = require("../classes/item");
import coins = require("../classes/coins");
import gem = require("../classes/gem");
import random = require("../classes/random");

@Component({
  selector: 'treasure',
  styleUrls: ['../css/main.css', './treasure.css'],
  templateUrl: './treasure.html'
})
export class Treasure {
    challengeRatings = '0-4_5-10_11-16_17+'.split('_');
    selectedChallengeRating = '0-4';

    treasureTypes = 'Individual_Hoard'.split('_');
    selectedTreasureType = 'Individual';

    treasure : item.Item[];
    coinReward : string;
    gemReward : gem.Gem[];

    onChangeChallengeRating(newValue) {
        console.log(newValue);
        this.selectedChallengeRating = newValue;
        // ... do other stuff here ...
    }

    onChangeTreasureType(newValue:string) {
        console.log(newValue);
        this.selectedTreasureType = newValue;
        // ... do other stuff here ...
    }

    generateTreasure() {
        if (this.selectedTreasureType == "Individual") {
            let d100 = random.Random.rolld100();
            this.coinReward = this.generateIndividualCoins(this.selectedChallengeRating, d100).toString();
        }
        if (this.selectedTreasureType == "Hoard") {
            let d100 = random.Random.rolld100();
            this.coinReward = this.generateHoardCoins(this.selectedChallengeRating).toString();
            this.gemReward = this.generateGems(this.selectedChallengeRating, d100);
        }
    }

    generateIndividualCoins(challengeRating:string, d100:number) : coins.Coins {
        switch(challengeRating) {
        case "0-4":
            return this.generateIndividualCR04Coins(d100);
        case "5-10":
            return this.generateIndividualCR510Coins(d100);
        case "11-16":
            return this.generateIndividualCR1116Coins(d100);
        case "17+":
            return this.generateIndividualCR17Coins(d100);
        }
    }

    generateHoardCoins(challengeRating:string) : coins.Coins {
        switch(challengeRating) {
        case "0-4":
            return this.generateHoardCR04Coins();
        case "5-10":
            return this.generateHoardCR510Coins();
        case "11-16":
            return this.generateHoardCR1116Coins();
        case "17+":
            return this.generateHoardCR17Coins();
        }
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

    generateGems(challengeRating:string, d100:number) : gem.Gem[] {
        switch (challengeRating) {
        case "0-4":
            return this.generateCR04Gems(d100);
        case "5-10":
            return this.generateCR510Gems(d100);
        case "11-16":
            return this.generateCR1116Gems(d100);
        case "17+":
            return this.generateCR17Gems(d100);
        }
    }

    generateCR04Gems(d100:number) : gem.Gem[] {
        if ( 7 <= d100 && d100 <= 16 ||
            37 <= d100 && d100 <= 44 ||
            61 <= d100 && d100 <= 65 ||
            76 <= d100 && d100 <= 78 ||
            7 <= d100 && d100 <= 16){

            return treasuredb.TreasureDB.getInstance().getGems10(random.Random.rollXtimesY(2, 6));
        }
        if (27 <= d100 && d100 <= 36 ||
            53 <= d100 && d100 <= 60 ||
            71 <= d100 && d100 <= 75 ||
            81 <= d100 && d100 <= 85 ||
            93 <= d100 && d100 <= 97 ||
            100 == d100){

            return treasuredb.TreasureDB.getInstance().getGems50(random.Random.rollXtimesY(2, 6));
        }
        return [];
    }

    generateCR510Gems(d100:number) : gem.Gem[] {
        if (11 <= d100 && d100 <= 16 ||
            33 <= d100 && d100 <= 36 ||
            50 <= d100 && d100 <= 54 ||
            67 <= d100 && d100 <= 69 ||
            77 <= d100 && d100 <= 78 ||
            85 <= d100 && d100 <= 88) {

            return treasuredb.TreasureDB.getInstance().getGems50(random.Random.rollXtimesY(3, 6));
        }
        if (17 <= d100 && d100 <= 22 ||
            37 <= d100 && d100 <= 40 ||
            55 <= d100 && d100 <= 59 ||
            70 <= d100 && d100 <= 72 ||
            79 == d100               ||
            89 <= d100 && d100 <= 91 ||
            95 <= d100 && d100 <= 96 ||
            99 == d100) {

            return treasuredb.TreasureDB.getInstance().getGems100(random.Random.rollXtimesY(3, 6));
        }
        return [];
    }

    generateCR1116Gems(d100:number) : gem.Gem[] {
        if (11 <= d100 && d100 <= 12 ||
            24 <= d100 && d100 <= 26 ||
            41 <= d100 && d100 <= 45 ||
            59 <= d100 && d100 <= 62 ||
            71 <= d100 && d100 <= 72 ||
            79 <= d100 && d100 <= 80 ||
            89 <= d100 && d100 <= 90 ||
            97 <= d100 && d100 <= 98 ) {

            return treasuredb.TreasureDB.getInstance().getGems500(random.Random.rollXtimesY(3, 6));
        }

        if (13 <= d100 && d100 <= 15 ||
            27 <= d100 && d100 <= 29 ||
            46 <= d100 && d100 <= 50 ||
            63 <= d100 && d100 <= 66 ||
            73 <= d100 && d100 <= 74 ||
            81 <= d100 && d100 <= 82 ||
            91 <= d100 && d100 <= 92 ||
            99 <= d100 && d100 <= 100 ) {

            return treasuredb.TreasureDB.getInstance().getGems1000(random.Random.rollXtimesY(3, 6));
        }
        return [];
    }

    generateCR17Gems(d100:number) : gem.Gem[] {
        if ( 3 <= d100 && d100 <= 5  ||
            15 <= d100 && d100 <= 22 ||
            47 <= d100 && d100 <= 52 ||
            69 == d100               ||
            73 <= d100 && d100 <= 74 ||
            81 <= d100 && d100 <= 85) {

            return treasuredb.TreasureDB.getInstance().getGems1000(random.Random.rollXtimesY(3, 6));
        }
        if (12 <= d100 && d100 <= 14 ||
            39 <= d100 && d100 <= 46 ||
            64 <= d100 && d100 <= 68 ||
            72 == d100               ||
            79 <= d100 && d100 <= 80 ||
            96 <= d100 && d100 <= 100) {

            return treasuredb.TreasureDB.getInstance().getGems5000(random.Random.rollXtimesY(1, 8));
        }
        return [];
    }




}
