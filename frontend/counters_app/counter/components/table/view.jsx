import React from 'react';
import Marty from 'marty';
import CounterStore from '../../store';
import CounterTableRow from '../table_row/view.jsx';
require('./style.less');

var ContainerTable = React.createClass({
  displayName: 'counter-table',

  render: function () {
    return (
      <table className="counter-table">
        <thead>
          <tr>
            <td>Id</td>
            <td>Title</td>
            <td>Value</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {this.props.counters.map(function (counter) {
            return <CounterTableRow key={counter.id} counter={counter}/>
          })}
        </tbody>
      </table>
    );
  }
});

module.exports = Marty.createContainer(ContainerTable, {
  listenTo: CounterStore,
  fetch: {
    counters() {
      return CounterStore.for(this).getCounters();
    }
  },
  failed(errors) {
    return <p>Load failure: {errors}</p>;
  },
  pending() {
    return <p>Loading...</p>;
  }
});
