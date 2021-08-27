interface Accessories {
  id: string;
  type: string;
  name: string;
}

interface Photos {
  id: string;
  photo: string;
}

export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  accessories: Accessories[];
  photos: Photos[];
}
