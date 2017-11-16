import { Injectable,OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService implements OnInit{

  ngOnInit(){
    
  }

  constructor(public afAuth:AngularFireAuth) { }

  login(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    console.log(new firebase.auth.GoogleAuthProvider())
  }
  logout(){
    return this.afAuth.auth.signOut()
  }
}
