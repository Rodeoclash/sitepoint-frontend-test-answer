import React from 'react';
import Marty from 'marty';
import CounterActions from '../../actions';
require('./style.less');

module.exports = React.createClass({
  displayName: 'counter-adjust_count',

  handleClick: function () {
    CounterActions.adjustCounter(this.props.counter, this.props.value);
  },

  render: function () {
    return (
      <span className="counter-adjust_count">
        <button className="counter-adjust-count__button" onClick={this.handleClick}>{this.props.value}</button>
      </span>
    );
  }

});
