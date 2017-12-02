import { NgModule }       from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {NbaComponent} from './nba/nba.component';
import {UserProfileComponent} from './user-profile/user-profile.component';

const appRoutes:Routes = [
    { path: '', component: UserProfileComponent},
    {path:'nba',component:NbaComponent}
]


@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}