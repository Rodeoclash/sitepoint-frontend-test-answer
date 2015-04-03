import Immutable from 'immutable';
import Marty from 'marty';
import MainConstants from '../main/constants';
import CounterConstants from './constants';
import CounterAPI from './source';

class CounterStore extends Marty.Store {

  constructor(options) {
    super(options);
    this.id = 'CounterStore';
    this.state = Immutable.Map({});
    this.handlers = {
      createCounter: CounterConstants.CREATE,
      adjustCounter: CounterConstants.ADJUST,
      destroyCounter: CounterConstants.DESTROY,
      updateCounters: [
        CounterConstants.RECIEVED,
        CounterConstants.CREATED,
        CounterConstants.DESTROYED,
        CounterConstants.ADJUSTED
      ]
    };
  }

  /**
   * Marty fetch function for fetching all counters from the server.
   * @return {fetch} Fetch object, see http://martyjs.org/api/stores/index.html#fetch
   */
  getCounters() {
    return this.fetch({
      id: 'all',
      locally() {
        return this.state.get('counters');
      },
      remotely() {
        return CounterAPI.getCounters();
      }
    });
  }

  /**
   * Updates all counters, called after most operations on the server.
   * @param  {array} counters Current state of counters, from server
   */
  updateCounters(counters) {
    this.state = this.state.set('counters', Immutable.OrderedSet(counters));
    this.hasChanged();
  }

  /**
   * Optimistically adds a counter item with a default count of 0 and a temp id. 
   * @param  {object} counter New counter object
   * @return {promise}        Fulfilled when the server request completes
   */
  createCounter(counter) {

    // default values for the new object
    counter.id = -1;
    counter.count = 0;

    // This opens the object for mutations, making it a bit easier to set multiple or deep
    // values in the state.
    this.state = this.state.withMutations(function(map) {
      map.set('counters', map.get('counters').add(counter));
    });

    this.hasChanged();
    return CounterAPI.createCounter(counter);
  }

  /**
   * Optimistically removes a counter item before removing on the server.
   * @param  {object} counter Counter object
   * @return {promise}        Fulfilled when the server request completes
   */
  destroyCounter(counter) {
    this.state = this.state.withMutations(function(map) {
      map.set('counters', map.get('counters').delete(counter));
    });
    return CounterAPI.destroyCounter(counter.id);
  }

  /**
   * Optimistically adjusts a counter count
   * TODO: This could be optimised to not parse the entire set of items when incrementing a value. 
   * @param  {object} counter Counter object
   * @param  {number} amount  Value to increment/decrement the counter value by (only -1 or 1)
   * @return {promise}        Fulfilled when the server request completes
   */
  adjustCounter(counter, amount) {
    this.state = this.state.withMutations(function(map) {
      map.set('counters', map.get('counters').map(function (innerCounter) {
        if (counter.id === innerCounter.id) {
          innerCounter.count += amount;
        }
        return innerCounter;
      }));
    });
    return (amount === 1) ? CounterAPI.incrementCounter(counter.id, amount) : CounterAPI.decrementCounter(counter.id, amount);
  }

}

module.exports = Marty.register(CounterStore);
