
const palavraSecreta: string = "BATATA";
const letrasTentadas: string[] = [];

export function getPalavra() {
  const palavraArr = palavraSecreta.split('');
  const palavraMask = palavraArr.map( letra => letrasTentadas.includes(letra) ? letra : '_');
  return palavraMask;
}

export function computarTentativa(letra: string) {
  letrasTentadas.push(letra);
}
