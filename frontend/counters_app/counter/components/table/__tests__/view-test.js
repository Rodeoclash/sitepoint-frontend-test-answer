jest.dontMock('../view.jsx');

import React from 'react/addons';
var TestUtils = React.addons.TestUtils;

describe('CounterTable', function() {

  var CounterStore;

  beforeEach(function () {
    CounterStore = require('../../../store');
    var CounterTable = require('../view.jsx');
    var renderedView = TestUtils.renderIntoDocument(<CounterTable/>);
  });

  /*
  it('should display load pending message', function () {
    // TODO
  });
  
  it('should display load failed message', function () {
    // TODO
  });

  it('should display no results message', function () {
    // TODO
  });

  it('should display results', function () {
    // TODO
  });
  */

});