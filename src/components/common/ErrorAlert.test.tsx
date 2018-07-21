import * as React from 'react';
import { shallow, mount } from 'enzyme';
import ErrorAlert from './ErrorAlert';

function setupShallow(errorMessage: string) {
  const props = {
    error: {
      errorMessage: errorMessage
    },
    errorReset: jest.fn()
  };

  const enzymeWrapper = shallow(<ErrorAlert {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

function setup(errorMessage: string) {
  const props = {
    error: {
      errorMessage: errorMessage
    },
    errorReset: jest.fn()
  };

  const enzymeWrapper = mount(<ErrorAlert {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Error Alert', () => {
  it('should render correctly with message', () => {
    const { enzymeWrapper } = setupShallow('Error');
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should render correctly without message', () => {
    const { enzymeWrapper } = setupShallow('');
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should call errorReset when alert is closed', () => {
    const { enzymeWrapper, props } = setup('Error');
    const alert = enzymeWrapper.find('Alert').instance() as any;
    if (alert.props.afterClose) {
      alert.props.afterClose();
      expect(props.errorReset.mock.calls.length).toBe(1);
    }
  });
});