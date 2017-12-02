import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NbaService} from '../../../nba-service/nba.service'
@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss'],
})
export class RosterComponent implements OnInit {
  


  constructor(private nba:NbaService) { }

  
  
  ngOnInit() {

  }

}
