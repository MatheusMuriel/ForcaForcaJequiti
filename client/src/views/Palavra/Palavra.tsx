import React, { useState, useEffect } from 'react';
import { getPalavra, socket } from "../../services/silvioSantos";

interface Props {
  letrasTentadas: string[];
}

const Palavra: React.FC<Props> = ({letrasTentadas}) => {

  const [palavraCount, setPalavraCount] = useState(0);

  socket.on('atualizacao_palavra', () => {
    setPalavraCount(palavraCount + 1);
  });

  const [palavra, setPalavra] = useState<String[]>([]);

  useEffect(() => {
    const _palavra = getPalavra();
    setPalavra(_palavra);
  }, [palavraCount]);
  
  return (
    <div>
      <h1>{palavraCount}{palavra}</h1>
    </div>
  );
}

export default Palavra;
