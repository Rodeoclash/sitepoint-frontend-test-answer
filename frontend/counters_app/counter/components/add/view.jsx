import React from 'react';
import Marty from 'marty';
import CounterActions from '../../actions';
require('./style.less');

module.exports = React.createClass({
  displayName: 'counter-add',

  getInitialState: function () {
    return {
      title: ''
    };
  },

  handleClick: function (event) {
    event.preventDefault();
    CounterActions.createCounter({title: this.state.title});
    this.setState({title: ''});
  },

  handleChange: function (event) {
    this.setState({title: event.target.value});
  },

  disabled: function () {
    return !this.state.title;
  },

  render: function () {
    return (
      <form className="counter-add" onSubmit={this.handleClick}>
        <input className="counter-add__input" type="text" value={this.state.title} onChange={this.handleChange} />
        <button className="counter-add__submit" disabled={this.disabled()}>Add: {this.state.title}</button>
      </form>
    );
  }
});