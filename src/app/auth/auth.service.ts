import { Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore,AngularFirestoreDocument} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'

interface User{
  uid:string,
  email:string,
  photoUrl?:string,
  displayName:string
}


@Injectable()
export class AuthService{
  user:Observable<User>;


  constructor(private afAuth:AngularFireAuth,
              private afStore:AngularFirestore,
              private router:Router
      ) { 

        this.user = this.afAuth.authState
          .switchMap(user=>{
            if(user){
              return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
            }
            else{
              return Observable.of(null);
            }
          })
      }
  
    public googleLogin(){
      const provider = new firebase.auth.GoogleAuthProvider();
      return this.OAuthLogin(provider);
    }

    private OAuthLogin(provider){
      return this.afAuth.auth.signInWithPopup(provider)
        .then((credential)=>{
          this.updateUserData(credential.user)
        })
    }

    private updateUserData(user){
      const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.uid}`);
      const data : User=({
        uid:user.id,
        email:user.email,
        photoUrl:user.photoUrl,
        displayName:user.displayName
      })
      return userRef.set(data)
    }
  
}
