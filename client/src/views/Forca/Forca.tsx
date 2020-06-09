import * as React from 'react';
import { getEnforcamento } from "../../services/silvioSantos";

import forca0 from '../../assets/forca_0.svg';
import forca1 from '../../assets/forca_1.svg';
import forca2 from '../../assets/forca_2.svg';
import forca3 from '../../assets/forca_3.svg';
import forca4 from '../../assets/forca_4.svg';
import forca5 from '../../assets/forca_5.svg';
import forca6 from '../../assets/forca_6.svg';

const Forca = () => {
  const nivelForc = getEnforcamento();

  return (
    <>
      { (nivelForc === 0) && (<img src={forca0} alt="..." />)  }
      { (nivelForc === 1) && (<img src={forca1} alt="..." />)  }
      { (nivelForc === 2) && (<img src={forca2} alt="..." />)  }
      { (nivelForc === 3) && (<img src={forca3} alt="..." />)  }
      { (nivelForc === 4) && (<img src={forca4} alt="..." />)  }
      { (nivelForc === 5) && (<img src={forca5} alt="..." />)  }
      { (nivelForc === 6) && (<img src={forca6} alt="..." />)  }
    </>
  );
}

export default Forca;
