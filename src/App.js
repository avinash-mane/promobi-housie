import './App.css';
import React from "react";
import Main from "./components/main";

function App() {
  return (
    <div className="App" style={{overflow:"hidden"}}>
      <Main/>
    </div>
  );
}

export default React.memo(App);
