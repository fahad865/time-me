import * as React from 'react';
import '../App.css';
import TimeLogList from '../containers/TimeLogList';
import Header from './common/Header';

// const logo = require('./logo.svg');

function TimeLogsPage() {
  return (
    <div className="App">
      <Header />
      <TimeLogList />
    </div>
  );
}

export default TimeLogsPage;
