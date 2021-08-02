export interface AllRegionResponse {
  id: number;
  name: string;
  zones: Zone[];
}
interface Zone {
  id: number;
  name: string;
  price: number;
  locations: Location[];
}
interface Location {
  id: number;
  lon: number;
  lat: number;
}
