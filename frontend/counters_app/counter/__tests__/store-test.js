import Immutable from 'immutable';

jest.dontMock('../store.js');
jest.dontMock('../actions.js');

describe('CounterStore', function() {

  var CounterActions, CounterStore, CounterSource, counterFixture = {id: "1z", title: "My counter", count: 0},  counterFixture2 = {id: "2z", title: "Another counter", count: 3};

  beforeEach(function () {
    CounterActions = require('../actions.js');
    CounterStore = require('../store.js');
    CounterSource = require('../source.js');
  });

  it('handles receive empty', function () {
    CounterActions.recievedCounters([]);
    expect(CounterStore.state.toJS()).toEqual({
       counters: []
    });
  });

  it('handles receive counter', function () {
    CounterActions.recievedCounters([counterFixture]);
    expect(CounterStore.state.toJS()).toEqual({
       counters: [counterFixture]
    });
  });

  it('handles create', function () {
    CounterActions.recievedCounters([]);
    CounterActions.createCounter({title: 'My test counter'});
    expect(CounterStore.state.toJS()).toEqual({
       counters: [{id: -1, title: 'My test counter', count: 0}]
    });
    setTimeout(function () { // TODO - should not use timeout
      expect(CounterSource.createCounter).toBeCalledWith({id: -1, title: 'My test counter', count: 0});
    });
  });

  it('handles destroy', function () {
    CounterActions.recievedCounters([counterFixture, counterFixture2]);
    CounterActions.destroyCounter(counterFixture);
    expect(CounterStore.state.toJS()).toEqual({
       counters: [counterFixture2]
    });
    setTimeout(function () { // TODO - should not use timeout
      expect(CounterSource.destroyCounter).toBeCalledWith(counterFixture);
    });
  });

  it('handles adjust +1', function () {
    CounterActions.recievedCounters([counterFixture, counterFixture2]);
    CounterActions.adjustCounter(counterFixture2, 1);
    expect(CounterStore.state.toJS()).toEqual({
       counters: [counterFixture, {id: "2z", title: "Another counter", count: 4}]
    });
    setTimeout(function () { // TODO - should not use timeout
      expect(CounterSource.incrementCounter).toBeCalledWith(counterFixture2);
    });
  });

  it('handles adjust -1', function () {
    CounterActions.recievedCounters([counterFixture, counterFixture2]);
    CounterActions.adjustCounter(counterFixture, -1);
    expect(CounterStore.state.toJS()).toEqual({
       counters: [{id: "1z", title: "My counter", count: -1}, counterFixture2]
    });
    setTimeout(function () { // TODO - should not use timeout
      expect(CounterSource.decrementCounter).toBeCalledWith(counterFixture);
    });
  });

});