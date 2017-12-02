import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-nba',
  templateUrl: './nba.component.html',
  styleUrls: ['./nba.component.scss'],
})
export class NbaComponent implements OnInit {
  public main_page:boolean= true;

  constructor(private route:ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.togglePage()
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
