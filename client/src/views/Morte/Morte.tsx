import React, { useState, useEffect } from 'react';
import { amqp, sid } from "../../services/silvioSantos";

import "./styles.scss"

const Morte = () => {
  const [palavra, setPalavra] = useState('');

  function handleJogarDnv() {
    amqp.connect('amqp://localhost', (err: any, conn: any) => {
      conn.createChannel((err: any, chan: any) => {
        const data = { sid: sid }
        chan.sendToQueue('comecar_dnv', Buffer.from(JSON.stringify(data)));
      });
    });
  }

  amqp.connect('amqp://localhost', (err: any, conn: any) => {
    conn.createChannel((err: any, chan: any) => {
      chan.consume('morte', function(msg: any) {
        const data = JSON.parse(msg.content.toString());
        const palavra: string = data.palavra;
        setPalavra(palavra);
      }, { noAck: true });
    });
  });

  return (
    <div className="formRegistro">
      <span className="login100-form-title">Game over :c...</span>
      
      <iframe src="https://giphy.com/embed/dJYoOVAWf2QkU" 
        width="480" height="267" frameBorder="0" className="giphy-embed" 
        allowFullScreen></iframe><p><a href="https://giphy.com/gifs/dJYoOVAWf2QkU">via GIPHY</a></p>

      <span className="login100-form-title">A palavra era "{palavra}"</span>
      <button className="login100-form-btn" onClick={() => handleJogarDnv()}>Jogar denovo</button>
    </div>
  );
}

export default Morte;