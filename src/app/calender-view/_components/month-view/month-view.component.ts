import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store'
import { State } from '../../reducers/calender.reducer'
import { daySelected } from '../../actions/calender.actions';

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

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.appointments$ = this.store.pipe(select(getAllAppointments))
    this.loading$ = this.store.pipe(select(getAppointmentsLoading))


  }

  dayClicked($event: any): void {
    console.log('day-clicked:: ', $event)

    this.viewDateChange.emit($event) // $event.date

    console.log(this.viewDateChange)

    // this.store.dispatch(daySelected({date: $event.date}))


  }

}
