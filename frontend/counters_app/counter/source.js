import Marty from 'marty';
import CounterActions from './actions';

var CountersAPI = Marty.createStateSource({
  id: 'CountersAPI',
  type: 'http',
  baseUrl: '/api/v1',

  getCounters: function() {
    return this.get('/counters')
      .then((response) => CounterActions.recievedCounters(response.body))
      .catch((error) => CounterActions.recieveCountersFailed(error));
  },

  createCounter: function(counter) {
    return this.post({url: '/counter', body: counter})
      .then((response) => CounterActions.createdCounter(response.body))
      .catch((error) => CounterActions.createCounterFailed(error));
  },

  destroyCounter: function(id) {
    return this.delete({url: '/counter', body: {id: id}})
      .then((response) => CounterActions.destroyedCounter(response.body))
      .catch((error) => CounterActions.destroyCounterFailed(error));
  },

  incrementCounter: function(id) {
    return this.post({url: '/counter/inc', body: {id: id}})
      .then((response) => CounterActions.adjustedCounter(response.body))
      .catch((error) => CounterActions.adjustCounterFailed(error));
  },

  decrementCounter: function(id) {
    return this.post({url: '/counter/dec', body: {id: id}})
      .then((response) => CounterActions.adjustedCounter(response.body))
      .catch((error) => CounterActions.adjustCounterFailed(error));
  }

});

module.exports = CountersAPI;
