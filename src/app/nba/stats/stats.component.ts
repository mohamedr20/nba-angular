import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatsComponent implements OnInit {
  routeLinks:any;
  activeLinkIndex = -1
  constructor(private router:Router) { 
    this.routeLinks = [
      {label:'Cumulative',link:'./cumulative'}
    ]
  }

  ngOnInit():void {
    this.router.events.subscribe((res)=>{
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab=>tab.link === '.'+this.router.url))
    })
  }

}
