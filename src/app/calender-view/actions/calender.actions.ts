import { createAction, props } from '@ngrx/store';

export enum CalenderActionTypes {
  LoadCalenders = '[Calender] Load Calenders',
  LoadCalendersSuccess = '[Calender] Load Calenders Success',
  LoadCalendersFailure = '[Calender] Load Calenders Failure'

}

export const loadCalenders = createAction(
  CalenderActionTypes.LoadCalenders
);

export const loadCalendersSuccess = createAction(
  CalenderActionTypes.LoadCalendersSuccess,
  props<{ data: any }>()
);

export const loadCalendersFailure = createAction(
  CalenderActionTypes.LoadCalendersFailure,
  props<{ error: any }>()
);
