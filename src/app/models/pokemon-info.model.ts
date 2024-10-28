export interface IPokemonInfo {
    image: string;
    name: string;
    type: string;
    status: {
        value: number;
        name: string;
    }[]
}