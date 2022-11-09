import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinderRoutingModule } from './finder-routing.module';
import { FinderComponent } from 'src/app/components/finder/finder.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FinderComponent
  ],
  imports: [
    CommonModule,
    FinderRoutingModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ]
})
export class FinderModule { }
