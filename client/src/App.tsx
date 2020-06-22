import React, { useState, useEffect } from 'react';
import { hot } from "react-hot-loader/root";

import Forca from "./views/Forca/Forca";
import Alfabeto from "./views/Alfabeto/Alfabeto";
import Palavra from "./views/Palavra/Palavra";
import Placar from "./views/Placar/Placar";
import Registro from "./views/Registro/Registro";

import { socket } from "./services/silvioSantos";

import "./styles/main.scss";

function App() {
  const [inRegistro, setInRegistro] = useState<Boolean>(false);

  useEffect(() => {
    socket.emit("inicar_jogo");

    socket.on("perguntar_novo_jogador", () => {
      setInRegistro(true);
    })
  }, []);

  socket.on("registrado", () => {
    console.log('registrado');
    setInRegistro(false);
  })

  return (
    <div className="container">
      {inRegistro && <Registro></Registro>}

      <div className={inRegistro ? "container-game blur": "container-game"}>
        <div className="forca-container">
          <Forca></Forca>
        </div>
        <div className="infos-container">
          <div className="placar-container">
            <Placar></Placar>
          </div>
          <div className="palavra-container">
            <Palavra></Palavra>
          </div>
          <div className="letras-container">
            <Alfabeto></Alfabeto>
          </div>
        </div>
      </div>
    </div>
  );
}

export default hot(App);