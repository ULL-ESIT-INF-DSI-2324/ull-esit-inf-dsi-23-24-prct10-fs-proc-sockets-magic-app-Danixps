import fs from 'fs';
import { Card } from './card.js';

/**
 * Carga las cartas de la colección del usuario.
 * @param usuario - El nombre del usuario.
 * @returns Un array con las cartas de la colección del usuario.
 */
export const cargarCartas = (usuario: string): Card[] => {
    const directorioUsuario = `./${usuario}`;
    const cartas: Card[] = [];
    if (fs.existsSync(directorioUsuario)) {
        const archivos = fs.readdirSync(directorioUsuario);
        archivos.forEach((archivo: unknown) => {
            const rutaArchivo = `${directorioUsuario}/${archivo}`;
            const cartaData = JSON.parse(fs.readFileSync(rutaArchivo, 'utf-8'));
            const carta = new Card(
                cartaData.id,
                cartaData.name,
                cartaData.manaCost,
                cartaData.color,
                cartaData.type,
                cartaData.rarity,
                cartaData.rulesText,
                cartaData.marketValue,
                cartaData.powerandtoughness,
                cartaData.loyalty
            );
            cartas.push(carta);
        });
    }
    return cartas;
};

/**
 * Muestra la información de todas las cartas en la colección del usuario.
 * @param user - el nombre de usuario.
 * @returns Una cadena con la información de todas las cartas en la colección del usuario.
 */
export function mostrarCartas(user: string): string {
    const cartas = cargarCartas(user);
    let cardInfo = '';

    cardInfo += `${user} collection\n`;
    cardInfo += '--------------------------------';
    cartas.forEach((carta) => {
        cardInfo += `\nID: ${carta.id}\nName: ${carta.name}\nManaCost: ${carta.manaCost}\nColor: ${carta.color}\nType: ${carta.type}\nRarity: ${carta.rarity}\nRulesText: ${carta.rulesText}`;

        if (carta.powerandtoughness !== undefined) {
            cardInfo += `\nPower/Toughness: ${carta.powerandtoughness}`;
        }

        if (carta.loyalty !== undefined) {
            cardInfo += `\nLoyalty: ${carta.loyalty}`;
        }

        cardInfo += `\nMarketValue: ${carta.marketValue}\n--------------------------------`;
    });

    return cardInfo;
}

/**
 * Encuentra una carta en la colección del usuario.
 * @param user - El nombre del usuario.
 * @param id - El ID de la carta.
 * @returns Una cadena con la información de la carta.
 */
export function encontrarCarta(user: string, id: number): string {
    if (typeof user === 'string' && typeof id === 'number') {
        const cards = cargarCartas(user);
        const card = cards.find(card => card.id === id);
        let result = '';
        if (card) {
            result += `ID: ${card.id}\nName: ${card.name}\nManaCost: ${card.manaCost}\nColor: ${card.color}\nType: ${card.type}\nRarity: ${card.rarity}\nRulesText: ${card.rulesText}`;
            if (card.powerandtoughness !== undefined) {
                result += `\nPower/Toughness: ${card.powerandtoughness}`;
            }
            if (card.loyalty !== undefined) {
                result += `\nLoyalty: ${card.loyalty}`;
            }
            result += `\nMarketValue: ${card.marketValue}`;
        } else {
            console.log(`Card not found at ${user} collection!`);
            result = `Card not found at ${user} collection!`;
            return result;
        }
        console.log(result);
        return result;
    }
    return 'Invalid input';
}