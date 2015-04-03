import React from 'react';
import CounterStore from './counter/store';
import CounterPage from './counter/components/page/view.jsx';
require('./style.less');

React.render(
  <CounterPage />,
  document.getElementById('application')
);
