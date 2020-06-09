import * as React from "react";
import { hot } from "react-hot-loader/root";

import Forca from "./views/Forca";
import Alfabeto from "./views/Alfabeto";

import "./styles/main.scss";

//<Forca></Forca>
function App() {
  return (
    <div className="container">

      <div className="forca-container">
        <Forca></Forca>
      </div>

      <div className="infos-container">
        <div className="placar-container">
          <div id="placar"></div>
        </div>

        <div className="palavra-container">
          <h1>AA_A_AA_AAAA_AAA</h1>
        </div>

        <div className="letras-container">
          <Alfabeto></Alfabeto>
        </div>
      </div>
    </div>
  );
}

export default hot(App);