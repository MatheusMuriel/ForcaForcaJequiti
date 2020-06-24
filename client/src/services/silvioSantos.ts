import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
export const socket = socketIOClient(ENDPOINT);

export var amqp = require('amqplib/callback_api');


export enum statusJogador {
  JOGANDO = "JOGANDO",
  ESPERANDO = "ESPERANDO"
}

export interface Jogador {
  nome: string,
  pontuacao: number,
  status: string,
  sid: string
}