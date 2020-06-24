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
      <span className="login100-form-title">Game over :c... A palavra era {palavra}</span>
      <iframe src="https://giphy.com/embed/nbJUuYFI6s0w0" 
        width="480" height="215" frameBorder="0" className="giphy-embed" 
        allowFullScreen></iframe><p><a href="https://giphy.com/gifs/random-fireworks-nbJUuYFI6s0w0">via GIPHY</a></p>

      <button className="login100-form-btn" onClick={() => handleJogarDnv()}>Jogar denovo</button>
    </div>
  );
}

export default Morte;