import React, { useState } from 'react';
import { hot } from "react-hot-loader/root";

import Forca from "./views/Forca/Forca";
import Alfabeto from "./views/Alfabeto/Alfabeto";
import Palavra from "./views/Palavra/Palavra";

import { computarTentativa } from "./services/silvioSantos";

import "./styles/main.scss";

function App() {
  const [letrasTentadas, setLetrasTentadas] = useState<string[]>([]);

  function handleLetraClicked(letra: string) {
    const letras_atted = [...letrasTentadas, letra];
    setLetrasTentadas(letras_atted);
    computarTentativa(letra);
  }

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
          <Palavra letrasTentadas={letrasTentadas}></Palavra>
        </div>

        <div className="letras-container">
          <Alfabeto onLetraClicked={handleLetraClicked}></Alfabeto>
        </div>
      </div>
    </div>
  );
}

export default hot(App);