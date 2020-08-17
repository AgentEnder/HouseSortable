export interface HouseModel {
    address: string;
    cityZip: string;
    link: string;
    image: string;
    price: number;
    pros?: string[];
    cons?: string[];
    visited?: boolean;
}

export interface HouseList{
    data: HouseModel[];
    name: string;
    modifiedAt: string;
    createdAt: string;
    public: boolean;
    publicUrl?: string;
}
