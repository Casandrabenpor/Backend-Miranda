export interface User {
  contact: string;
  description: string;
  email: string;
  password: string;
  id: string;
  name: string;
  startDate: Date | string;
  status: string;
}
export interface Booking {
  room_id: string;
  guest: string;
  id: string;
  order_date: Date | string;
  check_in: Date | string;
  check_in_hour: string;
  check_out: Date | string;
  check_out_hour: string;
  room_type: string;
  room_number: string;
  status: string;
}
export interface Contact {
  id: string;
  order_id: string;
  date: Date | string;
  customer: string;
  comment: string;
}
export interface Room {
  id: number;
  room_number: number;
  // room_id: number;
  amenities: [string];
  bed_type: string;
  rate: number;
  offer_price: number;
  status: string;
  bookings: [string];
}
export interface Login {
  name: string;
  email: string;
  password: string;
}

export interface Info {
  bookings: {
    route: string;
    methods: string[];
  };
  rooms: {
    route: string;
    methods: string[];
  };
  contacts: {
    route: string;
    methods: string[];
  };
  users: {
    route: string;
    methods: string[];
  };
  hotelName: string;
}
