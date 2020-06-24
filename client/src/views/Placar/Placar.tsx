import React, { useState, useEffect } from 'react';
import { socket, Jogador, statusJogador, amqp, sid } from "../../services/silvioSantos";

import './styles.scss'

const Placar = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);

  amqp.connect('amqp://localhost', function(e: any, conn: any) {
    conn.createChannel(function(e: any, chan: any) {
      var exchange = 'atualizacao_jogadores';
      chan.assertQueue('', {
        exclusive: true
      }, (e: any, q: any) =>  {
        chan.bindQueue(q.queue, exchange, '');
        chan.consume(q.queue, function(msg: any) {
          const data = JSON.parse(msg.content.toString());          
          const jogadores: Jogador[] = Object.values(data);
          setJogadores(jogadores);
        }, { noAck: true });
      });
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
                className={`jogador ${jogador.sid === sid ? 'vc' : ''} ${jogador.status == statusJogador.JOGANDO ? 'jogando' : ''}`}>
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
