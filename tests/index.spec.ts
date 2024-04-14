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
      expect(message).to.be.eql({ 'command': 'list', 'user': 'danixps' });
      expect(message).to.be.eql({ 'command': message.command, 'user': message.user });
      expect(message.command).to.be.equal('list');
      done();
    });

    socket.emit('data', '{"command": "list" ');
    socket.emit('data', ', "user": "danixps"}');
    socket.emit('data', '\n');
  });
});

describe('MessageEventEmitterClient', () => {
  it('Deberia el cliente devolver el json', (done) => {
    const socket = new EventEmitter();
    
    const client = new MessageEventEmitterClient(socket);

    client.on('message', (message) => {
      expect(message).to.be.eql({ 'command': 'add ', 'user': 'danixps', 'id': 1, 'name': 'carta1', 'manaCost': 1, 'color': 'rojo', 'type': 'criatura', 'rarity': 'comun', 'rulesText': 'carta1', 'marketValue': 1, 'powerandtoughness': '1/1', 'loyalty': 1 });
      done();
    });
    

    socket.emit('data', '{"command": "add "');
    socket.emit('data', ', "user": "danixps", "id": 1, "name": "carta1", "manaCost": 1, "color": "rojo", "type": "criatura", "rarity": "comun", "rulesText": "carta1", "marketValue": 1, "powerandtoughness": "1/1", "loyalty": 1}');
    socket.emit('data', '\n');
  });
});