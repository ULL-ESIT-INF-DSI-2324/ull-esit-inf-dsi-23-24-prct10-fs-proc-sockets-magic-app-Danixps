

import net from 'net';

import yargs from 'yargs';
import chalk from 'chalk';
import { Card, Rarity, Color, LineType } from './card.js';
import { cargarCartas, encontrarCarta } from './gestioncartas.js';

const client = net.connect({port: 60300});
/**
 * Descripción: Definición de las opciones de la línea de comandos.
 */
const optionDefinitions = [
    {
        name: 'user',
        describe: 'Usuario propietario',
        type: 'string',
        demandOption: true,
    },
    {
        name: 'id',
        describe: 'ID de la carta',
        type: 'number',
        demandOption: true,
    },
    {
        name: 'name',
        describe: 'Nombre de la carta',
        type: 'string',
        demandOption: true,
    },
    {
        name: 'manaCost',
        describe: 'Costo de maná',
        type: 'number',
        demandOption: true,
    },
    {
        name: 'color',
        describe: 'Color de la carta',
        type: 'string',
        demandOption: true,
    },
    {
        name: 'type',
        describe: 'Línea de tipo',
        type: 'string',
        demandOption: true,
    },
    {
        name: 'rarity',
        describe: 'Rareza de la carta',
        type: 'string',
        demandOption: true,
    },
    {
        name: 'rulesText',
        describe: 'Texto de reglas',
        type: 'string',
        demandOption: true,
    },
    {
        name: 'marketValue',
        describe: 'Valor de mercado',
        type: 'number',
        demandOption: true,
    },
    {
        name: 'powerandtoughness',
        describe: 'Fuerza/Resistencia de la carta (sólo para tipo criatura)',
        type: 'array',
        demandOption: false,
    },
    {
        name: 'loyalty',
        describe: 'Marcas de lealtad',
        type: 'number',
        demandOption: false,
    },
];

/**
 * Convierte la definición de opciones en un objeto que puede ser utilizado por yargs.
 */
const options = optionDefinitions.reduce((acc: { [key: string]: any }, { name, describe, type, demandOption }) => {
    acc[name] = {
        describe,
        type,
        demandOption,
    };
    return acc;
}, {});

yargs(process.argv.slice(2))
    .command({
        command: 'add',
        describe: 'Añadir una carta a la colección',
        builder: options,
        handler: (argv) => {
            /**
             * Create a new Card object with the provided arguments.
             */
            const carta = new Card(
                argv.id,
                argv.name,
                argv.manaCost,
                argv.color as Color,
                argv.type as LineType,
                argv.rarity as Rarity,
                argv.rulesText,
                argv.marketValue,
                argv.powerandtoughness,
                argv.loyalty


            );
        
              client.write(JSON.stringify({ command: 'add', user: argv.user, content: carta , id: argv.id , name: argv.name , manaCost: argv.manaCost , color: argv.color , type : argv.type , rarity: argv.rarity , rulesText: argv.rulesText , marketValue: argv.marketValue , powerandtoughness: argv.powerandtoughness , loyalty: argv.loyalty }) + '\n');
      
        },
    })
    .command({
        command: 'update',
        describe: 'Modificar una carta a la colección',
        builder: options,
        handler: (argv) => {
            /**
             * Crea un nuevo objeto Card con los argumentos proporcionados.
             */
            const carta = new Card(
                argv.id,
                argv.name,
                argv.manaCost,
                argv.color as Color,
                argv.type as LineType,
                argv.rarity as Rarity,
                argv.rulesText,
                argv.marketValue,
                argv.powerandtoughness,
                argv.loyalty
            );
            if (carta.gestionarerrores() === true) {
                carta.modificarCarta(argv.user);
            }
        },
    })
    .command({
        command: 'remove',
        describe: 'Eliminar una carta de la colección',
        builder: {
            user: {
                describe: 'Usuario propietario',
                demandOption: true,
                type: 'string',
            },
            id: {
                describe: 'ID de la carta',
                demandOption: true,
                type: 'number',
            },
        },
        handler: (argv) => {
            client.write(JSON.stringify({ command: 'remove', user: argv.user, id: argv.id }) + '\n');
        },
    })
    .command({
        command: 'read',
        describe: 'Leer una carta de la colección',
        builder: {
            user: {
                describe: 'Usuario propietario',
                demandOption: true,
                type: 'string',
            },
            id: {
                describe: 'ID de la carta',
                demandOption: true,
                type: 'number',
            },
        },
        handler(argv) {
          client.write(JSON.stringify({ command: 'read', user: argv.user, id: argv.id }) + '\n');
        },
    })
    .command({
        command: 'list',
        describe: 'Listar las cartas de un usuario',
        builder: {
            user: {
                describe: 'Usuario',
                type: 'string',
                demandOption: true,
            },
        },
        handler: (argv) => {
            client.write(JSON.stringify({ command: 'list', user: argv.user }) + '\n');
        },
    })
    .help()
    .argv;





/**
 * Descripcion: cuando se ejecute un evento mensaje en el cliente analizara los parametros del mensaje recibido
 * @param mensaje Es el mensaje recibido del servidor
 */
client.on('data', (dataJSON) => {

  const message = JSON.parse(dataJSON.toString());
if (message.type === 'respuesta') {
    console.log(message.content);
} else if (message.type === 'exito') {
    console.log(chalk.green(message.content));
}
else if (message.type === 'error') {
    console.log(chalk.red(message.content));
}
else {
    console.log(`Message type ${message.type} is not valid`);
  }
});

