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