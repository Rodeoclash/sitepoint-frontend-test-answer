var Marty = require('marty');
var React = require('react');
var CounterStore = require('../../store');
var CounterAdd = require('../add/view.jsx');
var CounterTable = require('../table/view.jsx');
require('./style.less');

module.exports = React.createClass({
  displayName: 'counter-page',

  render: function () {
    return (
      <div className="counter-page">
        <h1>Counter App</h1>
        <h2>Add Counter</h2>
        <CounterAdd/>
        <h2>Existing Counters</h2>
        <CounterTable/>
      </div>
    );
  }
});
