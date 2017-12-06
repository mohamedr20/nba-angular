import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import { OverallRankComponent } from './overall-rank/overall-rank.component';
import { DivisionComponent } from './division/division.component';
import { PlayoffComponent } from './playoff/playoff.component';
import {StandingsComponent} from './nba-standings.component';

export const StandingRoutes:Routes = [
    {path:'standings',component:StandingsComponent,redirectTo:'',pathMatch:'full',children:[
        {path:'overall-rank',component:OverallRankComponent},
        {path:'playoff',component:PlayoffComponent},
        {path:'division',component:DivisionComponent}
    ]}, 
]

@NgModule({
    imports:[RouterModule.forChild(StandingRoutes)],
    exports:[RouterModule]
})

export class StandingRoutingModule{}
