import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarMonthViewDay } from 'angular-calendar';

import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store'
import { State } from '../../reducers/calender.reducer'

import { getAllAppointments, getAppointmentsLoading } from '../../selectors/calender.selectors';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit {

  appointments$: Observable<Array<any>>
  loading$: Observable<boolean>

  view: CalendarView = CalendarView.Month;

  @Input() viewDate: Date
  @Input() events: CalendarEvent[]
  @Output() viewDateChange = new EventEmitter<Date>();

  selectedDay: any

  dayNames = [
    'S', 'M', 'D', 'M', 'D', 'F', 'S'  
  ]

  constructor(private store: Store<State>) { }

  ngOnInit(): void {

    this.appointments$ = this.store.pipe(select(getAllAppointments))
    this.loading$ = this.store.pipe(select(getAppointmentsLoading))
  }

  dayClicked($event: CalendarMonthViewDay): void {

    this.viewDate = new Date($event.date)
    this.selectedDay = $event
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
        
    body.forEach((day) => {
      if (
        this.selectedDay  && this.selectedDay.date.getTime() === day.date.getTime()
        )
       {
        day.cssClass = 'cal-day-selected';
      }
    });
  }

}
