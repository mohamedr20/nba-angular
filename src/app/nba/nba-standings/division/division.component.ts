
// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { DataSource } from '@angular/cdk/collections';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
// import { NbaService } from '../../../nba-service/nba.service';
// import {Http,Response} from '@angular/http';

// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/operator/takeUntil';
// import { MatPaginator, MatSort } from '@angular/material';


// @Component({
//   selector: 'app-division',
//   styleUrls: ['division.component.scss'],
//   templateUrl: 'division.component.html',
// })
// export class DivisionComponent {
//   displayedColumns = ['Division Name', 'Division Rank', 'Games Played', 'Wins', 'Losses', 'PPG','PPG Against','Team Name'];
//   exampleDatabase = new ExampleDatabase(this.http);
//   dataSource: ExampleDataSource | null;
//   string:any = "This is the data";
//   @ViewChild('filter') filter: ElementRef;
//   @ViewChild(MatPaginator) paginator: MatPaginator;
//   @ViewChild(MatSort) sort: MatSort;

//   constructor(private http:Http,private nba: NbaService) {
    
//   }



//   ngOnInit() {
//     this.nba.getDivisionStandings()
//     .then((data)=>{
//       console.log(data);
//     })
//     .catch((err)=>{
//       console.log(err);
//     })

//     this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
//     Observable.fromEvent(this.filter.nativeElement, 'keyup')
//       .debounceTime(150)
//       .distinctUntilChanged()
//       .subscribe(() => {
//         if (!this.dataSource) {
//           return;
//         }
//         this.dataSource.filter = this.filter.nativeElement.value;
//       });
//   }
// }








// const databased = {
//   rosterplayers:{
//     playerentry:
//       [
//         {player:{id:80653,firstName:'Alex',LastName:'Abrines',height:"6'6",position:'G'},
//         team:{Name:'Thunder'}},
//         {player:{id:80653,firstName:'Carlos',LastName:'Bobbinson',height:"6'3",position:'F'},
//         team:{Name:'Celtics'}},
//         {player:{id:80653,firstName:'Tom',LastName:'Penny',height:"6'1",position:'C'},
//         team:{Name:'Pistons'}},
//         {player:{id:80653,firstName:'Roberto',LastName:'Shaq',height:"6'10",position:'G'},
//         team:{Name:'Magic'}},
//         {player:{id:80653,firstName:'Alex',LastName:'Abrines',height:"6'6",position:'G'},
//         team:{Name:'Thunder'}},
//         {player:{id:80653,firstName:'Carlos',LastName:'Bobbinson',height:"6'3",position:'F'},
//         team:{Name:'Celtics'}},
//         {player:{id:80653,firstName:'Tom',LastName:'Penny',height:"6'1",position:'C'},
//         team:{Name:'Pistons'}},
//         {player:{id:80653,firstName:'Roberto',LastName:'Shaq',height:"6'10",position:'G'},
//         team:{Name:'Magic'}},
//         {player:{id:80653,firstName:'Alex',LastName:'Abrines',height:"6'6",position:'G'},
//         team:{Name:'Thunder'}},
//         {player:{id:80653,firstName:'Carlos',LastName:'Bobbinson',height:"6'3",position:'F'},
//         team:{Name:'Celtics'}},
//         {player:{id:80653,firstName:'Tom',LastName:'Penny',height:"6'1",position:'C'},
//         team:{Name:'Pistons'}},
//         {player:{id:80653,firstName:'Roberto',LastName:'Shaq',height:"6'10",position:'G'},
//         team:{Name:'Magic'}},
//       ]
//   }
// }

// /** Constants used to fill up our data base. */



// export interface NbaData {
//   divisionName: string;
//   divisionRank: string;
//   GamesPlayed: number;
//   Wins: number;
//   Losses: number;
//   PointsAgainst: number;
//   Points: number;
//   TeamName: string;
// }

// // export class ExampleHttpDB {
// //   constructor(private http: Http) {}

// //   getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
// //     const href = 'https://api.github.com/search/issues';
// //     const requestUrl =
// //       `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

// //     return this.http.get(requestUrl)
// //                     .map(response => response.json() as GithubApi);
// //   }
// // }

