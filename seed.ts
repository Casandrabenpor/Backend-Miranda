import { faker } from '@faker-js/faker';
import { Contact } from './models/interface';
import mysql from 'mysql';

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hotel_miranda',
});

let numberOfRandomElements = 100;

for (let i = 0; i < numberOfRandomElements; i++) {
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

  InsertData(contact);
}

function InsertData(data: Contact) {
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

// Cerrar la conexión cuando hayas terminado
connection.end((error) => {
  if (error) {
    console.error('Error al cerrar la conexión:', error);
    return;
  }
  console.log('Conexión cerrada correctamente');
});
