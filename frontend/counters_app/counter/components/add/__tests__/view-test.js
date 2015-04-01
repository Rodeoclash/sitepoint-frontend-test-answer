jest.dontMock('../view.jsx'); 

import React from 'react/addons';
var TestUtils = React.addons.TestUtils;
var CounterActions = require('../../../actions.js');

describe('ComponentAdd', function() {

  var CounterAdd, renderedView, input, submit;

  beforeEach(function () {
    CounterAdd = require('../view.jsx');
    renderedView = TestUtils.renderIntoDocument(<CounterAdd/>);
    input = TestUtils.findRenderedDOMComponentWithClass(renderedView, 'counter-add__input');
    submit = TestUtils.findRenderedDOMComponentWithClass(renderedView, 'counter-add__submit');
  });

  it('is disabled with no title', function () {
    TestUtils.Simulate.change(input, {target: {value: ''}});
    expect(submit.props.disabled).toBe(true);
  });

  it('is enabled with title', function () {
    TestUtils.Simulate.change(input, {target: {value: 'My title'}});
    expect(submit.props.disabled).toBe(false);
  });

  it('does not add counter when invalid', function () {
    TestUtils.Simulate.change(input, {target: {value: ''}});
    TestUtils.Simulate.click(submit);
    expect(CounterActions.createCounter).not.toBeCalled();
  });

  it('adds counter when valid', function () {
    TestUtils.Simulate.change(input, {target: {value: 'My counter'}});
    TestUtils.Simulate.click(submit);
    expect(CounterActions.createCounter).toBeCalledWith({title: 'My counter'});
  });

});