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

const store = createStore<StoreState>(rootReducer, initialState, applyMiddleware(thunk));
store.dispatch(loadProjects());
store.dispatch(loadTimeLogs());
store.dispatch(loadTimer());
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