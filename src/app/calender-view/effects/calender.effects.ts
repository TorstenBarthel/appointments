import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as CalenderActions from '../actions/calender.actions';


@Injectable()
export class CalenderEffects {

  loadCalenders$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CalenderActions.loadCalenders),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => CalenderActions.loadCalendersSuccess({ data })),
          catchError(error => of(CalenderActions.loadCalendersFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
