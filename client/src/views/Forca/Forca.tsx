import * as React from 'react';

import forca from '../../assets/forca.svg'; // Tell webpack this JS file uses this image

const Forca = () => {

  const getTime = () => {
    let now = new Date();
    let year = now.getFullYear().toString();
    let month = now.getMonth().toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");
    return [year, month, day].reduce((prev, curr) => prev + "-" + curr);
  }

  return (
    <img src={forca} alt="..." />
  );
}

export default Forca;
