import { faker } from '@faker-js/faker';
import { Booking, Contact, Room, User } from './models/interface';
import mysql from 'mysql';
import { hashPassword } from './util/hashPassword';
import { ContactModel } from './mongoSchemas/contactSchemas';
import { BookingModel } from './mongoSchemas/bookingSchemas';
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');

let randomContacts = 0;
let randomBookings = 20;
let randomRooms = 0;
let randomUsers = 0;
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
    room_id: faker.number.int({ min: 1, max: 20 }),
    guest: faker.person.fullName(),
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
      'In Progress',
    ]),
  } as Booking;

  insertBooking(booking);
}
//Generamos rooms

for (let i = 0; i < randomRooms; i++) {
  let room = {
    room_number: faker.number.int({ min: 1, max: 500 }),
    // room_id: faker.number.int({ min: 1, max: 999 }),
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
//Generamos users
console.log(`generando ${randomUsers} users`);
for (let i = 0; i < randomUsers; i++) {
  let user = {
    contact: faker.phone.number(),
    description: faker.lorem.text(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.fullName(),
    startDate: faker.date
      .between({
        from: new Date(2022, 10 - 1, 5),
        to: new Date(2023, 10 - 1, 5),
      })
      .toISOString()
      .split('T')[0],
    status: faker.helpers.arrayElement(['Active', 'Inactive']),
  } as User;

  insertUser(user);
}
//Functions
async function insertContact(data: Contact) {
  let contact = new ContactModel({
    comment: data.comment,
    customer: data.customer,
    date: data.date,
    order_id: data.order_id,
  });

  await contact.save();
}
async function insertBooking(data: Booking) {
  let booking = new BookingModel({
    room_id: data.room_id,
    guest: data.guest,
    order_date: data.order_date,
    check_in: data.check_in,
    check_in_hour: data.check_in_hour,
    check_out: data.check_out,
    check_out_hour: data.check_out_hour,
    room_type: data.room_type,
    room_number: data.room_number,
    status: data.status,
  });

  await booking.save();
}

function insertRoom(data: Room) {
  // const query =
  //   'INSERT INTO rooms (room_number, room_id, amenities,bed_type,rate,offer_price,status) VALUES (?, ?, ?,?,?, ?, ?)';
  // const values = [
  //   data.room_number,
  //   // data.room_id,
  //   data.amenities[0],
  //   data.bed_type,
  //   data.rate,
  //   data.offer_price,
  //   data.status,
  // ];
  // connection.query(query, values, (error, results) => {
  //   if (error) {
  //     console.error('Error al ejecutar la consulta:', error);
  //     console.log(data);
  //     return;
  //   }
  // });
}
function insertUser(data: User) {
  // const query =
  //   'INSERT INTO users (contact, description, email,password,name,startDate,status) VALUES (?, ?, ?,?,?, ?, ?)';
  // const values = [
  //   data.contact,
  //   data.description,
  //   data.email,
  //   hashPassword(data.password),
  //   data.name,
  //   data.startDate,
  //   data.status,
  // ];
  // connection.query(query, values, (error, results) => {
  //   if (error) {
  //     console.error('Error al ejecutar la consulta:', error);
  //     console.log(data);
  //     return;
  //   }
  // });
}

// Realizar la consulta con INNER JOIN
// const query = `
//   SELECT *
//   FROM bookings
//   INNER JOIN rooms ON bookings.room_id = rooms.room_id
// `;
// connection.query(query, (error, results) => {
//   if (error) {
//     console.error('Error al ejecutar la consulta:', error);
//     return;
//   }

//   console.log('Resultado del INNER JOIN:', results);
// });
//function time
function getTime(date: Date): string {
  return date.getHours() + ':' + date.getMinutes();
}

// Cerrar la conexión cuando hayas terminado
// connection.end((error) => {
//   if (error) {
//     console.error('Error al cerrar la conexión:', error);
//     return;
//   }
//   console.log('Conexión cerrada correctamente');
// });
