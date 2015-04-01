var Marty = require('marty');
var React = require('react');
var CounterStore = require('../../store');
require('./style.less');

module.exports = React.createClass({
  displayName: 'counter-table',

  render: function () {
    return (
      <div className="counter-table">
        <p>Table goes here</p>
      </div>
    );
  }
});