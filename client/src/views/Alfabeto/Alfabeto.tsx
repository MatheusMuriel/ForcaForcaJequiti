import React, { useState } from 'react';
import { girarRoleta } from "../../services/silvioSantos";

interface Letra {
  letra: string,
  clicked: boolean
}

interface Alfabeto {
  [A: string]: Letra, 
  B: Letra, 
  C: Letra, 
  D: Letra, 
  E: Letra, 
  F: Letra, 
  G: Letra, 
  H: Letra, 
  I: Letra, 
  J: Letra, 
  K: Letra, 
  L: Letra, 
  M: Letra, 
  N: Letra, 
  O: Letra, 
  P: Letra, 
  Q: Letra, 
  R: Letra, 
  S: Letra, 
  T: Letra, 
  U: Letra, 
  V: Letra, 
  W: Letra, 
  X: Letra, 
  Y: Letra, 
  Z: Letra
}

interface Props {
  onLetraClicked: (letra: string, pontos: number) => void;
}

const Alfabeto: React.FC<Props> = ({ onLetraClicked }) => {
  const [alfabeto, setAlfabeto] = useState<Alfabeto>({
    A: {
      letra: 'A',
      clicked: false
    }, 
    B: {
      letra: 'B',
      clicked: false
    }, 
    C: {
      letra: 'C',
      clicked: false
    }, 
    D: {
      letra: 'D',
      clicked: false
    }, 
    E: {
      letra: 'E',
      clicked: false
    }, 
    F: {
      letra: 'F',
      clicked: false
    }, 
    G: {
      letra: 'G',
      clicked: false
    }, 
    H: {
      letra: 'H',
      clicked: false
    }, 
    I: {
      letra: 'I',
      clicked: false
    }, 
    J: {
      letra: 'J',
      clicked: false
    }, 
    K: {
      letra: 'K',
      clicked: false
    }, 
    L: {
      letra: 'L',
      clicked: false
    }, 
    M: {
      letra: 'M',
      clicked: false
    }, 
    N: {
      letra: 'N',
      clicked: false
    }, 
    O: {
      letra: 'O',
      clicked: false
    }, 
    P: {
      letra: 'P',
      clicked: false
    }, 
    Q: {
      letra: 'Q',
      clicked: false
    }, 
    R: {
      letra: 'R',
      clicked: false
    }, 
    S: {
      letra: 'S',
      clicked: false
    }, 
    T: {
      letra: 'T',
      clicked: false
    }, 
    U: {
      letra: 'U',
      clicked: false
    }, 
    V: {
      letra: 'V',
      clicked: false
    }, 
    W: {
      letra: 'W',
      clicked: false
    }, 
    X: {
      letra: 'X',
      clicked: false
    }, 
    Y: {
      letra: 'Y',
      clicked: false
    }, 
    Z: {
      letra: 'Z',
      clicked: false
    }
  });

  function handleLetraClick(letra: string) {
    const altered_alfabeto = {...alfabeto};
    altered_alfabeto[letra].clicked = true;
    setAlfabeto(altered_alfabeto);
    onLetraClicked(letra, pontos)
  }

  const pontos = girarRoleta();

  return (
    <div>
      <h1>Valendo: {pontos}</h1>
      {
        Object.keys(alfabeto).map(key => (
          <button 
            key={key} 
            onClick={() => handleLetraClick(key)}
            disabled={alfabeto[key].clicked}
          >
            {alfabeto[key].letra}
          </button>
        ))
      }
    </div>
    
  );
}

export default Alfabeto;
