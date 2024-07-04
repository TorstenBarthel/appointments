import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

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
  
              // format data accordingly
              const apiData = data.data
              
              // better create interface for API response
              const formatedData: Array<CalendarEvent> = apiData.appointments.nodes.map((event: any, index: number) => {
  
                // set date of sample data to 11.2022 for easy access
                const startDate = new Date(event.date)
                startDate.setFullYear(2022)
                startDate.setMonth(10)
  
                const endDate = new Date(event.date)
                endDate.setFullYear(2022)
                endDate.setMonth(10)
  
                const formatedObj = {
                  start: startDate,
                  end: endDate,
                  title: event.property.name,
                  color: { ...colors.yellow },
                  allDay: false,
                  meta: {
                    ...event,
                    lastElement: false,
                    firstElement: false
                  }
                } 
  
                return formatedObj
              })

              // Also add some additional smaple data: Not anymore
              const appointments = [...formatedData] // , ...events]

              appointments.sort((a,b)=>a.start.getTime() - b.start.getTime());

              if (appointments.length > 0) {
                appointments[0].meta.firstElement = true
                appointments[appointments.length - 1].meta.lastElement = true
              }

              // dispatch action
              return CalenderActions.loadCalendersSuccess({ data: appointments })
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

        const appointsLength = appointments.length

        let formerIndex: number = 0

        // get former shown appointment to calc. new index
        appointments.map((appoints: CalendarEvent, index: number) => {
          if (appoints === action.formerEvent) {
            formerIndex = index
          }
        })

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

        /**
         * @info Error: Cannot assign to readonly property:
         *       Its not possible to change store here (of course)
         *       But its also not neccessary since firstElement/lastElement
         *       are setup when retrieving apppointments 
         */

        // mark as last or first element: For hiding buttons
        // let firstElement = false
        // let lastElement = false

        // if (newIndex === 0) {
        //   firstElement = true
        // } else if (newIndex === appointsLength - 1) {
        //   lastElement = true
        // }

        // appointment.meta.firstElement = firstElement
        // appointment.meta.lastElement = lastElement

        return CalenderActions.getEventBeforeAfterEventSuccess({ eventToDisplay: appointment }) 
      })
    )
  })
}

// additional test data
const events: CalendarEvent<any>[] = [
  {
    start: subDays(startOfDay(new Date()), 1),
    end: subDays(startOfDay(new Date()), 1),
    title: 'A beautiful flat',
    color: { ...colors.red },
    actions: [],
    allDay: false,
    meta: {}
  },
  {
    start: startOfDay(new Date()),
    title: 'Mittem im Grünen',
    color: { ...colors.yellow },
    actions: [],
    meta: {}
  },
  {
    start: subDays(endOfMonth(new Date()), 3),
    end: subDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: { ...colors.blue },
    allDay: true,
    meta: {}
  },
  {
    start: addHours(startOfDay(new Date()), 12),
    end: addHours(startOfDay(new Date()), 12),
    title: 'A draggable and resizable event',
    color: { ...colors.yellow },
    actions: [],
    meta: {}
  },
];
