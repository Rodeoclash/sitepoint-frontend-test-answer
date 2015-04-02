import React from 'react';
import Marty from 'marty';
import AdjustCount from '../adjust_count/view.jsx';
import CounterDestroy from '../destroy/view.jsx';
require('./style.less');

module.exports = React.createClass({
  displayName: 'counter-table-row',

  render: function () {
    return (
      <tr className="counter-table_row">
        <td>{this.props.counter.id}</td>
        <td>{this.props.counter.title}</td>
        <td>
          <AdjustCount value={-1} counter={this.props.counter}/>
          {this.props.counter.count}
          <AdjustCount value={1} counter={this.props.counter}/>
        </td>
        <td><CounterDestroy counter={this.props.counter}/></td>
      </tr>
    );
  }
});