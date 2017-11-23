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
interface NbaData{
  rank:number;
  teamName:string;
  gamesPlayed:number;
  wins:number;
  losses:number;
  PPG:number;
  poinstsAgainst:number;
}
const data : NbaData[] = [
{rank:1,teamName:'Celtics',gamesPlayed:12,wins:12,losses:0,PPG:110,poinstsAgainst:87},
{rank:2,teamName:'Cavs',gamesPlayed:12,wins:9,losses:3,PPG:106,poinstsAgainst:97},
{rank:3,teamName:'Raptors',gamesPlayed:12,wins:8,losses:4,PPG:100,poinstsAgainst:98},
{rank:4,teamName:'Bucks',gamesPlayed:12,wins:7,losses:5,PPG:99,poinstsAgainst:98}
]

export class ExampleDataSource extends DataSource<any>{
  connect():Observable<NbaData[]>{
    return Observable.of(data)
  }
  disconnect(){}
}

@Injectable()
@Component({
  selector: 'nba-table',
  styleUrls: ['nba-table.component.scss'],
  templateUrl: 'nba-table.component.html',
})
export class NbaTableComponent {
  displayedColumns = ['Rank', 'Team Name','Games','Wins']
  dataSource = new ExampleDataSource();

  constructor(public http:Http,private nba:NbaService){}
  
  @ViewChild('filter') filter: ElementRef;
  

  getData(){
    console.log('get data fired')
    return this.http.get('./assets/mock-data.json')
      .map((res:Response)=>res.json())
  }



  ngOnInit() {
      // Observable.fromEvent(this.filter.nativeElement,'keyup')
      //   .debounceTime(150)
      //   .distinctUntilChanged()
      //   .subscribe(()=>{
      //     if(!this.dataSource){return;}
      //     this.dataSource.filter = this.filter.nativeElement.value;
      //     console.log(this.dataSource)
      //     console.log(this.dataSource.filter);
      //   })


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













