import {Component} from '@angular/core';

import database = require("../classes/Database");
import dto = require("../classes/DTO");
import random = require("../classes/Random");

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

    coinReward : string = null;
    gemReward : dto.Gem[] = [];
    artReward : dto.ArtObject[] = [];
    itemReward : dto.MagicItem[] = [];

    onChangeChallengeRating(newValue : string) {
        this.selectedChallengeRating = newValue;
    }

    onChangeTreasureType(newValue:string) {
        this.selectedTreasureType = newValue;
    }

    generateTreasure() {
        this.coinReward = null;
        this.gemReward = [];
        this.artReward = [];
        this.itemReward = [];
        if (this.selectedTreasureType == "Individual") {
            //let r = new roll.Rolls();
            //r.rolled(new roll.Roll(random.Random.rolld100());
            this.coinReward = this.generateIndividualCoins(this.selectedChallengeRating, random.Random.rolld100()).toString();
        }
        if (this.selectedTreasureType == "Hoard") {
            let d100 = random.Random.rolld100();
            this.coinReward = this.generateHoardCoins(this.selectedChallengeRating).toString();
            this.gemReward = this.generateGems(this.selectedChallengeRating, d100);
            this.artReward = this.generateArtObjects(this.selectedChallengeRating, d100);
            this.itemReward = this.generateMagicItems(this.selectedChallengeRating, d100);
        }
    }

    generateIndividualCoins(challengeRating:string, d100:number) : dto.Coins {
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

    generateIndividualCR04Coins(d100:number) : dto.Coins {
        let reward : dto.Coins = new dto.Coins();
        if (1 <= d100 && d100 <= 30) {
            reward.cp = random.Random.rollXdY(5, 6);
        }
        if (31 <= d100 && d100 <= 60) {
            reward.sp = random.Random.rollXdY(4, 6);
        }
        if (61 <= d100 && d100 <= 70) {
            reward.ep = random.Random.rollXdY(3, 6);
        }
        if (71 <= d100 && d100 <= 95) {
            reward.gp = random.Random.rollXdY(3, 6);
        }
        if (96 <= d100 && d100 <= 100) {
            reward.pp = random.Random.rollXdY(1, 6);
        }
        return reward;
    }

    generateIndividualCR510Coins(d100:number) : dto.Coins {
        let reward : dto.Coins = new dto.Coins();
        if (1 <= d100 && d100 <= 30) {
            reward.cp = random.Random.rollXdY(4, 6) * 100;
            reward.ep = random.Random.rollXdY(1, 6) * 10;
        }
        if (31 <= d100 && d100 <= 60) {
            reward.sp = random.Random.rollXdY(6, 6) * 10;
            reward.gp = random.Random.rollXdY(2, 6) * 10;
        }
        if (61 <= d100 && d100 <= 70) {
            reward.ep = random.Random.rollXdY(3, 6) * 10;
            reward.gp = random.Random.rollXdY(2, 6) * 10;
        }
        if (71 <= d100 && d100 <= 95) {
            reward.gp = random.Random.rollXdY(4, 6) * 10;
        }
        if (96 <= d100 && d100 <= 100) {
            reward.gp = random.Random.rollXdY(2, 6) * 10;
            reward.pp = random.Random.rollXdY(3, 6);
        }
        return reward;
    }

    generateIndividualCR1116Coins(d100:number) : dto.Coins {
        let reward : dto.Coins = new dto.Coins();
        if (1 <= d100 && d100 <= 20) {
            reward.sp = random.Random.rollXdY(4, 6) * 100;
            reward.gp = random.Random.rollXdY(1, 6) * 100;
        }
        if (21 <= d100 && d100 <= 35) {
            reward.ep = random.Random.rollXdY(1, 6) * 100;
            reward.gp = random.Random.rollXdY(1, 6) * 100;
        }
        if (36 <= d100 && d100 <= 75) {
            reward.gp = random.Random.rollXdY(2, 6) * 100;
            reward.pp = random.Random.rollXdY(1, 6) * 10;
        }
        if (76 <= d100 && d100 <= 100) {
            reward.gp = random.Random.rollXdY(2, 6) * 100;
            reward.pp = random.Random.rollXdY(2, 6) * 10;
        }
        return reward;
    }

    generateIndividualCR17Coins(d100:number) : dto.Coins {
        let reward : dto.Coins = new dto.Coins();
        if (1 <= d100 && d100 <= 15) {
            reward.ep = random.Random.rollXdY(2, 6) * 1000;
            reward.gp = random.Random.rollXdY(8, 6) * 100;
        }
        if (16 <= d100 && d100 <= 55) {
            reward.gp = random.Random.rollXdY(1, 6) * 1000;
            reward.pp = random.Random.rollXdY(1, 6) * 100;
        }
        if (56 <= d100 && d100 <= 100) {
            reward.gp = random.Random.rollXdY(1, 6) * 1000;
            reward.pp = random.Random.rollXdY(2, 6) * 100;
        }
        return reward;
    }

    generateHoardCoins(challengeRating:string) : dto.Coins {
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

    generateHoardCR04Coins() : dto.Coins {
        let reward : dto.Coins = new dto.Coins();
        reward.cp = random.Random.rollXdY(6, 6) * 100;
        reward.sp = random.Random.rollXdY(3, 6) * 100;
        reward.gp = random.Random.rollXdY(2, 6) * 10;
        return reward;
    }

    generateHoardCR510Coins() : dto.Coins {
        let reward : dto.Coins = new dto.Coins();
        reward.cp = random.Random.rollXdY(2, 6) * 100;
        reward.sp = random.Random.rollXdY(2, 6) * 1000;
        reward.gp = random.Random.rollXdY(6, 6) * 100;
        reward.pp = random.Random.rollXdY(3, 6) * 10;
        return reward;
    }

    generateHoardCR1116Coins() : dto.Coins {
        let reward : dto.Coins = new dto.Coins();
        reward.gp = random.Random.rollXdY(4, 6) * 1000;
        reward.pp = random.Random.rollXdY(5, 6) * 100;
        return reward;
    }

    generateHoardCR17Coins() : dto.Coins {
        let reward : dto.Coins = new dto.Coins();
        reward.gp = random.Random.rollXdY(12, 6) * 1000;
        reward.pp = random.Random.rollXdY(8, 6) * 1000;
        return reward;
    }

    generateGems(challengeRating:string, d100:number) : dto.Gem[] {
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

    generateCR04Gems(d100:number) : dto.Gem[] {
        if ( 7 <= d100 && d100 <= 16 ||
            37 <= d100 && d100 <= 44 ||
            61 <= d100 && d100 <= 65 ||
            76 <= d100 && d100 <= 78 ||
            7 <= d100 && d100 <= 16){

            return database.GemDatabase.getInstance().getRandomGemsByCost(random.Random.rollXdY(2, 6), 10);
        }
        if (27 <= d100 && d100 <= 36 ||
            53 <= d100 && d100 <= 60 ||
            71 <= d100 && d100 <= 75 ||
            81 <= d100 && d100 <= 85 ||
            93 <= d100 && d100 <= 97 ||
            100 == d100){

            return database.GemDatabase.getInstance().getRandomGemsByCost(random.Random.rollXdY(2, 6), 50);
        }
        return [];
    }

    generateCR510Gems(d100:number) : dto.Gem[] {
        if (11 <= d100 && d100 <= 16 ||
            33 <= d100 && d100 <= 36 ||
            50 <= d100 && d100 <= 54 ||
            67 <= d100 && d100 <= 69 ||
            77 <= d100 && d100 <= 78 ||
            85 <= d100 && d100 <= 88) {

            return database.GemDatabase.getInstance().getRandomGemsByCost(random.Random.rollXdY(3, 6), 50);
        }
        if (17 <= d100 && d100 <= 22 ||
            37 <= d100 && d100 <= 40 ||
            55 <= d100 && d100 <= 59 ||
            70 <= d100 && d100 <= 72 ||
            79 == d100               ||
            89 <= d100 && d100 <= 91 ||
            95 <= d100 && d100 <= 96 ||
            99 == d100) {

            return database.GemDatabase.getInstance().getRandomGemsByCost(random.Random.rollXdY(3, 6), 100);
        }
        return [];
    }

    generateCR1116Gems(d100:number) : dto.Gem[] {
        if (11 <= d100 && d100 <= 12 ||
            24 <= d100 && d100 <= 26 ||
            41 <= d100 && d100 <= 45 ||
            59 <= d100 && d100 <= 62 ||
            71 <= d100 && d100 <= 72 ||
            79 <= d100 && d100 <= 80 ||
            89 <= d100 && d100 <= 90 ||
            97 <= d100 && d100 <= 98 ) {

            return database.GemDatabase.getInstance().getRandomGemsByCost(random.Random.rollXdY(3, 6), 500);
        }

        if (13 <= d100 && d100 <= 15 ||
            27 <= d100 && d100 <= 29 ||
            46 <= d100 && d100 <= 50 ||
            63 <= d100 && d100 <= 66 ||
            73 <= d100 && d100 <= 74 ||
            81 <= d100 && d100 <= 82 ||
            91 <= d100 && d100 <= 92 ||
            99 <= d100 && d100 <= 100 ) {

            return database.GemDatabase.getInstance().getRandomGemsByCost(random.Random.rollXdY(3, 6), 1000);
        }
        return [];
    }

    generateCR17Gems(d100:number) : dto.Gem[] {
        if ( 3 <= d100 && d100 <= 5  ||
            15 <= d100 && d100 <= 22 ||
            47 <= d100 && d100 <= 52 ||
            69 == d100               ||
            73 <= d100 && d100 <= 74 ||
            81 <= d100 && d100 <= 85) {

            return database.GemDatabase.getInstance().getRandomGemsByCost(random.Random.rollXdY(3, 6), 1000);
        }
        if (12 <= d100 && d100 <= 14 ||
            39 <= d100 && d100 <= 46 ||
            64 <= d100 && d100 <= 68 ||
            72 == d100               ||
            79 <= d100 && d100 <= 80 ||
            96 <= d100 && d100 <= 100) {

            return database.GemDatabase.getInstance().getRandomGemsByCost(random.Random.rollXdY(1, 8), 5000);
        }
        return [];
    }

    generateArtObjects(challengeRating:string, d100:number) : dto.ArtObject[] {
        switch (challengeRating) {
        case "0-4":
            return this.generateCR04ArtObjects(d100);
        case "5-10":
            return this.generateCR510ArtObjects(d100);
        case "11-16":
            return this.generateCR1116ArtObjects(d100);
        case "17+":
            return this.generateCR17ArtObjects(d100);
        }
    }

    generateCR04ArtObjects(d100:number) : dto.ArtObject[] {
        if (17 <= d100 && d100 <= 26 ||
            45 <= d100 && d100 <= 52 ||
            66 <= d100 && d100 <= 70 ||
            79 <= d100 && d100 <= 80 ||
            86 <= d100 && d100 <= 92 ||
            98 <= d100 && d100 <= 99 ) {

            return database.ArtObjectDatabase.getInstance().getRandomArtObjectsByCost(random.Random.rollXdY(2, 4), 25);
        }
        return [];
    }

    generateCR510ArtObjects(d100:number) : dto.ArtObject[] {
        if ( 5 <= d100 && d100 <= 10 ||
            29 <= d100 && d100 <= 32 ||
            45 <= d100 && d100 <= 49 ||
            64 <= d100 && d100 <= 66 ||
            75 <= d100 && d100 <= 76 ||
            81 <= d100 && d100 <= 84 ) {

            return database.ArtObjectDatabase.getInstance().getRandomArtObjectsByCost(random.Random.rollXdY(3, 6), 25);
        }
        if (23 <= d100 && d100 <= 28 ||
            41 <= d100 && d100 <= 44 ||
            60 <= d100 && d100 <= 63 ||
            73 <= d100 && d100 <= 74 ||
            80 == d100               ||
            92 <= d100 && d100 <= 94 ||
            97 <= d100 && d100 <= 98 ||
            100 == d100) {

            return database.ArtObjectDatabase.getInstance().getRandomArtObjectsByCost(random.Random.rollXdY(3, 6), 250);
        }
        return [];
    }

    generateCR1116ArtObjects(d100:number) : dto.ArtObject[] {
        if ( 4 <= d100 && d100 <= 6  ||
            16 <= d100 && d100 <= 19 ||
            30 <= d100 && d100 <= 35 ||
            51 <= d100 && d100 <= 54 ||
            67 <= d100 && d100 <= 68 ||
            75 <= d100 && d100 <= 76 ||
            83 <= d100 && d100 <= 85 ||
            93 <= d100 && d100 <= 94 ) {

            return database.ArtObjectDatabase.getInstance().getRandomArtObjectsByCost(random.Random.rollXdY(2, 4), 250);
        }

        if ( 7 <= d100 && d100 <=  9 ||
            20 <= d100 && d100 <= 23 ||
            36 <= d100 && d100 <= 40 ||
            55 <= d100 && d100 <= 58 ||
            69 <= d100 && d100 <= 70 ||
            77 <= d100 && d100 <= 78 ||
            86 <= d100 && d100 <= 88 ||
            95 <= d100 && d100 <= 96 ) {

            return database.ArtObjectDatabase.getInstance().getRandomArtObjectsByCost(random.Random.rollXdY(2, 4), 750);
        }
        return [];
    }

    generateCR17ArtObjects(d100:number) : dto.ArtObject[] {
        if ( 6 <= d100 && d100 <= 8  ||
            23 <= d100 && d100 <= 30 ||
            53 <= d100 && d100 <= 58 ||
            70 == d100               ||
            75 <= d100 && d100 <= 76 ||
            86 <= d100 && d100 <= 90) {

            return database.ArtObjectDatabase.getInstance().getRandomArtObjectsByCost(random.Random.rollXdY(1, 10), 2500);
        }
        if ( 9 <= d100 && d100 <= 11 ||
            31 <= d100 && d100 <= 38 ||
            59 <= d100 && d100 <= 63 ||
            71 == d100               ||
            77 <= d100 && d100 <= 78 ||
            91 <= d100 && d100 <= 95) {

            return database.ArtObjectDatabase.getInstance().getRandomArtObjectsByCost(random.Random.rollXdY(1, 4), 7500);
        }
        return [];
    }

    generateMagicItems(challengeRating:string, d100:number) : dto.MagicItem[] {
        switch (challengeRating) {
        case "0-4":
            return this.generateCR04MagicItems(d100);
        case "5-10":
            return this.generateCR510MagicItems(d100);
        case "11-16":
            return this.generateCR1116MagicItems(d100);
        case "17+":
            return this.generateCR17MagicItems(d100);
        }
    }

    generateCR04MagicItems(d100:number) : dto.MagicItem[] {
        if (37 <= d100 && d100 <= 60) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 6), "a");
        }
        if (61 <= d100 && d100 <= 75) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "b");
        }
        if (76 <= d100 && d100 <= 85) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "c");
        }
        if (86 <= d100 && d100 <= 97) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "f");
        }
        if (98 <= d100 && d100 <= 100) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(1, "g");
        }
        return [];
    }

    generateCR510MagicItems(d100:number) : dto.MagicItem[] {
        if (29 <= d100 && d100 <= 44) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 6), "a");
        }
        if (45 <= d100 && d100 <= 63) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "b");
        }
        if (64 <= d100 && d100 <= 74) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "c");
        }
        if (75 <= d100 && d100 <= 80) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(1, "d");
        }
        if (81 <= d100 && d100 <= 94) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "f");
        }
        if (95 <= d100 && d100 <= 98) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "g");
        }
        if (99 <= d100 && d100 <= 100) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(1, "h");
        }
        return [];
    }

    generateCR1116MagicItems(d100:number) : dto.MagicItem[] {
        if (16 <= d100 && d100 <= 29) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "a").concat(
                   database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 6), "b"));
        }
        if (30 <= d100 && d100 <= 50) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 6), "c");
        }
        if (51 <= d100 && d100 <= 66) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "d");
        }
        if (67 <= d100 && d100 <= 74) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(1, "e");
        }
        if (75 <= d100 && d100 <= 82) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(1, "f").concat(
                   database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "g"));
        }
        if (83 <= d100 && d100 <= 92) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "h");
        }
        if (93 <= d100 && d100 <= 100) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(1, "i");
        }
        return [];
    }

    generateCR17MagicItems(d100:number) : dto.MagicItem[] {
        if ( 3 <= d100 && d100 <= 14) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 8), "c");
        }
        if (15 <= d100 && d100 <= 46) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 6), "d");
        }
        if (47 <= d100 && d100 <= 68) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 6), "e");
        }
        if (69 <= d100 && d100 <= 72) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "g");
        }
        if (73 <= d100 && d100 <= 80) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "h");
        }
        if (81 <= d100 && d100 <= 100) {
            return database.MagicItemDatabase.getInstance().getRandomMagicItemsByTable(random.Random.rollXdY(1, 4), "i");
        }
        return [];
    }


}
