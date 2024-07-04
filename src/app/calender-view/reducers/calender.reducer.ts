import { createReducer, on } from '@ngrx/store';

import * as CalenderActions from '../actions/calender.actions';

export const calenderFeatureKey = 'calendar';

export interface State {
  appointments: Array<any>
  selectedAppointment: any // CalendarEvent<any>
  selectedAppointmentIndex: number
  loading: boolean,
}

export const initialState: State = {
  appointments: [],
  selectedAppointment: null,
  selectedAppointmentIndex: -1,
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

    let selectedAppointment = null

    if (action.data.length > 0) {
      selectedAppointment = action.data[0]
    }

    return {
      ...state,
      appointments: action.data,
      selectedAppointment: selectedAppointment,
      loading: false
    }
  }),

  on(CalenderActions.loadCalendersFailure, (state, action) => state),

  on(CalenderActions.getEventBeforeAfterEvent , (state, action) => {
  
    return {
      ...state
    }
  }),

  on(CalenderActions.getEventBeforeAfterEventSuccess , (state, action) => {
  
    return {
      ...state,
      selectedAppointment: action.eventToDisplay
    }
  }),

  on(CalenderActions.setSelectedAppointment, (state, action) => {
    
    return {
      ...state,
      selectedAppointment: action.selectedAppointment
    }
  })

);
