import './App.css';
import React from "react";
import Main from "./components/main";
import Ticket from "./components/ticket";
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/tickets' component={Ticket} />
      </Switch>
    </div>
  );
}

export default React.memo(App);
