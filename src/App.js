import './App.css';
import React from "react";
import Main from "./components/main";
import Ticket from "./components/ticket";
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <Switch>
        <Route path='/tickets' component={Ticket} />
        <Route path='/' component={Main} />
      </Switch>
    </div>
  );
}

export default React.memo(App);
