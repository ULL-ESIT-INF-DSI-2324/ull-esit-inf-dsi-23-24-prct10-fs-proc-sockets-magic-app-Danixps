import { Socket } from 'net';
import {EventEmitter} from 'events';

/**
 * Descripcion: La clase MessageEventEmitter lo que hace es heredar de event emiter y recogerlo para crear nuestro evento mensaje
 * @param connection Va a ser nuestro eventemitter donde mandaremos desde el evento data al evento creado message
 * */
export class MessageEventEmitterClient extends EventEmitter {
    private connection: EventEmitter;
  constructor(connection: EventEmitter) {
    
    super();
    this.connection = connection;

    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;
      let messageLimit = wholeData.indexOf('\n');
      while (messageLimit !== -1) {
        const message = wholeData.substring(0, messageLimit);
        wholeData = wholeData.substring(messageLimit + 1);
        this.emit('message', JSON.parse(message));
        messageLimit = wholeData.indexOf('\n');
      }
    });
    
  }
  /**
 * Descripcion: funcion getsocket() devuelve el scoket de comunicacion
 * @returns this.connection como socket para poder comunicarme desde el cliente hacia el servidor
 * */
  getsocket(): Socket {
    return this.connection as Socket;
    }

}