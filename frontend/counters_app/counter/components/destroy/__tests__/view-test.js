jest.dontMock('../view.jsx');

import React from 'react/addons';
var TestUtils = React.addons.TestUtils;
var CounterActions = require('../../../actions.js');

describe('CounterDestroy', function() {

  var button, counterFixture = {id: "1z", title: "My counter", count: 0};

  beforeEach(function () {
    var CounterDestroy = require('../view.jsx');
    var renderedView = TestUtils.renderIntoDocument(<CounterDestroy counter={counterFixture}/>);
    link = TestUtils.findRenderedDOMComponentWithClass(renderedView, 'counter-destroy');
  });

  it('sends adjustCounter on click', function () {
    TestUtils.Simulate.click(link);
    setTimeout(function () { // TODO - should not use timeout
      expect(CounterActions.destroyCounter).toBeCalledWith({counter: counterFixture});
    });
  });

});