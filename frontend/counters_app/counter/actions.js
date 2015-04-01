import Marty from 'marty';
import CounterConstants from './constants';
var Dispatcher = Marty.dispatcher.getDefault();

class CounterActions extends Marty.ActionCreators {

  recievedCounters(counters) {
    this.dispatch(CounterConstants.RECIEVED, counters);
  }

  recieveCountersFailed(error) {
    this.dispatch(CounterConstants.RECIEVE_FAILED, error);
  }

  createCounter(counters) {
    this.dispatch(CounterConstants.CREATE, counters);
  }

  createdCounter(counters) {
    this.dispatch(CounterConstants.CREATED, counters);
  }

  createCounterFailed(error) {
    this.dispatch(CounterConstants.CREATE_FAILED, error);
  }

  deleteCounter(counters) {
    this.dispatch(CounterConstants.DELETE, counters);
  }

  deletedCounter(counters) {
    this.dispatch(CounterConstants.DELETED, counters);
  }

  deleteCounterFailed(error) {
    this.dispatch(CounterConstants.DELETE_FAILED, error);
  }

  incrementCounter(counters) {
    this.dispatch(CounterConstants.INCREMENT, counters);
  }

  incrementedCounter(counters) {
    this.dispatch(CounterConstants.INCREMENTED, counters);
  }

  incrementCounterFailed(error) {
    this.dispatch(CounterConstants.INCREMENT_FAILED, error);
  }

  decrementedCounter(counters) {
    this.dispatch(CounterConstants.DECREMENT, counters);
  }  

  decrementedCounter(counters) {
    this.dispatch(CounterConstants.DECREMENTED, counters);
  }

  decrementCounterFailed(error) {
    this.dispatch(CounterConstants.DECREMENT_FAILED, error);
  }

}

module.exports = Marty.register(CounterActions);
