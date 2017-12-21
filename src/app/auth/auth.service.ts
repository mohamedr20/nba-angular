import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'

interface Credentials{
  email:string,
  password:string
}
interface User {
  uid: string;
  email: string;
  photoURL: string;
  catchPhrase?: string;
}
@Injectable()
export class AuthService {
  user: Observable<User>;
  
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })
  }
  //Implement Email/Password Login
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }
  updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL
    }
    return userRef.set(data)
  }

  emailSignUp(Credentials){
    return this.afAuth.auth.createUserWithEmailAndPassword(Credentials.email,Credentials.password)
    }
  
  emailLogin(Credentials){
    return this.afAuth.auth.signInWithEmailAndPassword(Credentials.email,Credentials.password)
  }
  

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        localStorage.setItem('Authentication','false')
        this.router.navigate(['login']);
    });
  }
}
