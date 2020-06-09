import React, { useState } from 'react';
import { getPalavra, liberate } from "../../services/silvioSantos";

interface Props {
  letrasTentadas: string[];
}

const Palavra: React.FC<Props> = ({letrasTentadas}) => {
  return (
    <div>
      <h1>{getPalavra()}</h1>
    </div>
  );
}

export default Palavra;
