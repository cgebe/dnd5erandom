import {Component} from '@angular/core';

import { NPCComponent } from '../components/npc';

@Component({
  selector: 'random',
  styleUrls: ['../css/main.css', './random.css'],
  templateUrl: './random.html'
})
export class Random {
    npccomponents : NPCComponent[] = [];

    constructor() {
        this.npccomponents.push(new NPCComponent());
    }

    public addNPCComponent() {
        this.npccomponents.push(new NPCComponent());
    }
}
