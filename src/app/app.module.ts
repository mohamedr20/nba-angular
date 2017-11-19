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

import {NbaTableComponent} from './nba/nba-table/nba-table.component';
import {firebaseConfig} from '../../firebase.config';

const appRoutes: Routes = [
  { path: '', component: UserProfileComponent},
  {path:'nba-standings',component:NbaTableComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    UserProfileComponent,
    UserFormComponent,
    NbaTableComponent
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
