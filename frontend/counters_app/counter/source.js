import Marty from 'marty';
import CounterActions from './actions';

class CounterAPI extends Marty.HttpStateSource {

  constructor(options) {
    super(options);
    this.baseUrl = '/api/v1';
  }

  getCounters() {
    return this.get('/counters')
      .then((response) => CounterActions.recievedCounters(response.body))
      .catch((error) => CounterActions.recieveCountersFailed(error));
  }

  createCounter(payload) {
    return this.post('/counter', payload)
      .then((response) => CounterActions.createdCounter(response.body))
      .catch((error) => CounterActions.createCounterFailed(error));
  }

  deleteCounter(id) {
    return this.delete('/counter', {id: id})
      .then((response) => CounterActions.deletedCounter(response.body))
      .catch((error) => CounterActions.deleteCounterFailed(error));
  }

  incrementCounter(id) {
    return this.post('/counter/inc', {id: id})
      .then((response) => CounterActions.incrementedCounter(response.body))
      .catch((error) => CounterActions.incrementCounterFailed(error));
  }

  decrementCounter(id) {
    return this.post('/counter/dec', {id: id})
      .then((response) => CounterActions.decrementedCounter(response.body))
      .catch((error) => CounterActions.decrementCounter(error));
  }

}

module.exports = Marty.register(CounterAPI);
