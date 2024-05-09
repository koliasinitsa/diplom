export interface ItemCardProps {
    item: {
        id: number;
        brand: string
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
    brand: string
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
    carId: number,
    type: string;
    typeCar:string;
    numberOfSeats: number;
    typeEngine: string;
    fuelRate: number;
    costDay: number;
    cost3Day: number;
    costWeek: number;
    costMonth: number,
    transmission: string;
    brand: string
    name: string;
    year: number;
    photo: { type: string, data: number[] }; // Тип изображения "Buffer"
}

export interface CreateCar {
    type: string;
    typeCar:string;
    numberOfSeats: number;
    typeEngine: string;
    fuelRate: number;
    costDay: number;
    cost3Day: number;
    costWeek: number;
    costMonth: number,
    transmission: string;
    brand: string
    name: string;
    year: number;
    images: File | null;
}