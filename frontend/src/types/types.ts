export interface Item {
    id: number;
    name: string;
    description: string;
    location: string;
    type: string;
    image?: string;
    propertyType?: string;
    serviceType?: string;
    area?: number;
    rooms?: number;
    price?: number;
    brand?: string;
    model?: string;
    year?: number;
    mileage?: number;
    experience?: number;
    cost?: number;
    workSchedule?: string;
  }