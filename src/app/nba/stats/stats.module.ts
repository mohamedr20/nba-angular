import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {PlayerStatComponent} from './player-stat/player-stat.component';
import {CumulativeStatsComponent} from './cumulative-stats/cumulative-stats.component'
import {StatsComponent} from './stats.component'

import {StatRoutingModule} from './stats-routes.module'

@NgModule({
    imports:[CommonModule,MaterialModule,StatRoutingModule],
    declarations:[StatsComponent,PlayerStatComponent,CumulativeStatsComponent],
    exports:[StatsComponent,CumulativeStatsComponent,PlayerStatComponent]
})

export class StatsModule{}