// // /** An example database that the data source uses to retrieve data for the table. */
// export class ExampleDatabase {
  
//   /** Stream that emits whenever the data has been modified. */
//   dataChange: BehaviorSubject<NbaData[]> = new BehaviorSubject<NbaData[]>([])

//   constructor(private http:Http) {
//   }
//   private sportsURl = 'https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/division_team_standings.json?teamstats=W,L,PTS,PTSA'
  
//   getDivisionData():Observable<NbaData[]>{
//     return this.http.get(this.sportsURl)
//     .map(this.extractData)
//   }

//   extractData(result:Response):NbaData[]{
//     return result.json().map(data=>{
//       let x = data.divisionteamstandings.division.length;
//       return {
//         divisionName: data.divisionteamstandings.division[x]["@name"].toString(),
//         divisionRank: data.divisionteamstandings.division[x].teamentry[x].rank.toString(),
//         Wins: data.divisionteamstandings.division[x].teamentry[x].stats.Wins["#text"],
//         Losses: data.divisionteamstandings.division[x].teamentry[x].stats.Losses["#text"],
//         Points: Math.round(data.divisionteamstandings.division[x].teamentry[x].stats.Points["#text"]/data.divisionteamstandings.division[x].teamentry[x].stats.GamesPlayed["text"]),
//         PointsAgainst: Math.round(data.divisionteamstandings.division[x].teamentry[x].stats.PointsAgainst["#text"]/data.divisionteamstandings.division[x].teamentry[x].stats.GamesPlayed["text"]),
//         GamesPlayed: data.divisionteamstandings.division[x].teamentry[x].stats.GamesPlayed["#text"],
//         TeamName: data.divisionteamstandings.division[x].teamentry[x].Team.Name
//       }
//     })
//   }
  

//   get data(): NbaData[] {
//     return this.dataChange.value;
//   }
// }
//   // /** Adds a new user to the database. */
//   // addUser() {
//   //   const copiedData = this.data.slice();
//   //   copiedData.push(this.createNewUser());
//   //   this.dataChange.next(copiedData);
//   // }



//   // console.log(data.divisionteamstandings.division[0]["@name"]);
//   // console.log(data.divisionteamstandings.division[0].teamentry[0].rank);
//   // console.log(data.divisionteamstandings.division[0].teamentry[0].stats.GamesPlayed["#text"]);
//   // console.log(data.divisionteamstandings.division[0].teamentry[0].stats.Losses["#text"]);
//   // console.log(data.divisionteamstandings.division[0].teamentry[0].stats.Wins["#text"]);
//   // console.log(data.divisionteamstandings.division[0].teamentry[0].stats.Pts["#text"]/23);
//   // console.log(data.divisionteamstandings.division[0].teamentry[0].stats.PtsAgainst["#text"]/23);
//   // console.log(data.divisionteamstandings.division[0].teamentry[0].team.Name);
//   /** Builds and returns a new User. */

//   // private createNewUser() {
//   //   var x = this.data.length;

//   //   return {
//   //     divisionName: this.databased2.divisionteamstandings.division[x]["@name"].toString(),
//   //     divisionRank: this.databased2.divisionteamstandings.division[x].teamentry[x].rank.toString(),
//   //     Wins: this.databased2.divisionteamstandings.division[x].teamentry[x].stats.Wins["#text"],
//   //     Losses: this.databased2.divisionteamstandings.division[x].teamentry[x].stats.Losses["#text"],
//   //     Points: Math.round(this.databased2.divisionteamstandings.division[x].teamentry[x].stats.Points["#text"]/databased2.divisionteamstandings.division[x].teamentry[x].stats.GamesPlayed["text"]),
//   //     PointsAgainst: Math.round(this.databased2.divisionteamstandings.division[x].teamentry[x].stats.PointsAgainst["#text"]/databased2.divisionteamstandings.division[x].teamentry[x].stats.GamesPlayed["text"]),
//   //     GamesPlayed: this.databased2.divisionteamstandings.division[x].teamentry[x].stats.GamesPlayed["#text"],
//   //     TeamName: this.databased2.divisionteamstandings.division[x].teamentry[x].Team.Name
//   //   };
//   // }


