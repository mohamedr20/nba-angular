import { NgModule }       from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {MaterialModule} from '../material/material.module'
@NgModule({
    imports:[CommonModule,MaterialModule,RouterModule],
    declarations:[FooterComponent,HeaderComponent],
    exports:[FooterComponent,HeaderComponent]
})

export class SharedModule{}