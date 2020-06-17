import eventlet
import socketio

sio = socketio.Server()
#app = socketio.WSGIApp(sio, static_files={'/': {'content_type': 'text/html', 'filename': 'index.html'}})
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.event
def my_message(sid, data):
    print('message Recebida', data)
    sio.emit('my_response', 'AAAAAA', sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
  eventlet.wsgi.server(eventlet.listen(('', 5000)), app)