import Immutable from 'immutable';
import Marty from 'marty';
import CounterConstants from './constants';
import CounterAPI from './source';

var CounterStore = Marty.createStore({
  id: 'CounterStore',

  handlers: {
    updateCounters: [
      CounterConstants.RECIEVED,
      CounterConstants.CREATED,
      CounterConstants.DESTROYED,
      CounterConstants.ADJUSTED
    ],
    createCounter: CounterConstants.CREATE,
    adjustCounter: CounterConstants.ADJUST,
    destroyCounter: CounterConstants.DESTROY
  },

  getInitialState: function () {
    return Immutable.Map({});
  },


  /**
   * Updates all counters, called after most operations on the server and on load.
   * @param  {array} counters Current state of counters, from server
   */
  updateCounters: function(counters) {
    this.state = this.state.set('counters', Immutable.OrderedSet(counters));
    this.hasChanged();
  },

  /**
   * Marty fetch function for fetching all counters from the server.
   * @return {fetch} Fetch object, see http://martyjs.org/api/stores/index.html#fetch
   */
  getCounters: function() {
    return this.fetch({
      id: 'all',
      locally() {
        return this.state.get('counters');
      },
      remotely() {
        return CounterAPI.getCounters();
      }
    });
  },

  /**
   * Optimistically adds a counter item with a default count of 0 and a temp id. 
   * @param  {object} counter New counter object
   * @return {promise}        Fulfilled when the server request completes
   */
  createCounter: function(counter) {

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
  },

  /**
   * Optimistically removes a counter item before removing on the server.
   * @param  {object} counter Counter object
   * @return {promise}        Fulfilled when the server request completes
   */
  destroyCounter: function(counter) {
    this.state = this.state.withMutations(function(map) {
      map.set('counters', map.get('counters').delete(counter));
    });
    return CounterAPI.destroyCounter(counter.id);
  },

  /**
   * Optimistically adjusts a counter count
   * TODO: This could be optimised to not parse the entire set of items when incrementing a value. 
   * @param  {object} counter Counter object
   * @param  {number} amount  Value to increment/decrement the counter value by (only -1 or 1)
   * @return {promise}        Fulfilled when the server request completes
   */
  adjustCounter: function(counter, amount) {
    this.state = this.state.withMutations( (map) => {
      map.set('counters', map.get('counters').map( (innerCounter) => {
        if (counter.id === innerCounter.id) {
          return this.adjustCounterCount(counter, amount);
        }
        return innerCounter;
      }));
    });
    return (amount === 1) ? CounterAPI.incrementCounter(counter.id, amount) : CounterAPI.decrementCounter(counter.id, amount);
  },

  /**
   * Takes a counter object and returns a new object with a modified count on it.
   * @param  {object} counter Counter object
   * @param  {number} amount  Amount to adjust by
   * @return {object}         A new instance of the counter object with the adjusted count.
   */
  adjustCounterCount: function (counter, amount) {
    return {
      id: counter.id,
      title: counter.title,
      count: counter.count + amount
    }
  }

});

module.exports = CounterStore;
