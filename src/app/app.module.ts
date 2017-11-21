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
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CardComponent } from './shared/card/card.component';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-profile/user-form/user-form.component';
import {NbaComponent} from './nba/nba.component';
import {NbaTableComponent} from './nba/nba-table/nba-table.component';
import {firebaseConfig} from '../../firebase.config';

import {StandingsComponent} from './nba/nba-standings/nba-standings.component';
import { OverallRankComponent } from './nba/nba-standings/overall-rank/overall-rank.component';
import { DivisionComponent } from './nba/nba-standings/division/division.component';
import { PlayoffComponent } from './nba/nba-standings/playoff/playoff.component';

import {PlayersComponent} from './nba/players/players.component';
import {ActiveLineupComponent} from './nba/players/active-lineup/active-lineup.component';
import {RosterComponent} from './nba/players/roster/roster.component';
import {ActivePlayerComponent} from './nba/players/active-player/active-player.component';

import {StatsComponent} from './nba/stats/stats.component';
import {PlayerStatComponent} from './nba/stats/player-stat/player-stat.component';
import {DailyStatComponent} from './nba/stats/daily-stat/daily-stat.component';


const appRoutes: Routes = [
  { path: '', component: UserProfileComponent},
  {path:'nba',component:NbaComponent,children:[
    {path:'standings',component:StandingsComponent,
    children:[
    {path:'overall',component:OverallRankComponent},
    {path:'division',component:DivisionComponent},
    {path:'playoffs',component:PlayoffComponent}]
    },
    {path:'players',component:PlayersComponent,
    children:[
      {path:'active-lineup',component:ActiveLineupComponent},
      {path:'rosters',component:RosterComponent},
      {path:'active-players',component:ActivePlayerComponent}
    ]},
    {path:'stats',component:StatsComponent,
    children:[
      {path:'player',component:PlayerStatComponent},
      {path:'daily',component:DailyStatComponent}
    ]}
  ]},
]
  
  // {path:'../stats',component:NbaStatsComponent},
  // {path:'../players',component:NbaPlayersComponent},
  


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    UserProfileComponent,
    UserFormComponent,
    NbaTableComponent,
    NbaComponent,
    OverallRankComponent,
    StandingsComponent,
    DivisionComponent,
    PlayoffComponent,
    PlayersComponent,
    ActiveLineupComponent,
    RosterComponent,
    ActivePlayerComponent,
    StatsComponent,
    PlayerStatComponent,
    DailyStatComponent
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
    NbaModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
