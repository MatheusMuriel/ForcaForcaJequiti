import React, { useState, useEffect } from 'react';
import { getPalavra, socket } from "../../services/silvioSantos";

interface Props {
  letrasTentadas: string[];
}

const Palavra: React.FC<Props> = ({letrasTentadas}) => {

  const [palavra, setPalavra] = useState<String[]>([]);

  socket.on('atualizacao_palavra', (data: string[]) => {
    setPalavra(data);
  });

  return (
    <div>
      <h1>{palavra}</h1>
    </div>
  );
}

export default Palavra;
