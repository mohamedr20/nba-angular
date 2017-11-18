import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthModule} from '../auth/auth.module';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  constructor(public auth:AuthModule) { }

  ngOnInit() {
  }

  console.log(auth.googleLogin())

}
