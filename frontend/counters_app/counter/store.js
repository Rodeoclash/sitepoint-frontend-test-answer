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
    this.state = this.state.set('counters', Immutable.List(counters));
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

    // default values for the new counter
    counter.id = -1;
    counter.count = 0;

    // This opens the object for mutations, making it a bit easier to set multiple or deep
    // values in the state.
    this.state = this.state.withMutations(function(map) {
      map.set('counters', map.get('counters').push(counter));
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
    this.state = this.state.withMutations( (map) => {
      map.set('counters', map.get('counters').delete(this._findCounterIndexById(counter.id)));
    });
    this.hasChanged();
    return CounterAPI.destroyCounter(counter.id);
  },

  /**
   * Optimistically adjusts a counter count
   * @param  {object} counter Counter object  
   * @param  {number} amount  Value to increment/decrement the counter value by (only -1 or 1)
   * @return {promise}        Fulfilled when the server request completes
   */
  adjustCounter: function(counter, amount) {
    this.state = this.state.withMutations( (map) => {
      map.set('counters', map.get('counters').set(this._findCounterIndexById(counter.id), this._adjustCounterCount(counter, amount)));
    });
    this.hasChanged();
    return (amount === 1) ? CounterAPI.incrementCounter(counter.id, amount) : CounterAPI.decrementCounter(counter.id, amount);
  },

  /**
   * Given a counter id, returns the index of that counter in the list.
   * @param  {any}    id ID to search for
   * @return {number}    Index of where that id is present, otherwise null if not present.
   */
  _findCounterIndexById: function (id) {
    return this.state.get('counters').findIndex(function (counter) {
      return counter.id === id;
    });
  },

  /**
   * Takes a counter object and returns a new object with a modified count on it.
   * @param  {object} counter Counter object
   * @param  {number} amount  Amount to adjust by
   * @return {object}         A new instance of the counter object with the adjusted count.
   */
  _adjustCounterCount: function (counter, amount) {
    return {
      id: counter.id,
      title: counter.title,
      count: counter.count + amount
    }
  }

});

module.exports = CounterStore;
