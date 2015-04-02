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

  destroyCounter(counters) {
    this.dispatch(CounterConstants.DESTROY, counters);
  }

  destroyedCounter(counters) {
    this.dispatch(CounterConstants.DESTROYED, counters);
  }

  destroyCounterFailed(error) {
    this.dispatch(CounterConstants.DESTROY_FAILED, error);
  }

  adjustCounter(counter, amount) {
    this.dispatch(CounterConstants.ADJUST, counter, amount);
  }

  adjustedCounter(counters) {
    this.dispatch(CounterConstants.ADJUSTED, counters);
  }

  adjustCounterFailed(error) {
    this.dispatch(CounterConstants.ADJUST_FAILED, error);
  }

}

module.exports = Marty.register(CounterActions);
