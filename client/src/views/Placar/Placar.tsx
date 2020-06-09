import React, { useState } from 'react';
import { getJogadores, Jogador } from "../../services/silvioSantos";

interface Props {
  
}

const Placar: React.FC<Props> = ({}) => {
  //const [jogadores, setJogadores] = useState<Jogador[]>(getJogadores());

  return (
    <div>
      {
        getJogadores().map(jogador => (
          <p key={jogador.nome}>{jogador.nome} - {jogador.pontuacao}</p>
        ))
      }
    </div>
  );
}

export default Placar;
