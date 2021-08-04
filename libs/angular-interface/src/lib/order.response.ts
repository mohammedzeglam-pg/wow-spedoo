export interface OrderShowResponse {
  id: number;
  order_id: number;
  delivery_price: number;
  recipient: string;
  total_price: number;
  total_pieces: string;
  partner: { user: { img_url: string } };
  payment: { img_url: string };
  zone: { name: string };
}
