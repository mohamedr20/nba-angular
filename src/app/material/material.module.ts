import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
@NgModule({
  imports: [
    CommonModule,MatTabsModule,MatToolbarModule,MatMenuModule,MatSidenavModule,
    MatListModule,MatFormFieldModule,MatCardModule,MatInputModule,MatTableModule
  ],
  exports:[MatToolbarModule,MatTabsModule,MatMenuModule,MatSidenavModule,
    MatListModule,MatFormFieldModule,MatCardModule,MatInputModule,MatTableModule],
  declarations: []
})
export class MaterialModule { }
