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
import {NbaComponent} from './nba/nba.component';
import {firebaseConfig} from '../../firebase.config';
import {StandingModule} from './nba/nba-standings/standing.module';
import {StatsModule} from './nba/stats/stats.module';
import { ErrorComponent } from './error/error.component';
import {DialogData} from './error/error.component';
import {StandingsComponent} from './nba/nba-standings/nba-standings.component';
import { OverallRankComponent } from './nba/nba-standings/overall-rank/overall-rank.component';
import { DivisionComponent } from './nba/nba-standings/division/division.component';
import { PlayoffComponent } from './nba/nba-standings/playoff/playoff.component';
import {StatsComponent} from './nba/stats/stats.component';
import {CumulativeStatsComponent} from './nba/stats/cumulative-stats/cumulative-stats.component';
import { LoginComponent } from './user-profile/login/login.component';
import { RegisterComponent } from './user-profile/register/register.component';

export const appRoutes: Routes = [
  { path: '',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'nba',component:NbaComponent,canActivate:[AuthGuard],children:[
    {path:'standings',component:StandingsComponent,children:[
      {path:'division',component:DivisionComponent},
      {path:'overall-rank',component:OverallRankComponent},
      {path:'playoff',component:PlayoffComponent}
    ]},
      // {path:'standings',children:StandingRoutes,component:StandingsComponent},
      {path:'stats',component:StatsComponent,children:[
        {path:'cumulative',component:CumulativeStatsComponent},
      ]}
    ]
  },
]

  


@NgModule({
  entryComponents:[DialogData],
  declarations: [
    DialogData,
    AppComponent,
    UserProfileComponent,
    NbaComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
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
    StatsModule,
    StandingModule,
    NbaModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
