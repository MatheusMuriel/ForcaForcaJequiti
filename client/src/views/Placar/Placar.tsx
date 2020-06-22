import React, { useState, useEffect } from 'react';
import { socket, Jogador, statusJogador } from "../../services/silvioSantos";

const Placar = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);

  socket.on("atualizacao_jogadores", (data: any) => {
    const jogadores: Jogador[] = Object.values(data);
    setJogadores(jogadores);
  })

  return (
    <div>
      <p>* = Jogador da vez</p>
      {
        jogadores.map(jogador => (
          <p key={jogador.nome}>
            {jogador.status == statusJogador.JOGANDO ? '*' : '' }{jogador.nome} - {jogador.pontuacao}
          </p>
        ))
      }
    </div>
  );
}

export default Placar;
