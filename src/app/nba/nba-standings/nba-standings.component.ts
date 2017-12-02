import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nba-standings',
  templateUrl: './nba-standings.component.html',
  styleUrls: ['./nba-standings.component.scss'],
})


export class StandingsComponent implements OnInit {
  routeLinks:any;
  activeLinkIndex = -1
  constructor(private router:Router) { 
    this.routeLinks = [
      {label:'Division',link:'./division'},
      {label:'Overall',link:'./overall-rank'},
      {label:'Playoff',link:'./playoff'}
    ]
  }

  ngOnInit():void {
    this.router.events.subscribe((res)=>{
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab=>tab.link === '.'+this.router.url))
    })
  }

}
