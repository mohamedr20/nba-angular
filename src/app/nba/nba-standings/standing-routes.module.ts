import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import { OverallRankComponent } from './overall-rank/overall-rank.component';
import { DivisionComponent } from './division/division.component';
import { PlayoffComponent } from './playoff/playoff.component';

export const StandingRoutes:Routes = [
    {path:'',redirectTo:'',pathMatch:'full',children:[
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
