import React from 'react';
import {shallow} from 'enzyme';
import {ControlLabel} from 'react-bootstrap';

import ErrorMessage from '../components/EmailModalErrorComponent';

test('ErrorMessage show correct email error', () => {
  // Render a email modals error
  const error = shallow(
    <ErrorMessage error='error' field='email' />
  );
  const errorLabel = error.find(ControlLabel);
  expect(errorLabel.props().children).toEqual('Ввeдіть коректну електронну адресу!');
});


test('ErrorMessage show correct body error', () => {
  // Render a email modals error
  const error = shallow(
    <ErrorMessage error='error' field='body' />
  );
  const errorLabel = error.find(ControlLabel);
  expect(errorLabel.props().children).toEqual('Текст повідомлення занадто короткий!(коротше за 20 символів)');
});

test('ErrorMessage show correct body error', () => {
  // email modal error is not being rendered
  const error = shallow(
    <ErrorMessage field='body' />
  );
  expect(error.html()).toBeNull();
});
