from aiohttp import web
import asyncio
import socketio
import json

sio = socketio.AsyncServer(async_mode="aiohttp", cors_allowed_origins="*")
app = web.Application()
sio.attach(app)

palavra_secreta = 'BATATA'
enforcamento = 0
letras_tentadas = ['B']
jogadores = {
  "jogadorX" : {
    "nome": "Jogador 01",
    "pontuacao": 0,
    "valor_roleta": 0,
    "status": "JOGANDO"
  },
  "jogadorY" : {
    "nome": "Jogador 02",
    "pontuacao": 0,
    "valor_roleta": 0,
    "status": "ESPERANDO"
  },
  "jogadorZ" : {
    "nome": "Jogador 03",
    "pontuacao": 0,
    "valor_roleta": 0,
    "status": "ESPERANDO"
  }
}

@sio.event
def connect(sid, environ):
  print('connect ', sid)

@sio.event
def disconnect(sid):
  print('disconnect ', sid)

@sio.event
async def my_message(sid, data):
  print('message Recebida', data)
  await responder('my_response', 'Respondendo ai', sid)
  await att_palavra(sid)

@sio.event
async def tentativa(sid, letra):
  computar_tentativa(letra)
  

async def att_palavra(sid):
  plvr = mask_palavra()
  await sio.emit("atualizacao_palavra", plvr, sid)    

async def responder(event, message, sid):
  await sio.emit(event, message, sid)

def computar_tentativa(letra, jogador):
  if (letra in palavra_secreta):
    print('Acertou')

  letras_tentadas.push(letra)

def mask_palavra(): 
  plvr_arr = list(palavra_secreta)
  plvr_mask = map(mask_letra, plvr_arr)
  plvr_arr_mask = list(plvr_mask)
  return plvr_arr_mask

def mask_letra(letra): 
  if (letra in letras_tentadas):
    return letra 
  else:
    return '_'


if __name__ == '__main__':
  web.run_app(app, host="localhost", port=5000)
  #eventlet.wsgi.server(eventlet.listen(('', 5000)), app)