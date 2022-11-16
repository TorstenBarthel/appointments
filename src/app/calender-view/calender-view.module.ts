import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalenderViewComponent } from './calender-view.component';
import { StoreModule } from '@ngrx/store';
import * as fromCalender from './reducers/calender.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CalenderEffects } from './effects/calender.effects';
import { CalendarModule, DateAdapter as AngularCalendarDateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarUtilsModule } from '../calendar-utils/calendar-utils.module'

import { FormsModule } from '@angular/forms';
import { MonthViewComponent } from './_components/month-view/month-view.component';
import { NextViewingComponent } from './_components/next-viewing/next-viewing.component';

import { CalenderService } from './calender.service'

@NgModule({
  declarations: [
    CalenderViewComponent,
    MonthViewComponent,
    NextViewingComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCalender.calenderFeatureKey, fromCalender.reducer),
    EffectsModule.forFeature([CalenderEffects]),
    CalendarModule.forRoot({
      provide: AngularCalendarDateAdapter,  
      useFactory: adapterFactory,
    }),
    CalendarUtilsModule,
    FormsModule

  ],
  providers: [
    CalenderService
  ],
  exports: [
    CalenderViewComponent
  ]
})
export class CalenderViewModule { }
