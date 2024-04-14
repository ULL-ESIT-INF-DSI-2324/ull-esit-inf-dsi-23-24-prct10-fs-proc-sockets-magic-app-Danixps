import net from "net";
import { exec, spawn } from "child_process";
import { cargarCartas, encontrarCarta, mostrarCartas} from "./gestioncartas.js";
import { Card } from "./card.js";

/**
 * Descripcion: creamos el servidor
 * @param connection que sera los listenen
 */
net
  .createServer((connection) => {
    console.log("A client has connected.");




    /**
    * Descripcion: Cuando se pase un mensaje desde algún cliente
    */
    connection.on("data", (dataJSON) => {
      const message = JSON.parse(dataJSON.toString());

      if (message.command === "add") {
        console.log(`Adding card to ${message.user} collection...`);
        const card = new Card(
          message.id,
          message.name,
          message.manaCost,
          message.color,
          message.type,
          message.rarity,
          message.rulesText,
          message.marketValue,
          message.powerandtoughness,
          message.loyalty  
        );

        console.log(card);
        const contenido = card.guardarCarta(message.user);
        if (contenido === `New card saved at ${message.user} collection!`) {
          connection.write(JSON.stringify({ type: "exito", content: contenido }) + "\n");
        } else {
          connection.write(JSON.stringify({ type: "error", content: contenido }) + "\n");
        }
        connection.end();
      } else if (message.command === "list") {
        console.log(`Listing cards from ${message.user} collection...`);
        const contenido = mostrarCartas(message.user);
        connection.write(JSON.stringify({ type: "respuesta", content: contenido }) + "\n");
        connection.end();
      } else if (message.command === "read") {
        console.log(`Reading card from ${message.user} collection...`);
        const contenido = encontrarCarta(message.user, message.id);
        if (contenido === `Card not found at ${message.user} collection!`) {
          connection.write(JSON.stringify({ type: "error", content: contenido }) + "\n");
        } else {
          connection.write(JSON.stringify({ type: "respuesta", content: contenido }) + "\n");
        }
        connection.end();
      } else if (message.command === "remove") {
        console.log(`Removing card from ${message.user} collection...`);
        const card = new Card(
          message.id,
          message.name,
          message.manaCost,
          message.color,
          message.type,
          message.rarity,
          message.rulesText,
          message.marketValue,
          message.powerandtoughness,
          message.loyalty  
        );
        const contenido = card.eliminarcarta(message.user);
        if (contenido === `Card id ${message.id} not found at ${message.user} collection`) {
          connection.write(JSON.stringify({ type: "error", content: contenido }) + "\n");
        } else {
          connection.write(JSON.stringify({ type: "exito", content: contenido }) + "\n");
      }
      connection.end();
      }
  });
        
      connection.on("end", () => {
        console.log("Client has disconnected.");
      });

    })
    .listen(60300, () => {
      console.log("Waiting for clients to connect.");
    });
