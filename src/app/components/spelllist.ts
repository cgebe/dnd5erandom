import { Component } from '@angular/core';

import { SpellDatabase } from '../classes/Database';
import { Spell } from  '../classes/DTO';
import { Random } from '../classes/Random';

@Component({
  selector: 'spell-list',
  styleUrls: ['../css/main.css', '../css/spelllist.css'],
  templateUrl: '../templates/spelllist.html'
})
export class SpellListComponent {

    searchResults : Spell[];
    searchField : string;

    searchSpells() {
        this.search(this.searchField);
    }

    onChangeSearch(search : string) {
        if (search.length > 2) {
            this.search(search);
        }
    }

    private search(search : string) {
        this.searchResults = [];
        let spells : Spell[] = SpellDatabase.getInstance().getSpells();
        for (let i = 0; i < spells.length; i++) {
            if (spells[i].name.match(new RegExp(search, "gi"))) {
                this.searchResults.push(spells[i]);
            }
        }
        this.sortResult();
    }

    private sortResult() {
        this.searchResults.sort((n1,n2) => {
            if (n1.level > n2.level) {
                return 1;
            }

            if (n1.level < n2.level) {
                return -1;
            }

            return 0;
        });
    }
}
