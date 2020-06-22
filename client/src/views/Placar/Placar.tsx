import React, { useState, useEffect } from 'react';
import { getJogadores, Jogador, statusJogador } from "../../services/silvioSantos";
import { socket } from "../../services/silvioSantos";

const Placar = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>(getJogadores());

  socket.on("atualizacao_jogadores", (data: any) => {
    const jogadores = Object.values(data);
    const esteJogador = jogadores.find( (j: any) => j.sid === socket.id);
  })

  useEffect(() => {
    const jogadores = getJogadores();
    setJogadores(jogadores);
  }, [getJogadores()]);

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
