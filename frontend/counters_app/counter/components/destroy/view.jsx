import React from 'react';
import Marty from 'marty';
import CounterActions from '../../actions';
require('./style.less');

module.exports = React.createClass({
  displayName: 'counter-destroy',

  handleClick: function () {
    CounterActions.destroyCounter(this.props.counter);
  },

  render: function () {
    return <a className="counter-destroy" onClick={this.handleClick}>Delete</a>;
  }

});
