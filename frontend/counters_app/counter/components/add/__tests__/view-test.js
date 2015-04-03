jest.dontMock('../view.jsx');

import React from 'react/addons';
var TestUtils = React.addons.TestUtils;
var CounterActions = require('../../../actions.js');

describe('CounterAdd', function() {

  var input, submit;

  beforeEach(function () {
    var CounterAdd = require('../view.jsx');
    var renderedView = TestUtils.renderIntoDocument(<CounterAdd/>);
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

  it('sends createCounter on submit', function () {
    TestUtils.Simulate.change(input, {target: {value: 'My title'}});
    TestUtils.Simulate.click(submit);
    setTimeout(function () { // TODO - should not use timeout
      expect(CounterActions.createCounter).toBeCalledWith({title: 'My title'});
    });
  });

  it('resets counter title input after submit', function () {
    TestUtils.Simulate.change(input, {target: {value: 'My title'}});
    TestUtils.Simulate.click(submit);
    setTimeout(function () { // TODO - should not use timeout
      expect(input.props.value).toEqual('');  
    });
  });

  it('updates submit button text', function () {
    TestUtils.Simulate.change(input, {target: {value: 'My title'}});
    expect(submit.getDOMNode().textContent).toEqual('Add: My title');
  });

});