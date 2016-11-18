import {Component} from '@angular/core';

import { NPC } from  '../classes/DTO';
import { Random } from '../classes/Random';

@Component({
  selector: 'npc',
  styleUrls: ['../css/main.css', '../css/npc.css'],
  templateUrl: '../templates/npc.html'
})
export class NPCComponent {

    npcs : NPC[] = [];
    npcinfo : NPC;
    currentindex : number;

    constructor() {
        this.currentindex = 0;
        let npc : NPC = this.randomNPC();
        this.npcinfo = npc;
        this.npcs.push(npc);
    }

    setActiveNPC(index : number) {
        if (index < this.npcs.length) {
            this.currentindex = index;
            this.npcinfo = this.npcs[index];
        }
    }

    addNPC() {
        this.npcs.push(this.randomNPC());
    }

    removeNPC() {
        this.npcs.splice(this.currentindex, 1);
        if (this.npcs.length < 1) {
            this.currentindex = 0;
            let npc : NPC = this.randomNPC();
            this.npcinfo = npc;
            this.npcs.push(npc);
        } else {
            this.currentindex--;
            this.npcinfo = this.npcs[this.currentindex];
        }
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
