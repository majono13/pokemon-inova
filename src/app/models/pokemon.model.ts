import { IPokemonTypeSlot } from "./pokemon-type-response.model";

export interface IPokemon {
        abilities: IAbility[];
        base_experience: number;
        cries: {
            latest: string;
            legacy: string;
        },
        height: number;
        id: number;
        is_default: boolean;
        location_area_encounters: string;
        name: string;
        order: number;
        species: {
            name: string;
            url: string;
        },
        sprites: ISprites,
        stats: IStats[]
        types: IPokemonTypeSlot[]
        weight: number;
    }


export interface IAbility {
    ability: {
        name: string;
        url: string;
    }
    is_hidden: boolean,
    slot: number
}

export interface ISprites {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}

export interface IStats {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}