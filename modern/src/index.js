import 'typeface-roboto'
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux';

import { Router, Route, Switch, Redirect } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import "./assets/css/material-dashboard-react.css?v=1.9.0";
import { createBrowserHistory } from "history";

import Admin from "./layouts/Admin.js";
import RTL from "./layouts/RTL.js";
// ReactDOM.render((
//   <Provider store={store}>
//     <HashRouter>
//       <App />
//     </HashRouter>
//   </Provider>
// ), document.getElementById('root'));

const hist = createBrowserHistory();

ReactDOM.render((
  <Provider store={store}>
   <Router history={hist}>
     <Switch>
       <Route path="/admin" component={Admin} />
       <Route path="/rtl" component={RTL} />
       <Redirect from="/" to="/admin/dashboard" />
     </Switch>
   </Router>,
  </Provider>
), document.getElementById('root'));

serviceWorker.register();


// import { Router, Route, Switch, Redirect } from "react-router-dom";

// // core components
// import Admin from "layouts/Admin.js";
// import RTL from "layouts/RTL.js";


// const hist = createBrowserHistory();

// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       <Route path="/admin" component={Admin} />
//       <Route path="/rtl" component={RTL} />
//       <Redirect from="/" to="/admin/dashboard" />
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// );