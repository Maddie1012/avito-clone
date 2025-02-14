export interface FormData {
    name: string;
    description: string;
    location: string;
    type: string;
  }
  
  export interface PropertyData extends FormData {
    propertyType: string;
    area: number;
    rooms: number;
    price: number;
  }
  
  export interface CarData extends FormData {
    brand: string;
    model: string;
    year: number;
    mileage: number;
  }
  
  export interface ServiceData extends FormData {
    serviceType: string;
    experience: number;
    cost: number;
    workSchedule: string;
  }
  