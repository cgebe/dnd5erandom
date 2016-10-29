import {Component} from '@angular/core';

import database = require("../classes/Database");
import dto = require("../classes/DTO");
import random = require("../classes/Random");

@Component({
  selector: 'npc',
  styleUrls: ['../css/main.css', './npc.css'],
  templateUrl: './npc.html'
})
export class NPC {

    npc : dto.NPC = this.randomNPC();

    generateNPC() {
        console.log("kkkk");
        this.npc = this.randomNPC();
    }

    private randomNPC() : dto.NPC {
        let npc : dto.NPC = new dto.NPC();
        npc.name = random.Random.randomName();
        npc.character = random.Random.randomCharacter();
        npc.ideal = random.Random.randomIdeal();
        npc.bond = random.Random.randomBond();
        npc.flaw = random.Random.randomFlaw();
        return npc;
    }
}
