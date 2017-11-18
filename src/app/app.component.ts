import { Component,ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs';

interface Book{
  title:string;
  content:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent {
  constructor(private afs:AngularFirestore){}

  bookCol : AngularFirestoreCollection<Book>
  books:Observable<Book[]>

  ngOnInit(){
    this.bookCol = this.afs.collection('books');
    this.books = this.bookCol.valueChanges();
    console.log(this.books);
  }



  title = 'app';
}
