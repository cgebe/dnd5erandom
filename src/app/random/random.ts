import {Component} from '@angular/core';

import database = require("../classes/Database");

import npc = require("../npc/npc");

@Component({
  selector: 'random',
  styleUrls: ['../css/main.css', './random.css'],
  templateUrl: './random.html'
})
export class Random {
    npccomponents : npc.NPC[] = [];

    constructor() {
        this.npccomponents.push(new npc.NPC());
    }

    public addNPCComponent() {
        this.npccomponents.push(new npc.NPC());
    }
}
