
import {Component, ElementRef,ChangeDetectorRef,OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import {MatPaginator, MatSort} from '@angular/material';
import {NbaService} from '../../../nba-service/nba.service';


@Component({
  selector: 'app-overall',
  templateUrl: './overall-rank.component.html',
  styleUrls: ['./overall-rank.component.scss'],
})
export class OverallRankComponent implements OnInit{
  displayedColumns = ['rank', 'Games Played', 'Wins', 'Losses','Points','PointsAgainst','Name'];
  exampleDatabase = new ExampleDatabase(this.nba);
  dataSource: ExampleDataSource | null;
  date:string;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private nba:NbaService,private cdr:ChangeDetectorRef) {
  }

  ngOnInit(){
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator,this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) {
            return;
          }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
  }
}


/** Constants used to fill up our data base. */


export interface OverallRankData{
  rank:string,
  gamesPlayed:string,
  wins:string,
  losses:string,
  pts:number,
  ptsAgainst:number,
  teamName:string
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<OverallRankData[]> = new BehaviorSubject<OverallRankData[]>([]);
  data_length:any;
  constructor(private nba:NbaService) {
      this.fetchTeamsData()
  }

  get data(): any {
    return this.dataChange.value;
  }

  fetchTeamsData(){
    return this.nba.getOverallTeamStandings()
               .subscribe( data => {
                 let teamsData = data['overallteamstandings']['teamstandingsentry']
                 console.log(teamsData);
                 const copiedData = this.data.slice();
                 teamsData.forEach( team => {
                   copiedData.push( this.createNewUser( team ) )
                 } )
                 this.dataChange.next( copiedData )
               } )
  }
  createNewUser( team ){
    return {
      rank:team.rank,
      gamesPlayed:team.stats.GamesPlayed["#text"],
      wins:team.stats.Wins["#text"],
      losses:team.stats.Losses["#text"],
      pts:Math.round(team.stats.Pts["#text"]/team.stats.GamesPlayed["#text"]),
      ptsAgainst:Math.round(team.stats.PtsAgainst["#text"]/team.stats.GamesPlayed["#text"]),
      teamName:team.team.Name
      } 
  }
}
/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<OverallRankData> {

  /** Emits once if dataSource is disconnected  */
  disconnect$ = new Subject();
  /** Provides the current length (Use in paginator) */
  length: number;
  /** emits the filter value */
  _filterChange = new BehaviorSubject<string>('');

  constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator, private _sort: MatSort) {
    super();
  }

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  connect(): Observable<OverallRankData[]> {

    /** Holder for everything that affects displayed rows.  */
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
      this._filterChange,
      this._sort.sortChange,
    ];

    /** Reset the Pagination to startpage if filtering is in progress.  */
    this._filterChange
        .takeUntil(this.disconnect$)
        .subscribe(() => this.resetPaginator());

    /** Provides the actual data.  */
    return Observable
        .merge(...displayDataChanges)
        .takeUntil(this.disconnect$)
        .map(() => this.getFreshData())
        .map((data) => this.getFilteredData(data))
        .map(data => this.getSortedData(data))
        .do(data => this.setLength(data))
        .map(data => this.paginate(data));
  }


  resetPaginator() {
    return this._paginator.pageIndex = 0;
  }

  getFreshData() {
    return this._exampleDatabase.data.slice();
  }

  getFilteredData(data) {
    if (this.filter === '') {
      return data;
    }
    return data.filter((item: OverallRankData) => {
      const searchStr = (item.teamName).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });
  }

  paginate(data) {
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.splice(startIndex, this._paginator.pageSize);
  }

  setLength(data) {
    return this.length = data.length;
  }
  getSortedData(data): OverallRankData[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'rank': [propertyA, propertyB] = [a.rank, b.rank]; break;
        case'gamesPlayed': [propertyA,propertyB] = [a.gamesPlayed,b.gamesPlayed];break;
        case'wins': [propertyA,propertyB] = [a.wins,b.wins];break;
        case'losses': [propertyA,propertyB] = [a.losses,b.losses];break;
        case'pts': [propertyA,propertyB] = [a.pts,b.pts];break;
        case'ptsAgainst': [propertyA,propertyB] = [a.ptsAgainst,b.ptsAgainst];break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

  disconnect() {
    this.disconnect$.next(true);
    this.disconnect$.complete();
  }


}
