import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import {
  startOfDay,
  subDays,
  endOfMonth,
  addHours,
} from 'date-fns';

import * as CalenderActions from '../actions/calender.actions';

import { CalenderService, colors } from '../calender.service'

import { CalendarEvent } from 'angular-calendar'

@Injectable()
export class CalenderEffects {

  constructor(
    private actions$: Actions<CalenderActions.CalenderActionsType>, 
    private calenderService: CalenderService) {}

  loadCalenders$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CalenderActions.loadCalenders),
      concatMap(() =>

        this.calenderService.getJSON().pipe(
          map(data => {

            // format data accordingly
            const apiData = data.data

            const formatedData: Array<CalendarEvent> = apiData.appointments.nodes.map((event: any) => {

              // set years of sample data to 22 for easy access
              const startDate = new Date(event.date)
              startDate.setFullYear(2022)

              const endDate = new Date(event.date)
              endDate.setFullYear(2022)

              const formatedObj = {
                start: startDate,
                end: endDate,
                title: event.property.name,
                color: { ...colors.yellow },
                allDay: false,
                meta: event
              } 

              return formatedObj
            })

            // dispatch action: Also add some add. smaple data
            return CalenderActions.loadCalendersSuccess({ data: [...formatedData, ...events] })
          }),
          catchError(error => of(CalenderActions.loadCalendersFailure({ error }))))
      )
    );
  });
}

const events: CalendarEvent<any>[] = [
  {
    start: subDays(startOfDay(new Date()), 1),
    end: subDays(startOfDay(new Date()), 1),
    title: 'A beautiful flat',
    color: { ...colors.red },
    actions: [],
    allDay: false,
    meta: {

    }
  },
  {
    start: startOfDay(new Date()),
    title: 'Mittem im Grünen',
    color: { ...colors.yellow },
    actions: [],
  },
  {
    start: subDays(endOfMonth(new Date()), 3),
    end: subDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: { ...colors.blue },
    allDay: true,
  },
  {
    start: addHours(startOfDay(new Date()), 12),
    end: addHours(startOfDay(new Date()), 12),
    title: 'A draggable and resizable event',
    color: { ...colors.yellow },
    actions: [],
  },
];