// /**
//  * Data source to provide what data should be rendered in the table. Note that the data source
//  * can retrieve its data in any way. In this case, the data source is provided a reference
//  * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
//  * the underlying data. Instead, it only needs to take the data and send the table exactly what
//  * should be rendered.
//  */
// export class ExampleDataSource extends DataSource<NbaData> {

//   /** Emits once if dataSource is disconnected  */
//   disconnect$ = new Subject();
//   /** Provides the current length (Use in paginator) */
//   length: number;
//   /** emits the filter value */
//   _filterChange = new BehaviorSubject<string>('');

//   constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator, private _sort: MatSort) {
//     super();
//   }

//   get filter(): string {
//     return this._filterChange.value;
//   }

//   set filter(filter: string) {
//     this._filterChange.next(filter);
//   }


//   connect(): Observable<NbaData[]> {

//     /** Holder for everything that affects displayed rows.  */
//     const displayDataChanges = [
//       this._exampleDatabase.dataChange,
//       this._paginator.page,
//       this._filterChange,
//       this._sort.sortChange,
//     ];

//     // /** Reset the Pagination to startpage if filtering is in progress.  */
//     this._filterChange
//       .takeUntil(this.disconnect$)
//       .subscribe(() => this.resetPaginator());


//     /** Provides the actual data.  */
//     return Observable
//       .merge(...displayDataChanges)
//       .takeUntil(this.disconnect$)
//       .map(() => this.getFreshData())
//       .map((data) => this.getFilteredData(data))
//       .map(data => this.getSortedData(data))
//       .do(data => this.setLength(data))
//       .map(data => this.paginate(data));
//   }


//   resetPaginator() {
//     return this._paginator.pageIndex = 0;
//   }

//   getFreshData() {
//     return this._exampleDatabase.data.slice();
//   }

//   getFilteredData(data) {
//     // if (this.filter === '') {
//     //   return data;
//     // }
//     // return data.filter((item: NbaData) => {
//     //   const searchStr = (item.firstName + item.lastName).toLowerCase();
//     //   return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//     // });
//     return data
//   }

//   paginate(data) {
//     const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
//     return data.splice(startIndex, this._paginator.pageSize);
//   }

//   setLength(data) {
//     return this.length = data.length;
//   }

//   getSortedData(data): NbaData[] {
//     if (!this._sort.active || this._sort.direction === '') {
//       return data;
//     }
//     return data.sort((a, b) => {
//       let propertyA: number | string = '';
//       let propertyB: number | string = '';

//       switch (this._sort.active) {
//         case 'playerId': [propertyA, propertyB] = [a.id, b.id]; break;
//         case 'firstName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;
//         case 'lastName': [propertyA, propertyB] = [a.lastName, b.lastName]; break;
//         case 'height': [propertyA, propertyB] = [a.height, b.height]; break;
//         case 'position': [propertyA, propertyB] = [a.position, b.position]; break;
//         case 'team': [propertyA, propertyB] = [a.team, b.team]; break;
//       }

//       const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//       const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

//       return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
//     });
//   }

//   disconnect() {
//     this.disconnect$.next(true);
//     this.disconnect$.complete();
//   }
// }


// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { DataSource } from '@angular/cdk/collections';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
// import { NbaService } from '../../../nba-service/nba.service';
// import {Http,Response} from '@angular/http';
// import {HttpClient,HttpHeaders} from '@angular/common/http';



// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/operator/takeUntil';
// import { MatPaginator, MatSort } from '@angular/material';

// @Component({
//   selector: 'app-division',
//   styleUrls: ['division.component.scss'],
//   templateUrl: 'division.component.html',
// })
// export class DivisionComponent {
//   apiData:any;
//   dataSource: ExampleDataSource | null;
//   exampleDatabase = ExampleHTTPDatabase |null;
//   displayedColumns = ['Division Name', 'Division Rank', 'Games Played', 'Wins', 'Losses', 'PPG','PPG Against','Team Name'];
  
