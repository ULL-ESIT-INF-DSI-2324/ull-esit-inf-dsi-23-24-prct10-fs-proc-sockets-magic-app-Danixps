

import net from 'net';
const client = net.connect({port: 60300});

if (process.argv.length !== 4) {
  console.log('Please, provide a filename and de option (line, caracter or word).');
} else{
/**
 * Descripcion: cuando se ejecute un evento mensaje en el cliente analizara los parametros del mensaje recibido
 * @param mensaje Es el mensaje recibido del servidor
 */
client.on('data', (dataJSON) => {

  const message = JSON.parse(dataJSON.toString());
  if (message.type === 'connection') {
    console.log(`Connection established.`);
    const file = process.argv[2];
    const option1 = process.argv[3];

    console.log(file);
    console.log(option1);
    client.write(JSON.stringify({ type: 'command', content: file, option : option1 }) + '\n');
  } else if (message.type === 'respuesta') {
    console.log(`Salida:\n ${message.content}`);
    client.end();
  } else if(message.type === "error_file"){
    console.log(`El archivo no existe o ha ocurrido un error al procesarlo`);
  } else {
    console.log(`Message type ${message.type} is not valid`);
  }
});

}