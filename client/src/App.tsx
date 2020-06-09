import React, { useState } from 'react';
import { hot } from "react-hot-loader/root";

import Forca from "./views/Forca/Forca";
import Alfabeto from "./views/Alfabeto/Alfabeto";
import Palavra from "./views/Palavra/Palavra";
import Placar from "./views/Placar/Placar";

import { computarTentativa, registerJogador, Jogador, statusJogador } from "./services/silvioSantos";

import "./styles/main.scss";

function App() {
  const [jogador, setJogador] = useState<Jogador>({nome:'', pontuacao:0, status: statusJogador.NULL});

  const [letrasTentadas, setLetrasTentadas] = useState<string[]>([]);

  function handleLetraClicked(letra: string) {
    const letras_atted = [...letrasTentadas, letra];
    setLetrasTentadas(letras_atted);
    computarTentativa(letra, jogador);
  }

  function handleCadMatheus() {
    setJogador(registerJogador("Matheus"));
  }

  function handleCadMuriel() {
    setJogador(registerJogador("Muriel"));
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
          <button onClick={handleCadMatheus}>Registrar Matheus</button>
          <button onClick={handleCadMuriel}>Registrar Muriel</button>
        </div>
      </div>
    </div>
  );
}

export default hot(App);