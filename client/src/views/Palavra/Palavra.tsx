import React, { useState, useEffect } from 'react';
import { socket, amqp } from "../../services/silvioSantos";

import './styles.scss';

const Palavra = () => {

  const [palavra, setPalavra] = useState<String[]>([]);
  const [dica, setDica] = useState("");

  amqp.connect('amqp://localhost', (err: any, conn: any) => {
    conn.createChannel((err: any, chan: any) => {
      chan.consume('atualizacao_palavra', function(msg: any) {
        const data = JSON.parse(msg.content.toString());
        setPalavra(data.palavra);
        setDica(data.dica);
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
