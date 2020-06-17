import React, { useState, useEffect } from 'react';
import { socket } from "../../services/silvioSantos";

const Palavra = () => {

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
