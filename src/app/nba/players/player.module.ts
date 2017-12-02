import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {MaterialModule} from '../../material/material.module'
import { ActiveLineupComponent } from './active-lineup/active-lineup.component';
import {RosterComponent} from './roster/roster.component';
import {ActivePlayerComponent} from './active-player/active-player.component';
import {PlayersComponent} from './players.component';

import {PlayerRoutingModule} from './player-routes.module'

@NgModule({
    imports:[CommonModule,MaterialModule,PlayerRoutingModule],
    declarations:[PlayersComponent,ActiveLineupComponent,ActivePlayerComponent,RosterComponent],
    exports:[ActiveLineupComponent,RosterComponent,ActiveLineupComponent,PlayersComponent]
})

export class PlayerModule{}