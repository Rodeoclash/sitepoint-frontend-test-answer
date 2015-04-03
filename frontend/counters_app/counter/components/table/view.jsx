import React from 'react';
import Marty from 'marty';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import CounterStore from '../../store';
import CounterTableRow from '../table_row/view.jsx';
require('./style.less');

var ContainerTable = React.createClass({
  displayName: 'counter-table',
  mixins: [ImmutableRenderMixin],

  render: function () {

    if (this.props.counters.size === 0) {
      return <p>Not counters found, why not create one?</p>;
    };

    return (
      <table className="counter-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="counter-table__counters">
          {this.props.counters.map(function (counter) {
            return <CounterTableRow key={counter.id} counter={counter}/>
          }).toArray()}
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
