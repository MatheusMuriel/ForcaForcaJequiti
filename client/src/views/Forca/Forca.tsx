import React, { useState, useEffect } from 'react';
import { getEnforcamento } from "../../services/silvioSantos";

import './style.scss';

import forca0 from '../../assets/forca0.png';
import forca1 from '../../assets/forca1.png';
import forca2 from '../../assets/forca2.png';
import forca3 from '../../assets/forca3.png';
import forca4 from '../../assets/forca4.png';
import forca5 from '../../assets/forca5.png';
import forca6 from '../../assets/forca6.png';
import forca7 from '../../assets/forca7.png';

const Forca = () => {
  const forcas = [forca0, forca1, forca2, forca3, forca4, forca5, forca6, forca7];
  
  const [srcForca, setSrcForca] = useState<string>(forca0);

  useEffect(() => {
    const nivel = getEnforcamento();
    setSrcForca(forcas[nivel]);
  }, [getEnforcamento()]);

  return (
    <img src={srcForca} alt="..." className="forca" />
  );
}

export default Forca;
