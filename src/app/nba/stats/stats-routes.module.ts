import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {PlayerStatComponent} from './player-stat/player-stat.component';


export const StatRoutes:Routes = [
    {path:'',redirectTo:'',pathMatch:'full',children:[
        {path:'player-stat',component:PlayerStatComponent},
    ]}, 
]

@NgModule({
    imports:[RouterModule.forChild(StatRoutes)],
    exports:[RouterModule]
})

export class StatRoutingModule{}