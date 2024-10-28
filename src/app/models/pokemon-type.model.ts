export interface IPokemonType {
    count: number;
    next: string,
    previous: string;
    results: ITypes[];
}

export interface ITypes {
    name: string;
    url: string;
}