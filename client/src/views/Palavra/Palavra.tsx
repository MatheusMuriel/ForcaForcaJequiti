import React, { useState, useEffect } from 'react';
import { socket } from "../../services/silvioSantos";

import './styles.scss';

const Palavra = () => {

  const [palavra, setPalavra] = useState<String[]>([]);
  const [dica, setDica] = useState("");

  socket.on('atualizacao_palavra', (data: any) => {
    setPalavra(data["palavra"]);
    setDica(data["dica"]);
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
