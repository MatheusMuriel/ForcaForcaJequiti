export enum statusJogador {
  JOGANDO = "Jogador da vez",
  ESPERANDO = "Em espera",
  NULL = "Apenas para debug"
}

export interface Jogador {
  nome: string,
  pontuacao: number,
  status: statusJogador
}

let enforcamento: number = 0;
const palavraSecreta: string = "BATATA";
const letrasTentadas: string[] = [];
const jogadores: Jogador[] = [
  {
    nome: "Jogador 1",
    pontuacao: 0,
    status: statusJogador.JOGANDO
  },
  {
    nome: "Jogador 2",
    pontuacao: 0,
    status: statusJogador.ESPERANDO
  },
  {
    nome: "Jogador 3",
    pontuacao: 0,
    status: statusJogador.ESPERANDO
  }
]

export function iniciarNovoGame() {
  
}

export function getPalavra() {
  const palavraArr = palavraSecreta.split('');
  const palavraMask = palavraArr.map( letra => letrasTentadas.includes(letra) ? letra : '_');
  return palavraMask;
}

export function getEnforcamento() {
  return enforcamento;
}

export function computarTentativa(letra: string, pontos: number) {
  const indJog = jogadores.findIndex( j => j.status == statusJogador.JOGANDO);
  
  if (palavraSecreta.includes(letra)) {
    jogadores[indJog].pontuacao += pontos;
  } else {
    enforcamento += 1;
  }
  letrasTentadas.push(letra);

  if (!getPalavra().includes("_")){
    alert(`O jogador ${jogadores[indJog].nome} ganhou! \nCom ${jogadores[indJog].pontuacao} pontos!`);
  }
  
  jogadores[indJog].status = statusJogador.ESPERANDO;

  if (indJog+1 < jogadores.length){  
    jogadores[indJog + 1].status = statusJogador.JOGANDO;
  } else {
    jogadores[0].status = statusJogador.JOGANDO;
  }
}

export function girarRoleta() {
  const min = 10;
  const max = 1000;
  const pontos = Math.floor(Math.random() * (max - min)) + min;
  return pontos;
}

export function registerJogador(nome: string): Jogador {
  if (nome == "Matheus") {
    return {
      nome: "Matheus",
      pontuacao: 88888,
      status: statusJogador.ESPERANDO
    } as Jogador
  } else if (nome == "Muriel") {
    return {
      nome: "Muriel",
      pontuacao: 99999,
      status: statusJogador.JOGANDO
    } as Jogador
  } else {
    return {nome: '', status: statusJogador.NULL, pontuacao: 0};
  }
}

export function getJogadores() {
  return jogadores;
}

export function bloc() {
  console.log('bb');
}

export function liberate() {
  console.log('aaa');
}
