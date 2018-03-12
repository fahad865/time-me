import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, { initialState } from './reducers';
import { loadProjects } from './actions/projectActions';
import { StoreState } from './types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import ProjectsPage from './components/ProjectsPage';

const store = createStore<StoreState>(rootReducer, initialState, applyMiddleware(thunk));
store.dispatch(loadProjects());
const Root: React.SFC<{}> = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);