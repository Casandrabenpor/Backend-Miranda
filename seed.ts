import { faker } from '@faker-js/faker';
import { Booking, Contact, Room } from './models/interface';
import mysql from 'mysql';

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hotel_miranda',
});

let randomContacts = 0;
let randomBookings = 0;
let randomRooms = 100;
//Generando contacts
console.log(`generando ${randomContacts} contactos`);
for (let i = 0; i < randomContacts; i++) {
  let contact = {
    order_id: faker.string.numeric({ length: 10 }),
    date: faker.date
      .between({
        from: new Date(2022, 10 - 1, 5),
        to: new Date(2023, 10 - 1, 5),
      })
      .toISOString()
      .split('T')[0],
    customer: faker.person.fullName(),
    comment: faker.lorem.text(),
  } as Contact;

  insertContact(contact);
}
//Generamos bookings

for (let i = 0; i < randomBookings; i++) {
  let booking = {
    guest: faker.person.fullName(),
    id: faker.string.numeric({ length: 10 }),
    order_date: faker.date
      .between({
        from: new Date(2022, 10 - 1, 5),
        to: new Date(2023, 10 - 1, 5),
      })
      .toISOString()
      .replace('T', ' '),
    check_in: faker.date
      .between({
        from: new Date(2022, 10 - 1, 5),
        to: new Date(2023, 10 - 1, 5),
      })
      .toISOString()
      .split('T')[0],
    check_in_hour: getTime(faker.date.anytime()),
    check_out: faker.date
      .between({
        from: new Date(2022, 10 - 1, 5),
        to: new Date(2023, 10 - 1, 5),
      })
      .toISOString()
      .split('T')[0],
    check_out_hour: getTime(faker.date.anytime()),
    room_type: faker.helpers.arrayElement([
      'Double Bed',
      'Suite',
      'Single Bed',
      'Double Superior',
    ]),
    room_number: faker.number.int({ min: 100, max: 999 }).toString(),
    status: faker.helpers.arrayElement([
      'Check In',
      'Check Out',
      'In progress',
    ]),
  } as Booking;

  insertBooking(booking);
}
//Generamos rooms
console.log(`generando ${randomRooms} rooms`);
for (let i = 0; i < randomRooms; i++) {
  let room = {
    room_number: faker.number.int({ min: 1, max: 999 }),
    room_id: faker.number.int({ min: 1, max: 999 }),
    amenities: [
      faker.helpers.arrayElement([
        'Recreational activities',
        'Mini Bar / Mini Fridge',
        'Kitchen',
        'Tea / Coffee Maker',
        'Swimming pool',
        'Air Conditioner',
        'Breakfast',
      ]),
    ],
    bed_type: faker.helpers.arrayElement([
      'Double Bed',
      'Suite',
      'Single Bed',
      'Double Superior',
    ]),
    rate: faker.number.int({ min: 10, max: 1000 }),
    offer_price: faker.number.int({ min: 1, max: 999 }),
    status: faker.helpers.arrayElement(['Available', 'Occupied']),
  } as Room;

  insertRoom(room);
}
//Functions
function insertContact(data: Contact) {
  const query =
    'INSERT INTO contact (order_id, date, customer,comment) VALUES (?, ?, ?,?)';
  const values = [data.order_id, data.date, data.customer, data.comment];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      console.log(data);
      return;
    }
  });
}
function insertBooking(data: Booking) {
  const query =
    'INSERT INTO bookings (guest,id,order_date,check_in,check_in_hour,check_out,check_out_hour,room_type,room_number,status) ' +
    'VALUES (?, ?, ?,?,?, ?, ?,?,?,?)';
  const values = [
    data.guest,
    data.id,
    data.order_date,
    data.check_in,
    data.check_in_hour,
    data.check_out,
    data.check_out_hour,
    data.room_type,
    data.room_number,
    data.status,
  ];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      console.log(data);
      return;
    }
  });
}

function insertRoom(data: Room) {
  const query =
    'INSERT INTO rooms (room_number, room_id, amenities,bed_type,rate,offer_price,status) VALUES (?, ?, ?,?,?, ?, ?)';
  const values = [
    data.room_number,
    data.room_id,
    data.amenities[0],
    data.bed_type,
    data.rate,
    data.offer_price,
    data.status,
  ];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      console.log(data);
      return;
    }
  });
}
//function time
function getTime(date: Date): string {
  return date.getHours() + ':' + date.getMinutes();
}

// Cerrar la conexión cuando hayas terminado
connection.end((error) => {
  if (error) {
    console.error('Error al cerrar la conexión:', error);
    return;
  }
  console.log('Conexión cerrada correctamente');
});
