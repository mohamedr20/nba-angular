import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AngularFireModule} from 'angularfire2';
import {AuthModule} from './auth/auth.module';
import {MaterialModule} from './material/material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CardComponent } from './shared/card/card.component';

import { UserProfileComponent } from './user-profile/user-profile.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCuCNSm_ukd-2nULW26XxFaFBBO6Y9nHo0",
  authDomain: "nba-angular.firebaseapp.com",
  databaseURL: "https://nba-angular.firebaseio.com",
  projectId: "nba-angular",
  storageBucket: "nba-angular.appspot.com",
  messagingSenderId: "953516423796"
}

// const routes: Routes = [
//   ///...
//   { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard] },
// ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    UserProfileComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AuthModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
