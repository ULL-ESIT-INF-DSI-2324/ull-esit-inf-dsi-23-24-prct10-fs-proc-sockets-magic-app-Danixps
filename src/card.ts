import fs from 'fs';
import chalk from 'chalk';

/**
 * Descripcion: Enumerado de rareza de cartas
 */
export enum Rarity {
    Common = 'común',
    Uncommon = 'infrecuente',
    Rare = 'rara',
    Mythic = 'mítica'
}

/**
 * Descripcion: Enumerado de colores de cartas
 */
export enum Color {
    White = 'blanco',
    Blue = 'azul',
    Black = 'negro',
    Red = 'rojo',
    Green = 'verde',
    Colorless = 'incoloro',
    Multicolor = 'multicolor'
}

/**
 * Descripcion: Enumerado de la Linea de tipo
 */
export enum LineType {
    Tierra = 'tierra',
    Criatura = 'criatura',
    Encantamiento = 'encantamiento',
    Conjuro = 'conjuro',
    Instantaneo = 'instantaneo',
    Artefacto = 'artefacto',
    Planeswalker = 'planeswalker'
}

/**
 * Descripcion: La interfaz card_characteristics representa los aributos de las cartas
 */
export interface Card_Characteristics {
    id: number,
    color: Color,
    type: LineType,
    rarity: Rarity,
    rulesText: string,
    marketValue: number,
    powerandtoughness?: [number, number],
    loyalty?: number,
}

/**
 * Descripción: La
 */
export class Card implements Card_Characteristics {
    id: number;
    name: string;
    manaCost: number;
    color: Color;
    type: LineType;
    rarity: Rarity;
    rulesText: string;
    marketValue: number;
    powerandtoughness?: [number, number];
    loyalty?: number;

    /**
     * Crea una instancia de la clase Card.
     * @param id - El ID de la carta.
     * @param name - El nombre de la carta.
     * @param manaCost - El costo de maná de la carta.
     * @param color - El color de la carta.
     * @param type - El tipo de la carta.
     * @param rarity - La rareza de la carta.
     * @param rulesText - El texto de las reglas de la carta.
     * @param marketValue - El valor de mercado de la carta.
     * @param powerandtoughness - La fuerza y resistencia de la carta (solo para criaturas).
     * @param loyalty - La lealtad de la carta (solo para planeswalkers).
     */
    constructor(id: number, name: string, manaCost: number, color: Color, type: LineType, rarity: Rarity, rulesText: string, marketValue: number, powerandtoughness?: [number, number], loyalty?: number) {
        this.id = id;
        this.name = name;
        this.manaCost = manaCost;
        this.color = color;
        this.type = type;
        this.rarity = rarity;
        this.rulesText = rulesText;
        this.marketValue = marketValue;
        this.powerandtoughness = powerandtoughness;
        this.loyalty = loyalty;
    }

    /**
     * Guarda la carta en la colección del usuario.
     * @param usuario - El nombre del usuario.
     * @returns Un mensaje indicando si la carta se guardó correctamente o si hubo algún error.
     */
    public guardarCarta(usuario: string) {
        if (!Object.values(Rarity).includes(this.rarity as Rarity)) {
            console.error(chalk.red(`Invalid rarity: ${this.rarity}, change it to one of the following: ${Object.values(Rarity)} for creating a card`));
            return `Invalid rarity: ${this.rarity}, change it to one of the following: ${Object.values(Rarity)} for creating a card`;
        }
        if (!Object.values(Color).includes(this.color as Color)) {
            console.error(chalk.red(`Invalid color: ${this.color}, change it to one of the following: ${Object.values(Color)} for creating a card`));
            return `Invalid color: ${this.color}, change it to one of the following: ${Object.values(Color)} for creating a card`;
        }
        if (!Object.values(LineType).includes(this.type as LineType)) {
            console.error(chalk.red(`Invalid type: ${this.type}, change it to one of the following: ${Object.values(LineType)} for creating a card`));
            return `Invalid type: ${this.type}, change it to one of the following: ${Object.values(LineType)} for creating a card`;
        }
        
        if (this.powerandtoughness && this.type !== LineType.Criatura) {
            console.error(chalk.red(`Power/Toughness is only for criatura cards`));
            return `Power/Toughness is only for criatura cards`;
        }
        if (this.loyalty && this.type !== LineType.Planeswalker) {
            console.error(chalk.red(`Loyalty is only for planeswalker cards`));
            return `Loyalty is only for planeswalker cards`;
        }
        const directorioUsuario = `./${usuario}`;
        if (!fs.existsSync(directorioUsuario)) {
            fs.mkdirSync(directorioUsuario);
        }

        const rutaArchivoid = `${directorioUsuario}/${this.id}.json`;
        if (fs.existsSync(rutaArchivoid)) {
            console.error(chalk.red(`Card already exists at ${usuario} collection`));
            return `Card already exists at ${usuario} collection`;
        } 
        const rutaArchivo = `${directorioUsuario}/${this.id}.json`;
        fs.writeFileSync(rutaArchivo, JSON.stringify(this, null, 2));
        console.log(chalk.green(`New card saved at ${usuario} collection!`));
        return `New card saved at ${usuario} collection!`;
    }

