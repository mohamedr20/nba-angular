import {Component, ElementRef, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {NbaService} from '../../nba-service/nba.service';
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

@Component({
  selector: 'nba-table',
  styleUrls: ['nba-table.component.scss'],
  templateUrl: 'nba-table.component.html',
})
export class NbaTableComponent {
  displayedColumns = ['Rank', 'Team Name','Games','Wins', 'Losses','PPG','Points Against'];
  dataSource: NbaStandingData | null;

  constructor(private nba:NbaService){}

  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    // this.dataSource = new ExampleDataSource(this.exampleDatabase);
    // Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //     .debounceTime(150)
    //     .distinctUntilChanged()
    //     .subscribe(() => {
    //       if (!this.dataSource) { return; }
    //       this.dataSource.filter = this.filter.nativeElement.value;
    //     });
    this.nba.getOverallTeamStandings()
  }
}













