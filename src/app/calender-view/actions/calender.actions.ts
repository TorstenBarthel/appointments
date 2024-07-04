import { createAction, props } from '@ngrx/store';
import { CalendarEvent } from 'angular-calendar';

export enum CalenderActionTypes {
  LoadCalenders = '[Calender] Load Calenders',
  LoadCalendersSuccess = '[Calender] Load Calenders Success',
  LoadCalendersFailure = '[Calender] Load Calenders Failure',
  DaySelected = '[Calender] Day Selected',
  GetEventBeforeAfterEvent = '[Calender] Get Event Before After Event',
  GetEventBeforeAfterEventSuccess = '[Calender] Get Event Before After Event Success',
  SetSelectedAppointment = '[Calender] Set Selected Appointment'
}

export const loadCalenders = createAction(
  CalenderActionTypes.LoadCalenders
);

export const loadCalendersSuccess = createAction(
  CalenderActionTypes.LoadCalendersSuccess,
  props<{ data: CalendarEvent[] }>()
);

export const loadCalendersFailure = createAction(
  CalenderActionTypes.LoadCalendersFailure,
  props<{ error: any }>()
);

// for paging through events/appointments
export const getEventBeforeAfterEvent = createAction(
  CalenderActionTypes.GetEventBeforeAfterEvent,
  props<{ formerEvent: CalendarEvent, dir: string }>()
)

export const getEventBeforeAfterEventSuccess = createAction(
  CalenderActionTypes.GetEventBeforeAfterEventSuccess,
  props<{ eventToDisplay: CalendarEvent }>()
)

export const setSelectedAppointment = createAction(
  CalenderActionTypes.SetSelectedAppointment,
  props<{ selectedAppointment: CalendarEvent }>()
)

export type CalenderActionsUnionType = 
  typeof loadCalenders | 
  typeof loadCalendersSuccess | 
  typeof loadCalendersFailure | 
  typeof getEventBeforeAfterEvent | 
  typeof getEventBeforeAfterEventSuccess |
  typeof setSelectedAppointment
