jest.dontMock('../../main/actions.js');
jest.dontMock('../actions.js');
jest.dontMock('../store.js');
//jest.dontMock('../source.js');
jest.dontMock('./fixtures.js');
jest.dontMock('util');

var util = require('util');
var MainActions = require('../../main/actions.js');
var CounterActions = require('../actions.js');
var CounterStore = require('../store.js');
var CounterSource = require('../source.js');
var CounterFixtures = require('./fixtures.js');

describe('CounterStore', function() {

  beforeEach(function () {

  });

  it('fetches initial counters', function () {
    MainActions.start();
    //console.log(util.inspect(CounterSource));
    //console.log(util.inspect(CounterSource.createUser));
    //expect(CounterSource.getCounters).toBeCalled();
  });

});