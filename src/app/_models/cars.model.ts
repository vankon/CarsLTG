export interface IDictionary {
    id: string;
    name: string;
    image: string;
}

export interface ICar extends IDictionary {
    best_selling: boolean;
    is_canada: boolean;
    most_selling: boolean;
    most_visited: boolean;
    year: Date
}