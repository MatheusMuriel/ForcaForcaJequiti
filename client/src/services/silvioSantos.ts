enum statusJogador {
  JOGANDO = "Jogador da vez",
  ESPERANDO = "Em espera"
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
    status: statusJogador.ESPERANDO
  },
  {
    nome: "Muriel",
    pontuacao: 99999,
    status: statusJogador.JOGANDO
  }
]

export function getPalavra() {
  const palavraArr = palavraSecreta.split('');
  const palavraMask = palavraArr.map( letra => letrasTentadas.includes(letra) ? letra : '_');
  return palavraMask;
}

export function computarTentativa(letra: string) {
  letrasTentadas.push(letra);
}

export function registerJogador(nome: string) {
  //
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
