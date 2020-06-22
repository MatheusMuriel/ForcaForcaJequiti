from aiohttp import web
import asyncio
import socketio
import time

sio = socketio.AsyncServer(async_mode="aiohttp", cors_allowed_origins="*")
app = web.Application()
sio.attach(app)

palavra_secreta = 'BATATA'
enforcamento = 0
valor_roleta = 0
letras_tentadas = []
jogadores = {
  15 : {
    "nome": "Jogador 01",
    "pontuacao": 0,
    "status": "JOGANDO",
    "sid": 0
  },
  36 : {
    "nome": "Jogador 02",
    "pontuacao": 0,
    "status": "ESPERANDO",
    "sid": 0
  },
  5 : {
    "nome": "Jogador 03",
    "pontuacao": 0,
    "status": "ESPERANDO",
    "sid": 0
  }
}

@sio.event
def connect(sid, environ):
  print('connect ', sid)

@sio.event
def disconnect(sid):
  print('disconnect ', sid)

######################

@sio.event
async def my_message(sid, data):
  print('message Recebida', data)
  await responder('my_response', 'Respondendo ai', sid)
  await att_palavra(sid)

async def responder(event, message, sid):
  await sio.emit(event, message, sid)

######################

@sio.event
async def inicar_jogo(sid):
  global jogadores
  if (sid in jogadores):
    await atts_vira_rodada(sid)
  else: 
    await ask_novo_jogador(sid)


@sio.event
async def tentativa(sid, letra):
  computar_tentativa(letra, "")
  await atts_vira_rodada(sid)

async def atts_vira_rodada(sid): 
  await att_palavra(sid)
  await att_tentativas(sid)
  await att_enforcamento(sid)

@sio.event
async def register_id(sid, dados):
  global jogadores
  jogador = {
    "nome": dados["nome"],
    "pontuacao": 0,
    "status": "ESPERANDO",
    "sid": sid
  }
  jogadores[dados["id"]] = jogador
  await informa_novo_jogador(sid)

@sio.event
async def login_id(sid, _id):
  global jogadores
  if _id in jogadores:
    jogadores[_id]['sid'] = sid
    await informa_novo_jogador(sid)
  else:
    await informa_jogador_nao_encontrado(sid)

@sio.event
async def gerar_id(sid):
  global jogadores
  max_id = max(jogadores, key=int)
  new_id = max_id + 1
  await informa_novo_id(sid, new_id)
  pass

async def ask_novo_jogador(sid):
  await sio.emit("perguntar_novo_jogador", sid=sid)

async def informa_novo_jogador(sid):
  await sio.emit("registrado", sid=sid)

async def informa_novo_id(sid, _id):
  await sio.emit("novo_id", _id,sid=sid)

async def informa_jogador_nao_encontrado(sid):
  await sio.emit("jogador_nao_encontrado", sid=sid)

###########################################################

async def att_palavra(sid):
  plvr = mask_palavra()
  await sio.emit("atualizacao_palavra", plvr, sid)

async def att_tentativas(sid):
  await sio.emit("atualizacao_tentativas", letras_tentadas, sid)

async def att_enforcamento(sid):
  await sio.emit("atualizacao_enforcamento", enforcamento, sid)

##### Controllers #####

def computar_tentativa(letra, jogador):
  global enforcamento
  if (letra in palavra_secreta):
    print('Acertou')
  else:
    enforcamento += 1
    #Att enforc
  
  letras_tentadas.append(letra)

  # Dar pontos ao jogador
  # Trocar de jogador
  # Atualizar a roleta
  pass

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