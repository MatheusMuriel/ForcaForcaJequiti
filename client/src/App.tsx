import React, { useState, useEffect } from 'react';
import { hot } from "react-hot-loader/root";

import Forca from "./views/Forca/Forca";
import Alfabeto from "./views/Alfabeto/Alfabeto";
import Palavra from "./views/Palavra/Palavra";
import Placar from "./views/Placar/Placar";

import { iniciarNovoGame, computarTentativa } from "./services/silvioSantos";

import "./styles/main.scss";

function App() {

  useEffect(() => {
    iniciarNovoGame();
  }, []);

  const [letrasTentadas, setLetrasTentadas] = useState<string[]>([]);

  function handleLetraClicked(letra: string, pontos: number) {
    const letras_atted = [...letrasTentadas, letra];
    setLetrasTentadas(letras_atted);
    computarTentativa(letra, pontos);
  }

  return (
    
    <div className="container">

      <div className="forca-container">
        <Forca></Forca>
      </div>

      <div className="infos-container">
        <div className="placar-container">
          <Placar></Placar>
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