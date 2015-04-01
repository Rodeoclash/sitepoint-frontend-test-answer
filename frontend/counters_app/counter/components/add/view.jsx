var Marty = require('marty');
var React = require('react');
var CounterActions = require('../../actions');
//require('./style.less');

module.exports = React.createClass({
  displayName: 'counter-add',

  getInitialState: function () {
    return {
      title: ''
    };
  },

  handleClick: function (event) {
    if (!this.disabled()) {
      CounterActions.createCounter({title: this.state.title});
    }
  },

  handleChange: function (event) {
    this.setState({title: event.target.value});
  },

  disabled: function () {
    return !this.state.title;
  },

  render: function () {
    return (
      <form className="counter-add">
        <input className="counter-add__input" type="text" value={this.state.title} onChange={this.handleChange} />
        <button className="counter-add__submit" disabled={this.disabled()} onClick={this.handleClick}>Add {this.state.title}</button>
      </form>
    );
  }
});