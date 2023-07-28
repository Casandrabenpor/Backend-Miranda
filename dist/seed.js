"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const hashPassword_1 = require("./util/hashPassword");
const contactSchemas_1 = require("./mongoSchemas/contactSchemas");
const bookingSchemas_1 = require("./mongoSchemas/bookingSchemas");
const roomSchemas_1 = require("./mongoSchemas/roomSchemas");
const userSchemas_1 = require("./mongoSchemas/userSchemas");
const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
async function main() {
    mongoose.connect('mongodb+srv://casandra:DmgZYUKN2Lg6CSVc@miranda.rstgdgt.mongodb.net/hotelmiranda');
    let randomContacts = 20;
    let randomBookings = 0;
    let randomRooms = 0;
    let randomUsers = 0;
    let roomIds = [];
    //Generando contacts
    console.log(`generando ${randomContacts} contactos`);
    for (let i = 0; i < randomContacts; i++) {
        let contact = {
            contact_id: faker_1.faker.string.numeric({ length: 10 }),
            date: faker_1.faker.date
                .between({
                from: new Date(),
                to: new Date(2030, 10 - 1, 5),
            })
                .toISOString()
                .split('T')[0],
            customer: faker_1.faker.person.fullName(),
            comment: faker_1.faker.lorem.text(),
        };
        await insertContact(contact);
    }
    //Generamos rooms
    console.log(`generando ${randomRooms} rooms`);
    for (let i = 0; i < randomRooms; i++) {
        let room = {
            room_number: faker_1.faker.number.int({ min: 1, max: 500 }),
            // room_id: faker.number.int({ min: 1, max: 999 }),
            amenities: [
                faker_1.faker.helpers.arrayElement([
                    'Recreational activities',
                    'Mini Bar / Mini Fridge',
                    'Kitchen',
                    'Tea / Coffee Maker',
                    'Swimming pool',
                    'Air Conditioner',
                    'Breakfast',
                ]),
            ],
            bed_type: faker_1.faker.helpers.arrayElement([
                'Double Bed',
                'Suite',
                'Single Bed',
                'Double Superior',
            ]),
            rate: faker_1.faker.number.int({ min: 10, max: 1000 }),
            offer_price: faker_1.faker.number.int({ min: 1, max: 999 }),
            status: faker_1.faker.helpers.arrayElement(['Available', 'Occupied']),
        };
        await insertRoom(room);
    }
    //Generamos bookings
    console.log(`generando ${randomBookings} bookings`);
    for (let i = 0; i < randomBookings; i++) {
        let booking = {
            room_id: faker_1.faker.helpers.arrayElement(roomIds),
            guest: faker_1.faker.person.fullName(),
            order_date: faker_1.faker.date
                .between({
                from: new Date(),
                to: new Date(2030, 10 - 1, 5),
            })
                .toISOString()
                .replace('T', ' '),
            check_in: faker_1.faker.date
                .between({
                from: new Date(),
                to: new Date(2030, 10 - 1, 5),
            })
                .toISOString()
                .split('T')[0],
            check_in_hour: getTime(faker_1.faker.date.anytime()),
            check_out: faker_1.faker.date
                .between({
                from: new Date(),
                to: new Date(2030, 10 - 1, 5),
            })
                .toISOString()
                .split('T')[0],
            check_out_hour: getTime(faker_1.faker.date.anytime()),
            room_type: faker_1.faker.helpers.arrayElement([
                'Double Bed',
                'Suite',
                'Single Bed',
                'Double Superior',
            ]),
            room_number: faker_1.faker.number.int({ min: 100, max: 999 }).toString(),
            status: faker_1.faker.helpers.arrayElement([
                'Check In',
                'Check Out',
                'In Progress',
            ]),
        };
        await insertBooking(booking);
    }
    //Generamos users
    console.log(`generando ${randomUsers} users`);
    for (let i = 0; i < randomUsers; i++) {
        let user = {
            contact: faker_1.faker.phone.number(),
            description: faker_1.faker.lorem.text(),
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password(),
            name: faker_1.faker.person.fullName(),
            startDate: faker_1.faker.date
                .between({
                from: new Date(),
                to: new Date(2030, 10 - 1, 5),
            })
                .toISOString()
                .split('T')[0],
            status: faker_1.faker.helpers.arrayElement(['Active', 'Inactive']),
        };
        await insertUser(user);
    }
    //Functions
    async function insertContact(data) {
        let contact = new contactSchemas_1.ContactModel({
            comment: data.comment,
            customer: data.customer,
            date: data.date,
            contact_id: data.contact_id,
        });
        await contact.save();
    }
    async function insertBooking(data) {
        let booking = new bookingSchemas_1.BookingModel({
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
    async function insertRoom(data) {
        let room = new roomSchemas_1.RoomModel({
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
    async function insertUser(data) {
        let user = new userSchemas_1.UserModel({
            contact: data.contact,
            description: data.description,
            email: data.email,
            password: (0, hashPassword_1.hashPassword)(data.password),
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
    function getTime(date) {
        return (date.getHours().toString().padStart(2, '0') +
            ':' +
            date.getMinutes().toString().padStart(2, '0'));
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
