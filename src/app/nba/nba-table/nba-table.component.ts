import {Component, ElementRef, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {NbaService} from '../../nba-service/nba.service'
import {Http,Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';


import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

/**
 * @title Table with filtering
 */
interface NbaStandingData{
  rank:number;
  teamName:string;
  gamesPlayed:number;
  wins:number;
  losses:number;
  points:number;
  poinstsAgainst:number;
}
@Injectable()
@Component({
  selector: 'nba-table',
  styleUrls: ['nba-table.component.scss'],
  templateUrl: 'nba-table.component.html',
})
export class NbaTableComponent {
  displayedColumns = ['Rank', 'Team Name','Games','Wins', 'Losses','PPG','Points Against'];
  // dataSource: NbaStandingData | null;

  constructor(public http:Http){}
  
  @ViewChild('filter') filter: ElementRef;
  
  dataSource:any = this.getData()
  .subscribe((data)=>{
    return data;
  })
  getData(){
    console.log('get data fired')
    return this.http.get('./assets/mock-data.json')
      .map((res:Response)=>res.json())
  }



  ngOnInit() {
    this.getData()
      .subscribe((data)=>{
        
        return data;
      })
      Observable.fromEvent(this.filter.nativeElement,'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(()=>{
          if(!this.dataSource){return;}
          this.dataSource.filter = this.filter.nativeElement.value;
          console.log(this.dataSource)
          console.log(this.dataSource.filter);
        })
    
    // this.dataSource = new ExampleDataSource(this.exampleDatabase);
    // Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //     .debounceTime(150)
    //     .distinctUntilChanged()
    //     .subscribe(() => {
    //       if (!this.dataSource) { return; }
    //       this.dataSource.filter = this.filter.nativeElement.value;
    //     });
  }
}