//   constructor( private nba:NbaService,private http:Http) {
//     console.log(this.nba.getDivisionStandings())
//   }
//   @ViewChild('filter') filter: ElementRef;
//   @ViewChild(MatPaginator) paginator: MatPaginator;
//   @ViewChild(MatSort) sort: MatSort;


//   ngOnInit() {
//     this.dataSource = new ExampleDataSource(this.ExampleHTTPDatabase, this.paginator, this.sort);
//     Observable.fromEvent(this.filter.nativeElement, 'keyup')
//         .debounceTime(150)
//         .distinctUntilChanged()
//         .subscribe(() => {
//           if (!this.dataSource) {
//             return;
//           }
//           this.dataSource.filter = this.filter.nativeElement.value;
//         });
//       }
// }


// export interface NbaData {
//   divisionName: string;
//   divisionRank: string;
//   GamesPlayed: number;
//   Wins: number;
//   Losses: number;
//   PointsAgainst: number;
//   Points: number;
//   TeamName: string;
// }

// /** An example database that the data source uses to retrieve data for the table. */
// export class ExampleHTTPDatabase {

//   /** Stream that emits whenever the data has been modified. */
//   dataChange: BehaviorSubject<NbaData[]> = new BehaviorSubject<NbaData[]>([]);
//   constructor(private http:Http,private nba:NbaService) {
//     // Fill up the database with 100 users.
    
//     // for (let i = 0; i < this.getDivisionData().divisionteamstandings.division.length; i++) {
//     //   this.addTeam();
//     // }
//   }

//   getDivisionData(){
//     return this.nba.getDivisionStandings()
//     .map(response =>response as NbaData)
//   }
//   get data(): NbaData[] {
//     return this.dataChange.value;
//   }

//   /** Adds a new user to the database. */
//   addTeam() {
//     const copiedData = this.data.slice();
//     // copiedData.push(this.createNewUser());
//     this.dataChange.next(copiedData);
//   } 


 
//   /** Builds and returns a new User. */
//   // private createNewUser() {
//   //   var x  = this.data.length;
//   //   return {
//   //     // divisionName: this.getDivisionData().divisionteamstandings.division[x]["@name"].toString(),
//   //     // divisionRank: this.getDivisionData().divisionteamstandings.division[x].teamentry[x].rank.toString(),
//   //     // Wins: this.getDivisionData().divisionteamstandings.division[x].teamentry[x].stats.Wins["#text"],
//   //     // Losses: this.getDivisionData().divisionteamstandings.division[x].teamentry[x].stats.Losses["#text"],
//   //     // Points: Math.round(this.getDivisionData().divisionteamstandings.division[x].teamentry[x].stats.Points["#text"]/this.getDivisionData().divisionteamstandings.division[x].teamentry[x].stats.GamesPlayed["text"]),
//   //     // PointsAgainst: Math.round(this.getDivisionData().divisionteamstandings.division[x].teamentry[x].stats.PointsAgainst["#text"]/this.getDivisionData().divisionteamstandings.division[x].teamentry[x].stats.GamesPlayed["text"]),
//   //     // GamesPlayed: this.getDivisionData().divisionteamstandings.division[x].teamentry[x].stats.GamesPlayed["#text"],
//   //     // TeamName: this.getDivisionData().divisionteamstandings.division[x].teamentry[x].Team.Name
//   //   };
//   // }
// }

// /**
//  * Data source to provide what data should be rendered in the table. Note that the data source
//  * can retrieve its data in any way. In this case, the data source is provided a reference
//  * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
//  * the underlying data. Instead, it only needs to take the data and send the table exactly what
//  * should be rendered.
//  */
// export class ExampleDataSource extends DataSource<NbaData> {

//   /** Emits once if dataSource is disconnected  */
//   disconnect$ = new Subject();
//   /** Provides the current length (Use in paginator) */
//   length: number;
//   /** emits the filter value */
//   _filterChange = new BehaviorSubject<string>('');

//   constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator, private _sort: MatSort) {
//     super();
//   }

//   get filter(): string {
//     return this._filterChange.value;
//   }

//   set filter(filter: string) {
//     this._filterChange.next(filter);
//   }

//   connect(): Observable<NbaData[]> {

