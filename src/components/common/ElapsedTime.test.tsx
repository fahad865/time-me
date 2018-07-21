import * as React from 'react';
import { shallow } from 'enzyme';
import ElapsedTime from './ElapsedTime';

describe('Elapsed Time', () => {
  it('it should render correctly', () => {
    expect(shallow(<ElapsedTime elapsedTime={2000} />)).toMatchSnapshot();
  });
});