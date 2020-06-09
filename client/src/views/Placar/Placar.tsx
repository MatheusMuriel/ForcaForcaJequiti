import React, { useState } from 'react';
import { getJogadores, Jogador, statusJogador } from "../../services/silvioSantos";

interface Props {
  
}

const Placar: React.FC<Props> = ({}) => {
  //const [jogadores, setJogadores] = useState<Jogador[]>(getJogadores());

  return (
    <div>
      <p>* = Jogador da vez</p>
      {
        getJogadores().map(jogador => (
          <p key={jogador.nome}>
            {jogador.status == statusJogador.JOGANDO ? '*' : '' }{jogador.nome} - {jogador.pontuacao}
          </p>
        ))
      }
    </div>
  );
}

export default Placar;
