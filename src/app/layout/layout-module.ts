import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayout } from './main-layout/main-layout';
import { SharedModule } from '../components/shared-module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainLayout
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    MainLayout
  ]
})
export class LayoutModule { }
