import React, { useState } from 'react';
import { getPalavra, liberate } from "../../services/silvioSantos";

interface Props {
  letrasTentadas: string[];
}

const Palavra: React.FC<Props> = ({letrasTentadas}) => {
  function handleCli() {
    liberate();
  }
  return (
    <div>
      <button onClick={handleCli}></button>
      <h1>{getPalavra()}</h1>
    </div>
  );
}

export default Palavra;
