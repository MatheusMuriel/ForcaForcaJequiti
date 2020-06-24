import React, { useState, useEffect } from 'react';
import { socket, Jogador, amqp } from "../../services/silvioSantos";

import "./styles.scss"

const Vitoria = () => {
  const [vencedor, setVencedor] = useState<Jogador>({
    nome: '',
    pontuacao: 0,
    sid: '',
    status: ''
  });

  function handleJogarDnv() {
    socket.emit("inicar_jogo");
  }

  socket.on("vitoria", (data: any ) => {
    console.log(data);
    const jogador: Jogador = data["jogador"];
    setVencedor(jogador);
  });

  amqp.connect('amqp://localhost', (err: any, conn: any) => {
    conn.createChannel((err: any, chan: any) => {
      chan.consume('vitoria', function(msg: any) {
        const data = JSON.parse(msg.content.toString());
        console.log(data);
      }, { noAck: true });
    });
  });

  return (
    <div className="formRegistro">
      <span className="login100-form-title">O jogador {vencedor.nome} venceu</span>
      <iframe src="https://giphy.com/embed/nbJUuYFI6s0w0" 
        width="480" height="215" frameBorder="0" className="giphy-embed" 
        allowFullScreen></iframe><p><a href="https://giphy.com/gifs/random-fireworks-nbJUuYFI6s0w0">via GIPHY</a></p>

      <button className="login100-form-btn" onClick={() => handleJogarDnv()}>Jogar denovo</button>
    </div>
  );
}

export default Vitoria;