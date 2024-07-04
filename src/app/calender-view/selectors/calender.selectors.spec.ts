import * as fromCalender from '../reducers/calender.reducer';
import { selectCalenderState } from './calender.selectors';

describe('Calender Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCalenderState({
      [fromCalender.calenderFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
