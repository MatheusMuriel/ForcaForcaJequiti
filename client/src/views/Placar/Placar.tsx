import React, { useState, useEffect } from 'react';
import { socket, Jogador, statusJogador, amqp } from "../../services/silvioSantos";

import './styles.scss'

const Placar = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);

  socket.on("atualizacao_jogadores", (data: any) => {
    //const jogadores: Jogador[] = Object.values(data);
    //const esteJogador = jogadores.filter( (j: any) => j.sid === socket.id)[0];
    //setJogadores(jogadores);
  });

  amqp.connect('amqp://localhost', (err: any, conn: any) => {
    conn.createChannel((err: any, chan: any) => {
      chan.consume('atualizacao_jogadores', function(msg: any) {
        const data = JSON.parse(msg.content.toString());
        
        const jogadores: Jogador[] = Object.values(data);
        setJogadores(jogadores);

      }, { noAck: true });
    });
  });

  return (
    <div>
       <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {
            jogadores.map(jogador => (
              <tr key={jogador.nome}
                className={`jogador ${jogador.sid === socket.id ? 'vc' : ''} ${jogador.status == statusJogador.JOGANDO ? 'jogando' : ''}`}>
                <td>{jogador.nome}</td>
                <td>{jogador.pontuacao}</td>
              </tr>
            ))  
          }
        </tbody>
      </table>
    </div>
  );
}

export default Placar;
