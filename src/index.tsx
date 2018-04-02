import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, { initialState } from './reducers';
import { loadProjects } from './actions/projectActions';
import { loadTimeLogs } from './actions/timeLogActions';
import { loadTimer } from './actions/timerActions';
import { StoreState } from './types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProjectsPage from './components/ProjectsPage';
import TimeLogsPage from './components/TimeLogsPage';
import * as io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';

const socket = io('http://localhost:8000');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'event/');
const store = createStore<StoreState>(rootReducer, initialState, applyMiddleware(socketIoMiddleware, thunk));
store.dispatch(loadProjects());
store.dispatch(loadTimeLogs());
store.dispatch(loadTimer());

socket.on('refreshProjects', (res: any) => {
  // tslint:disable-next-line:no-console
  console.log('Refresh projects!');
  store.dispatch(loadProjects());
});

socket.on('refreshTimeLogs', (res: any) => {
  store.dispatch(loadTimeLogs());
});

socket.on('refreshTimer', (res: any) => {
  if (!store.getState().timer.timerHandle) {
    clearInterval(store.getState().timer.timerHandle);
    // tslint:disable-next-line:no-console
    console.log('handle', store.getState().timer.timerHandle);
  }
  store.dispatch(loadTimeLogs());
  store.dispatch(loadTimer());
});

const Root: React.SFC<{}> = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact={true} path="/" component={App} />
        <Route path="/timelogs" component={TimeLogsPage} />
        <Route path="/projects" component={ProjectsPage} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);