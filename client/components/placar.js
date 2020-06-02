'use strict';

const e = React.createElement;

class Placar extends React.Component {
  
  constructor(props) {
    super(props);
    // Puxar do arquivo
    this.placar = [
      { nome: 'Matheus', pontos: 9999999 },
      { nome: 'Isabeli', pontos: 150 },
      { nome: 'João', pontos: 90 }
    ];
  }
  
  renderThead(titulos) {
    return (
      React.createElement(
        'thead', null,
        React.createElement(
          'tr', null,
          titulos.map( (t, i) => React.createElement('th', {key: i}, t) )
        )
      )
    );
  }

  renderTbody(row) {
    return (
      React.createElement(
        'tbody', null,
        row.map( (r, i) => React.createElement(
          'tr', {key: i},
          React.createElement('td', null, i),
          React.createElement('td', null, r.nome),
          React.createElement('td', null, r.pontos)
        ))
      )
    );
  }

  render() {

    if (this.placar.length == 0) {
      return React.createElement('p', null, 'Nenhum item');
    }

    return (
      React.createElement(
        'table', {className: "pure-table"},
        this.renderThead(['#', 'Jogador', 'Pontuação']),
        this.renderTbody(this.placar)
      )
    );
  }
}

const domContainer = document.querySelector('#placar');
ReactDOM.render(e(Placar), domContainer);