import { Component,ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {NbaService} from './nba-service/nba.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent {
  constructor(private afs:AngularFirestore,public nba:NbaService){}


  ngOnInit(){

  }
  
  getData(){
    this.nba.getConferenceTeamStandings();
  }
}
