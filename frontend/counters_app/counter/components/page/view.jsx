import React from 'react';
import Marty from 'marty';
import CounterAdd from '../add/view.jsx';
import CounterTable from '../table/view.jsx';
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
