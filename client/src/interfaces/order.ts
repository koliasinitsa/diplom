export interface Order {
    id: number;
    userEmail: string;
    startDate: string;
    endDate: string;
    daysCount:number;
    paymentMethod: string;
    rentalCost:number;
    carBrand: string;
    carModel: string;
}