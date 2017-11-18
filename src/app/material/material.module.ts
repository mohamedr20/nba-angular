import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
@NgModule({
  imports: [
    CommonModule,MatToolbarModule,MatMenuModule,MatSidenavModule,MatListModule
  ],
  exports:[MatToolbarModule,MatMenuModule,MatSidenavModule,MatListModule],
  declarations: []
})
export class MaterialModule { }
