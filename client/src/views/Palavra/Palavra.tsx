import React, { useState, useEffect } from 'react';
import { socket } from "../../services/silvioSantos";

import './styles.scss';

const Palavra = () => {

  const [palavra, setPalavra] = useState<String[]>([]);
  const [dica, setDica] = useState("");

  socket.on('atualizacao_palavra', (data: any) => {
    setPalavra(data["palavra"]);
    setDica(data["dica"]);
  });

  var amqp = require('amqplib/callback_api');
  amqp.connect('amqp://localhost', (err: any, conn: any) => {
    conn.createChannel((err: any, chan: any) => {
      var queue = 'sala_de_jogo';
      chan.assertQueue(queue, { durable: false });

      chan.consume(queue, function(msg: string) {
          console.log(" [x] Received %s", msg.content.toString());
      }, { noAck: true });

    });
  });

  return (
    <div>
      <div className="palavra">
        {palavra.map( p => (
          <em className="letra">{p}</em>
        ))}
      </div>
      <div className="dica">
        <p>Dica: {dica}</p>
      </div>
    </div>
  );
}

export default Palavra;
