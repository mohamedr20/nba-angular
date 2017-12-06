
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
  displayedColumns = ['rank', 'GamesPlayed', 'Wins', 'Losses','Points','PointsAgainst','Name'];
  exampleDatabase = new ExampleDatabase(this.nba);
  dataSource: ExampleDataSource | null;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private nba:NbaService,private cdr:ChangeDetectorRef) {
  }

  ngOnInit(){
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort);
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


export interface NbaData{
  rank:string,
  gamesPlayed:string,
  wins:string,
  losses:string,
  pts:string,
  ptsAgainst:string,
  teamName:string
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<NbaData[]> = new BehaviorSubject<NbaData[]>([]);
  data_length:any;
  dataApi:any;
  constructor(private nba:NbaService) {
    // Fill up the database with 100 users.

      // this.addUser(i);
      this.fetchTeamsData()

  }

  get data(): any {
    return this.dataChange.value;
  }

  /** Adds a new user to the database. */
  //  addUser(i) {
  //   const copiedData = this.data.slice();
  //   copiedData.push(this.createNewUser(i));
  //   this.dataChange.next(copiedData);
  // }

  fetchTeamsData(){
    return this.nba.getOverallTeamStandings()
               .subscribe( data => {
                 console.log(data);
                 let teamsData = data['overallteamstandings']['teamstandingsentry']
                 
                 const copiedData = this.data.slice();
                 teamsData.foreach( team => {
                   copiedData.push( this.createNewUser( team ) )
                 } )
                 // after teams are built, next it
                 this.dataChange.next( copiedData )
               } )
  }
  // createNewUser( team ){
  //   return {
  //     rank:team.rank,
  //     gamesPlayed:team.stats.GamesPlayed["#text"],
  //     wins:team.stats.Wins["#text"],
  //     losses:team.stats.Losses["#text"],
  //     pts:team.stats.Pts["#text"],
  //     ptsAgainst:team.stats.PtsAgainst["#text"],
  //     teamName:team.team.Name
  //     } 
  // }
  /** Builds and returns a new User. */
  createNewUser(i){
    this.nba.getOverallTeamStandings()
    .subscribe((data)=>{
      var obj = {
        rank:data["overallteamstandings"]["teamstandingsentry"][i]["rank"],
        gamesPlayed:data["overallteamstandings"]["teamstandingsentry"][i]["stats"]["GamesPlayed"]["#text"],
        wins:data["overallteamstandings"]["teamstandingsentry"][i]["stats"]["Wins"]["#text"],
        losses:data["overallteamstandings"]["teamstandingsentry"][i]["stats"]["Losses"]["#text"],
        pts:data["overallteamstandings"]["teamstandingsentry"][i]["stats"]["Pts"]["#text"],
        ptsAgainst:data["overallteamstandings"]["teamstandingsentry"][i]["stats"]["PtsAgainst"]["#text"],
        teamName:data["overallteamstandings"]["teamstandingsentry"][i]["team"]["Name"]
        }
      return obj;
    })
  }

}
/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<NbaData> {

  /** Emits once if dataSource is disconnected  */
  disconnect$ = new Subject();
  /** Provides the current length (Use in paginator) */
  length: number;
  /** emits the filter value */
  _filterChange = new BehaviorSubject<string>('');

  constructor(private _exampleDatabase: ExampleDatabase,private _sort: MatSort) {
    super();
  }

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  connect(): Observable<NbaData[]> {

    /** Holder for everything that affects displayed rows.  */
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      // this._paginator.page,
      this._filterChange,
      this._sort.sortChange,
    ];

    /** Reset the Pagination to startpage if filtering is in progress.  */
    // this._filterChange
    //     .takeUntil(this.disconnect$)
    //     .subscribe(() => this.resetPaginator());

    /** Provides the actual data.  */
    return Observable
        .merge(...displayDataChanges)
        .takeUntil(this.disconnect$)
        .map(() => this.getFreshData())
        .map((data) => this.getFilteredData(data))
        .map(data => this.getSortedData(data))
        .do(data => this.setLength(data))
        // .map(data => this.paginate(data));
  }


  // resetPaginator() {
  //   return this._paginator.pageIndex = 0;
  // }

  getFreshData() {
    return this._exampleDatabase.data.slice();
  }

  getFilteredData(data) {
    if (this.filter === '') {
      return data;
    }
    return data.filter((item: NbaData) => {
      const searchStr = (item.rank).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });
  }

  // paginate(data) {
  //   const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
  //   return data.splice(startIndex, this._paginator.pageSize);
  // }

  setLength(data) {
    return this.length = data.length;
  }

  getSortedData(data): NbaData[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
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
