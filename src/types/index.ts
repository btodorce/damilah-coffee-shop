export interface Coffee {
    id: string;
    description: string;
    image: string;
    title: string;
    ingredients: string[];
}

export interface ALL_HOTS {
    allHots: [Coffee];
}