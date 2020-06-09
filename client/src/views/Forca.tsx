import * as React from 'react';

import forca from './forca.svg'; // Tell webpack this JS file uses this image

const Forca = () => {

  const getTime = () => {
    let now = new Date();
    let year = now.getFullYear().toString();
    let month = now.getMonth().toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");
    return [year, month, day].reduce((prev, curr) => prev + "-" + curr);
  }

  return (
    <div className="layout">
      <img src={forca} alt="..." />
      <div className="container">
        <div className="sidebar">
        </div>
        <div className="header">
          <h1>My Application</h1>
        </div>
        <div className="footer">
          <p>Today is: {getTime()}</p>
        </div>
      </div>
    </div>
  );
}

export default Forca;
