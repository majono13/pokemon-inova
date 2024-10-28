export interface IMyPokemon {
    uid: string;
    userId:  string;
    name: string;
    image: string;
    type: string;
    status: {
        value: number;
        name: string;
    }[];
    captureDate: Date;
    city: string;
    temp: number;
}