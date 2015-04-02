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

  createCounter(counter) {
    return this.post({url: '/counter', body: counter})
      .then((response) => CounterActions.createdCounter(response.body))
      .catch((error) => CounterActions.createCounterFailed(error));
  }

  destroyCounter(id) {
    return this.delete({url: '/counter', body: {id: id}})
      .then((response) => CounterActions.destroyedCounter(response.body))
      .catch((error) => CounterActions.destroyCounterFailed(error));
  }

  incrementCounter(id) {
    return this.post({url: '/counter/inc', body: {id: id}})
      .then((response) => CounterActions.adjustedCounter(response.body))
      .catch((error) => CounterActions.adjustCounterFailed(error));
  }

  decrementCounter(id) {
    return this.post({url: '/counter/dec', body: {id: id}})
      .then((response) => CounterActions.adjustedCounter(response.body))
      .catch((error) => CounterActions.adjustCounterFailed(error));
  }

}

module.exports = Marty.register(CounterAPI);
