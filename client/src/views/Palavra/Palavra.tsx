import React, { useState, useEffect } from 'react';
import { amqp } from "../../services/silvioSantos";

import './styles.scss';
import { strict } from 'assert';

const Palavra = () => {

  const [palavra, setPalavra] = useState<String[]>([]);
  const [dica, setDica] = useState("");

  /*amqp.connect('amqp://localhost', (err: any, conn: any) => {
    conn.createChannel((err: any, chan: any) => {

      chan.consume('atualizacao_palavra', function(msg: any) {
        const data = JSON.parse(msg.content.toString());
        setPalavra(data.palavra);
        setDica(data.dica);
      }, { noAck: true });
    });
  });*/

  amqp.connect('amqp://localhost', function(e: any, conn: any) {
    conn.createChannel(function(e: any, chan: any) {
      var exchange = 'atualizacao_palavra';
      chan.assertQueue('', {
        exclusive: true
      }, (e: any, q: any) =>  {
        chan.bindQueue(q.queue, exchange, '');
        chan.consume(q.queue, function(msg: any) {
          const data = JSON.parse(msg.content.toString());     

          setPalavra(data.palavra);
          setDica(data.dica);

        }, { noAck: true });
      });
    });
  });

  return (
    <div>
      <div className="palavra">
        {palavra.map( (p, i) => (
          <em key={i.toString()} className="letra">{p}</em>
        ))}
      </div>
      <div className="dica">
        <p>Dica: {dica}</p>
      </div>
    </div>
  );
}

export default Palavra;
