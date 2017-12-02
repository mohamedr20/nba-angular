import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import { ActiveLineupComponent } from './active-lineup/active-lineup.component';
import {RosterComponent} from './roster/roster.component';
import {ActivePlayerComponent} from './active-player/active-player.component';
export const PlayerRoutes:Routes = [
    {path:'',redirectTo:'',pathMatch:'full',children:[
        {path:'active-lineup',component:ActiveLineupComponent},
        {path:'roster',component:RosterComponent},
        {path:'active-lineup',component:ActivePlayerComponent}
    ]}, 
]

@NgModule({
    imports:[RouterModule.forChild(PlayerRoutes)],
    exports:[RouterModule]
})

export class PlayerRoutingModule{}
