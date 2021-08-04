export interface PartnerResponse {
  profit: number;
  token: string;
  user: User;
  suppliers: Supplier[];
}
interface User {
  username: string;
  img_url: string;
}
interface Supplier {
  id: number;
  name: string;
  lat: number;
  lon: number;
  phone: string;
  zone: { name: string };
}
