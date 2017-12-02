import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AngularFireModule} from 'angularfire2';
import {AuthModule} from './auth/auth.module';
import {NbaModule} from './nba-service/nba.module';
import {AuthGuard} from './auth/auth.guard';
import {MaterialModule} from './material/material.module';
import {Routes,RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-profile/user-form/user-form.component';
import {NbaComponent} from './nba/nba.component';

import {firebaseConfig} from '../../firebase.config';
import {StandingModule} from './nba/nba-standings/standing.module';
import {PlayerModule} from './nba/players/player.module';
import {StatsModule} from './nba/stats/stats.module';
import { ErrorComponent } from './error/error.component';
import {DialogData} from './error/error.component';


import {AppRoutingModule} from './app-routing.module';

// export const appRoutes: Routes = [
//   { path: '', component: UserProfileComponent},
//   {path:'nba',component:NbaComponent,children:[
//     {path:'standings',component:StandingsComponent,children:[
//       {path:'division',component:DivisionComponent},
//       {path:'overall-rank',component:OverallRankComponent},
//       {path:'playoff',component:PlayoffComponent}
//     ]},
//       // {path:'standings',children:StandingRoutes,component:StandingsComponent},
//       {path:'players',component:PlayersComponent},
//       {path:'stats',component:StatsComponent}
//     ]
//   },
// ]
  
  // {path:'../stats',component:NbaStatsComponent},
  // {path:'../players',component:NbaPlayersComponent},
  


@NgModule({
  entryComponents:[DialogData],
  declarations: [
    DialogData,
    AppComponent,
    UserProfileComponent,
    UserFormComponent,
    NbaComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AuthModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    PlayerModule,
    StatsModule,
    StandingModule,
    NbaModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
