import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CalenderEffects } from './calender.effects';

describe('CalenderEffects', () => {
  let actions$: Observable<any>;
  let effects: CalenderEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalenderEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CalenderEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
