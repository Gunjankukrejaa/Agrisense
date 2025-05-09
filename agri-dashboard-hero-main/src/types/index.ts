
export interface Crop {
  id: string;
  name: string;
  type: string;
  plantingDate: Date;
  harvestDate: Date;
  description: string;
  area: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  cropId?: string; // Optional reference to a crop
}

export interface WeatherData {
  temperature: number;
  moisture: number;
}
