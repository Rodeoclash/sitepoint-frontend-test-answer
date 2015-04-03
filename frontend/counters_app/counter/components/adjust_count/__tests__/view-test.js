jest.dontMock('../view.jsx');

import React from 'react/addons';
var TestUtils = React.addons.TestUtils;
var CounterActions = require('../../../actions.js');

describe('CounterAdjust', function() {

  var button, counterFixture = {id: "1z", title: "My counter", count: 0};

  beforeEach(function () {
    var CounterAdjust = require('../view.jsx');
    var renderedView = TestUtils.renderIntoDocument(<CounterAdjust counter={counterFixture} value={-1}/>);
    button = TestUtils.findRenderedDOMComponentWithClass(renderedView, 'counter-adjust-count__button');
  });

  it('sends adjustCounter on click', function () {
    TestUtils.Simulate.click(button);
    setTimeout(function () { // TODO - should not use timeout
      expect(CounterActions.adjustCounter).toBeCalledWith({counter: counterFixture, value: -1});
    });
  });

});