//     /** Holder for everything that affects displayed rows.  */
//     const displayDataChanges = [
//       this._exampleDatabase.dataChange,
//       this._paginator.page,
//       this._filterChange,
//       this._sort.sortChange,
//     ];

//     /** Reset the Pagination to startpage if filtering is in progress.  */
//     this._filterChange
//         .takeUntil(this.disconnect$)
//         .subscribe(() => this.resetPaginator());

//     /** Provides the actual data.  */
//     return Observable
//         .merge(...displayDataChanges)
//         .takeUntil(this.disconnect$)
//         .map(() => this.getFreshData())
//         .map((data) => this.getFilteredData(data))
//         .map(data => this.getSortedData(data))
//         .do(data => this.setLength(data))
//         .map(data => this.paginate(data));
//   }


//   resetPaginator() {
//     return this._paginator.pageIndex = 0;
//   }

//   getFreshData() {
//     return this._exampleDatabase.data.slice();
//   }

//   getFilteredData(data) {
//     if (this.filter === '') {
//       return data;
//     }
//     return data.filter((item: NbaData) => {
//       const searchStr = (item.divisionName + item.divisionRank+item.TeamName).toLowerCase();
//       return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//     });
//   }

//   paginate(data) {
//     const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
//     return data.splice(startIndex, this._paginator.pageSize);
//   }

//   setLength(data) {
//     return this.length = data.length;
//   }

//   getSortedData(data): NbaData[] {
//     if (!this._sort.active || this._sort.direction === '') {
//       return data;
//     }
//     return data.sort((a, b) => {
//       let propertyA: number | string = '';
//       let propertyB: number | string = '';
//       switch (this._sort.active) {
//         case 'divisionName':
//           [propertyA, propertyB] = [a.divisionName, b.divisionName];
//           break;
//         case 'divisionRank':
//           [propertyA, propertyB] = [a.divisionRank, b.divisionRank];
//           break;
//         case 'Wins':
//           [propertyA, propertyB] = [a.Wins, b.Wins];
//           break;
//         case 'Losses':
//           [propertyA, propertyB] = [a.Losses, b.Losses];
//           break;
//         case 'Points':
//           [propertyA, propertyB] = [a.Points, b.Points];
//         break;
//         case 'PointsAgainst':
//           [propertyA, propertyB] = [a.PointsAgainst, b.PointsAgainst];
//         break;
//         case 'GamesPlayed':
//           [propertyA, propertyB] = [a.GamesPlayed, b.GamesPlayed];
//         break;
//         case 'TeamName':
//           [propertyA, propertyB] = [a.TeamName, b.TeamName];
//         break;
//       }

//       const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//       const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

//       return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
//     });
//   }

//   disconnect() {
//     this.disconnect$.next(true);
//     this.disconnect$.complete();
//   }

// }



import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatSpinner} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {NbaService} from '../../../nba-service/nba.service';
/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-division',
  styleUrls: ['division.component.scss'],
  templateUrl: 'division.component.html',
})
export class DivisionComponent implements AfterViewInit {
  displayedColumns = ['Division Name', 'Division Rank', 'Games Played', 'Wins', 'Losses', 'PPG','PPG Against','Team Name'];

  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpClient,private nba:NbaService) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http,this.nba);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues();
        }),
        map(data => {
          console.log(data);
          console.log(data.divisionteamstandings.division);
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.divisionteamstandings.division.length;
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }
}

export interface NbaDataApi {
  items: NbaData[];
  total_count: number;
}

export interface NbaData {
  divisionName: string;
  divisionRank: string;
  GamesPlayed: number;
  Wins: number;
  Losses: number;
  PointsAgainst: number;
  Points: number;
  TeamName: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: HttpClient,private NbaService) {}
  credentials = "bW9oYW1lZHIyMDpoZXloZXkxMkA="
  headers = new Headers();
  getRepoIssues(): Observable<any> {
    const href = 'https://api.github.com/search/issues';
    return this.http.get('https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/division_team_standings.json?teamstats=W,L,PTS,PTSA',
    {headers:new HttpHeaders().set('Authorization','Basic '+this.credentials)})
  }

  
}