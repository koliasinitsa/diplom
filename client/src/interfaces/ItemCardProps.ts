export interface ItemCardProps {
    item: {
        id: number;
        name: string;
        transmission: string;
        type: string;
        costDay: number;
        photo: {
            type: string;
            data: number[];
        };
    };
}

export interface Item {
    id: number;
    name: string;
    transmission: string;
    type: string;
    costDay: number;
    photo: {
        type: string;
        data: number[];
    };
}


export interface Car {
    type: string;
    numberOfSeats: number;
    typeEngine: string;
    fuelRate: number;
    costDay: number;
    cost3Day: number;
    costWeek: number;
    transmission: string;
    name: string;
    year: number;
    photo: { type: string, data: number[] }; // Тип изображения "Buffer"
}

export interface CreateCar {
    type: string;
    numberOfSeats: number;
    typeEngine: string;
    fuelRate: number;
    costDay: number;
    cost3Day: number;
    costWeek: number;
    transmission: string;
    name: string;
    year: number;
    images: File | null;
}