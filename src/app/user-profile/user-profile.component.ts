import { Component, OnInit,OnDestroy, ViewEncapsulation } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AuthGuard} from '../auth/auth.guard';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit{
  message:any;
  subscription:Subscription;
  constructor(public auth:AuthService,private guard:AuthGuard) { 
    this.subscription = this.guard.getMessage().subscribe(message=>{this.message})
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

}
