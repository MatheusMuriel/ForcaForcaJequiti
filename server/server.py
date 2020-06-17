from aiohttp import web
import asyncio
import socketio

sio = socketio.AsyncServer(async_mode="aiohttp", cors_allowed_origins="*")
app = web.Application()
sio.attach(app)

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.event
async def my_message(sid, data):
    print('message Recebida', data)
    await responder('my_response', 'Respondendo ai', sid)
    await att_palavra(sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

async def att_palavra(sid):
  await sio.emit("atualizacao_palavra", "", sid)    

async def responder(event, message, sid):
  await sio.emit(event, message, sid)

if __name__ == '__main__':
  web.run_app(app, host="localhost", port=5000)
  #eventlet.wsgi.server(eventlet.listen(('', 5000)), app)