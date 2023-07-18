import { faker } from '@faker-js/faker';
import { Booking, Contact, Room, User } from './models/interface';
import { hashPassword } from './util/hashPassword';
import { ContactModel } from './mongoSchemas/contactSchemas';
import { BookingModel } from './mongoSchemas/bookingSchemas';
import { RoomModel } from './mongoSchemas/roomSchemas';
import { UserModel } from './mongoSchemas/userSchemas';
const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
async function main(): Promise<void> {
  mongoose.connect(
    'mongodb+srv://casandra:DmgZYUKN2Lg6CSVc@miranda.rstgdgt.mongodb.net/hotelmiranda',
  );

  let randomContacts = 20;
  let randomBookings = 20;
  let randomRooms = 20;
  let randomUsers = 20;

  let roomIds: string[] = [];

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

    await insertContact(contact);
  }

  //Generamos rooms
  console.log(`generando ${randomRooms} rooms`);
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

    await insertRoom(room);
  }

  //Generamos bookings
  console.log(`generando ${randomBookings} bookings`);
  for (let i = 0; i < randomBookings; i++) {
    let booking = {
      room_id: faker.helpers.arrayElement(roomIds),
      guest: faker.person.fullName(),
      order_date: faker.date
        .between({
          from: new Date(),
          to: new Date(2025, 10 - 1, 5),
        })
        .toISOString()
        .replace('T', ' '),
      check_in: faker.date
        .between({
          from: new Date(),
          to: new Date(2025, 10 - 1, 5),
        })
        .toISOString()
        .split('T')[0],
      check_in_hour: getTime(faker.date.anytime()),
      check_out: faker.date
        .between({
          from: new Date(),
          to: new Date(2025, 10 - 1, 5),
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

    await insertBooking(booking);
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
          from: new Date(),
          to: new Date(2025, 10 - 1, 5),
        })
        .toISOString()
        .split('T')[0],
      status: faker.helpers.arrayElement(['Active', 'Inactive']),
    } as User;

    await insertUser(user);
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

  async function insertRoom(data: Room) {
    let room = new RoomModel({
      room_number: data.room_number,
      amenities: data.amenities[0],
      bed_type: data.bed_type,
      rate: data.rate,
      offer_price: data.offer_price,
      status: data.status,
    });

    let roomSaved = await room.save();

    roomIds.push(roomSaved._id.toString());
  }
  async function insertUser(data: User) {
    let user = new UserModel({
      contact: data.contact,
      description: data.description,
      email: data.email,
      password: hashPassword(data.password),
      name: data.name,
      startDate: data.startDate,
      status: data.status,
    });
    await user.save();
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
    return (
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0')
    );
  }

  // Cerrar la conexión cuando hayas terminado
  // connection.end((error) => {
  //   if (error) {
  //     console.error('Error al cerrar la conexión:', error);
  //     return;
  //   }
  //   console.log('Conexión cerrada correctamente');
  // });
}

main();
