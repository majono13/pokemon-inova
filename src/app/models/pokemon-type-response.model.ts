export interface IPokemonTypeResponse {
    name: string;
    id: number;
    pokemon: IPokemonTypeSlot[]
}

export interface IPokemonTypeSlot {
    slot: number;
    pokemon: {  
        name: string;
        url: string
    }
}