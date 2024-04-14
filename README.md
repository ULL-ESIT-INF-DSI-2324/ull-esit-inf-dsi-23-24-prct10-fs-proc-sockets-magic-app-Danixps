# PRÁCTICA 10 : Aplicación cliente-servidor para coleccionistas de cartas Magic

*Nombre y apellidos: [Daniel Bensa Expósito Paz](https://github.com/Danixps?tab=repositories, "Enlace Github")*

*Asignatura: Desarrollo de Sistemas Informáticos (DSI)*

[![Tests](https://github.com/Danixps/ULL-DSI-P10/actions/workflows/node.js.yml/badge.svg)](https://github.com/Danixps/ULL-DSI-P10/actions/workflows/node.js.yml)

[![Coverage Status](https://coveralls.io/repos/github/Danixps/ULL-DSI-P10/badge.svg?branch=main)](https://coveralls.io/github/Danixps/ULL-DSI-P10?branch=main)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-Danixps&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-Danixps)



## Índice

1. [Introducción](#id1)

2. [Aplicación cliente-servidor para coleccionistas de cartas Magic](#id2)

3. [Bibliografía](#id4)

<div id='id1' />

## 1. Introducción

El objetivo de esta práctica es desarrollar una aplicación cliente-servidor implementando la aplicación para coleccionistas de cartas Magic que llevó a cabo en la Práctica 9.
<div id='id2' />

## 2. Aplicación cliente-servidor para coleccionistas de cartas Magic

Para realizar la práctica he creado un cliente donde tendrá un manejador de argumentos con yargs donde tendremos las opciones `list`, `add`, `remove`, `read`, `update`. Donde cada uno tendrá sus argumentos. Dentro de ellos se envia al servidor un JSON con el tipo de comando y los argumentos de comando. Eso lo recibe el servidor que controla que tipo de comando se le esta demandando, y deendiendo del comando se llaman a distintas funciones que realizaran las distintas acciones. Después de la llamada a las funciones se le enviará al cliente la respuesta con un tipo, éxito si ha pasado las funciones correctamente y error si ha habido un error durante el procesamiento. Y cuando lo recibe el cliente dependiendo de si es error o exito se imprimirá el contendido enviado desde el servidor con el color rojo o verde.

Ejemplos de uso : `$node dist/client.js add --user "danixps" --id 1 --name "Black Lotus" --manaCost 20000 -- color "blanco" --type "criatura" --rarity "rara" --rulesText "Add three mana of any one color ." --marketValue 10000 --powerandtoughness "N/A" --loyalty "N/A"`
New card saved at danixps collection!

## 3. Bibliografía

[Guión de la Práctica 10](https://ull-esit-inf-dsi-2324.github.io/prct10-fs-proc-sockets-magic-app/)