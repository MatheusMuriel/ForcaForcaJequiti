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

const palavraSecreta: string = "BATATA";
const letrasTentadas: string[] = [];
const jogadores: Jogador[] = [
  {
    nome: "Matheus",
    pontuacao: 88888,
    status: statusJogador.JOGANDO
  },
  {
    nome: "Muriel",
    pontuacao: 99999,
    status: statusJogador.ESPERANDO
  }
]

export function getPalavra() {
  const palavraArr = palavraSecreta.split('');
  const palavraMask = palavraArr.map( letra => letrasTentadas.includes(letra) ? letra : '_');
  return palavraMask;
}

export function computarTentativa(letra: string, jogador: Jogador) {
  const indJog = jogadores.findIndex( j => j.nome == jogador.nome);
  jogadores[indJog].status = statusJogador.ESPERANDO;

  if (indJog < jogadores.length){  
    jogadores[indJog + 1].status = statusJogador.JOGANDO;
  } else {
    jogadores[0].status = statusJogador.JOGANDO;
  }

  letrasTentadas.push(letra);
  console.log(jogadores);
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
