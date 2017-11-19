import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbaService} from './nba.service';
@NgModule({
  imports: [
    CommonModule
  ],
  providers:[NbaService],
  declarations: []
})
export class NbaModule { }
