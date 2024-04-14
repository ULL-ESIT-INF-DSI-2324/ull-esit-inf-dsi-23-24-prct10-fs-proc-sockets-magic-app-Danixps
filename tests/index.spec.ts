import {expect} from 'chai';
import 'mocha';
import {connect} from 'net';
import {EventEmitter} from 'events';
import {MessageEventEmitterClient} from '../src/eventEmitterClient.js';

describe('MessageEventEmitterClient', () => {
  it('Should emit a message event once it gets a complete message', (done) => {
    const socket = new EventEmitter();
    const client = new MessageEventEmitterClient(socket);

    client.on('message', (message) => {
      expect(message).to.be.eql({ 'type': 'command', 'content': 'ls' });
      expect(message).to.be.eql({ 'type': message.type, 'content': message.content });
      expect(message.type).to.be.equal('command');
      expect(message.content).to.be.equal('ls');
      done();
    });

    socket.emit('data', '{"type": "command" ');
    socket.emit('data', ', "content": "ls"}');
    socket.emit('data', '\n');
  });
});

describe('MessageEventEmitterClient', () => {
  it('Deberia el cliente devolver el json', (done) => {
    const socket = new EventEmitter();
    
    const client = new MessageEventEmitterClient(socket);

    client.on('message', (message) => {
      expect(message).to.be.eql({ 'type': 'respuesta', 'content': 'ls -la' }); 
      expect(message).to.be.eql({ 'type': message.type, 'content': message.content });
      expect(message.type).to.be.equal('respuesta');
      expect(message.content).to.be.equal('ls -la');
      done();
    });

    socket.emit('data', '{"type": "respuesta" ');
    socket.emit('data', ', "content": "ls -la"}');
    socket.emit('data', '\n');
  });
});