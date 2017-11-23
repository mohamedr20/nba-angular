import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-nba',
  templateUrl: './nba.component.html',
  styleUrls: ['./nba.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NbaComponent implements OnInit {
  main_page:boolean= true;

  constructor(private route:ActivatedRoute) { 
    console.log(route.firstChild)
  }

  ngOnInit() {
    
  }

  togglePage(){
    if(this.route.firstChild == null){
      return this.main_page;
    }
    else{
      this.main_page = false;
      return this.main_page;
    }
  }


}
