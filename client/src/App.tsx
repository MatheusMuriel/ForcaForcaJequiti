import React, { useState, useEffect } from 'react';
import { hot } from "react-hot-loader/root";

import Forca from "./views/Forca/Forca";
import Alfabeto from "./views/Alfabeto/Alfabeto";
import Palavra from "./views/Palavra/Palavra";
import Placar from "./views/Placar/Placar";
import Registro from "./views/Registro/Registro";
import Vitoria from "./views/Vitoria/Vitoria";

import { socket } from "./services/silvioSantos";

import "./styles/main.scss";

function App() {
  const [inRegistro, setInRegistro] = useState<Boolean>(false);
  const [inVitoria, setInVitoria] = useState<Boolean>(false);
  const [inGame, setInGame] = useState<Boolean>(true);

  useEffect(() => {
    socket.emit("inicar_jogo");
  }, []);

  socket.on("perguntar_novo_jogador", (data: any) => {
    if (data["sid"] === socket.id) {
      setInGame(false);
      setInRegistro(true);
    }
  });

  socket.on("registrado", (data: any) => {
    if (data["sid"] === socket.id) {
      setInGame(true);
      setInRegistro(false);
    }
  });

  socket.on("vitoria", (data: any) => {
    setInGame(false);
    setInVitoria(true);
  });

  socket.on("jogo_iniciado", (data: any) => {
    if (data["sid"] === socket.id) {
      setInGame(true);
      setInVitoria(false);
    }
  });

  return (
    <div className="container">
      {inRegistro && <Registro></Registro>}
      {inVitoria && <Vitoria></Vitoria>}

      <div className={inGame ? "container-game": "container-game blur"}>
        <div className="forca-container">
          <Forca></Forca>
        </div>
        <div className="infos-container">
          <div className="palavra-container">
            <Palavra></Palavra>
          </div>
          <div className="letras-container">
            <Alfabeto></Alfabeto>
            <div className="placar-container">
              <Placar></Placar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default hot(App);