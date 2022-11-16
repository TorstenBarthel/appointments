import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

import * as CalenderActions from '../actions/calender.actions';

import { CalenderService, colors } from '../calender.service'

import { CalendarEvent } from 'angular-calendar'

@Injectable()
export class CalenderEffects {

  constructor(private actions$: Actions<CalenderActions.CalenderActionsType>, private calenderService: CalenderService ) {

  }

  loadCalenders$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CalenderActions.loadCalenders),
      concatMap(() =>

      this.calenderService.getJSON().pipe(
          map(data => {
            
            // format data accordingly
            const apiData = data.data

            const formatedData: Array<CalendarEvent> = apiData.appointments.nodes.map((event: any) => {
              
              const startDate = new Date(event.date)

              startDate.setFullYear(2022)

              const endDate = new Date(event.date)
              endDate.setFullYear(2022)
              
              const formatedObj = {
                start: startDate, // new Date(), // event.date
                end: endDate, // new Date(),
                title: event.property.name,
                color: { ...colors.blue },
                allDay: false
              }

              return formatedObj
            })



            console.log('formated-data:: ', formatedData)

            // dispatch action
            return CalenderActions.loadCalendersSuccess({ data: [...formatedData, ...events] })
          }),
          catchError(error => of(CalenderActions.loadCalendersFailure({ error }))))
      )
    );
  });
}

const events: CalendarEvent[] = [
  {
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'A 3 day event',
    color: { ...colors.red },
    actions: [], // this.actions,
    allDay: true,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    draggable: true,
  },
  {
    start: startOfDay(new Date()),
    title: 'An event with no end date',
    color: { ...colors.yellow },
    actions: [], // this.actions,
  },
  {
    start: subDays(endOfMonth(new Date()), 3),
    end: addDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: { ...colors.blue },
    allDay: true,
  },
  {
    start: addHours(startOfDay(new Date()), 2),
    end: addHours(new Date(), 2),
    title: 'A draggable and resizable event',
    color: { ...colors.yellow },
    actions: [], // this.actions,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    draggable: true,
  },
];

