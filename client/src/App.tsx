import React, { useState, useEffect } from 'react';
import { hot } from "react-hot-loader/root";

import Forca from "./views/Forca/Forca";
import Alfabeto from "./views/Alfabeto/Alfabeto";
import Palavra from "./views/Palavra/Palavra";
import Placar from "./views/Placar/Placar";
import Registro from "./views/Registro/Registro";
import Vitoria from "./views/Vitoria/Vitoria";
import Morte from "./views/Morte/Morte";

import { amqp, sid } from "./services/silvioSantos";

import "./styles/main.scss";

function App() {
  const [inRegistro, setInRegistro] = useState<Boolean>(false);
  const [inVitoria, setInVitoria] = useState<Boolean>(false);
  const [inMorte, setInMorte] = useState<Boolean>(false);
  const [inGame, setInGame] = useState<Boolean>(true);
  
  // Foi necessario adaptar imports no node modules

  useEffect(() => {
    if ( sid === 0 ) {
      setInGame(false);
      setInRegistro(true);
    }
  }, []);


  /** ========================================================================== */

  amqp.connect('amqp://localhost', (err: any, conn: any) => {
    conn.createChannel((err: any, chan: any) => {
      chan.consume('registrado', function(msg: any) {
        const data = JSON.parse(msg.content.toString());
        if (data.sid === sid) {
          setInGame(true);
          setInRegistro(false);
          setInMorte(false);
          setInVitoria(false);
        }

      }, { noAck: true });
    });
  });


  /** ========================================================================== */

  amqp.connect('amqp://localhost', (err: any, conn: any) => {
    conn.createChannel((err: any, chan: any) => {
      chan.consume('fim_de_jogo', function(msg: any) {
        const data = JSON.parse(msg.content.toString());
        setInGame(false);
        if (data.motivo === 'VITORIA') {
          setInVitoria(true);
        } else if (data.motivo === 'MORTE') {
          setInMorte(true);
        }
        
      }, { noAck: true });
    });
  });

  /** ========================================================================== */

  amqp.connect('amqp://localhost', (err: any, conn: any) => {
    conn.createChannel((err: any, chan: any) => {
      chan.consume('jogo_iniciado', function(msg: any) {
        console.log('A');
        const data = JSON.parse(msg.content.toString());
        if (data.sid === sid) {
          setInGame(true);
          setInVitoria(false);
          setInMorte(false);
          setInVitoria(false);
        }

      }, { noAck: true });
    });
  });


  return (
    <div className="container">
      {inRegistro && <Registro></Registro>}
      {inVitoria && <Vitoria></Vitoria>}
      {inMorte && <Morte></Morte>}

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