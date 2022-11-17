import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store'

import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';

import { State } from './reducers/calender.reducer'
import { loadCalenders, getEventBeforeAfterEvent, setSelectedAppointment } from './actions/calender.actions';

import { getAllAppointments, getAppointmentsLoading, getAppointment,  } from './selectors/calender.selectors';

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

  eventData: CalendarEvent

  appointments$: Observable<Array<CalendarEvent>>
  selectedAppointment$: Observable<CalendarEvent>
  loading$: Observable<boolean>

  dayNames = [
    'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'
  ]

  constructor(private modal: NgbModal, private store: Store<State>) {}

  ngOnInit(): void {

    this.loading$ = this.store.pipe(select(getAppointmentsLoading))

    this.appointments$ = this.store.pipe(select(getAllAppointments))

    this.selectedAppointment$ = this.store.pipe(select(getAppointment))
    
    this.store.dispatch(loadCalenders())
  }

  onHourClick($event: CalendarEvent): void {

    this.store.dispatch(setSelectedAppointment({ selectedAppointment: $event }))
    
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  changeViewDate($event: any): void {

    this.viewDate = new Date($event)
  }

  /**
   * @info An dieser Stelle musste ich mich voll auf den reaktiven Ansatz, 
   *       der von Redux und ngrx gefordert wird, konzentrieren.
   *       Als Lösung wird hier das Modal komplett reaktiv vom Store
   *       mit Daten gefüllt. Weiterhin kommt im Template des Modals
   *       ngrxLet zum Zugriff auf die Daten des Observables zum Einsatz.
   */
  switchEvent(dir: string, selectedAppointment: CalendarEvent): void {
    this.store.dispatch(getEventBeforeAfterEvent({
      dir,
      formerEvent: selectedAppointment
    }))
  }
}
