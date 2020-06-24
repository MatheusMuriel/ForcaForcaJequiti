import React, { useState } from 'react';
import { socket, Jogador, amqp, sid } from "../../services/silvioSantos";

import './styles.scss';

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

const Alfabeto = () => {
  const [roleta, setRoleta] = useState(0);
  const [nome, setNome] = useState('');
  const [vezDeJogar, setVezDeJogar] = useState(false);
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

  amqp.connect('amqp://localhost', (err: any, conn: any) => {
    conn.createChannel((err: any, chan: any) => {
      chan.consume('atualizacao_tentativas', function(msg: any) {
        const data = JSON.parse(msg.content.toString());

        const altered_alfabeto = {...alfabeto};
        data.forEach( (l: string) => altered_alfabeto[l].clicked = true )
        setAlfabeto(altered_alfabeto);
      }, { noAck: true });
    });
  });


  amqp.connect('amqp://localhost', (err: any, conn: any) => {
    conn.createChannel((err: any, chan: any) => {
      chan.consume('atualizacao_roleta', function(msg: any) {
        const data = JSON.parse(msg.content.toString());
        setRoleta(data.valor_roleta);
      }, { noAck: true });
    });
  });

  amqp.connect('amqp://localhost', function(e: any, conn: any) {
    conn.createChannel(function(e: any, chan: any) {
      var exchange = 'atualizacao_jogadores';
      chan.assertQueue('', {
        exclusive: true
      }, (e: any, q: any) =>  {
        chan.bindQueue(q.queue, exchange, '');

        chan.consume(q.queue, function(msg) {
          const data = JSON.parse(msg.content.toString());
          const jogadores: Jogador[] = Object.values(data);
          const esteJogador = jogadores.filter( (j: any) => j.sid === sid)[0];
          if (esteJogador) {
            setNome(esteJogador.nome);
            setVezDeJogar(esteJogador.status === "JOGANDO");
          }
        }, { noAck: true });
      });
    });
  });

  function handleLetraClick(letra: string) {
    amqp.connect('amqp://localhost', (err: any, conn: any) => {
      conn.createChannel((err: any, chan: any) => {
        const data = {
          letra: letra,
          sid: sid
        }
        chan.sendToQueue('tentativa', Buffer.from(JSON.stringify(data)));
      });
    });
  }

  return (
    <div>
      <p className="valor-roleta">Valendo: {roleta}</p>
      <div className="buttons-container">
        {
          Object.keys(alfabeto).map(key => (
            <button 
              key={key} 
              className="btn"
              onClick={() => handleLetraClick(key)}
              disabled={alfabeto[key].clicked || !vezDeJogar}
            >
              {alfabeto[key].letra}
            </button>
          ))
        }
      </div>
    </div>
    
  );
}

export default Alfabeto;
