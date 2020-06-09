import React, { useState, useEffect } from 'react';
import { getJogadores, Jogador, statusJogador } from "../../services/silvioSantos";

interface Props {
  
}

const Placar: React.FC<Props> = ({}) => {
  const [jogadores, setJogadores] = useState<Jogador[]>(getJogadores());

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
