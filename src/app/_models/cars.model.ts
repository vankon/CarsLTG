import { DocumentReference } from "@angular/fire/compat/firestore";

export interface BaseDictionary {
    id: string;
    name: string;
    image: string;
}

export interface Car extends BaseDictionary {
    best_selling: boolean;
    is_canada: boolean;
    most_selling: boolean;
    most_visited: boolean;
    year: any;
    body_type?: DocumentReference;
    brand?: DocumentReference;
    brand_image: string;
}