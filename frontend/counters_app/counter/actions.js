import Marty from 'marty';
import CounterConstants from './constants';
var Dispatcher = Marty.dispatcher.getDefault();

var CounterActionCreators = Marty.createActionCreators({
  id: 'CounterActionCreators',

  recievedCounters: function(counters) {
    this.dispatch(CounterConstants.RECIEVED, counters);
  },

  recieveCountersFailed: function(error) {
    this.dispatch(CounterConstants.RECIEVE_FAILED, error);
  },

  createCounter: function(counters) {
    this.dispatch(CounterConstants.CREATE, counters);
  },

  createdCounter: function(counters) {
    this.dispatch(CounterConstants.CREATED, counters);
  },

  createCounterFailed: function(error) {
    this.dispatch(CounterConstants.CREATE_FAILED, error);
  },

  destroyCounter: function(counters) {
    this.dispatch(CounterConstants.DESTROY, counters);
  },

  destroyedCounter: function(counters) {
    this.dispatch(CounterConstants.DESTROYED, counters);
  },

  destroyCounterFailed: function(error) {
    this.dispatch(CounterConstants.DESTROY_FAILED, error);
  },

  adjustCounter: function(counter, amount) {
    this.dispatch(CounterConstants.ADJUST, counter, amount);
  },

  adjustedCounter: function(counters) {
    this.dispatch(CounterConstants.ADJUSTED, counters);
  },

  adjustCounterFailed: function(error) {
    this.dispatch(CounterConstants.ADJUST_FAILED, error);
  }

});

module.exports = CounterActionCreators;
