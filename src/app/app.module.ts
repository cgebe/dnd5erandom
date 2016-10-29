import {NgModule} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {Github} from "./github/shared/github";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {About} from './about/about';
import {Home} from './home/home';
import {Treasure} from './treasure/treasure';
import {Random} from './random/random';
import {ShopInventory} from './shopinventory/shopinventory';
import {NPC} from './npc/npc';
import {RepoBrowser} from './github/repo-browser/repo-browser';
import {RepoList} from './github/repo-list/repo-list';
import {RepoDetail} from './github/repo-detail/repo-detail';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';
import {AppComponent}  from './app.component';

@NgModule({
  declarations: [AppComponent, RepoBrowser, RepoList, RepoDetail, Home, ShopInventory, Random, Treasure, NPC],
  imports     : [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig)],
  providers   : [Github, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap   : [AppComponent]
})
export class AppModule {

}
