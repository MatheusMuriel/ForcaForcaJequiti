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
  # Mostrar dica
  # Mostrar Painel
  # Define o jogador da vez
  # Roda roleta
###


connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='sala_de_jogo')


### EXEMPLO ###
channel.queue_declare(queue='hello')
def callback(ch, method, properties, body):
  print(" [x] Received %r" % body)
channel.basic_consume(queue='hello',
                      auto_ack=True,
                      on_message_callback=callback)
### END EXEMPLO ###







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
  json_data = json.dumps(data, ensure_ascii=False)
  channel.basic_publish(exchange='', routing_key='atualizacao_roleta', body=json_data)
  pass

def att_jogadores():
  global jogadores
  #await sio.emit("atualizacao_jogadores", data=jogadores)
  json_data = json.dumps(data, ensure_ascii=False)
  channel.basic_publish(exchange='', routing_key='atualizacao_jogadores', body=json_data)
  pass

######### END Atualizações #########



######### Funções internas #########

async def computar_tentativa(letra, jogadorId):
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
    await informa_vitoria(jogadores[jogadorId])
    await informa_vitoria(jogadores[jogadorId])


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

att_palavra()

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()

