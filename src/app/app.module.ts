import {NgModule} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {Github} from "./github/shared/github";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {About} from './about/about';
import {Home} from './home/home';
import {Random} from './random/random';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';

import {AppComponent}  from './app.component';

import { NPCComponent }  from './components/npc';
import { AuctionComponent }  from './components/auction';
import { ShopInventoryComponent }  from './components/shopinventory';
import { TreasureComponent }  from './components/treasure';
import { BidderFormComponent }  from './components/bidderform';
import { OfferFormComponent }  from './components/offerform';

@NgModule({
  declarations: [
      AppComponent,
      Home,
      Random,

      NPCComponent,
      AuctionComponent,
      BidderFormComponent,
      OfferFormComponent,
      TreasureComponent,
      ShopInventoryComponent
  ],
  imports     : [
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule.forRoot(rootRouterConfig)
  ],
  providers   : [Github, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap   : [AppComponent]
})
export class AppModule {

}
