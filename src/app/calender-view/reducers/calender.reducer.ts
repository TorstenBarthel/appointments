import { Action, createReducer, on } from '@ngrx/store';
import * as CalenderActions from '../actions/calender.actions';

export const calenderFeatureKey = 'calendar';

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

    console.log(action)

    return {
      ...state,
      appointments: action.data,
      loading: false
    }
  }),
  on(CalenderActions.loadCalendersFailure, (state, action) => state),

  on(CalenderActions.daySelected, (state, action) => {
    return {
      ...state,
      date: action.date
    }
  })

);
