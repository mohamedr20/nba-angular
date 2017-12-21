
import {Component, ElementRef,OnInit, ViewChild} from '@angular/core';
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
  selector: 'app-cumulative-stats',
  templateUrl: './cumulative-stats.component.html',
  styleUrls: ['./cumulative-stats.component.scss']
})
export class CumulativeStatsComponent implements OnInit {
  displayedColumns = ['Name','Team','2PFG','3PFG','FT','GP'];
  
    exampleDatabase = new ExampleDatabase(this.nba);
    dataSource: ExampleDataSource | null;
  
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    constructor(private nba:NbaService) {
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
  
  
  interface Player{
    full_name:string,
    team:string;
    Field_Goal:string;
    Three_Point_Percentage:string;
    Free_Throw_Percentage:string;
    GamesPlayed:string;
  }
  
  /** An example database that the data source uses to retrieve data for the table. */
  export class ExampleDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
    data_length:any;
    constructor(private nba:NbaService) {
        this.fetchTeamsData()
    }
  
    get data(): any {
      return this.dataChange.value;
    }
  
  
  fetchTeamsData(){
    return this.nba.getCumulativePlayerStats()
    .subscribe((data)=>{
      console.log(data);
      const copiedData = this.data.slice()
      const dataArr = data["cumulativeplayerstats"]["playerstatsentry"]
      dataArr.forEach((team)=>{
        copiedData.push(this.createNewUser(team))
      })
      this.dataChange.next(copiedData);
    })
  }
  
  checkForNAN(number){
    if(number == NaN){
      number  = 0;
      console.log(number);
      return number;
    }
    else{
      return number;
    }
  }
    createNewUser(team){
        var obj =  {
        full_name:team["player"]["FirstName"]+' '+team["player"]["LastName"],
        team:team["team"]["Name"],
        Field_Goal:parseInt(((Number(team["stats"]["Fg2PtMade"]["#text"])/Number(team["stats"]["Fg2PtAtt"]["#text"]))*100).toFixed(2),10) || 0,
        Three_Point_Percentage:Number(((Number(team["stats"]["Fg3PtMade"]["#text"])/Number(team["stats"]["Fg3PtAtt"]["#text"]))*100).toFixed(2)) || 0,
        Free_Throw_Percentage:Number(((Number(team["stats"]["FtMade"]["#text"])/Number(team["stats"]["FtAtt"]["#text"]))*100).toFixed(2))||0,
        GamesPlayed:team["stats"]["GamesPlayed"]["#text"]
      }
      return obj
    }   
  }
  /**
   * Data source to provide what data should be rendered in the table. Note that the data source
   * can retrieve its data in any way. In this case, the data source is provided a reference
   * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
   * the underlying data. Instead, it only needs to take the data and send the table exactly what
   * should be rendered.
   */
  export class ExampleDataSource extends DataSource<Player> {
  
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
  
    connect(): Observable<Player[]> {
  
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
      return data.filter((item: Player) => {
        const searchStr = (item.team+item.full_name).toLowerCase();
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
    getSortedData(data): Player[] {
      if (!this._sort.active || this._sort.direction === '') {
        return data;
      }
      return data.sort((a, b) => {
        let propertyA: number | string = '';
        let propertyB: number | string = '';
  
        switch (this._sort.active) {
          case'GamesPlayed': [propertyA,propertyB] = [a.gamesPlayed,b.gamesPlayed];break;
          case'Field_Goal': [propertyA,propertyB] = [a.Field_Goal,b.Field_Goal];break;
          case'Three_Point_Percentage': [propertyA,propertyB] = [a.Three_Point_Percentage,b.Three_Point_Percentage];break;
          case'Free_Throw_Percentage': [propertyA,propertyB] = [a.Free_Throw_Percentage,b.Free_Throw_Percentage];break;
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
