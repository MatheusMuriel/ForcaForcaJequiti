import pika
import random
import json

palavra_secreta = 'BATATA'
dica = "Tuberculo"
enforcamento = 0
valor_roleta = 0
letras_tentadas = []
jogadores = {
  1 : {
    "nome": "Jogador 01",
    "pontuacao": 0,
    "status": "JOGANDO",
    "sid": 0
  }
}

# Ações da iniciação do jogo
  # Sorteiar palavra
  # Roda roleta
###


connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='sala_de_jogo')
channel.queue_declare(queue='perguntar_novo_jogador')
channel.queue_declare(queue='registrado')
channel.queue_declare(queue='vitoria')
channel.queue_declare(queue='jogo_iniciado')
channel.queue_declare(queue='jogador_nao_encontrado')
channel.queue_declare(queue='novo_id')
channel.queue_declare(queue='gerar_id')
channel.queue_declare(queue='login')
channel.queue_declare(queue='register_id')
channel.queue_declare(queue='tentativa')
#channel.queue_declare(queue='iniciar_jogo')
#channel.queue_declare(queue='')


channel.exchange_declare(exchange='atualizacao_jogadores', exchange_type='fanout')
channel.queue_declare(queue='atualizacao_palavra')
channel.queue_declare(queue='atualizacao_tentativas')
channel.queue_declare(queue='atualizacao_enforcamento')
channel.queue_declare(queue='atualizacao_roleta')


### EXEMPLO ###
channel.queue_declare(queue='hello')
def callback(ch, method, properties, body):
  print(" [x] Received %r" % body)
channel.basic_consume(queue='hello',
                      auto_ack=True,
                      on_message_callback=callback)
### END EXEMPLO ###

######### Callbacks #########

def callback_login_id(ch, method, properties, body):
  global jogadores

  body_json = body.decode('utf8').replace("'", '"')
  json_data = json.loads(body_json)

  _id = int(json_data['id'])
  _sid = json_data['sid']

  if _id in jogadores:
    jogadores[_id]['sid'] = _sid
    atts_vira_rodada(_sid)
    informa_novo_jogador(_sid)
  else:
    informa_jogador_nao_encontrado(_sid)
  pass


def callback_gerar_id(ch, method, properties, body):
  global jogadores

  body_json = body.decode('utf8').replace("'", '"')
  json_data = json.loads(body_json)

  max_id = max(jogadores, key=int)
  new_id = max_id + 1
  informa_novo_id(json_data['sid'], new_id)
  pass

def callback_register_id(ch, method, properties, body):
  global jogadores
  
  body_json = body.decode('utf8').replace("'", '"')
  json_data = json.loads(body_json)

  jogador = {
    "nome": json_data["nome"],
    "pontuacao": 0,
    "status": "ESPERANDO",
    "sid": json_data['sid']
  }
  jogadores[json_data["id"]] = jogador
  atts_vira_rodada(json_data['sid'])
  informa_novo_jogador(json_data['sid'])
  pass

def callback_tentativa(ch, method, properties, body):
  body_json = body.decode('utf8').replace("'", '"')
  json_data = json.loads(body_json)

  jogadorId = findJogadorIdBySid(json_data['sid'])
  computar_tentativa(json_data['letra'], jogadorId)
  atts_vira_rodada(json_data['sid'])
  pass
######### END Callbacks #########


######### Consumers #########

channel.basic_consume(queue='login', auto_ack=True, on_message_callback=callback_login_id)
channel.basic_consume(queue='gerar_id', auto_ack=True, on_message_callback=callback_gerar_id)
channel.basic_consume(queue='register_id', auto_ack=True, on_message_callback=callback_register_id)
channel.basic_consume(queue='tentativa', auto_ack=True, on_message_callback=callback_tentativa)

######### END Consumers #########



######### Informadores #########

# Atualizações padrão de quando vira a rodada
def atts_vira_rodada(sid): 
  # Verificar se falta só 3 letras
  att_palavra()
  att_tentativas()
  att_enforcamento()
  att_roleta()
  att_jogadores()

def informa_novo_jogador(sid):
  #await sio.emit("registrado", data={"sid": sid})
  data = { "sid": sid }
  json_data = json.dumps(data, ensure_ascii=False)
  channel.basic_publish(exchange='', routing_key='registrado', body=json_data)
  pass

def informa_novo_id(sid, _id):
  #await sio.emit("novo_id", data={"sid": sid, "id": _id})
  data = { "sid": sid, "id": _id }
  json_data = json.dumps(data, ensure_ascii=False)
  channel.basic_publish(exchange='', routing_key='novo_id', body=json_data)
  pass

def informa_jogador_nao_encontrado(sid):
  #await sio.emit("jogador_nao_encontrado", data={"sid": sid})
  data = { "sid": sid }
  json_data = json.dumps(data, ensure_ascii=False)
  channel.basic_publish(exchange='', routing_key='jogador_nao_encontrado', body=json_data)
  pass

def informa_vitoria(jogador):
  #await sio.emit("vitoria", data={"jogador": jogador})
  pass

def informa_inicio_jogo(sid):
  #await sio.emit("jogo_iniciado", data={"sid": sid})
  pass

######### END Informadores #########


######### Atualizações #########
def att_palavra():
  plvr = mask_palavra()
  data = { "palavra": plvr, "dica": dica }
  json_data = json.dumps(data, ensure_ascii=False)
  channel.basic_publish(exchange='', routing_key='atualizacao_palavra', body=json_data)

def att_tentativas():
  #await sio.emit("atualizacao_tentativas", letras_tentadas, sid=sid)
  json_data = json.dumps(letras_tentadas, ensure_ascii=False)
  channel.basic_publish(exchange='', routing_key='atualizacao_tentativas', body=json_data)
  pass

def att_enforcamento():
  #await sio.emit("atualizacao_enforcamento", enforcamento, sid=sid)
  json_data = json.dumps(enforcamento, ensure_ascii=False)
  channel.basic_publish(exchange='', routing_key='atualizacao_enforcamento', body=json_data)
  pass

def att_roleta():
  global valor_roleta
  #await sio.emit("atualizacao_roleta", data={"valor_roleta": valor_roleta})
  data = { "valor_roleta": valor_roleta }
  json_data = json.dumps(data, ensure_ascii=False)
  channel.basic_publish(exchange='', routing_key='atualizacao_roleta', body=json_data)
  pass

def att_jogadores():
  global jogadores
  #await sio.emit("atualizacao_jogadores", data=jogadores)
  json_data = json.dumps(jogadores, ensure_ascii=False)
  
  #channel.basic_publish(exchange='', routing_key='atualizacao_jogadores', body=json_data)
  channel.basic_publish(exchange='atualizacao_jogadores', routing_key='', body=json_data)

  pass

######### END Atualizações #########



######### Funções internas #########

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

  isVitoria = verificarVitoria()

  if isVitoria:
    informa_vitoria(jogadores[jogadorId])
    informa_vitoria(jogadores[jogadorId])


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

def verificarVitoria():
  global palavra_secreta
  global letras_tentadas
  
  for letra in list(palavra_secreta):
    if letra not in letras_tentadas:
      return False
  return True

######### END Funções internas #########

girarRoleta()

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()

