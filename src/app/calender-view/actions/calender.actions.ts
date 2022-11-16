import { createAction, props } from '@ngrx/store';

export enum CalenderActionTypes {
  LoadCalenders = '[Calender] Load Calenders',
  LoadCalendersSuccess = '[Calender] Load Calenders Success',
  LoadCalendersFailure = '[Calender] Load Calenders Failure',
  DaySelected = '[Calender] Day Selected'

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

export const daySelected = createAction(
  CalenderActionTypes.DaySelected,
  props<{ date: Date}>()
)

export type CalenderActionsType = typeof loadCalenders | typeof loadCalendersSuccess | typeof loadCalendersFailure