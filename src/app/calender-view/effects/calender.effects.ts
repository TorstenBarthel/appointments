import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { select, Store } from '@ngrx/store'
import { State } from '../reducers/calender.reducer'

import {
  startOfDay,
  subDays,
  endOfMonth,
  addHours,
} from 'date-fns';

import * as CalenderActions from '../actions/calender.actions';

import { CalenderService, colors } from '../calender.service'

import { CalendarEvent } from 'angular-calendar'

import { getAllAppointments } from '../selectors/calender.selectors';

@Injectable()
export class CalenderEffects {

  constructor(
    private actions$: Actions<CalenderActions.CalenderActionsUnionType>,
    private calenderService: CalenderService,
    private store: Store<State>) { }

    loadCalenders$ = createEffect(() => {
      return this.actions$.pipe(
  
        ofType(CalenderActions.loadCalenders),
        concatMap(() =>
  
          this.calenderService.getJSON().pipe(
            map(data => {

              const testEntriesLength = 4
  
              // format data accordingly
              const apiData = data.data
              
              // better create interface for API response
              const formatedData: Array<CalendarEvent> = apiData.appointments.nodes.map((event: any, index: number) => {
  
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
                  meta: {
                    ...event,
                    system: {
                      index,
                      length: apiData.appointments.nodes.length + testEntriesLength
                    }
                  }
                } 
  
                return formatedObj
              })
  
              // dispatch action: Also add some additional smaple data
              return CalenderActions.loadCalendersSuccess({ data: [...formatedData, ...events] })
            }),
            catchError(error => of(CalenderActions.loadCalendersFailure({ error }))))
        )
      );
    });

  getEventBeforeAfterEvent$ = createEffect(() => {

    let action: any = null

    return this.actions$.pipe(
      
      ofType(CalenderActions.getEventBeforeAfterEvent),
      map(val => {

        action = val
      }),
      switchMap(() => {
        return this.store.pipe(
          select(getAllAppointments),
          map (appointments => {

            return [appointments, action]
          })
        )
      }),
      map(([appointments, action]) => {

        const formerIndex: number = action.formerEvent.meta.system.index
        const appointsLength = action.formerEvent.meta.system.length

        let newIndex: number = formerIndex

        if (action.dir === 'right') {

          if (formerIndex < appointsLength - 1) {
            newIndex++
          } else {
            newIndex = 0
          }
        } else {
          if (formerIndex > 0) {
            newIndex--
          } else {
            newIndex = appointsLength - 1
          }
        }

        const appointment = appointments[newIndex]

        return CalenderActions.getEventBeforeAfterEventSuccess({ eventToDisplay: appointment}) 
      })
    )
  })
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
      system: {
        index: 3,
        length: 7
      }
    }
  },
  {
    start: startOfDay(new Date()),
    title: 'Mittem im Grünen',
    color: { ...colors.yellow },
    actions: [],
    meta: {
      system: {
      index: 4,
      length: 7
      }
    }
  },
  {
    start: subDays(endOfMonth(new Date()), 3),
    end: subDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: { ...colors.blue },
    allDay: true,
    meta: {
      system: {
      index: 5,
      length: 7
      }
    }
  },
  {
    start: addHours(startOfDay(new Date()), 12),
    end: addHours(startOfDay(new Date()), 12),
    title: 'A draggable and resizable event',
    color: { ...colors.yellow },
    actions: [],
    meta: {
      system: {
        index: 6,
        length: 7
      }
    }
  },
];
