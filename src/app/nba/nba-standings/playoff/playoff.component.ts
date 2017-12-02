
import {Component, ElementRef, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import {MatPaginator, MatSort} from '@angular/material';


@Component({
  selector: 'app-playoff',
  templateUrl: './playoff.component.html',
  styleUrls: ['./playoff.component.scss'],
})
export class PlayoffComponent  {

  displayedColumns = ['playerId', 'firstName', 'lastName', 'height','position','team'];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
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

const databased = {
  rosterplayers:{
    playerentry:
      [
        {player:{id:80653,firstName:'Alex',LastName:'Abrines',height:"6'6",position:'G'},
        team:{Name:'Thunder'}},
        {player:{id:80653,firstName:'Carlos',LastName:'Bobbinson',height:"6'3",position:'F'},
        team:{Name:'Celtics'}},
        {player:{id:80653,firstName:'Tom',LastName:'Penny',height:"6'1",position:'C'},
        team:{Name:'Pistons'}},
        {player:{id:80653,firstName:'Roberto',LastName:'Shaq',height:"6'10",position:'G'},
        team:{Name:'Magic'}},
        {player:{id:80653,firstName:'Alex',LastName:'Abrines',height:"6'6",position:'G'},
        team:{Name:'Thunder'}},
        {player:{id:80653,firstName:'Carlos',LastName:'Bobbinson',height:"6'3",position:'F'},
        team:{Name:'Celtics'}},
        {player:{id:80653,firstName:'Tom',LastName:'Penny',height:"6'1",position:'C'},
        team:{Name:'Pistons'}},
        {player:{id:80653,firstName:'Roberto',LastName:'Shaq',height:"6'10",position:'G'},
        team:{Name:'Magic'}},
        {player:{id:80653,firstName:'Alex',LastName:'Abrines',height:"6'6",position:'G'},
        team:{Name:'Thunder'}},
        {player:{id:80653,firstName:'Carlos',LastName:'Bobbinson',height:"6'3",position:'F'},
        team:{Name:'Celtics'}},
        {player:{id:80653,firstName:'Tom',LastName:'Penny',height:"6'1",position:'C'},
        team:{Name:'Pistons'}},
        {player:{id:80653,firstName:'Roberto',LastName:'Shaq',height:"6'10",position:'G'},
        team:{Name:'Magic'}},
      ]
  }
}

/** Constants used to fill up our data base. */


export interface NbaData{
  id:string,
  firstName:string,
  lastName:string,
  height:string,
  position:string,
  team:string
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<NbaData[]> = new BehaviorSubject<NbaData[]>([]);

  constructor() {
    // Fill up the database with 100 users.
    for (let i = 0; i < databased.rosterplayers.playerentry.length; i++) {
      this.addUser();
    }
  }

  get data(): NbaData[] {
    return this.dataChange.value;
  }

  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    var x  = this.data.length;
    return {
      id: (this.data.length + 1).toString(),
      firstName: databased.rosterplayers.playerentry[x].player.firstName,
      lastName: databased.rosterplayers.playerentry[x].player.LastName,
      height:databased.rosterplayers.playerentry[x].player.height,
      position:databased.rosterplayers.playerentry[x].player.position,
      team:databased.rosterplayers.playerentry[x].team.Name
    };
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

  constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator, private _sort: MatSort) {
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
    return data.filter((item: NbaData) => {
      const searchStr = (item.firstName + item.lastName).toLowerCase();
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

  getSortedData(data): NbaData[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'playerId': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'firstName': [propertyA, propertyB] = [a.firstName,b.firstName]; break;
        case 'lastName': [propertyA, propertyB] = [a.lastName,b.lastName]; break;
        case 'height': [propertyA, propertyB] = [a.height,b.height]; break;
        case 'position':[propertyA,propertyB] = [a.position,b.position];break;
        case 'team':[propertyA,propertyB] = [a.team,b.team];break;
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

