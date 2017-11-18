import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,MatToolbarModule,MatMenuModule,MatSidenavModule,
    MatListModule,MatFormFieldModule,MatCardModule,MatInputModule
  ],
  exports:[MatToolbarModule,MatMenuModule,MatSidenavModule,
    MatListModule,MatFormFieldModule,MatCardModule,MatInputModule],
  declarations: []
})
export class MaterialModule { }
