import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCalender from '../reducers/calender.reducer';

export const selectCalenderState = createFeatureSelector<fromCalender.State>(
  fromCalender.calenderFeatureKey
);

export const getAppointmentsLoading = createSelector(selectCalenderState, state => state.loading)

export const getAllAppointments = createSelector(selectCalenderState, state => state.appointments)

export const getAppointment = createSelector(selectCalenderState, state => state.selectedAppointment)