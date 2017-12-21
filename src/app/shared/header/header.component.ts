import { Component, OnInit,EventEmitter, ViewEncapsulation } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})



export class HeaderComponent{
  
  
  constructor(public auth:AuthService,private route:Router) {
    console.log(this.route.url)
    if(this.route.url == '/'){
      this.route.navigate(['login'])
    }
   }

  
   signout(){
     return this.auth.signOut();
   }

  

}
