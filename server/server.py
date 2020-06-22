from aiohttp import web
import asyncio
import socketio
import time
import random

sio = socketio.AsyncServer(async_mode="aiohttp", cors_allowed_origins="*")
app = web.Application()
sio.attach(app)

palavra_secreta = 'BATATA'
enforcamento = 0
valor_roleta = 0
letras_tentadas = []
jogadores = {
  1 : {
    "nome": "Jogador 01",
    "pontuacao": 0,
    "status": "JOGANDO",
    "sid": 0
  },
  2 : {
    "nome": "Jogador 02",
    "pontuacao": 0,
    "status": "ESPERANDO",
    "sid": 0
  },
  3 : {
    "nome": "Jogador 03",
    "pontuacao": 0,
    "status": "ESPERANDO",
    "sid": 0
  }
}

# Ações da iniciação do jogo
  # Sorteiar palavra
  # Mostrar dica
  # Mostrar Painel
  # Define o jogador da vez
  # Roda roleta


###

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
  await sio.emit(event, message, sid=sid)

######################

@sio.event
async def inicar_jogo(sid):
  global jogadores
  jogador = findJogadorIdBySid(sid)
  if jogador in jogadores:
    await atts_vira_rodada(sid)
  else:
    await ask_novo_jogador(sid)

@sio.event
async def tentativa(sid, letra):
  jogadorId = findJogadorIdBySid(sid)
  computar_tentativa(letra, jogadorId)
  await atts_vira_rodada(sid)

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
  _id = int(_id)
  if _id in jogadores:
    jogadores[_id]['sid'] = sid
    await informa_novo_jogador(sid)
    await atts_vira_rodada(sid)
  else:
    await informa_jogador_nao_encontrado(sid)

@sio.event
async def gerar_id(sid):
  global jogadores
  max_id = max(jogadores, key=int)
  new_id = max_id + 1
  await informa_novo_id(sid, new_id)
  pass


# Atualizações padrão de quando vira a rodada
async def atts_vira_rodada(sid): 
  # Verificar se falta só 3 letras
  await att_palavra(sid)
  await att_tentativas(sid)
  await att_enforcamento(sid)
  await att_roleta(sid)
  await att_jogadores(sid)

async def ask_novo_jogador(sid):
  await sio.emit("perguntar_novo_jogador", data={"sid": sid})

async def informa_novo_jogador(sid):
  await sio.emit("registrado", data={"sid": sid})
  await atts_vira_rodada(sid)

async def informa_novo_id(sid, _id):
  await sio.emit("novo_id", data={"sid": sid, "id": _id})

async def informa_jogador_nao_encontrado(sid):
  await sio.emit("jogador_nao_encontrado", data={"sid": sid})

###########################################################

async def att_palavra(sid):
  plvr = mask_palavra()
  await sio.emit("atualizacao_palavra", plvr, sid=sid)

async def att_tentativas(sid):
  await sio.emit("atualizacao_tentativas", letras_tentadas, sid=sid)

async def att_enforcamento(sid):
  await sio.emit("atualizacao_enforcamento", enforcamento, sid=sid)

async def att_roleta(sid):
  global valor_roleta
  await sio.emit("atualizacao_roleta", data={"valor_roleta": valor_roleta})
  pass

async def att_jogadores(sid):
  global jogadores
  await sio.emit("atualizacao_jogadores", data=jogadores)

##### Controllers #####

def computar_tentativa(letra, jogadorId):
  global enforcamento
  global jogadores
  global valor_roleta
  
  if (letra in palavra_secreta):
    old_pontos = jogadores[jogadorId]["pontuacao"]
    new_pontos = old_pontos + valor_roleta
    jogadores[jogadorId]["pontuacao"] = new_pontos
  else:
    enforcamento += 1
  
  letras_tentadas.append(letra)

  proximoJogador = getIdProximoJogador()
  jogadores[jogadorId]["status"] = "ESPERANDO"
  jogadores[proximoJogador]["status"] = "JOGANDO"

  girarRoleta()

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

def findJogadorIdBySid(sid):
  global jogadores
  for key, value in jogadores.items():
    if value["sid"] == sid:
      return key
  return None

def getIdProximoJogador():
  global jogadores
  encontrado = False

  listJogadores = list(jogadores.items())
  if (listJogadores[-1][1]["status"] == "JOGANDO"):
    return listJogadores[0][0]

  for key, value in listJogadores:
    if encontrado:
      return key
    if value["status"] == "JOGANDO":
      encontrado = True

def girarRoleta():
  global valor_roleta
  novo_valor = random.randint(1,10) * 50
  valor_roleta = novo_valor


if __name__ == '__main__':
  web.run_app(app, host="localhost", port=5000)
  #eventlet.wsgi.server(eventlet.listen(('', 5000)), app)