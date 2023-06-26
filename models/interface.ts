export interface User {
  contact: string;
  description: string;
  email: string;
  id: number;
  name: string;
  startDate: string;
  status: string;
}
export interface Booking {
  guest: string;
  id: string;
  order_date: string;
  check_in: string;
  check_in_hour: string;
  check_out: string;
  check_out_hour: string;
  room_type: string;
  room_number: string;
  status: string;
}
