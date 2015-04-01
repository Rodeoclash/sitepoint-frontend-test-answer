import Marty from 'marty';
import MainConstants from './constants';

class MainActionCreators extends Marty.ActionCreators {
  start(name) {
    this.dispatch(MainConstants.START);
  }
}

module.exports = Marty.register(MainActionCreators);
