import Marty from 'marty';
import Immutable from 'immutable';
import MainConstants from '../main/constants';
import CounterConstants from './constants';
import CounterAPI from './source';

class CounterStore extends Marty.Store {

  constructor(options) {
    super(options);
    this.id = 'CounterStore';
    this.state = Immutable.Set();
    this.handlers = {
      getCounters: [MainConstants.START],
      createCounter: CounterConstants.CREATE,
      updateCounters: [
        CounterConstants.RECIEVED,
        CounterConstants.CREATED,
        CounterConstants.DELETED,
        CounterConstants.INCREMENTED,
        CounterConstants.DECREMENTED
      ]
    };
  }

  getCounters() {
    CounterAPI.getCounters();
  }

  updateCounters(counters) {
    return this.setState(Immutable.fromJS(counters)); // cast to set
  }

  createCounter(counter) {
    CounterAPI.createCounter(counter);
  }

  deleteCounter(id) {
    CounterAPI.deleteCounter(title);
  }

  incrementCounter(id) {
    CounterAPI.incrementCounter(title);
  }

  decrementCounter(id) {
    CounterAPI.decrementCounter(title);
  }

}

module.exports = Marty.register(CounterStore);
