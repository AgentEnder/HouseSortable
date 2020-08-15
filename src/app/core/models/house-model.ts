export interface HouseModel {
    address: string;
    cityZip: string;
    link: string;
    image: string;
    price: number;
}

export interface HouseList{
    data: HouseModel[];
    name: string;
    modifiedAt: string;
    createdAt: string;
    public: boolean;
    publicUrl?: string;
}