    /**
     * Modifica la carta en la colección del usuario.
     * @param usuario - El nombre del usuario.
     * @returns Un mensaje indicando si la carta se modificó correctamente o si hubo algún error.
     */
    public modificarCarta(usuario: string) {
        const directorioUsuario = `./${usuario}`;
        const rutaArchivoid = `${directorioUsuario}/${this.id}.json`;
        if (!fs.existsSync(rutaArchivoid)) {
            console.error(chalk.red(`Card not found at ${usuario} collection`));
            const result = `Card not found at ${usuario} collection`;
            return result;
        } 
        const rutaArchivo = `${directorioUsuario}/${this.id}.json`;
        fs.writeFileSync(rutaArchivo, JSON.stringify(this, null, 2));
        console.log(chalk.green(`Card updated at ${usuario} collection!`));
        const result = `Card updated at ${usuario} collection!`;
        return result;
    }

    /**
     * Elimina la carta de la colección del usuario.
     * @param usuario - El nombre del usuario.
     * @returns Un mensaje indicando si la carta se eliminó correctamente o si hubo algún error.
     */
    public eliminarcarta(usuario: string) {
        const directorioUsuario = `./${usuario}`;
        const rutaArchivo = `${directorioUsuario}/${this.id}.json`;
        
        if (fs.existsSync(rutaArchivo)) {
            fs.unlinkSync(rutaArchivo);
            console.log(chalk.green(`Card id ${this.id} removed from ${usuario} collection!`));
            const result = `Card id ${this.id} removed from ${usuario} collection!`;
            return result;
        } else {
            console.error(chalk.red(`Card id ${this.id} not found at ${usuario} collection`));
            const result = `Card id ${this.id} not found at ${usuario} collection`;
            return result;
        }
    }

    
    /**
     * Realiza la validación de las características de la carta.
     * @returns `true` si las características son válidas, `false` en caso contrario.
     */
    public gestionarerrores() {
        if (!Object.values(Rarity).includes(this.rarity as Rarity)) {
            console.error(chalk.red(`Invalid rarity: ${this.rarity}, change it to one of the following: ${Object.values(Rarity)} for creating a card`));
            return false;
        } else if (!Object.values(Color).includes(this.color as Color)) {
            console.error(chalk.red(`Invalid color: ${this.color}, change it to one of the following: ${Object.values(Color)} for creating a card`));
            return false;
        } else if (!Object.values(LineType).includes(this.type as LineType)) {
            console.error(chalk.red(`Invalid type: ${this.type}, change it to one of the following: ${Object.values(LineType)} for creating a card`));
            return false;
        } else if (this.powerandtoughness && this.type !== LineType.Criatura) {
            console.error(chalk.red(`Power/Toughness is only for criatura cards`));
            return false;
        } else if (this.loyalty && this.type !== LineType.Planeswalker) {
            console.error(chalk.red(`Loyalty is only for planeswalker cards`));
            return false;
        }
        return true;
    }
}
