import { hot } from "react-hot-loader/root";
import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import FooView from "./views/FooView";
import BarView from "./views/BarView";
import Forca from "./views/Forca";
import "./styles/main.scss";

function App() {
  return (
    <Forca></Forca>
  );
}

export default hot(App);