import { Action, createReducer, on } from '@ngrx/store';
import * as CalenderActions from '../actions/calender.actions';

export const calenderFeatureKey = 'calender';

export interface State {
  appointments: Array<any>,
  loading: boolean
}

export const initialState: State = {
  appointments: [],
  loading: false
};

export const reducer = createReducer(
  initialState,

  on(CalenderActions.loadCalenders, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(CalenderActions.loadCalendersSuccess, (state, action) => {
    return {
      ...state,
      appointments: action.data.appointments
    }
  }),
  on(CalenderActions.loadCalendersFailure, (state, action) => state),

);
