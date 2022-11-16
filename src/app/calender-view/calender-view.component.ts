import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';

import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { select, Store } from '@ngrx/store'

import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';

import { State } from './reducers/calender.reducer'
import { loadCalenders } from './actions/calender.actions';

import { getAllAppointments, getAppointmentsLoading } from './selectors/calender.selectors';

@Component({
  selector: 'app-calender-view',
  templateUrl: './calender-view.component.html',
  styleUrls: ['./calender-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalenderViewComponent implements OnInit  {

  view: CalendarView = CalendarView.Week;

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  viewDate = new Date();

  locale = 'de'
  showMarker = true

  eventsData: CalendarEvent

  appointments$: Observable<Array<CalendarEvent>>
  loading$: Observable<boolean>

  dayNames = [
    'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'
  ]

  constructor(private modal: NgbModal, private store: Store<State>) {}

  ngOnInit(): void {

    this.loading$ = this.store.pipe(select(getAppointmentsLoading))

    this.appointments$ = this.store.pipe(select(getAllAppointments))
    
    this.store.dispatch(loadCalenders())
  }

  onHourClick($event: CalendarEvent): void {

    this.openModal($event)
  }

  private openModal($event: CalendarEvent): void {
        
    this.eventsData = $event;
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  changeViewDate($event: any): void {

    this.viewDate = new Date($event)
  }

  switchEvent(dir: string): void {
    if (dir === 'left') {
      // jump back
      // this.store.dispatch()
    } else {

    }
  }
}
