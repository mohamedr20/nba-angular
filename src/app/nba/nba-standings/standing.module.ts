import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import { OverallRankComponent } from './overall-rank/overall-rank.component';
import { DivisionComponent } from './division/division.component';
import { PlayoffComponent } from './playoff/playoff.component';
import {StandingsComponent} from './nba-standings.component';

import {StandingRoutingModule} from './standing-routes.module'

@NgModule({
    imports:[CommonModule,MaterialModule,StandingRoutingModule],
    declarations:[StandingsComponent,OverallRankComponent,DivisionComponent,PlayoffComponent],
    exports:[StandingsComponent,PlayoffComponent,DivisionComponent,OverallRankComponent]
})

export class StandingModule{}