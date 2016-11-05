import {Component} from '@angular/core';

import { NPC } from  '../classes/DTO';
import { Random } from '../classes/Random';

@Component({
  selector: 'npc',
  styleUrls: ['../css/main.css', '../css/npc.css'],
  templateUrl: '../templates/npc.html'
})
export class NPCComponent {

    npc : NPC = this.randomNPC();

    generateNPC() {
        console.log("kkkk");
        this.npc = this.randomNPC();
    }

    private randomNPC() : NPC {
        let npc : NPC = new NPC();
        npc.name = Random.randomName();
        npc.character = Random.randomCharacter();
        npc.ideal = Random.randomIdeal();
        npc.bond = Random.randomBond();
        npc.flaw = Random.randomFlaw();
        return npc;
    }
}
