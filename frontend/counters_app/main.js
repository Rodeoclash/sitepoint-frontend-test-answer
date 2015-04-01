import React from 'react';
import CounterStore from './counter/store';
import MainActions from './main/actions';
import CounterPage from './counter/components/page/view.jsx';
require('./style.less');

MainActions.start();

React.render(
  <CounterPage />,
  document.getElementById('application')
);
